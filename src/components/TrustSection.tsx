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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Trusted & Secure
          </h2>
          <p className="text-lg text-muted-foreground">
            Your privacy and security are our top priorities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustItems.map((item, index) => (
            <Card key={index} className="p-6 text-center">
              <item.icon className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-foreground font-medium">Fully Operational</span>
          </div>
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-foreground font-medium">24/7 Support Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;