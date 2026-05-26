import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { buyerWhyMattersContent } from "@/data/buyerWhyMattersContent";

const BuyerWhyMattersSection = () => {
  const { titleBefore, sliderText, body, benefitsHeading, benefits } = buyerWhyMattersContent;

  return (
    <section className="border-t border-border/60 bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <DynamicTextSlider titleBefore={titleBefore} sliderText={sliderText} />

        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {body.map((paragraph) => (
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
        </div>
      </div>
    </section>
  );
};

export default BuyerWhyMattersSection;
