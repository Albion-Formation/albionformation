import type { LucideIcon } from "lucide-react";
import { Globe, FileCheck, Headphones } from "lucide-react";

export interface CarouselFeature {
  id: string;
  label: string;
  chipLabel?: string;
  icon: LucideIcon;
  image?: string;
  description: string;
}

export const buyerCarouselFeatures: CarouselFeature[] = [
  {
    id: "anywhere",
    label: "You Don't Have to Be in the UK",
    chipLabel: "No UK Required",
    icon: Globe,
    image: "/BuyerCopy/feature-1.png",
    description:
      "No office visits, no paperwork handoff. Complete everything from your home in any country, with real-time updates on your registration status.",
  },
  {
    id: "complexity",
    label: "We Handle the Complexity",
    chipLabel: "We Handle It All",
    icon: FileCheck,
    image:
      "/BuyerCopy/feature-2.png",
    description:
      "Companies House filing, nominee directors, compliance guidance, and banking support for non-residents — all taken care of for you.",
  },
  {
    id: "support",
    label: "Expert Support That Actually Cares",
    chipLabel: "Expert Support",
    icon: Headphones,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
    description:
      "An assigned expert guides you through every step. Available by phone, email, or live chat — with lifetime support, not just registration.",
  },
];
