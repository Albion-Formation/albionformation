import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, Building2, Globe, Landmark } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                UK Nominee Director Services<br />
                <span className="text-4xl lg:text-5xl">Fast, Private &</span><br />
                <span className="text-4xl lg:text-5xl">Fully Compliant</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Need a UK-resident director for your company? Our professional nominee directors appear on Companies House records while you retain full control through legally binding agreements — Declaration of Trust, Power of Attorney, and Director Services Agreement.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate("/nominee-buyers")}
              >
                I Need a Nominee Director
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/apply")}
              >
                Become a Nominee Director
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">UK Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">24hr Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Companies Act 2006 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">KYC/AML Verified</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Who This Is For */}
          <div className="lg:pl-8">
            <Card className="p-8 bg-card shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-2">Who Needs a Nominee Director?</h3>
              <p className="text-sm text-muted-foreground mb-6">Our service is ideal if you are:</p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Non-UK Resident Needing a UK Director</p>
                    <p className="text-sm text-muted-foreground">Most UK banks require a UK-resident director to open a business account</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Privacy-Focused Business Owner</p>
                    <p className="text-sm text-muted-foreground">Keep your personal details off the public Companies House register</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Landmark className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Need UK Banking Access</p>
                    <p className="text-sm text-muted-foreground">A UK-resident director significantly improves bank account approval rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Building2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Seeking UK Business Credibility</p>
                    <p className="text-sm text-muted-foreground">Enhance trust with UK clients, suppliers, and contract partners</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
