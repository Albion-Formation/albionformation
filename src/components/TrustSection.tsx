import { Card } from "@/components/ui/card";
import { Shield, FileCheck, Lock, Zap } from "lucide-react";

const TrustSection = () => {
  const trustItems = [
    {
      icon: FileCheck,
      title: "Companies House Registered",
      description: "Fully registered and compliant"
    },
    {
      icon: Shield,
      title: "ICO Compliance",
      description: "Data protection certified"
    },
    {
      icon: Lock,
      title: "GDPR Safe",
      description: "Your data is secure"
    },
    {
      icon: Zap,
      title: "SSL Secure",
      description: "Bank-level encryption"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Assurance
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Trusted governance and data security
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We operate with professional controls across legal documentation, data handling, and compliance workflows.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustItems.map((item, index) => (
            <Card key={index} className="rounded-2xl border-border/70 p-6 text-center shadow-sm">
              <item.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
            <span className="text-foreground font-medium">Fully Operational</span>
          </div>
          <div className="hidden h-4 w-px bg-border sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
            <span className="text-foreground font-medium">24/7 Support Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;