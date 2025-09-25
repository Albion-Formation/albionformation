import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, FileText, UserCheck, Award } from "lucide-react";
import BusinessFormationForm from "./BusinessFormationForm";

const HowItWorks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const steps = [
    {
      number: "1",
      icon: Phone,
      title: "Book a Free Call",
      description: "Schedule a consultation with our experts to discuss your requirements and answer any questions."
    },
    {
      number: "2",
      icon: FileText,
      title: "Submit ID & Documents",
      description: "Provide the necessary identification and company documents through our secure portal."
    },
    {
      number: "3",
      icon: UserCheck,
      title: "We Assign Nominee",
      description: "We match you with a qualified UK nominee director who meets your specific needs."
    },
    {
      number: "4",
      icon: Award,
      title: "You Receive Certificate",
      description: "Get your official nominee director agreement and all required documentation."
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
            Our streamlined process makes it easy to set up your nominee director arrangement quickly and securely.
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
        
        <div className="text-center mt-16">
          <div className="bg-secondary/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              The process typically takes just 24 hours from initial consultation to completion.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsFormOpen(true)}
            >
              Start Your Application
            </Button>
          </div>
        </div>
      </div>
      
      <BusinessFormationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  );
};

export default HowItWorks;