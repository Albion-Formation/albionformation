import ScrollytellingFeatures from "@/components/scrollytelling/ScrollytellingFeatures";
import { buyerWhyChooseAlbionFeatures } from "@/data/buyerWhyChooseAlbionFeatures";

const BuyerWhyChooseAlbionSection = () => {
  return (
    <ScrollytellingFeatures
      features={buyerWhyChooseAlbionFeatures}
      sectionId="why-choose-albion"
      ariaLabel="Why choose Albion"
      eyebrow=""
      title="Why Choose Albion?"
      description={undefined}
      variant="plain"
    />
  );
};

export default BuyerWhyChooseAlbionSection;
