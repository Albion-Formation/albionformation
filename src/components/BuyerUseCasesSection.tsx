import { Gallery4 } from "@/components/ui/gallery4";
import { buyerUseCasesContent } from "@/data/buyerUseCasesContent";

const BuyerUseCasesSection = () => {
  const { title, description, eyebrow, items } = buyerUseCasesContent;

  return (
    <section className="overflow-x-hidden border-t border-border/60 bg-background" aria-label={title}>
      <Gallery4 title={title} description={description} eyebrow={eyebrow} items={items} />
    </section>
  );
};

export default BuyerUseCasesSection;
