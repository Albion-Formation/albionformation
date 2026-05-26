import { buyerFeatures } from "@/data/buyerFeatures";
import type { CarouselFeature } from "@/data/buyerCarouselFeatures";

const storyImages: Record<number, string> = {
  0: "/BuyerCopy/benefit-1b.png",
  1: "/BuyerCopy/benefit-2a.png",
  2: "/BuyerCopy/benefit-3a.png",
  3: "/BuyerCopy/benefit-4a.png",
  4: "/BuyerCopy/benefit-5a.png",
  5: "/BuyerCopy/benefit-6.png",
  6: "/BuyerCopy/benefit-7.png",
  7: "/BuyerCopy/benefit-8.png",
  8: "/BuyerCopy/benefit-9.png",
  9: "/BuyerCopy/benefit-10.png",
  10: "/BuyerCopy/benefit-11.png",
};

const chipLabels: Record<string, string> = {
  "uk-resident-director": "UK Director",
  "banking-credibility": "Banking",
  "dedicated-support": "Support",
  "privacy-protection": "Privacy",
  "fast-setup": "Fast Setup",
  "resignation-letter": "Resignation",
  "power-of-attorney": "POA",
  "direction-letter": "Direction Letter",
  "shareholder-resolution": "Resolution",
  "declaration-of-trust": "Trust",
  "share-transfer-form": "Share Transfer",
};

export const buyerStoryCarouselFeatures: CarouselFeature[] = buyerFeatures.map((feature, index) => ({
  id: feature.id,
  label: feature.title,
  chipLabel: chipLabels[feature.id] ?? feature.title,
  icon: feature.icon,
  image: storyImages[index] ?? feature.image,
  description: feature.description,
}));

/** Features that have a dedicated story image asset */
export const buyerStoryCarouselFeaturesWithImages = buyerStoryCarouselFeatures.filter(
  (feature) => Boolean(feature.image),
);
