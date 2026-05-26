import { AccordionFeatureSection } from "@/components/ui/accordion-feature-section";
import { buyerServiceWorksContent } from "@/data/buyerServiceWorksContent";

const BuyerServiceWorksSection = () => {
  const { title, description, features } = buyerServiceWorksContent;

  return (
    <section className="border-t border-border/60 bg-background" aria-label={title}>
      <AccordionFeatureSection title={title} description={description} features={features} />
    </section>
  );
};

export default BuyerServiceWorksSection;
