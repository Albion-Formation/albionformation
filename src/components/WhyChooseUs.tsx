import { Card } from "@/components/ui/card";
import { Shield, Clock, CheckCircle, Phone } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "UK Registered",
      description: "All our nominee directors are properly registered with Companies House and fully compliant with UK law."
    },
    {
      icon: CheckCircle,
      title: "100% Private & Legal",
      description: "Complete privacy protection while maintaining full legal compliance and transparency with authorities."
    },
    {
      icon: Clock,
      title: "24-Hour Setup",
      description: "Fast turnaround times with most nominee director arrangements completed within 24 hours."
    },
    {
      icon: Phone,
      title: "Free Consultation",
      description: "Speak with our experts to understand your options and get personalized advice at no cost."
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
            We provide professional, reliable, and fully compliant nominee director services to protect your privacy while ensuring your business operates within UK law.
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
        
        <div className="mt-16 bg-card rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">What is a Nominee Director?</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A nominee director is a qualified individual who agrees to act as a director of your company while you retain control as the beneficial owner. This arrangement provides privacy protection for the actual controller while ensuring compliance with UK Companies House requirements. It's a completely legal and widely used corporate structure in the UK.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;