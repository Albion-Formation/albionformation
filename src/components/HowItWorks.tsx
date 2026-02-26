import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, FileText, UserCheck, Award, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [
    {
      number: "1",
      icon: Phone,
      title: "Book a Free Call",
      description: "Schedule a consultation with our corporate services team. We'll assess your needs — whether you require a nominee for privacy, UK residency, or banking — and recommend the right structure."
    },
    {
      number: "2",
      icon: FileText,
      title: "KYC & Document Submission",
      description: "Provide identification (passport or driving licence) and proof of address. We complete mandatory KYC/AML verification — this is a legal requirement that protects both parties."
    },
    {
      number: "3",
      icon: UserCheck,
      title: "Nominee Appointment",
      description: "We assign a qualified UK-resident nominee director, draft all legal agreements (Declaration of Trust, Power of Attorney, Director Services Agreement), and file the appointment with Companies House."
    },
    {
      number: "4",
      icon: Award,
      title: "You Receive Full Documentation",
      description: "Get your signed nominee director agreements, Companies House confirmation, and all legal documents. Your company is active and can start trading immediately."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our streamlined, fully compliant process gets your nominee director appointed in as little as 24 hours.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center relative">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <step.icon className="w-8 h-8 text-success mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Compliance note */}
        <div className="mt-12 flex items-start gap-4 bg-secondary/50 rounded-lg p-6 max-w-3xl mx-auto">
          <ShieldCheck className="w-8 h-8 text-success flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Fully Transparent & Legal</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our nominee arrangements are fully compliant with the UK Companies Act 2006. The true beneficial owner is always disclosed on the PSC (People with Significant Control) register and to HMRC. This is a standard, widely-used corporate structure — not a way to hide ownership from authorities.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-secondary/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              The process typically takes just 24 hours from initial consultation to completion. Same-day express service also available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate("/nominee-buyers")}
              >
                I Need a Nominee Director
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/apply")}
              >
                Become a Nominee Director
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
