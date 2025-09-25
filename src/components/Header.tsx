import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">ALBION</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary font-medium">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium">
              Services
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium">
              How It Works
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium">
              Testimonials
            </a>
          </nav>
          
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;