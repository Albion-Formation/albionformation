import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Start with the right path
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            Whether you are appointing a nominee director or applying to become one, our team will guide you through a compliant, fast onboarding process.
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
              className="rounded-2xl bg-background text-foreground hover:bg-background/90"
              onClick={() => navigate("/nominee-buyers")}
            >
              I Need a Nominee Director
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-2xl border-2 border-background bg-transparent text-primary-foreground hover:bg-background hover:text-foreground"
              onClick={() => navigate("/apply")}
            >
              I Want to Become a Nominee Director
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/70 mb-2">
            Free consultation • No obligation • Expert guidance
          </p>
          <p className="text-sm text-primary-foreground/90">
            Email us: <a href="mailto:support@albionformation.com" className="underline font-medium">support@albionformation.com</a>
          </p>
          <p className="text-sm text-primary-foreground/90 mt-1">
            Or chat with us on{" "}
            <a
              href="https://wa.me/447516413026?text=Hi%20Albion%2C%20I'd%20like%20to%20know%20more%20about%20your%20nominee%20director%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              WhatsApp: +44 7516 413026
            </a>
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