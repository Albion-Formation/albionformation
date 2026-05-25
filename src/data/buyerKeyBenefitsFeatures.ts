import { buyerCarouselFeatures } from "@/data/buyerCarouselFeatures";
import type { BuyerFeature } from "@/data/buyerFeatures";

export const buyerKeyBenefitsFeatures: BuyerFeature[] = buyerCarouselFeatures.map((feature) => ({
  id: feature.id,
  title: feature.label,
  description: feature.description,
  icon: feature.icon,
  visualType: "director",
  accent: "from-blue-500/20 to-indigo-500/10",
  image: feature.image,
}));
