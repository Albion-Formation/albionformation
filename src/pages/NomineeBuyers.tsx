import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { CheckCircle2, CircleOff, FileCheck2, Landmark, ShieldCheck, Users } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  confirmEmail: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  dobMonth: z.string().min(1, "Month is required"),
  dobDate: z.string().min(1, "Date is required"),
  dobYear: z.string().min(1, "Year is required"),
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

const NomineeBuyers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const buyerProfile = [
    "Non-UK founders who need a UK-resident director presence",
    "Business owners seeking privacy on public records",
    "Companies preparing for UK banking and partner due diligence",
  ];

  const includedItems = [
    "Dedicated nominee director arrangement",
    "Legal documentation pack (Trust, POA, service agreements)",
    "Compliance-first onboarding and support",
  ];

  const notForItems = [
    "Use cases that require hidden beneficial ownership",
    "Applicants unwilling to complete KYC and identity checks",
    "Businesses seeking non-compliant or anonymous structures",
  ];

  const faqItems = [
    {
      question: "Am I committing to purchase by submitting this form?",
      answer:
        "No. This is a registration and eligibility step. Our team reviews your details first, then confirms suitable service options before any final commitment.",
    },
    {
      question: "How long does the review and onboarding process take?",
      answer:
        "Most cases are reviewed quickly, and compliant onboarding can begin within 24 hours depending on document readiness and KYC checks.",
    },
    {
      question: "Will my ownership remain compliant and documented?",
      answer:
        "Yes. Nominee arrangements are handled with proper legal documentation and regulatory compliance checks, including identity verification requirements.",
    },
    {
      question: "What happens after I complete registration?",
      answer:
        "You receive follow-up from our team for verification, next steps, and any required documentation to activate your nominee director service.",
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
      gdprConsent: false,
      privacyConsent: false,
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        dateOfBirth: `${data.dobYear}-${data.dobMonth}-${data.dobDate}`,
        formType: "nominee-buyers",
      } as const;
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));
      const response = await fetch("https://n8n.simpleexel.io/webhook/85afd7b0-935b-4245-8d79-4ee4c397f723", {
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
      
      // Trigger GTM event on successful submission
      const windowWithDataLayer = window as Window & { dataLayer?: Array<Record<string, string>> };
      windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
      windowWithDataLayer.dataLayer.push({
        event: "lead_submit_success"
      });
      
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

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card px-6 py-10 shadow-sm lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe_0%,transparent_58%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-primary" />
              For businesses
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Who is a nominee buyer, and what are you registering for?
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
              A nominee buyer is a business owner or founder requesting a nominee director service.
              This registration starts your compliance review and service setup process.
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
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Who this is for</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {buyerProfile.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-2xl border-border/70 p-6 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <FileCheck2 className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">What you get after registering</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {includedItems.map((item) => (
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
              {notForItems.map((item) => (
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
            <Landmark className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">1. Registration review</p>
              <p className="text-sm text-muted-foreground">We review your submitted details and business context.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">2. Compliance checks</p>
              <p className="text-sm text-muted-foreground">KYC/AML checks are completed before any appointment steps.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">3. Service activation</p>
              <p className="text-sm text-muted-foreground">You receive the next steps and required service documentation.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Quick answers before you continue registration.
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
          <h2 className="text-3xl font-bold text-foreground">Start your nominee buyer registration</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Complete the form below to begin. It takes a few minutes and helps us place you in the right setup flow.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Contact details</h3>
                <p className="mt-1 text-sm text-muted-foreground">Use the same details you want us to contact you on.</p>

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
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
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
                            {Array.from({ length: 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </SelectItem>
                            ))}
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
                              return (
                                <SelectItem key={year} value={String(year)}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="text-sm text-muted-foreground">For example 07 14 1971</p>
              </div>

              <div className="space-y-6 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Privacy & consent</h3>
                
                <FormField
                  control={form.control}
                  name="gdprConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I agree to the processing of my personal data as outlined in the{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          {" "}and{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Terms of Service
                          </a>
                          . *
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
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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
                  Once submitted, our team reviews your details and contacts you with the next onboarding steps.
                </p>
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NomineeBuyers;
