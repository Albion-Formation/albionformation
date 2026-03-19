import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Why Choose Us", href: "/#why-choose-us" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex flex-1 items-center">
            <h1 className="cursor-pointer text-2xl font-bold tracking-tight text-foreground" onClick={() => navigate("/")}>
              ALBION
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/" && (item.href === "/" ? location.hash === "" : item.href.endsWith(location.hash))
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => navigate("/become-a-nominee-director")}
            >
              Become a Director
            </Button>
            <Button
              variant="default"
              className="rounded-2xl"
              onClick={() => navigate("/nominee-director-service")}
            >
              Need a Director
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
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-md px-4 py-2 font-medium text-foreground hover:bg-accent hover:text-primary"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-6 border-t pt-6">
                  <p className="px-1 text-xs uppercase tracking-wide text-muted-foreground">Choose your path</p>
                  <div className="mt-3 flex flex-col gap-3">
                    <Button
                      variant="default"
                      className="rounded-2xl"
                      onClick={() => {
                        navigate("/nominee-director-service");
                        setOpen(false);
                      }}
                    >
                      Need a Director
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => {
                        navigate("/become-a-nominee-director");
                        setOpen(false);
                      }}
                    >
                      Become a Director
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4 border-t pt-4 text-sm">
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Privacy
                  </Link>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Terms
                  </Link>
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