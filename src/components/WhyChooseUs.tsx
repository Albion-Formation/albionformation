import { Card } from "@/components/ui/card";
import { Shield, Clock, CheckCircle, Phone, FileText, Scale, Eye, EyeOff } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "UK Registered & Compliant",
      description: "All our nominee directors are real UK-resident individuals, properly registered with Companies House and fully compliant with the UK Companies Act 2006."
    },
    {
      icon: CheckCircle,
      title: "Full Legal Protection",
      description: "Every arrangement includes a Declaration of Trust, Power of Attorney, Director Services Agreement, and Indemnity — ensuring you retain full control."
    },
    {
      icon: Clock,
      title: "24-Hour Setup",
      description: "From consultation to Companies House appointment in under 24 hours. Same-day express service also available for urgent requirements."
    },
    {
      icon: Phone,
      title: "Free Expert Consultation",
      description: "Speak with our corporate services team to understand your options. We'll advise on the right structure — nominee only, mixed directorship, or corporate nominee."
    }
  ];

  return (
    <section id="why-choose-us" className="scroll-mt-24 bg-secondary/40 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Corporate-grade delivery
          </span>
          <h2 className="mt-5 text-3xl font-bold text-foreground lg:text-4xl">
            Built for founders who need speed, privacy, and compliance
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Our nominee director service follows a clear legal framework and professional onboarding process designed for UK company operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="rounded-2xl border-border/70 bg-background/95 p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border/70 bg-background p-8 shadow-sm lg:p-10">
          <h3 className="mb-4 text-2xl font-bold text-foreground">What a nominee director arrangement means</h3>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            A nominee director is a qualified, UK-resident individual who is appointed as a director of your company on your behalf. They appear on the public Companies House register while you retain full control and beneficial ownership of the company through legally binding documents.
          </p>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Eye className="h-5 w-5 text-primary" />
                What the Nominee Director Does
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  Appears as director on public Companies House register
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  Signs documents when authorised by you
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  Provides UK-resident director status for banking
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  Handles Companies House compliance filings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  Signs annual confirmation statements and accounts
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <EyeOff className="h-5 w-5 text-foreground/80" />
                What the Nominee Director Does NOT Do
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Scale className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/80" />
                  Make business decisions without your approval
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/80" />
                  Access bank accounts without your authorisation
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/80" />
                  Act independently or interfere with operations
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/80" />
                  Have any beneficial ownership of the company
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/80" />
                  Override your instructions or decisions
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Legal Documents You Receive
            </h4>
            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Declaration of Trust
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Power of Attorney
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Director Services Agreement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Indemnity Agreement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Director's Consent to Act
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                Companies House Filing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
