import { Button } from "@/components/ui/button";
import { buyerHeroContent, type BuyerHeroVariant } from "@/data/buyerHeroContent";

interface BuyerHeroSectionProps {
  variant?: BuyerHeroVariant;
}

const BuyerHeroSection = ({ variant = "primary" }: BuyerHeroSectionProps) => {
  const { headline, intro, supportingParagraphs, ctaLabel, imageSrc } = buyerHeroContent[variant];

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative flex h-full">
        <div className="flex h-full w-full max-w-xl flex-col justify-center bg-gradient-to-r from-black/75 via-black/60 to-black/20 px-8 py-24 backdrop-blur-[2px] sm:max-w-2xl sm:px-12 lg:max-w-[55%] lg:px-16 xl:max-w-[58%] xl:px-20">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] xl:text-5xl">
            {headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{intro}</p>

          <div className="mt-8">
            <Button
              type="button"
              size="lg"
              onClick={scrollToForm}
              className="h-12 rounded-2xl bg-background px-8 text-sm font-semibold text-foreground hover:bg-background/90"
            >
              {ctaLabel}
            </Button>
          </div>

          {supportingParagraphs && supportingParagraphs.length > 0 && (
            <div className="mt-10 max-w-xl space-y-4 border-t border-white/15 pt-8 text-sm leading-relaxed text-white/75 sm:text-base">
              {supportingParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuyerHeroSection;
