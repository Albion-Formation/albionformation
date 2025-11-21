import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">ALBION</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-foreground hover:text-primary font-medium">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary font-medium">
              Services
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary font-medium">
              How It Works
            </a>
            <a href="/nominee-buyers" className="text-foreground hover:text-primary font-medium">
              Nominee Buyer
            </a>
            <a href="/privacy" className="text-foreground hover:text-primary font-medium">
              Privacy Policy
            </a>
            <a href="/terms" className="text-foreground hover:text-primary font-medium">
              Terms & Conditions
            </a>
          </nav>
          
          <Button 
            variant="default" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/apply")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;