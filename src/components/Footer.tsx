import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">ALBION</h2>
            <p className="text-sm text-muted-foreground">
              Professional nominee services for UK companies. Fast, private, and fully compliant.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary text-sm">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get Started</h3>
            <div className="flex flex-col gap-3">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate("/nominee-buyers")}
              >
                I Need a Nominee Director
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/apply")}
              >
                Become a Nominee Director
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ALBION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
