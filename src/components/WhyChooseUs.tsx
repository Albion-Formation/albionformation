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
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Why Choose Our Nominee Director Services?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We provide professional, reliable, and fully compliant nominee director services trusted by over 500 businesses — from international entrepreneurs to privacy-focused UK business owners.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <feature.icon className="w-12 h-12 text-success mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        {/* What is a Nominee Director - expanded */}
        <div className="mt-16 bg-card rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">What is a Nominee Director?</h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            A nominee director is a qualified, UK-resident individual who is appointed as a director of your company on your behalf. They appear on the public Companies House register while you retain full control and beneficial ownership of the company through legally binding documents.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-success" />
                What the Nominee Director Does
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  Appears as director on public Companies House register
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  Signs documents when authorised by you
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  Provides UK-resident director status for banking
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  Handles Companies House compliance filings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  Signs annual confirmation statements and accounts
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-destructive" />
                What the Nominee Director Does NOT Do
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  Make business decisions without your approval
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  Access bank accounts without your authorisation
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  Act independently or interfere with operations
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  Have any beneficial ownership of the company
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  Override your instructions or decisions
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Legal Documents You Receive
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                Declaration of Trust
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                Power of Attorney
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                Director Services Agreement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                Indemnity Agreement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                Director's Consent to Act
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
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
