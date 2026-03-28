import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleOff,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  confirmEmail: z.string().trim().email("Invalid email address").max(255),
  dobMonth: z.string().min(1, "Month is required"),
  dobDate: z.string().min(1, "Date is required"),
  dobYear: z.string().min(1, "Year is required"),
  beenDirectorBefore: z.string().min(1, "This field is required"),
  hasGovUKLogin: z.string().optional(),
  currentlyDirector: z.string().min(1, "This field is required"),
  creditScoreRange: z.string().min(1, "Please select your credit score range"),
  hasClearScoreAccount: z.string().min(1, "This field is required"),
  preferredContactTime: z.string().min(1, "Please select a preferred contact time"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "GDPR consent is required for UK/EU leads",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
  marketingConsent: z.boolean().default(false),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses do not match",
  path: ["confirmEmail"],
});

type FormData = z.infer<typeof formSchema>;
const APPLY_WEBHOOK_URL = "https://n8n.simpleexel.io/webhook/8ad3fd29-3f79-4386-bffe-1e53f1f314dc";

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const applicantProfile = [
    "Professionals seeking nominee director opportunities",
    "Applicants comfortable with formal KYC and compliance checks",
    "Individuals ready to act within a structured legal framework",
  ];

  const applicantExpectations = [
    "Guided screening and onboarding review",
    "Clear service expectations and eligibility checks",
    "Support through documentation and next-step activation",
  ];

  const notSuitableFor = [
    "Applicants looking for non-compliant or anonymous arrangements",
    "Individuals unwilling to complete identity verification",
    "Profiles that cannot meet regulatory onboarding standards",
  ];

  const faqItems = [
    {
      question: "Is this an instant approval form?",
      answer:
        "No. This form starts your nominee director application review. Our team verifies your details and suitability before progressing.",
    },
    {
      question: "Why do you ask about director history and credit profile?",
      answer:
        "These questions help us assess role fit, reliability, and compliance readiness in line with service and regulatory requirements.",
    },
    {
      question: "How quickly will I hear back?",
      answer:
        "Most applicants receive an update quickly after submitting complete information, often within one business day.",
    },
    {
      question: "What happens after I submit?",
      answer:
        "You move into screening and verification. If eligible, you receive next-step guidance and onboarding instructions from our team.",
    },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      dobMonth: "",
      dobDate: "",
      dobYear: "",
      beenDirectorBefore: "",
      hasGovUKLogin: "",
      currentlyDirector: "",
      creditScoreRange: "",
      hasClearScoreAccount: "",
      preferredContactTime: "",
      gdprConsent: false,
      privacyConsent: false,
      marketingConsent: false,
    },
  });

  const beenDirectorBefore = form.watch("beenDirectorBefore");

  const onSubmit = async (data: FormData) => {
    console.info("[Apply] onSubmit invoked");
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        dateOfBirth: `${data.dobYear}-${data.dobMonth}-${data.dobDate}`,
      } as const;
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined) params.append(k, String(v));
      });
      console.info("[Apply] Calling webhook", {
        url: APPLY_WEBHOOK_URL,
        encodedBodyLength: params.toString().length,
      });
      const response = await fetch(APPLY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
      });
      console.info("[Apply] Webhook response received", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error("[Apply] Webhook request failed", { status: response.status, errorText });
        throw new Error(`Failed to submit form: ${response.status} ${errorText}`);
      }
      
      const windowWithDataLayer = window as Window & { dataLayer?: Array<Record<string, string>> };
      windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
      windowWithDataLayer.dataLayer.push({ event: "lead_submit_success" });
      
      console.info("[Apply] Submission succeeded, navigating to thank-you");
      navigate("/thank-you");
    } catch (error) {
      console.error("[Apply] Submission error", error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.info("[Apply] Submit flow finished");
    }
  };

  const onInvalidSubmit = (errors: FieldErrors<FormData>) => {
    console.warn("[Apply] Form validation failed", errors);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card px-6 py-10 shadow-sm lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe_0%,transparent_58%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" />
              For professionals
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Applying as a nominee director? Here is what to expect.
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
              This application is for professionals who want to be considered for nominee director roles.
              We use your details to assess suitability, compliance readiness, and onboarding fit.
            </p>
            <Button
              type="button"
              onClick={scrollToForm}
              className="mt-6 h-11 rounded-xl px-6 text-sm font-semibold"
            >
              Start Application
            </Button>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <Card className="rounded-2xl border-border/70 p-6 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Who this is for</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {applicantProfile.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-2xl border-border/70 p-6 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">What to expect</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {applicantExpectations.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-2xl border-border/70 p-6 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <CircleOff className="h-5 w-5 text-foreground/80" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Not suitable for</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {notSuitableFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <CircleOff className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="mt-8 grid gap-4 rounded-2xl border border-border/70 bg-secondary/30 p-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">1. Application review</p>
              <p className="text-sm text-muted-foreground">We review your profile and director background details.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">2. Compliance verification</p>
              <p className="text-sm text-muted-foreground">Identity and regulatory checks are completed before approval.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BadgeCheck className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">3. Onboarding steps</p>
              <p className="text-sm text-muted-foreground">Eligible applicants receive role details and next actions.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Quick answers before you continue your nominee director application.
            </p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-background p-4 open:bg-secondary/20"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-foreground">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div id="application-form" className="mb-8 mt-10 text-center scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground">Start your nominee director application</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Complete the form below to begin your review. Accurate details help us process your application faster.
          </p>
        </div>

        <div className="mx-auto max-w-full rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-8">
              <div className="rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Contact details</h3>
                <p className="mt-1 text-sm text-muted-foreground">Use details that match your identity and screening records.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input className="h-11" placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input className="h-11" placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

                <div className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="+44 20 1234 5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Email Address</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="Confirm your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-4 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <FormLabel className="text-base font-semibold">Date of birth</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dobMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const val = String(i + 1).padStart(2, '0');
                              return <SelectItem key={val} value={val}>{val}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dobDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="DD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => {
                              const val = String(i + 1).padStart(2, '0');
                              return <SelectItem key={val} value={val}>{val}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dobYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return <SelectItem key={year} value={String(year)}>{year}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Director Experience Section */}
              <div className="space-y-6 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Director Experience</h3>

                {/* Been a director before? */}
                <FormField
                  control={form.control}
                  name="beenDirectorBefore"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Have you been a director before?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="yes" id="director-yes" />
                            <label htmlFor="director-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="no" id="director-no" />
                            <label htmlFor="director-no" className="text-sm">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditional: Gov UK One Login */}
                {beenDirectorBefore === "yes" && (
                  <FormField
                    control={form.control}
                    name="hasGovUKLogin"
                    render={({ field }) => (
                      <FormItem className="space-y-3 rounded-lg border border-border bg-background p-4">
                        <FormLabel>Do you have a Gov UK One Login?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                              <RadioGroupItem value="yes" id="govuk-yes" />
                              <label htmlFor="govuk-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                              <RadioGroupItem value="no" id="govuk-no" />
                              <label htmlFor="govuk-no" className="text-sm">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Currently a director? */}
                <FormField
                  control={form.control}
                  name="currentlyDirector"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Are you currently a Director?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="yes" id="current-yes" />
                            <label htmlFor="current-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="no" id="current-no" />
                            <label htmlFor="current-no" className="text-sm">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Credit Score */}
                <FormField
                  control={form.control}
                  name="creditScoreRange"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Do you have a good credit score?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="100-300" id="credit-low" />
                            <label htmlFor="credit-low" className="text-sm">100–300</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="301-600" id="credit-mid" />
                            <label htmlFor="credit-mid" className="text-sm">301–600</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="601-999" id="credit-high" />
                            <label htmlFor="credit-high" className="text-sm">601–999</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ClearScore Account */}
                <FormField
                  control={form.control}
                  name="hasClearScoreAccount"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Do you have a ClearScore account?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="yes" id="clearscore-yes" />
                            <label htmlFor="clearscore-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="no" id="clearscore-no" />
                            <label htmlFor="clearscore-no" className="text-sm">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Contact Time */}
                <FormField
                  control={form.control}
                  name="preferredContactTime"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What time is best to contact you?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="morning" id="time-morning" />
                            <label htmlFor="time-morning" className="text-sm">Morning</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="midday" id="time-midday" />
                            <label htmlFor="time-midday" className="text-sm">Midday</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="afternoon" id="time-afternoon" />
                            <label htmlFor="time-afternoon" className="text-sm">Afternoon</label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                            <RadioGroupItem value="evening" id="time-evening" />
                            <label htmlFor="time-evening" className="text-sm">Evening</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Privacy & consent</h3>
                
                <FormField
                  control={form.control}
                  name="gdprConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I consent to the processing of my personal data under GDPR requirements (required for UK/EU leads). *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I agree to the processing of my personal data as outlined in the{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
                          {" "}and{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a>. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I consent to receiving marketing communications and analytics tracking (optional)
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <p className="text-xs text-muted-foreground">
                  Your data will be processed securely and will only be shared with our trusted business formation partners.
                </p>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  Submission places your profile into compliance review and suitability assessment for nominee director opportunities.
                </p>
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
