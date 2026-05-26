import { StickyScrollCardsSection } from "@/components/ui/sticky-scroll-cards-section";
import { buyerNomineeDirectorDutiesContent } from "@/data/buyerNomineeDirectorDutiesContent";

const BuyerNomineeDirectorDutiesSection = () => {
  const { title, description, cards } = buyerNomineeDirectorDutiesContent;

  return (
    <section className="border-t border-border/60 bg-background py-16 lg:py-24">
      <StickyScrollCardsSection title={title} description={description} cards={cards} />
    </section>
  );
};

export default BuyerNomineeDirectorDutiesSection;
