import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { BuyerLandingFormType } from "@/lib/buyerLandingRoutes";

const steps = [
  { id: "contact", title: "Contact" },
  { id: "email", title: "Email" },
  { id: "consent", title: "Consent" },
];

const buyerFormBaseSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255),
  confirmEmail: z.string().trim().email("Invalid email address").max(255),
  gdprConsent: z.boolean(),
  privacyConsent: z.boolean(),
  marketingConsent: z.boolean(),
});

const buyerFormSchema = buyerFormBaseSchema.refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses do not match",
  path: ["confirmEmail"],
});

type BuyerFormData = z.infer<typeof buyerFormSchema>;

const stepFields: (keyof BuyerFormData)[][] = [
  ["firstName", "lastName", "phoneNumber"],
  ["email", "confirmEmail"],
  ["gdprConsent", "privacyConsent", "marketingConsent"],
];

const initialFormData: BuyerFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  confirmEmail: "",
  gdprConsent: false,
  privacyConsent: false,
  marketingConsent: false,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const WEBHOOK_URL = "https://n8n.simpleexel.io/webhook/85afd7b0-935b-4245-8d79-4ee4c397f723";

export function BuyerMultistepForm({ formType = "nominee-buyers" }: { formType?: BuyerLandingFormType }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BuyerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof BuyerFormData, string>>>({});

  const updateFormData = <K extends keyof BuyerFormData>(field: K, value: BuyerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: number) => {
    const fields = stepFields[step];
    const stepSchema =
      step === 2
        ? buyerFormBaseSchema
            .pick({
              gdprConsent: true,
              privacyConsent: true,
              marketingConsent: true,
            })
            .superRefine((data, ctx) => {
              if (!data.gdprConsent) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "GDPR consent is required for UK/EU leads",
                  path: ["gdprConsent"],
                });
              }
              if (!data.privacyConsent) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "You must agree to the privacy policy and terms of service",
                  path: ["privacyConsent"],
                });
              }
            })
        : step === 1
          ? buyerFormBaseSchema.pick({ email: true, confirmEmail: true }).superRefine((data, ctx) => {
              if (data.email !== data.confirmEmail) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "Email addresses do not match",
                  path: ["confirmEmail"],
                });
              }
            })
          : buyerFormBaseSchema.pick({ firstName: true, lastName: true, phoneNumber: true });

    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      const nextErrors: Partial<Record<keyof BuyerFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof BuyerFormData;
        if (fields.includes(field) && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    const fullResult = buyerFormSchema.safeParse(formData);
    if (!fullResult.success) {
      toast({
        title: "Error",
        description: "Please review your details and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...fullResult.data,
        formType,
      };
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Failed to submit form: ${response.status} ${errorText}`);
      }

      const windowWithDataLayer = window as Window & { dataLayer?: Array<Record<string, string>> };
      windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
      windowWithDataLayer.dataLayer.push({ event: "lead_submit_success" });

      navigate("/thank-you-buyer");
    } catch {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    const fields = stepFields[currentStep];
    return fields.every((field) => {
      if (field === "gdprConsent" || field === "privacyConsent") {
        return formData[field];
      }
      if (field === "marketingConsent") return true;
      const value = formData[field];
      return typeof value === "string" ? value.trim() !== "" : true;
    });
  };

  const inputClassName =
    "h-11 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary";

  return (
    <div className="mx-auto w-full max-w-xl py-4">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2 flex justify-between">
          {steps.map((step, index) => (
            <motion.div key={step.id} className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
              <motion.button
                type="button"
                aria-label={`Go to step ${index + 1}: ${step.title}`}
                aria-current={index === currentStep ? "step" : undefined}
                className={cn(
                  "h-4 w-4 rounded-full transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                      ? "bg-primary ring-4 ring-primary/20"
                      : "bg-muted",
                )}
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
                whileTap={{ scale: 0.95 }}
              />
              <span
                className={cn(
                  "mt-1.5 hidden text-xs sm:block",
                  index === currentStep ? "font-medium text-primary" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card className="overflow-hidden rounded-3xl border shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
            >
              {currentStep === 0 && (
                <>
                  <CardHeader>
                    <CardTitle>Contact details</CardTitle>
                    <CardDescription>Use the same details you want us to contact you on.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          className={inputClassName}
                        />
                        {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          className={inputClassName}
                        />
                        {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                      </motion.div>
                    </div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+44 20 1234 5678"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                    </motion.div>
                  </CardContent>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Email address</CardTitle>
                    <CardDescription>We&apos;ll use this to confirm your registration and send next steps.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="confirmEmail">Confirm Email Address</Label>
                      <Input
                        id="confirmEmail"
                        type="email"
                        placeholder="Confirm your email address"
                        value={formData.confirmEmail}
                        onChange={(e) => updateFormData("confirmEmail", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.confirmEmail && <p className="text-sm text-destructive">{errors.confirmEmail}</p>}
                    </motion.div>
                  </CardContent>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Privacy & consent</CardTitle>
                    <CardDescription>Please review and confirm before submitting your registration.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div
                      variants={fadeInUp}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-4"
                    >
                      <Checkbox
                        id="gdprConsent"
                        checked={formData.gdprConsent}
                        onCheckedChange={(checked) => updateFormData("gdprConsent", checked === true)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="gdprConsent" className="cursor-pointer text-sm leading-relaxed">
                          I consent to the processing of my personal data under GDPR requirements (required for UK/EU
                          leads). *
                        </Label>
                        {errors.gdprConsent && <p className="text-sm text-destructive">{errors.gdprConsent}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-4"
                    >
                      <Checkbox
                        id="privacyConsent"
                        checked={formData.privacyConsent}
                        onCheckedChange={(checked) => updateFormData("privacyConsent", checked === true)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="privacyConsent" className="cursor-pointer text-sm leading-relaxed">
                          I agree to the processing of my personal data as outlined in the{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Terms of Service
                          </a>
                          . *
                        </Label>
                        {errors.privacyConsent && <p className="text-sm text-destructive">{errors.privacyConsent}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-4"
                    >
                      <Checkbox
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => updateFormData("marketingConsent", checked === true)}
                      />
                      <Label htmlFor="marketingConsent" className="cursor-pointer text-sm leading-relaxed">
                        I consent to receiving marketing communications and analytics tracking (optional)
                      </Label>
                    </motion.div>

                    <p className="text-xs text-muted-foreground">
                      Your data will be processed securely and will only be shared with our trusted business formation
                      partners.
                    </p>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm text-muted-foreground">
                        Once submitted, our team reviews your details and contacts you with the next onboarding steps.
                      </p>
                    </div>
                  </CardContent>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <CardFooter className="flex justify-between pb-6 pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1 rounded-2xl"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                disabled={!isStepValid() || isSubmitting}
                className="flex items-center gap-1 rounded-2xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    {currentStep === steps.length - 1 ? "Submit Registration" : "Next"}
                    {currentStep === steps.length - 1 ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.p
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.p>
    </div>
  );
}
