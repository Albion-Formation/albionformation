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
import { CheckCircle2, CircleOff, FileCheck2, Landmark, ShieldCheck, Users, Building2, Banknote, Headphones, Lock, Zap } from "lucide-react";

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
      
      navigate("/thank-you-buyer");
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

      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.08)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium text-primary-foreground/90 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-success" />
                Trusted by 2,000+ Businesses Across 40+ Countries
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Get Your UK Nominee Director Within 24 Hours
              </h1>

              <p className="mt-6 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
                Launch and operate your UK company with confidence using a trusted UK resident nominee director service designed for international founders, ecommerce brands, agencies, fintech startups, and overseas business owners who need a stronger UK business presence.
              </p>

              <div className="mt-8 flex flex-wrap gap-8 sm:gap-12">
                <div className="border-l-2 border-primary-foreground/20 pl-4">
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/60">Flat Annual Fee</p>
                  <p className="mt-1 text-2xl font-bold sm:text-3xl">£1,000<span className="text-base font-medium text-primary-foreground/70">/year</span></p>
                </div>
                <div className="border-l-2 border-primary-foreground/20 pl-4">
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/60">Setup Time</p>
                  <p className="mt-1 text-2xl font-bold sm:text-3xl">Within 24 Hours</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  onClick={scrollToForm}
                  className="h-12 rounded-2xl bg-background px-6 text-sm font-semibold text-foreground hover:bg-background/90"
                >
                  Get Your Nominee Director
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-4 backdrop-blur-sm sm:p-6">
              <div className="space-y-3">
                {[
                  { icon: Building2, title: "UK Resident Director", desc: "Real British resident director appointed to your company" },
                  { icon: Banknote, title: "Banking & Credibility", desc: "Improve your UK business presence for platforms and providers" },
                  { icon: Headphones, title: "Dedicated Support", desc: "Speak with our support team anytime you need help" },
                  { icon: Lock, title: "Privacy Protection", desc: "Protect your identity while maintaining company control" },
                  { icon: Zap, title: "Fast Setup", desc: "Appointments completed within 24 hours" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-4 transition-colors hover:bg-primary-foreground/[0.08] sm:p-5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-primary-foreground">{title}</h3>
                      <p className="mt-1 text-sm text-primary-foreground/70">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Trust Us */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Why Businesses Trust Us</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything International Founders Actually Need</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "UK Presence", desc: "Build stronger trust with payment providers, clients, and international partners." },
              { title: "Fast Appointment", desc: "Get your nominee director appointed in as little as 24 hours." },
              { title: "Founder Privacy", desc: "Keep your personal details more private while maintaining ownership." },
              { title: "24/7 Support", desc: "Our team stays available whenever you need guidance or assistance." },
              { title: "What Clients Say", desc: "Over 2,000 businesses across 40+ countries trust our services." },
              { title: "Custom Matching", desc: "Need a certain profile? We can match gender and age preferences." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-primary-foreground/70">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a UK nominee director */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">What is a UK Nominee Director?</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Why International Founders Use Nominee Directors</h2>
              <div className="mt-6 space-y-4 text-base text-muted-foreground">
                <p>
                  Many international founders want to open and operate a UK company but face challenges with banking, credibility, payment processors, platform verification, or establishing a proper UK business presence. A nominee director helps solve this. We appoint a trusted UK resident director to your company while you continue running and owning the business behind the scenes.
                </p>
                <p>
                  This is commonly used by ecommerce sellers, agency owners, fintech founders, Amazon sellers, consultants, startup founders, and international entrepreneurs expanding into the UK market.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8 lg:self-center">
              <ul className="space-y-4 text-sm text-foreground">
                {[
                  "You keep full operational control of your business",
                  "Your nominee is a real UK resident British citizen",
                  "Better UK presence for platforms and providers",
                  "Fast turnaround and responsive support",
                  "Structured for international business owners",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Than Just a Nominee Appointment */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">More Than Just A Nominee Appointment</h2>
            <p className="mt-5 text-base text-primary-foreground/75">
              Most providers simply appoint a name to your company and disappear. We built our service around long term support, speed, trust, and helping international founders actually operate smoothly in the UK.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { title: "Built For Global Founders", desc: "Created specifically for non UK residents expanding internationally." },
              { title: "Responsive Human Support", desc: "Speak directly with a real team that understands international business." },
              { title: "Fast Turnaround", desc: "No unnecessary delays. Priority processing available for urgent requests." },
              { title: "Flexible Nominee Matching", desc: "Request nominee preferences based on your business requirements." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6 sm:p-8">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-primary-foreground/70">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary text-primary-foreground border-t border-primary-foreground/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">How It Works</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Four Simple Steps</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Consultation", desc: "Tell us about your business, industry, and what you need the nominee structure for." },
              { n: "02", title: "Compliance Review", desc: "We review your application and prepare your appointment documents." },
              { n: "03", title: "Director Appointment", desc: "Your nominee director is officially appointed to your UK company." },
              { n: "04", title: "Documentation Delivery", desc: "Receive all supporting documents and ongoing support from our team." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6">
                <p className="text-3xl font-bold text-primary-foreground/40">{s.n}</p>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-primary-foreground/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Duties of a UK Nominee Director */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Duties of a UK Nominee Director</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Professional Responsibilities Designed To Protect Your Business</h2>
            <p className="mt-5 text-base text-primary-foreground/75">
              A UK nominee director has clearly defined responsibilities designed to support the company structure while protecting the interests of the beneficial owner. Every appointment is handled professionally, confidentially, and with clear boundaries.
            </p>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                n: "01",
                title: "Statutory Compliance",
                desc: "The nominee director helps ensure the company maintains proper statutory obligations and remains in good standing.",
                tags: [
                  "Maintaining accurate company records and registers",
                  "Filing annual returns and confirmation statements",
                  "Supporting accounts and tax filing coordination",
                  "Helping maintain proper UK corporate governance standards",
                ],
              },
              {
                n: "02",
                title: "Non Interference In Daily Operations",
                desc: "Your nominee director does not manage your day to day operations, control your staff, handle your internal business activities, or interfere with decision making. You remain fully in control of the company while the nominee appointment supports your UK business presence.",
              },
              {
                n: "03",
                title: "Fiduciary Duties",
                desc: "Nominee directors act professionally, ethically, and in good faith while respecting the structure agreed with the beneficial owner.",
                tags: [
                  "Acting in the best interests of the company",
                  "Avoiding conflicts of interest",
                  "Respecting applicable UK regulations and frameworks",
                ],
              },
              {
                n: "04",
                title: "Confidentiality & Privacy Protection",
                desc: "Confidentiality is a major reason many international founders use nominee services. Your information and business structure are handled discreetly with secure agreements and strict internal privacy standards designed to protect sensitive details.",
              },
            ].map((d) => (
              <div key={d.n} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <p className="text-2xl font-bold text-primary-foreground/40">{d.n}</p>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{d.title}</h3>
                    <p className="mt-3 text-sm text-primary-foreground/75">{d.desc}</p>
                    {d.tags && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {d.tags.map((t) => (
                          <div key={t} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.04] px-4 py-3 text-xs text-primary-foreground/85 sm:text-sm">
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Accreditation */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trust & Accreditation</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Appoint Your UK Nominee Director With Confidence</h2>
            <p className="mt-5 text-base text-muted-foreground">
              Albion Formation ensures your UK nominee director appointment is handled securely, professionally, and with complete attention to privacy. Every step of the process is structured to protect both your business and your personal information while giving you confidence in the service you are receiving.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "HMRC Compliant & Legal", desc: "We adhere to Companies House and HMRC standards for nominee director appointments, agreements, and filings to ensure your structure is professionally handled." },
              { icon: FileCheck2, title: "ICO Registered", desc: "Your company and personal data are protected under UK data protection regulations with strict internal confidentiality standards." },
              { icon: Landmark, title: "Professional Indemnity Insurance", desc: "Our services are backed by professional accountability and structured operational standards for added peace of mind." },
              { icon: Lock, title: "Secure & Protected Payments", desc: "All transactions are processed through secure encrypted payment systems designed to protect your information at every stage." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Client Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trusted Worldwide</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { quote: "We needed a UK director urgently and everything was completed in less than 24 hours.", name: "Verified Client", role: "International Business Owner" },
              { quote: "The process was smooth, professional, and the legal protection gave us confidence.", name: "Verified Client", role: "International Business Owner" },
              { quote: "Very responsive support team. Better experience than every other provider we contacted.", name: "Verified Client", role: "International Business Owner" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6 sm:p-8">
                <p className="text-sm text-primary-foreground/85">"{t.quote}"</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-primary-foreground/60">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div id="application-form" className="mb-8 mt-10 text-center scroll-mt-24">

          <h2 className="text-3xl font-bold text-foreground">To place an order, complete the form below</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We will get back to you shortly to complete your order
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

      {/* Nominee Director FAQs */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Frequently Asked Questions</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Nominee Director FAQs</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is a UK nominee director and how do they work?", a: "A nominee director is a UK resident individual appointed to your company while you continue owning and operating the business behind the scenes." },
              { q: "Can I use a nominee director for my UK limited company?", a: "Yes. Nominee director services are commonly used by international founders operating UK limited companies." },
              { q: "What are the legal responsibilities of a UK nominee director?", a: "The nominee director helps support statutory obligations while respecting the agreed structure between both parties." },
              { q: "How much does it cost to hire a UK nominee director in the UK?", a: "Our nominee director service is offered at a flat £1,000 yearly fee." },
              { q: "How do I choose a reliable UK nominee provider?", a: "Look for providers with real UK resident nominees, strong reviews, legal documentation, responsive support, and transparent communication." },
              { q: "Can nominees access company bank accounts?", a: "No. Nominees do not automatically gain access to your business bank account." },
              { q: "Do nominees control the company?", a: "No. You remain the beneficial owner and maintain operational control over the business." },
              { q: "How is confidentiality maintained?", a: "We use strict confidentiality processes and secure nominee agreements to protect sensitive information." },
              { q: "Can I end the agreement early?", a: "Yes. Nominee arrangements can be reviewed, replaced, or terminated based on agreed terms." },
              { q: "Who appears on Companies House records?", a: "The appointed nominee director appears publicly as the company director." },
              { q: "Can I change nominees later?", a: "Yes. Director appointments can be updated if your business needs change." },
              { q: "Are nominee services safe for investors?", a: "When structured correctly with proper documentation and trustworthy providers, nominee services are widely used internationally." },
              { q: "Can a nominee open a UK bank account?", a: "This depends on the bank and the structure of the business relationship." },
              { q: "Can I combine this with a registered office address?", a: "Yes. Many clients combine nominee services with registered office and mail handling services." },
              { q: "What happens if I fail to renew my service?", a: "The nominee appointment may be resigned or removed if renewal terms are not maintained." },
              { q: "Do you provide PSC register support?", a: "Yes. We assist clients in understanding PSC related requirements where applicable." },
              { q: "What is included in compliance monitoring?", a: "Support may include appointment maintenance, annual reminders, and structure guidance." },
              { q: "Can I combine nominee director and shareholder services?", a: "Yes. Additional nominee services may be available depending on your structure requirements." },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card p-5 open:bg-secondary/30 sm:p-6"
              >
                <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-foreground">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-background px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Start Your UK Company Setup Today</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Get Your UK Nominee Director Within 24 Hours
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
              Whether you're launching an ecommerce brand, scaling your agency, opening a fintech company, or expanding internationally, our nominee director service helps you establish a stronger UK business presence quickly and professionally.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={scrollToForm}
                className="h-12 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get Your Nominee Director Now
              </Button>
              <Button
                type="button"
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-2xl border-2 border-border bg-background px-6 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                <a href="mailto:support@albionformation.com">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default NomineeBuyers;
