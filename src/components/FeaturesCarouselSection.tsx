import ScrollytellingFeatures from "@/components/scrollytelling/ScrollytellingFeatures";
import { buyerKeyBenefitsFeatures } from "@/data/buyerKeyBenefitsFeatures";

const FeaturesCarouselSection = () => {
  return (
    <ScrollytellingFeatures
      features={buyerKeyBenefitsFeatures}
      sectionId="key-benefits"
      ariaLabel="Key benefits"
      eyebrow="Three Key Benefits"
      title="Why international founders choose Albion"
      description={undefined}
      variant="plain"
    />
  );
};

export default FeaturesCarouselSection;
