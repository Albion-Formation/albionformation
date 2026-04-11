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
    title: "At least 18 years old",
    subtitle: "With legal capacity to enter into formal agreements",
  },
  {
    title: "Willing to complete verification",
    subtitle: "Identity and compliance checks — standard for any director role",
  },
  {
    title: "Able to meet basic suitability checks",
    subtitle: "Credit profile and director history help us assess fit and compliance readiness",
  },
  {
    title: "Ready to review everything in writing",
    subtitle: "Agreements are explained and signed before anything is filed on your behalf",
  },
];

const ELIGIBILITY_DONT_NEED: { title: string; subtitle: string }[] = [
  {
    title: "Any business or director experience",
    subtitle: "Truly zero experience required",
  },
  {
    title: "A second job or fixed hours",
    subtitle: "No day-to-day operational workload",
  },
  {
    title: "Your own company to run",
    subtitle: "You are not launching or operating a business yourself",
  },
  {
    title: "Capital to invest",
    subtitle: "This is a structured service arrangement, not an investment product",
  },
  {
    title: "To commute or sit in an office",
    subtitle: "Everything is handled with remote support from our UK team",
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

  const faqItems: { question: string; answer: string; emphasized?: boolean }[] = [
    {
      question: "What actually is a Nominee Director?",
      answer:
        "A Nominee Director is a UK resident whose name is listed as director of a company on behalf of an international business owner. You don\u2019t run or manage anything \u2014 the owner retains full control. It is a well-established, professional arrangement used by thousands of businesses setting up in the UK every year.",
    },
    {
      question: "Will I be responsible for anything the company does?",
      answer:
        "Your role and its boundaries are clearly defined in the agreements you sign before anything begins. These documents exist specifically to protect you and spell out exactly what you are — and are not — responsible for. Our team explains every line before you sign. You never go in blind.",
    },
    {
      question: "Do I need to do anything on a daily basis?",
      answer:
        "No. Once the arrangement is set up and the documents are signed, there are no daily tasks, check-ins, or commitments required from you. The business owner handles all operations. Your primary role after the initial set-up is simply to remain listed.",
      emphasized: true,
    },
    {
      question: "Is this legitimate? How do I know it\u2019s not a scam?",
      answer:
        "Nominee directorship is a recognised professional arrangement in the UK used by established businesses and service providers. Albion Formation ensures every arrangement is fully documented. We encourage all applicants to take their time reviewing agreements and ask every question before committing. There is never any pressure from our team.",
    },
    {
      question: "What happens after I fill in the form?",
      answer:
        "Our team will contact you within 1 business day to have a friendly conversation about the opportunity, confirm your eligibility, and answer any questions you have. There is absolutely no obligation — filling in the form is simply you raising your hand to find out more. No paperwork at this stage.",
    },
    {
      question: "What happens to my personal data?",
      answer:
        "All information submitted through this page is handled in strict accordance with UK GDPR. We will only use your data to contact you about this specific opportunity. We never sell or share your information with third parties. You can withdraw consent at any time by contacting us directly.",
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
        <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card px-8 py-12 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-slate-100/90 via-card to-card dark:from-secondary/40 dark:via-card dark:to-card"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_100%_0%,hsl(214_95%_93%_/_0.9)_0%,transparent_58%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_100%_0%,hsl(215_28%_22%_/_0.5)_0%,transparent_55%)]"
            aria-hidden
          />
          {/* Stacked on small screens; 2-col grid on lg so width is used deliberately (no orphaned “dead” zone) */}
          <div className="relative flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-12 lg:gap-y-10 xl:gap-x-16">
            <div className="lg:col-span-5">
              <div className="inline-flex w-fit items-center rounded-full border border-slate-200/90 bg-background/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 backdrop-blur-[2px] dark:border-border dark:bg-background/60 dark:text-muted-foreground">
                OPEN TO UK RESIDENTS · NO EXPERIENCE NEEDED
              </div>
              <h1 className="mt-7 text-balance text-[1.75rem] font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl sm:leading-[1.1] lg:mt-8 lg:text-[2.35rem] lg:leading-[1.08] xl:text-[2.65rem]">
                No Second Job.
                <br />
                No New Skills.
                <br />
                Just Your UK Address —
                <br />
                And a Monthly
                <br />
                Income.
              </h1>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <div className="space-y-8 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:h-full lg:py-9 xl:p-10 dark:bg-background/40">
                <p className="text-pretty text-[0.9375rem] leading-[1.65] text-muted-foreground sm:text-base">
                  Albion Formation connects UK residents with international businesses that need a local director.{" "}
                  <strong className="font-semibold text-foreground">
                    You lend your name. They run the company. You get paid.
                  </strong>{" "}
                  Full documentation protects you throughout.
                </p>
                <ul className="flex flex-col gap-3 text-[0.9375rem] text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-3">
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-muted-foreground/20 bg-muted/40 text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                    </span>
                    No Office Required
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-muted-foreground/20 bg-muted/40 text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                    </span>
                    No Daily Tasks
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-muted-foreground/20 bg-muted/40 text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                    </span>
                    Fully Documented
                  </li>
                </ul>
                <blockquote className="border-l border-border pl-5 sm:pl-6">
                  <p className="text-[0.9375rem] italic leading-relaxed text-muted-foreground sm:text-base">
                    &ldquo;I genuinely had no idea this was possible. The process was simple and the team explained
                    everything. I was up and running within a week.&rdquo;
                  </p>
                  <footer className="mt-4 text-sm font-normal not-italic leading-snug text-muted-foreground">
                    — Sarah M., Manchester · Joined 2024
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-5 lg:row-start-2 lg:row-end-3 lg:self-end">
              <Button
                type="button"
                onClick={scrollToForm}
                size="lg"
                className="h-12 w-full rounded-lg text-sm font-bold shadow-sm sm:w-auto sm:min-w-[200px]"
              >
                Start Application
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <div className="max-w-xl lg:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The opportunity</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              Here&apos;s Exactly
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
                  <span className="text-primary-foreground dark:text-foreground">The Simple </span>
                  <span className="italic text-primary-foreground/90 dark:italic dark:text-foreground/90">
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
                    An international entrepreneur wants to{" "}
                    <strong className="font-semibold text-primary-foreground dark:text-foreground">
                      set up a company in the UK
                    </strong>
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <ClipboardList
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    UK regulations require a{" "}
                    <strong className="font-semibold text-primary-foreground dark:text-foreground">
                      UK-resident director
                    </strong>{" "}
                    to be listed
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <Flag
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    <strong className="font-semibold text-primary-foreground dark:text-foreground">You fill that role.</strong>{" "}
                    Your name is listed. You don&apos;t run anything.
                  </p>
                </li>
                <li className="flex gap-4 px-6 py-5 sm:px-8">
                  <Banknote
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-foreground/70"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-primary-foreground/90 dark:text-foreground/90 sm:text-[0.9375rem]">
                    They manage the business.{" "}
                    <strong className="font-semibold text-primary-foreground dark:text-foreground">
                      You receive your compensation.
                    </strong>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60 dark:text-foreground/55">
            Eligibility
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">
            <span className="text-primary-foreground dark:text-foreground">Is This </span>
            <span className="font-serif italic text-primary-foreground/95 dark:text-foreground/95">For You?</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/65 dark:text-foreground/70 sm:text-lg">
            If you tick these boxes, you&apos;re likely already eligible. Applying takes 2 minutes to find out for
            certain.
          </p>

          <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 border-b border-success pb-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-success">You qualify if you are…</p>
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
                  <span
                    className={
                      item.emphasized
                        ? "text-primary group-open:text-foreground"
                        : "group-open:text-foreground"
                    }
                  >
                    {item.question}
                  </span>
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
