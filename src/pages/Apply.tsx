import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  Banknote,
  Building2,
  CheckCircle2,
  ClipboardList,
  Flag,
  Plus,
  X,
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

const SIGNUP_BENEFITS_GRID = [
  {
    num: "01",
    title: "Earn on the Side — Without a Second Job",
    body: "Bring in supplementary income each month without changing your routine, leaving your job, or taking on extra work.",
  },
  {
    num: "02",
    title: "We Handle All the Paperwork For You",
    body: "Every agreement, every document — prepared, explained, and walked through by our team before you sign a single thing.",
  },
  {
    num: "03",
    title: "You\u2019re Covered — Every Step of the Way",
    body: "Binding agreements clearly outline exactly what you are — and aren\u2019t — responsible for. You never go in blind.",
  },
  {
    num: "04",
    title: "No Office. No Meetings. No Daily Tasks.",
    body: "There is nothing to manage on a day-to-day basis. The business owner handles all operations. You simply stay listed.",
  },
  {
    num: "05",
    title: "Never Been a Director Before? Perfect.",
    body: "This role was designed for everyday UK residents, not business professionals. If you live in the UK, you could already qualify.",
  },
  {
    num: "06",
    title: "A Real Person Guides You From Day One",
    body: "No chatbots. No FAQ loops. A dedicated member of our UK team walks you through everything personally.",
  },
] as const;

const ELIGIBILITY_QUALIFY: { title: string; subtitle: string }[] = [
  {
    title: "A UK resident",
    subtitle: "Anywhere in England, Scotland, Wales or Northern Ireland",
  },
  {
    title: "Aged 18 or over",
    subtitle: "No upper age limit",
  },
  {
    title: "Looking for passive income that fits your lifestyle",
    subtitle: "Employed, self-employed, retired — all welcome",
  },
  {
    title: "Happy to sign a fully documented agreement",
    subtitle: "Our team explains every detail before you commit to anything",
  },
  {
    title: "Have a valid UK address",
    subtitle: "For official correspondence only",
  },
];

const ELIGIBILITY_DONT_NEED: { title: string; subtitle: string }[] = [
  {
    title: "Any business or director experience",
    subtitle: "Designed for everyday people, not professionals",
  },
  {
    title: "To manage or operate the company",
    subtitle: "The owner handles 100% of that",
  },
  {
    title: "To attend meetings or be available daily",
    subtitle: "No time commitment after initial set-up",
  },
  {
    title: "To leave or change your current job",
    subtitle: "This works alongside anything you\u2019re already doing",
  },
  {
    title: "To travel or relocate",
    subtitle: "Your existing UK address is everything you need",
  },
];

const SIMPLE_PROCESS_STEPS = [
  {
    num: 1,
    title: "You Apply",
    body: "Fill in our short form. Takes under 2 minutes. No documents needed yet.",
  },
  {
    num: 2,
    title: "We Call You",
    body: "Our team rings you to confirm eligibility and answer every question you have.",
  },
  {
    num: 3,
    title: "You\u2019re Matched",
    body: "We connect you with a verified international business that needs a UK director.",
  },
  {
    num: 4,
    title: "Docs Are Signed",
    body: "Full agreements drawn up and explained. You sign only when you\u2019re fully happy.",
  },
  {
    num: 5,
    title: "You Start Earning",
    body: "Your compensation begins. The business owner runs everything from here.",
  },
] as const;

/** Trims and strips surrounding quotes — ad tools sometimes paste `source="googleads"` literally. */
function normalizeQueryParamValue(raw: string | null): string | undefined {
  if (raw == null) return undefined;
  let s = raw.trim();
  if (!s) return undefined;
  while (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s.length > 0 ? s : undefined;
}

const Apply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstFaqRef = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    const el = firstFaqRef.current;
    if (el) el.open = true;
  }, []);

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const attribution = useMemo(() => {
    const search = location.search ?? "";
    const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const get = (key: string) => normalizeQueryParamValue(q.get(key));

    // Common ad/analytics identifiers and UTMs.
    const source = get("source") ?? get("utm_source");
    return {
      source,
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_content: get("utm_content"),
      utm_term: get("utm_term"),
      fbclid: get("fbclid"),
      gclid: get("gclid"),
      msclkid: get("msclkid"),
      // Keep the raw query string for debugging/auditing.
      landing_query: search,
    } as const;
  }, [location.search]);

  const faqItems: { question: string; answer: string }[] = [
    {
      question: "What exactly is this opportunity?",
      answer:
        "Albion Formation connects UK residents with international companies that need a UK resident in a paid professional role. You are hired into that position. You do not run or manage anything. The company handles all operations. You simply hold the role and receive a passive income.",
    },
    {
      question: "Do I have to manage or run the company?",
      answer:
        "Absolutely not. The company handles 100% of operations. You do not attend meetings, make business decisions, or take on any day-to-day activities. Once the initial setup is complete, your involvement is minimal.",
    },
    {
      question: "How do I actually earn from this?",
      answer:
        "You receive a compensation payment for the professional role you hold. The exact amount is confirmed by our team during your eligibility call. Your income is entirely passive once the arrangement is in place.",
    },
    {
      question: "Is this a legitimate opportunity?",
      answer:
        "Yes. This is a widely used, recognised professional arrangement in the UK. Every arrangement through Albion Formation is fully documented. We always encourage applicants to take their time, ask every question, and review everything before making any commitment. There is never any pressure.",
    },
    {
      question: "What happens after I fill in the form?",
      answer:
        "Our UK team will call you within 1 business day for a friendly conversation to confirm your eligibility, explain the full opportunity, and answer every question you have. Zero obligation at this stage.",
    },
    {
      question: "What happens to my personal data?",
      answer:
        "All data submitted is processed in full compliance with UK GDPR. We only use it to contact you about this opportunity. We never share or sell your information to any third party.",
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
      // Snapshot at submit time so the webhook matches the browser address bar (avoids stale memo / odd router edge cases).
      const landingQuery = typeof window !== "undefined" ? window.location.search : "";
      const landingPageUrl = typeof window !== "undefined" ? window.location.href : "";
      const referrer = typeof document !== "undefined" ? document.referrer || "" : "";

      const payload = {
        ...data,
        dateOfBirth: `${data.dobYear}-${data.dobMonth}-${data.dobDate}`,
        ...attribution,
        landing_query: landingQuery,
        landing_page_url: landingPageUrl,
        referrer,
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
      windowWithDataLayer.dataLayer.push({
        event: "lead_submit_success",
        lead_source: attribution.source ?? "",
        utm_source: attribution.utm_source ?? "",
        utm_medium: attribution.utm_medium ?? "",
        utm_campaign: attribution.utm_campaign ?? "",
      });
      
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
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-primary text-primary-foreground shadow-lg">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(to_right,hsl(var(--primary-foreground)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.12)_1px,transparent_1px)] [background-size:36px_36px]"
            aria-hidden
          />
          <div className="relative z-[1] grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-14">
            <div className="lg:col-span-6">
              <div className="border-l-4 border-destructive bg-destructive/20 px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-primary-foreground/95 sm:text-base">
                  <span className="font-bold">Limited openings available.</span> We currently have a small number of
                  positions open. Once filled, applications close until the next intake.
                </p>
              </div>

              <h1 className="mt-8 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:max-w-none lg:text-5xl">
                <span className="block">Are You a UK Resident</span>
                <span className="mt-1 block font-bold italic text-primary-foreground">Looking For Extra Income?</span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/75 sm:text-lg lg:max-w-none">
                Albion Formation connects UK Residents with Businesses who are looking to hire qualified individuals for
                one of the most effortless earning opportunities available in the UK today.
              </p>

              <ul className="mt-8 max-w-lg space-y-3.5 text-[0.9375rem] sm:text-base lg:max-w-none">
                {[
                  "Work from home",
                  "No office, no commute, no daily commitment",
                  "Fits around your current job, retirement or lifestyle",
                  "No experience or qualifications required",
                  "Our team handles all the paperwork for you",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground" strokeWidth={2.25} aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={scrollToForm}
                className="mt-8 h-12 rounded-lg bg-background px-8 text-sm font-bold tracking-wide text-foreground hover:bg-background/90"
              >
                GET STARTED
              </Button>

              <blockquote className="mt-10 max-w-xl border-l-[3px] border-primary-foreground pl-5 sm:pl-6 lg:max-w-none">
                <p className="text-pretty text-[0.9375rem] italic leading-relaxed text-primary-foreground/75 sm:text-base">
                  &ldquo;I genuinely do nothing day to day, and a payment arrives regularly. The Albion team handled
                  everything from start to finish. Set up in days.&rdquo;
                </p>
                <footer className="mt-3 text-sm font-medium not-italic text-primary-foreground">
                  James T., Birmingham &middot; Joined 2024
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-primary-foreground/15 bg-background p-6 text-foreground shadow-lg sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Application form</p>
                <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                  Start your nominee director application
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete this form to submit instantly. It uses the same validation and submit flow.
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
                    className="mt-5 grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-11" placeholder="First name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-11" placeholder="Last name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-11" placeholder="Phone number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-11" placeholder="Email address" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmEmail"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormControl>
                            <Input className="h-11" placeholder="Confirm email address" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 rounded-xl border border-border/70 bg-background/70 p-4 sm:col-span-2">
                      <FormLabel className="text-base font-semibold">Date of birth</FormLabel>
                      <div className="grid grid-cols-3 gap-3">
                        <FormField
                          control={form.control}
                          name="dobMonth"
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="MM" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => {
                                    const val = String(i + 1).padStart(2, "0");
                                    return (
                                      <SelectItem key={val} value={val}>
                                        {val}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dobDate"
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="DD" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 31 }, (_, i) => {
                                    const val = String(i + 1).padStart(2, "0");
                                    return (
                                      <SelectItem key={val} value={val}>
                                        {val}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dobYear"
                          render={({ field }) => (
                            <FormItem>
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
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 rounded-xl border border-border/70 bg-background/70 p-4 sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="beenDirectorBefore"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Have you been a director before?</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="yes" id="hero-director-yes" />
                                  <label htmlFor="hero-director-yes" className="text-sm">
                                    Yes
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="no" id="hero-director-no" />
                                  <label htmlFor="hero-director-no" className="text-sm">
                                    No
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {beenDirectorBefore === "yes" && (
                        <FormField
                          control={form.control}
                          name="hasGovUKLogin"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Do you have a Gov UK One Login?</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                  <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                    <RadioGroupItem value="yes" id="hero-govuk-yes" />
                                    <label htmlFor="hero-govuk-yes" className="text-sm">
                                      Yes
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                    <RadioGroupItem value="no" id="hero-govuk-no" />
                                    <label htmlFor="hero-govuk-no" className="text-sm">
                                      No
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="currentlyDirector"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Are you currently a Director?</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="yes" id="hero-current-yes" />
                                  <label htmlFor="hero-current-yes" className="text-sm">
                                    Yes
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="no" id="hero-current-no" />
                                  <label htmlFor="hero-current-no" className="text-sm">
                                    No
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="creditScoreRange"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Do you have a good credit score?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
                              >
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="100-300" id="hero-credit-low" />
                                  <label htmlFor="hero-credit-low" className="text-sm">
                                    100-300
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="301-600" id="hero-credit-mid" />
                                  <label htmlFor="hero-credit-mid" className="text-sm">
                                    301-600
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="601-999" id="hero-credit-high" />
                                  <label htmlFor="hero-credit-high" className="text-sm">
                                    601-999
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasClearScoreAccount"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Do you have a ClearScore account?</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="yes" id="hero-clearscore-yes" />
                                  <label htmlFor="hero-clearscore-yes" className="text-sm">
                                    Yes
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="no" id="hero-clearscore-no" />
                                  <label htmlFor="hero-clearscore-no" className="text-sm">
                                    No
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredContactTime"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>What time is best to contact you?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
                              >
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="morning" id="hero-time-morning" />
                                  <label htmlFor="hero-time-morning" className="text-sm">
                                    Morning
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="midday" id="hero-time-midday" />
                                  <label htmlFor="hero-time-midday" className="text-sm">
                                    Midday
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="afternoon" id="hero-time-afternoon" />
                                  <label htmlFor="hero-time-afternoon" className="text-sm">
                                    Afternoon
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2">
                                  <RadioGroupItem value="evening" id="hero-time-evening" />
                                  <label htmlFor="hero-time-evening" className="text-sm">
                                    Evening
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-3 rounded-xl border border-border/70 bg-background/70 p-4 sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="gdprConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-3">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="leading-none !mt-0">
                              <FormLabel className="text-xs leading-relaxed">
                                I consent to the processing of my personal data under GDPR requirements (required for
                                UK/EU leads). *
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="privacyConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-3">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="leading-none !mt-0">
                              <FormLabel className="text-xs leading-relaxed">
                                I agree to the processing of my personal data as outlined in the{" "}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  Terms of Service
                                </a>
                                . *
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="marketingConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 rounded-lg border border-border/60 bg-background p-3">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="leading-none !mt-0">
                              <FormLabel className="text-xs leading-relaxed">
                                I consent to receiving marketing communications and analytics tracking (optional)
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="mt-2 h-12 w-full rounded-lg text-sm font-bold tracking-wide sm:col-span-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "GET STARTED"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className="relative z-[1] flex flex-wrap items-center justify-center gap-2 border-t border-primary-foreground/15 bg-background px-4 py-3.5 text-center text-sm text-muted-foreground">
            <span className="text-lg leading-none" role="img" aria-label="UK">
              🇬🇧
            </span>
            <span>
              <strong className="font-semibold text-foreground">200+ UK residents</strong> have applied this week
            </span>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <div className="max-w-xl lg:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The opportunity</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              Here is Exactly
              <br />
              <span className="italic text-primary">What This Is</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              No fluff. No complicated jargon. Just a straightforward way for UK residents to earn from what they
              already have.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
            <div className="overflow-hidden rounded-2xl border border-primary/15 bg-primary text-primary-foreground shadow-lg dark:border-border dark:bg-secondary dark:text-secondary-foreground dark:shadow-md">
              <div className="h-1 w-full bg-primary-foreground/25 dark:bg-foreground/15" aria-hidden />
              <div className="px-6 pb-2 pt-8 sm:px-8 sm:pt-10">
                <h3 className="font-serif text-2xl font-semibold leading-tight sm:text-[1.65rem]">
                  <span className="block text-primary-foreground dark:text-foreground">The Simple</span>
                  <span className="mt-0.5 block font-serif italic text-primary-foreground/90 dark:text-foreground/90">
                    Exchange
                  </span>
                </h3>
              </div>
              <ul className="divide-y divide-primary-foreground/10 dark:divide-border">
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <Building2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    Companies worldwide want to operate in the UK. To do so officially, they need a UK resident
                    listed in a professional capacity within their company.
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <ClipboardList
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    Albion Formation connects those companies with UK residents who want a simple, flexible way to
                    earn extra income.
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <Flag
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    You are brought on in that professional role. You do not run the business, manage staff or handle
                    operations. That is entirely the company&apos;s responsibility.
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <Banknote
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    In return, the company pays you a passive income. Nothing further is required from you on a daily
                    basis.
                  </p>
                </li>
              </ul>
            </div>

            <div className="lg:pt-2">
              <h3 className="font-serif text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
                Your Address Is
                <br />
                <span className="italic text-primary">Already an Asset. Start Using It.</span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                Most people never think twice about their UK postcode. But for businesses expanding into Britain,{" "}
                <strong className="font-semibold text-foreground">being a UK resident</strong> is the difference between
                operating legally or not operating at all.
              </p>
              <ul className="mt-8 space-y-7 sm:space-y-8">
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold leading-snug text-foreground">
                      Earn on the Side — Without a Second Job
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Fits around whatever you&apos;re already doing
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold leading-snug text-foreground">You&apos;re Covered — Every Step of the Way</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Agreements signed before anything starts
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold leading-snug text-foreground">
                      A Real Person Guides You From Day One
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Our UK team is with you throughout
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why people join</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              What You Get
              <br />
              <span className="italic text-primary">When You Sign Up</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Everything included — from the moment you apply to the moment you&apos;re earning.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl bg-border sm:mt-12">
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {SIGNUP_BENEFITS_GRID.map((item) => (
                <div key={item.num} className="relative min-h-[220px] bg-background px-6 pb-8 pt-14 sm:min-h-[240px] sm:px-8 sm:pb-10 sm:pt-16">
                  <span
                    className="pointer-events-none absolute left-4 top-3 select-none font-serif text-[4.25rem] font-bold leading-none tracking-tight text-primary/[0.11] sm:left-5 sm:top-4 sm:text-[5rem] dark:text-primary/15"
                    aria-hidden
                  >
                    {item.num}
                  </span>
                  <div className="relative z-[1]">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-foreground sm:text-xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl border border-primary/15 bg-primary px-6 py-12 text-primary-foreground shadow-md sm:mt-16 sm:px-10 sm:py-14 lg:px-14 lg:py-16 dark:border-border dark:bg-secondary dark:text-secondary-foreground dark:shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 dark:text-foreground/70">
            Eligibility
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">
            <span className="text-primary-foreground dark:text-foreground">Do </span>
            <span className="italic text-primary-foreground dark:text-foreground">You</span>
            <span className="text-primary-foreground dark:text-foreground"> Qualify?</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/65 dark:text-foreground/70 sm:text-lg">
            Tick the boxes on the left and you&apos;re most of the way there already.
          </p>

          <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 border-b border-success pb-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-success">
                  You qualify if you are…
                </p>
              </div>
              <ul className="divide-y divide-primary-foreground/10 dark:divide-border">
                {ELIGIBILITY_QUALIFY.map((row) => (
                  <li key={row.title} className="flex gap-3 py-5 first:pt-6">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" strokeWidth={2.25} aria-hidden />
                    <div>
                      <p className="font-semibold leading-snug text-primary-foreground dark:text-foreground">{row.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/60 dark:text-foreground/65">
                        {row.subtitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 border-b border-destructive/80 pb-3 dark:border-destructive/70">
                <X className="h-4 w-4 shrink-0 text-destructive" strokeWidth={2.75} aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-destructive">
                  You don&apos;t need…
                </p>
              </div>
              <ul className="divide-y divide-primary-foreground/10 dark:divide-border">
                {ELIGIBILITY_DONT_NEED.map((row) => (
                  <li key={row.title} className="flex gap-3 py-5 first:pt-6">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" strokeWidth={2.25} aria-hidden />
                    <div>
                      <p className="font-semibold leading-snug text-primary-foreground dark:text-foreground">{row.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/60 dark:text-foreground/65">
                        {row.subtitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-secondary/45 px-6 py-12 shadow-sm sm:mt-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 dark:bg-secondary/30">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Simple process</p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
            <span className="text-foreground">From Application </span>
            <span className="italic text-primary">to Earning</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five straightforward steps from your first click to receiving compensation.
          </p>

          <div className="relative mt-12 lg:mt-16">
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] top-7 z-0 hidden h-px bg-primary/25 dark:bg-foreground/20 lg:block"
              aria-hidden
            />
            <ol className="relative z-[1] grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-5 lg:gap-6">
              {SIMPLE_PROCESS_STEPS.map((step) => (
                <li key={step.num} className="flex flex-col items-center text-center">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/35 bg-primary font-serif text-xl font-semibold tabular-nums text-primary-foreground shadow-sm dark:border-border dark:bg-foreground dark:text-background"
                    aria-hidden
                  >
                    {step.num}
                  </div>
                  <h3 className="mt-5 text-base font-bold leading-snug text-foreground sm:mt-6">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[14rem] text-pretty text-sm leading-relaxed text-muted-foreground sm:max-w-[15rem] sm:text-[0.9375rem]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-secondary/45 px-5 py-12 shadow-sm sm:px-8 sm:py-14 lg:px-12 lg:py-16 dark:bg-secondary/30">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Got questions?</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.35rem]">
              We&apos;ve Got <span className="italic text-primary">Answers</span>
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl border-t border-border sm:mt-12">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                ref={index === 0 ? firstFaqRef : undefined}
                className="group border-b border-border"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="group-open:text-foreground">{item.question}</span>
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-open:bg-foreground group-open:text-background dark:group-open:bg-foreground dark:group-open:text-background">
                    <Plus
                      className="h-4 w-4 transition-opacity group-open:opacity-0"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <X
                      className="absolute h-4 w-4 opacity-0 transition-opacity group-open:opacity-100"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
                  {item.answer}
                </p>
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
