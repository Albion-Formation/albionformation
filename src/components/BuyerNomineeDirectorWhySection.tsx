import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { buyerNomineeDirectorWhyContent } from "@/data/buyerNomineeDirectorWhyContent";

const SECTION_BACKGROUND = "#ffffff";

const BuyerNomineeDirectorWhySection = () => {
  const { title, intro, benefitsHeading, benefits, closing } = buyerNomineeDirectorWhyContent;

  return (
    <section className="relative border-t border-border/60 bg-background">
      <ProgressiveBlur
        variant="sticky-top"
        position="top"
        backgroundColor={SECTION_BACKGROUND}
        height="120px"
        blurAmount="6px"
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </header>

        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {paragraph}
            </p>
          ))}

          <div>
            <h3 className="text-lg font-semibold text-foreground">{benefitsHeading}</h3>
            <ul className="mt-5 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-border pt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {closing}
          </p>
        </div>
      </div>

      <ProgressiveBlur
        variant="sticky-bottom"
        position="bottom"
        backgroundColor={SECTION_BACKGROUND}
        height="120px"
        blurAmount="6px"
      />
    </section>
  );
};

export default BuyerNomineeDirectorWhySection;
