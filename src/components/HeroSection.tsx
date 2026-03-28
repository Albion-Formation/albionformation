import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#dbeafe_0%,transparent_58%)]" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-4 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Trusted by global founders
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            UK Nominee Director Services — For Businesses &amp; Professionals
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Whether you need a UK nominee director for your company or want to join as a director, choose your path below.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-2">
              <Button
                size="lg"
                onClick={() => navigate("/nominee-buyers")}
                className="mx-auto h-12 w-full max-w-[320px] rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                I Need a Nominee Director
              </Button>
              <p className="text-sm text-muted-foreground">For business owners and founders</p>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/apply")}
                className="mx-auto h-12 w-full max-w-[320px] rounded-2xl border-border bg-background/80 px-5 text-sm font-semibold text-foreground shadow-md hover:bg-muted/60"
              >
                I Want to Become a Nominee Director
              </Button>
              <p className="text-sm text-muted-foreground">For professionals applying as directors</p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm text-muted-foreground">
            We provide nominee director services and also accept applications. Please select the correct option to continue.
          </p>
          <p className="mx-auto mt-3 max-w-3xl rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-xs font-medium text-muted-foreground sm:text-sm">
            This is a professional service arrangement. Eligibility criteria apply. Not a guaranteed income offer.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>UK-focused compliance support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">
                🇬🇧
              </span>
              <span>Built for UK company requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span>Fast onboarding for both paths</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
