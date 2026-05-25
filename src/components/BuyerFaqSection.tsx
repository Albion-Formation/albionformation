import { FaqAccordion } from "@/components/ui/faq-accordion";
import { buyerFaqs } from "@/data/buyerFaqs";

const BuyerFaqSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Nominee Director FAQs</h2>
        </div>
        <FaqAccordion faqs={buyerFaqs} />
      </div>
    </section>
  );
};

export default BuyerFaqSection;
