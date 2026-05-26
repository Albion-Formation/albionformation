import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Banknote,
  Headphones,
  Lock,
  Zap,
  FileText,
  PenLine,
  ScrollText,
  Users,
  ShieldCheck,
  ArrowLeftRight,
} from "lucide-react";

export type FeatureVisualType =
  | "director"
  | "banking"
  | "support"
  | "privacy"
  | "fast-setup"
  | "resignation"
  | "poa"
  | "direction"
  | "resolution"
  | "trust"
  | "share-transfer";

export interface BuyerFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  visualType: FeatureVisualType;
  accent: string;
  image?: string;
}

export const buyerFeatures: BuyerFeature[] = [
  {
    id: "uk-resident-director",
    title: "UK Resident Director",
    description:
      "Appoint a verified UK resident British citizen as your company director, officially listed on Companies House records.",
    icon: Building2,
    visualType: "director",
    accent: "from-blue-500/20 to-indigo-500/10",
    image: "/BuyerCopy/benefit-1b.png",
  },
  {
    id: "banking-credibility",
    title: "Banking & Credibility",
    description:
      "Strengthen your UK business profile for banks, payment processors, and platform verification requirements.",
    icon: Banknote,
    visualType: "banking",
    accent: "from-emerald-500/20 to-teal-500/10",
    image: "/BuyerCopy/benefit-2a.png",
  },
  {
    id: "dedicated-support",
    title: "Dedicated Support",
    description:
      "Speak with our responsive support team whenever you need guidance on compliance, filings, or structure.",
    icon: Headphones,
    visualType: "support",
    accent: "from-violet-500/20 to-purple-500/10",
    image: "/BuyerCopy/benefit-3.png",
  },
  {
    id: "privacy-protection",
    title: "Privacy Protection",
    description:
      "Keep your personal details off public records while retaining full beneficial ownership and operational control.",
    icon: Lock,
    visualType: "privacy",
    accent: "from-slate-500/20 to-zinc-500/10",
    image: "/BuyerCopy/benefit-4.png",
  },
  {
    id: "fast-setup",
    title: "Fast Setup",
    description:
      "Complete nominee director appointments within 24 hours, with priority onboarding available for urgent requests.",
    icon: Zap,
    visualType: "fast-setup",
    accent: "from-amber-500/20 to-orange-500/10",
    image: "/BuyerCopy/benefit-5.png",
  },
  {
    id: "resignation-letter",
    title: "Resignation Letter",
    description:
      "Professionally drafted director resignation documentation when you need to update or replace appointments.",
    icon: FileText,
    visualType: "resignation",
    accent: "from-rose-500/20 to-red-500/10",
  },
  {
    id: "power-of-attorney",
    title: "Power of Attorney",
    description:
      "Legal POA framework granting operational authority while the nominee director remains on public record.",
    icon: PenLine,
    visualType: "poa",
    accent: "from-cyan-500/20 to-sky-500/10",
  },
  {
    id: "direction-letter",
    title: "Direction Letter",
    description:
      "Clear written directions defining nominee boundaries, responsibilities, and your retained control over the business.",
    icon: ScrollText,
    visualType: "direction",
    accent: "from-indigo-500/20 to-blue-500/10",
  },
  {
    id: "shareholder-resolution",
    title: "Shareholder Resolution",
    description:
      "Board-ready resolutions documenting shareholder decisions, appointments, and corporate actions.",
    icon: Users,
    visualType: "resolution",
    accent: "from-fuchsia-500/20 to-pink-500/10",
  },
  {
    id: "declaration-of-trust",
    title: "Declaration of Trust",
    description:
      "Trust declarations establishing beneficial ownership while the nominee holds legal title on your behalf.",
    icon: ShieldCheck,
    visualType: "trust",
    accent: "from-lime-500/20 to-green-500/10",
  },
  {
    id: "share-transfer-form",
    title: "Share Transfer Form",
    description:
      "Compliant share transfer documentation for ownership changes, restructures, and corporate updates.",
    icon: ArrowLeftRight,
    visualType: "share-transfer",
    accent: "from-orange-500/20 to-amber-500/10",
  },
];
