import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Slots for August Are Filling Fast
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            Don't wait to protect your privacy. Our expert team is ready to set up your nominee director arrangement within 24 hours.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">24-Hour Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">Expert Support</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={() => navigate("/apply")}
            >
              I Need a Nominee Director
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-background/50 text-primary-foreground hover:bg-background/20"
              onClick={() => navigate("/nominee-buyers")}
            >
              Become a Nominee Director
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/70">
            Free consultation • No obligation • Expert guidance
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-primary-foreground/80">Clients Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24hr</div>
            <div className="text-primary-foreground/80">Average Setup</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99%</div>
            <div className="text-primary-foreground/80">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;