import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground cursor-pointer" onClick={() => navigate("/")}>ALBION</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
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
          
          {/* Desktop CTAs */}
          <div className="hidden lg:flex gap-3">
            <Button 
              variant="default" 
              onClick={() => navigate("/apply")}
            >
              I Need a Nominee Director
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/nominee-buyers")}
            >
              Become a Nominee Director
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a 
                  href="/" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#services" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Services
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  How It Works
                </a>
                <a 
                  href="/nominee-buyers" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Nominee Buyer
                </a>
                <a 
                  href="/privacy" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="text-foreground hover:text-primary font-medium py-2 px-4 rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Terms & Conditions
                </a>
                
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                  <Button 
                    variant="default" 
                    onClick={() => {
                      navigate("/apply");
                      setOpen(false);
                    }}
                  >
                    I Need a Nominee Director
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate("/nominee-buyers");
                      setOpen(false);
                    }}
                  >
                    Become a Nominee Director
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;