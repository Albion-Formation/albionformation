import type { BuyerFeature } from "@/data/buyerFeatures";
import { Banknote, Headphones, Lock, Receipt, ShieldCheck, Zap } from "lucide-react";

export const buyerWhyChooseAlbionFeatures: BuyerFeature[] = [
  {
    id: "speed-simplicity",
    title: "Speed & Simplicity",
    description:
      "Appoint a UK Nominee Director within days through our smooth and straightforward onboarding process.",
    icon: Zap,
    visualType: "fast-setup",
    accent: "from-amber-500/20 to-orange-500/10",
    image: "/BuyerCopy/benefit-5.png",
  },
  {
    id: "professional-guidance",
    title: "Professional Guidance",
    description:
      "Our experienced team offers step by step support from company incorporation to statutory compliance filings.",
    icon: Headphones,
    visualType: "support",
    accent: "from-violet-500/20 to-purple-500/10",
    image: "/BuyerCopy/feature-2.png",
  },
  {
    id: "complete-compliance",
    title: "Complete Compliance",
    description:
      "We ensure full compliance with Companies House and HMRC requirements to help reduce operational risk.",
    icon: ShieldCheck,
    visualType: "trust",
    accent: "from-lime-500/20 to-green-500/10",
    image: "/BuyerCopy/benefit-3.png",
  },
  {
    id: "privacy-confidentiality",
    title: "Privacy & Confidentiality",
    description:
      "All agreements are handled securely, with sensitive business information kept strictly confidential.",
    icon: Lock,
    visualType: "privacy",
    accent: "from-slate-500/20 to-zinc-500/10",
    image: "/BuyerCopy/benefit-4.png",
  },
  {
    id: "clear-pricing",
    title: "Clear & Flexible Pricing",
    description:
      "Transparent pricing with no hidden charges, plus scalable packages designed to grow with your business.",
    icon: Receipt,
    visualType: "director",
    accent: "from-blue-500/20 to-indigo-500/10",
    image: "/BuyerCopy/feature-1.png",
  },
  {
    id: "banking-support",
    title: "Business Banking Support",
    description:
      "We help facilitate UK business banking introductions where a nominee director may be required.",
    icon: Banknote,
    visualType: "banking",
    accent: "from-emerald-500/20 to-teal-500/10",
    image: "/BuyerCopy/benefit-2.png",
  },
];
