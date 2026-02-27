import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
  marketingConsent: z.boolean().default(false),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses do not match",
  path: ["confirmEmail"],
});

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      privacyConsent: false,
      marketingConsent: false,
    },
  });

  const beenDirectorBefore = form.watch("beenDirectorBefore");

  const onSubmit = async (data: FormData) => {
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
      const response = await fetch("https://n8n.simpleexel.io/webhook-test/72b01675-be27-4d4d-91b5-b182e10d79d5", {
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
      
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "lead_submit_success" });
      
      navigate("/thank-you");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Nominee Director Application
          </h1>
          <p className="text-lg text-muted-foreground">
            Please fill out your information to get started
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
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
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 20 1234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
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
                      <Input placeholder="Confirm your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <div className="space-y-4">
                <FormLabel className="text-base font-medium">What's your date of birth?</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dobMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                            <SelectTrigger>
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
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-foreground">Director Experience</h3>

                {/* Been a director before? */}
                <FormField
                  control={form.control}
                  name="beenDirectorBefore"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Have you been a director before?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="director-yes" />
                            <label htmlFor="director-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                      <FormItem className="space-y-3 ml-4 p-4 bg-muted/50 rounded-md border border-border">
                        <FormLabel>Do you have a Gov UK One Login?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="govuk-yes" />
                              <label htmlFor="govuk-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
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
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="current-yes" />
                            <label htmlFor="current-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="100-300" id="credit-low" />
                            <label htmlFor="credit-low" className="text-sm">100–300</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="301-600" id="credit-mid" />
                            <label htmlFor="credit-mid" className="text-sm">301–600</label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="clearscore-yes" />
                            <label htmlFor="clearscore-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="morning" id="time-morning" />
                            <label htmlFor="time-morning" className="text-sm">Morning</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="midday" id="time-midday" />
                            <label htmlFor="time-midday" className="text-sm">Midday</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="afternoon" id="time-afternoon" />
                            <label htmlFor="time-afternoon" className="text-sm">Afternoon</label>
                          </div>
                          <div className="flex items-center space-x-2">
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

              {/* Privacy & Consent */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-foreground">Privacy & Consent</h3>
                
                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
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

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Apply;
