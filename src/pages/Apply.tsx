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
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Phone,
  Plus,
  PoundSterling,
  Users,
  X,
  Zap,
} from "lucide-react";

const formSchema = z
  .object({
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
    applicationConsent: z.boolean().refine((val) => val === true, {
      message: "Consent is required to continue",
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  });

type FormData = z.infer<typeof formSchema>;
const APPLY_WEBHOOK_URL = "https://n8n.simpleexel.io/webhook/8ad3fd29-3f79-4386-bffe-1e53f1f314dc";

const HERO_BULLETS = [
  "Work from home",
  "No office, no commute, no daily commitment",
  "Fits around your current job, retirement or lifestyle",
  "No experience or qualifications required",
  "Our team handles all the paperwork for you",
] as const;

const OPPORTUNITY_POINTS = [
  "Companies worldwide want to operate in the UK. To do so officially, they need a UK resident listed in a professional capacity within their company.",
  "Albion Formation connects those companies with UK residents who want a simple, flexible way to earn extra income.",
  "You are brought on in that professional role. You do not run the business, manage staff or handle operations. That is entirely the company's responsibility.",
  "In return, the company pays you a passive income. Nothing further is required from you on a daily basis.",
] as const;

const SIGNUP_TO_EARNING_STEPS = [
  {
    num: 1,
    title: "You Apply",
    body: "Fill in the short form above. Takes under 2 minutes. No documents needed yet.",
  },
  {
    num: 2,
    title: "We Call You",
    body: "Our UK team will ring within 1 business day to confirm your eligibility.",
  },
  {
    num: 3,
    title: "You Are Matched",
    body: "We connect you with a verified company that needs a UK resident for this role.",
  },
  {
    num: 4,
    title: "Docs Signed",
    body: "Full agreement prepared and explained. You sign only when fully comfortable.",
  },
  {
    num: 5,
    title: "You Start Earning",
    body: "Passive income begins. The company handles everything else.",
  },
] as const;

const REAL_RESULTS_STATS = [
  { label: "Applications this week", value: "200+", sub: null as string | null },
  { label: "Minutes to complete the form", value: "< 2", sub: null },
  { label: "Average team response time", value: "1 day", sub: null },
] as const;

const REAL_RESULTS_TESTIMONIALS = [
  {
    quote:
      "I work full time and was worried about commitment. There is not any. Once it was set up I just get on with my life. A payment arrives without me doing a thing.",
    name: "Priya S.",
    place: "London",
    joined: "2024",
  },
  {
    quote:
      "The most effortless extra income I have ever had. The Albion team explained everything clearly before I signed a single thing. No pressure, no rush.",
    name: "Mark R.",
    place: "Leeds",
    joined: "2023",
  },
  {
    quote:
      "I am retired and this is absolutely perfect. Passive income with zero to do on a daily basis. Should have done it years ago.",
    name: "Carol M.",
    place: "Bristol",
    joined: "2024",
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

function ApplyFormFields({
  form,
  beenDirectorBefore,
  idPrefix,
}: {
  form: ReturnType<typeof useForm<FormData>>;
  beenDirectorBefore: string;
  idPrefix: string;
}) {
  const radioWrap =
    "flex items-center gap-2.5 rounded-md border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm transition-colors hover:bg-muted/30 has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/[0.06] dark:has-[button[data-state=checked]]:bg-primary/10";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Contact details</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Use the same details you hold on official records — it speeds up eligibility checks.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="First name" {...field} />
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
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Phone number" {...field} />
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
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Confirm email address</FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Confirm email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Date of birth</h3>
          <p className="mt-1 text-xs text-muted-foreground">We use this only to confirm you are 18 or over.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <FormField
            control={form.control}
            name="dobMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Month</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dobDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Date</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dobYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Year</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
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
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Eligibility &amp; screening</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Straightforward questions — they help us match you correctly and prepare your call.
          </p>
        </div>

        <div className="space-y-6">
        <FormField
          control={form.control}
          name="beenDirectorBefore"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">Have you been a director before?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2.5">
                  <div className={radioWrap}>
                    <RadioGroupItem value="yes" id={`${idPrefix}-director-yes`} />
                    <label htmlFor={`${idPrefix}-director-yes`} className="cursor-pointer font-medium">
                      Yes
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="no" id={`${idPrefix}-director-no`} />
                    <label htmlFor={`${idPrefix}-director-no`} className="cursor-pointer font-medium">
                      No
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {beenDirectorBefore === "yes" && (
          <FormField
            control={form.control}
            name="hasGovUKLogin"
            render={({ field }) => (
              <FormItem className="space-y-3 rounded-lg border border-dashed border-border bg-muted/20 p-4 dark:bg-muted/10">
                <FormLabel className="text-sm font-medium">Do you have a Gov UK One Login?</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2.5">
                    <div className={radioWrap}>
                      <RadioGroupItem value="yes" id={`${idPrefix}-govuk-yes`} />
                      <label htmlFor={`${idPrefix}-govuk-yes`} className="cursor-pointer font-medium">
                        Yes
                      </label>
                    </div>
                    <div className={radioWrap}>
                      <RadioGroupItem value="no" id={`${idPrefix}-govuk-no`} />
                      <label htmlFor={`${idPrefix}-govuk-no`} className="cursor-pointer font-medium">
                        No
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="currentlyDirector"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">Are you currently a Director?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2.5">
                  <div className={radioWrap}>
                    <RadioGroupItem value="yes" id={`${idPrefix}-current-yes`} />
                    <label htmlFor={`${idPrefix}-current-yes`} className="cursor-pointer font-medium">
                      Yes
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="no" id={`${idPrefix}-current-no`} />
                    <label htmlFor={`${idPrefix}-current-no`} className="cursor-pointer font-medium">
                      No
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditScoreRange"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">Do you have a good credit score?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
                >
                  <div className={radioWrap}>
                    <RadioGroupItem value="100-300" id={`${idPrefix}-credit-low`} />
                    <label htmlFor={`${idPrefix}-credit-low`} className="cursor-pointer font-medium tabular-nums">
                      100-300
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="301-600" id={`${idPrefix}-credit-mid`} />
                    <label htmlFor={`${idPrefix}-credit-mid`} className="cursor-pointer font-medium tabular-nums">
                      301-600
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="601-999" id={`${idPrefix}-credit-high`} />
                    <label htmlFor={`${idPrefix}-credit-high`} className="cursor-pointer font-medium tabular-nums">
                      601-999
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasClearScoreAccount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">Do you have a ClearScore account?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2.5">
                  <div className={radioWrap}>
                    <RadioGroupItem value="yes" id={`${idPrefix}-clearscore-yes`} />
                    <label htmlFor={`${idPrefix}-clearscore-yes`} className="cursor-pointer font-medium">
                      Yes
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="no" id={`${idPrefix}-clearscore-no`} />
                    <label htmlFor={`${idPrefix}-clearscore-no`} className="cursor-pointer font-medium">
                      No
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredContactTime"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">What time is best to contact you?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
                >
                  <div className={radioWrap}>
                    <RadioGroupItem value="morning" id={`${idPrefix}-time-morning`} />
                    <label htmlFor={`${idPrefix}-time-morning`} className="cursor-pointer font-medium">
                      Morning
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="midday" id={`${idPrefix}-time-midday`} />
                    <label htmlFor={`${idPrefix}-time-midday`} className="cursor-pointer font-medium">
                      Midday
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="afternoon" id={`${idPrefix}-time-afternoon`} />
                    <label htmlFor={`${idPrefix}-time-afternoon`} className="cursor-pointer font-medium">
                      Afternoon
                    </label>
                  </div>
                  <div className={radioWrap}>
                    <RadioGroupItem value="evening" id={`${idPrefix}-time-evening`} />
                    <label htmlFor={`${idPrefix}-time-evening`} className="cursor-pointer font-medium">
                      Evening
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
      </div>

      <Separator />

      <FormField
        control={form.control}
        name="applicationConsent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-3.5 rounded-xl border border-border bg-muted/30 p-4 sm:p-5 dark:bg-muted/15">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
            </FormControl>
            <div className="space-y-1.5 leading-snug">
              <FormLabel className="text-sm font-normal leading-relaxed text-foreground">
                I consent to Albion Formation contacting me about this opportunity and agree to the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Privacy Policy
                </a>
                . Our team will call you within 1 business day to walk through everything personally.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
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
      applicationConsent: false,
    },
  });

  const beenDirectorBefore = form.watch("beenDirectorBefore");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const landingQuery = typeof window !== "undefined" ? window.location.search : "";
      const landingPageUrl = typeof window !== "undefined" ? window.location.href : "";
      const referrer = typeof document !== "undefined" ? document.referrer || "" : "";

      const { applicationConsent, ...rest } = data;
      const payload = {
        ...rest,
        dateOfBirth: `${data.dobYear}-${data.dobMonth}-${data.dobDate}`,
        gdprConsent: applicationConsent,
        privacyConsent: applicationConsent,
        marketingConsent: false,
        ...attribution,
        landing_query: landingQuery,
        landing_page_url: landingPageUrl,
        referrer,
      } as const;

      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined) params.append(k, String(v));
      });

      const response = await fetch(APPLY_WEBHOOK_URL, {
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
      windowWithDataLayer.dataLayer.push({
        event: "lead_submit_success",
        lead_source: attribution.source ?? "",
        utm_source: attribution.utm_source ?? "",
        utm_medium: attribution.utm_medium ?? "",
        utm_campaign: attribution.utm_campaign ?? "",
      });

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
    }
  };

  const onInvalidSubmit = (errors: FieldErrors<FormData>) => {
    console.warn("[Apply] Form validation failed", errors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl space-y-16 px-4 py-10 sm:space-y-20 sm:px-6 sm:py-12 lg:px-8">
        {/* Hero */}
        <section className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-primary text-primary-foreground shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] [background-image:linear-gradient(to_right,hsl(var(--primary-foreground)/0.14)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.14)_1px,transparent_1px)] [background-size:40px_40px]"
            aria-hidden
          />
          <div className="relative z-[1] grid w-full gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-14">
            <div className="flex min-w-0 flex-col">
              <div className="rounded-xl border border-primary-foreground/15 bg-destructive/25 px-4 py-3 shadow-sm backdrop-blur-[2px] sm:px-5 sm:py-4">
                <p className="text-sm font-medium leading-relaxed text-primary-foreground sm:text-[0.9375rem]">
                  <span className="font-semibold">Limited openings available.</span> We currently have a small number of
                  positions open. Once filled, applications close until the next intake.
                </p>
              </div>

              <h1 className="mt-8 text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                <span className="block">Are You a UK Resident</span>
                <span className="mt-2 block font-serif text-[1.05em] font-semibold italic text-primary-foreground/95">
                  Looking For Extra Income?
                </span>
              </h1>

              <p className="mt-6 w-full text-pretty text-base leading-relaxed text-primary-foreground/72 sm:text-lg">
                Albion Formation connects UK Residents with Businesses who are looking to hire qualified individuals for
                one of the most effortless earning opportunities available in the UK today.
              </p>

              <ul className="mt-8 w-full space-y-3 text-[0.9375rem] leading-snug sm:text-base">
                {HERO_BULLETS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-foreground/12">
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={scrollToForm}
                  size="lg"
                  className="h-12 rounded-xl bg-background px-8 text-sm font-semibold tracking-wide text-foreground shadow-md hover:bg-background/95"
                >
                  GET STARTED
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <p className="text-xs text-primary-foreground/55 sm:pl-1">No obligation. A UK adviser will call you back.</p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center lg:mt-0">
              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-6 shadow-inner backdrop-blur-sm sm:p-8">
                <blockquote>
                  <p className="text-pretty font-serif text-lg italic leading-relaxed text-primary-foreground/85 sm:text-xl">
                    &ldquo;I genuinely do nothing day to day, and a payment arrives regularly. The Albion team handled
                    everything from start to finish. Set up in days.&rdquo;
                  </p>
                  <footer className="mt-5 flex flex-wrap items-center gap-2 border-t border-primary-foreground/15 pt-5 text-sm font-medium text-primary-foreground">
                    <span>James T.</span>
                    <span className="text-primary-foreground/50">·</span>
                    <span className="text-primary-foreground/80">Birmingham</span>
                    <span className="text-primary-foreground/50">·</span>
                    <span className="text-primary-foreground/70">Joined 2024</span>
                  </footer>
                </blockquote>
              </div>
              <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/45 lg:text-right">
                albionformation.com
              </p>
            </div>
          </div>

          <div className="relative z-[1] flex flex-wrap items-center justify-center gap-2 border-t border-primary-foreground/12 bg-background/95 px-4 py-3.5 text-center text-sm text-muted-foreground backdrop-blur-sm">
            <span className="text-lg leading-none" role="img" aria-label="UK">
              🇬🇧
            </span>
            <span>
              <strong className="font-semibold text-foreground">200+ UK residents</strong> have applied this week
            </span>
          </div>
        </section>

        {/* Application */}
        <section id="application-form" className="w-full scroll-mt-24">
          <div className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-sm font-medium leading-relaxed text-foreground sm:text-[0.9375rem]">
              Limited spots remaining in this intake. Apply now to secure your place.
            </p>
          </div>

          <div className="mt-10 grid w-full min-w-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <div className="w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg ring-1 ring-border/40">
                <div className="w-full border-b border-border bg-muted/30 px-6 py-5 sm:px-8 sm:py-6 dark:bg-muted/20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Application</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Start your application
                  </h2>
                  <p className="mt-2 w-full text-sm leading-relaxed text-muted-foreground">
                    Complete the details below so our UK team can review your profile.
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)} className="flex flex-col gap-2">
                      <ApplyFormFields form={form} beenDirectorBefore={beenDirectorBefore} idPrefix="apply" />

                      <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                        This is a professional service arrangement. Compensation varies per arrangement. Not guaranteed
                        employment.
                      </p>

                      <Button
                        type="submit"
                        size="lg"
                        className="mt-4 h-12 w-full rounded-xl text-sm font-semibold tracking-wide shadow-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Submit application
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>

            <aside className="flex min-w-0 w-full flex-col gap-5 lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Prefer to speak to someone directly?</p>
                    <a
                      href="tel:+442039984418"
                      className="mt-1 inline-block text-lg font-bold tracking-tight text-primary hover:underline"
                    >
                      +44 20 3998 4418
                    </a>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Mon–Fri 9 am–6 pm · Sat 10 am–4 pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-md">
                <div className="border-b border-primary-foreground/10 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                    At a glance
                  </p>
                </div>
                <ul className="divide-y divide-primary-foreground/10">
                  <li className="flex items-center gap-3 px-5 py-4 text-sm font-semibold">
                    <PoundSterling className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                    Earn a Passive Income
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4 text-sm font-semibold">
                    <GraduationCap className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                    No Experience Needed
                  </li>
                  <li className="flex items-center gap-3 px-5 py-4 text-sm font-semibold">
                    <Users className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                    UK Residents Only
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Opportunity */}
        <section className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">The opportunity</p>
          <h2 className="mt-3 w-full font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Here is Exactly What This Is
          </h2>
          <ol className="mt-10 grid w-full min-w-0 gap-4 sm:gap-5">
            {OPPORTUNITY_POINTS.map((text, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-2xl border border-border/80 bg-background/80 p-5 sm:gap-5 sm:p-6 dark:bg-background/40"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="min-w-0 flex-1 pt-0.5 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Journey */}
        <section className="w-full rounded-3xl border border-border bg-muted/40 px-6 py-12 shadow-sm sm:px-10 sm:py-14 lg:px-12 lg:py-16 dark:bg-muted/25">
          <h2 className="w-full font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            From Sign Up To Earning
          </h2>
          <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five simple steps. Most people are fully set up and earning within days of applying.
          </p>

          <div className="relative mt-12 w-full min-w-0 lg:mt-14">
            <div
              className="pointer-events-none absolute left-[6%] right-[6%] top-[1.65rem] z-0 hidden h-px bg-border lg:block"
              aria-hidden
            />
            <ol className="relative z-[1] grid w-full min-w-0 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-5">
              {SIGNUP_TO_EARNING_STEPS.map((step) => (
                <li
                  key={step.num}
                  className="flex min-w-0 flex-col rounded-2xl border border-border/70 bg-background p-6 text-center shadow-sm dark:bg-card"
                >
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary font-serif text-lg font-semibold tabular-nums text-primary-foreground shadow-sm dark:border-border dark:bg-foreground dark:text-background"
                    aria-hidden
                  >
                    {step.num}
                  </div>
                  <h3 className="mt-5 text-base font-bold leading-snug text-foreground">{step.title}</h3>
                  <p className="mt-2 w-full text-pretty text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Results */}
        <section className="w-full min-w-0">
          <div className="w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Real results</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              UK Residents Already Earning
            </h2>
          </div>

          <div className="mt-10 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {REAL_RESULTS_STATS.map((s) => (
                <div key={s.label} className="min-w-0 px-4 py-8 text-center sm:px-6 sm:py-10">
                  <p className="font-serif text-3xl font-bold tabular-nums text-primary sm:text-4xl">{s.value}</p>
                  <p className="mt-2 text-xs font-medium leading-snug text-muted-foreground sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid w-full min-w-0 gap-6 md:grid-cols-3">
            {REAL_RESULTS_TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="relative rounded-2xl border border-border bg-card p-6 pt-8 shadow-sm sm:p-7"
              >
                <span
                  className="pointer-events-none absolute left-5 top-4 font-serif text-4xl leading-none text-primary/20"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="relative text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">{t.quote}</p>
                <footer className="relative mt-5 border-t border-border pt-4 text-sm font-medium text-muted-foreground">
                  {t.name} {t.place} · Joined {t.joined}
                </footer>
              </blockquote>
            ))}
          </div>

          <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            albionformation.com
          </p>
        </section>

        {/* FAQ */}
        <section className="w-full rounded-3xl border border-border bg-muted/40 px-5 py-12 shadow-sm sm:px-8 sm:py-14 lg:px-12 lg:py-16 dark:bg-muted/25">
          <div className="w-full text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Quick answers</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.35rem]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                ref={index === 0 ? firstFaqRef : undefined}
                className="group border-b border-border last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground marker:content-none sm:px-6 sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                  <span className="pr-2">{item.question}</span>
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-open:bg-primary group-open:text-primary-foreground">
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
                <div className="border-t border-border bg-muted/20 px-5 pb-5 pt-4 sm:px-6 dark:bg-muted/10">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="w-full rounded-3xl border border-border bg-muted/50 px-6 py-10 text-center dark:bg-muted/30 sm:px-10">
          <p className="mx-auto flex w-full max-w-none flex-wrap items-center justify-center gap-2 px-2 text-sm font-medium text-foreground sm:px-4">
            <Zap className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              Limited openings available in this intake. Once filled, applications close until the next batch opens.
            </span>
          </p>
          <p className="mx-auto mt-4 w-full max-w-none px-2 text-xs leading-relaxed text-muted-foreground sm:px-4">
            Professional service arrangement. Compensation varies per individual arrangement. Not guaranteed employment.
          </p>
          <p className="mx-auto mt-6 w-full max-w-none px-2 text-xs leading-relaxed text-muted-foreground sm:px-4">
            © 2025 Albion Formation Ltd. All rights reserved. Albion Formation Ltd is registered in England &amp; Wales.
            Data processed in accordance with UK GDPR.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
