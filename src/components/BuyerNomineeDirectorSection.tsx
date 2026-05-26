import { MagicText } from "@/components/ui/magic-text";
import { buyerNomineeDirectorContent } from "@/data/buyerNomineeDirectorContent";

const BuyerNomineeDirectorSection = () => {
  const { eyebrow, title, magicText, guarantee, usedByHeading, usedByItems, closing } =
    buyerNomineeDirectorContent;

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </header>

        <div className="space-y-10">
          <MagicText text={magicText} />

          <p className="text-lg leading-relaxed text-muted-foreground">{guarantee}</p>

          <div>
            <h3 className="text-lg font-semibold text-foreground">{usedByHeading}</h3>
            <ul className="mt-5 space-y-4">
              {usedByItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-border pt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {closing}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyerNomineeDirectorSection;
