import { Button } from "@/components/ui/button";

const BuyerHeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src="/BuyerCopy/buyer-hero-img4.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative flex h-full">
        <div className="flex h-full w-full max-w-xl flex-col justify-center bg-gradient-to-r from-black/75 via-black/60 to-black/20 px-8 py-24 backdrop-blur-[2px] sm:max-w-2xl sm:px-12 lg:max-w-[52%] lg:px-16 xl:px-20">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            Ready to start your UK company from anywhere in the world?
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Registering a UK limited company shouldn&apos;t require you to be in the UK. We handle all the legal
            filings, documentation, and compliance headaches, freeing you to start trading immediately.
          </p>

          <div className="mt-8">
            <Button
              type="button"
              size="lg"
              onClick={scrollToForm}
              className="h-12 rounded-2xl bg-background px-8 text-sm font-semibold text-foreground hover:bg-background/90"
            >
              Contact us
            </Button>
          </div>

          <div className="mt-10 max-w-xl space-y-4 border-t border-white/15 pt-8 text-sm leading-relaxed text-white/75 sm:text-base">
            <p>
              Starting a UK limited company is complicated. Tax codes, Companies House forms, banking requirements,
              compliance deadlines. And if you&apos;re abroad, it feels impossible.
            </p>
            <p>
              We&apos;ve helped over 10,000 international founders launch UK companies. We know every hurdle.
              We&apos;ve built a process that eliminates the guesswork, and gets your business registered, compliant,
              and ready to trade in days instead of months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerHeroSection;
