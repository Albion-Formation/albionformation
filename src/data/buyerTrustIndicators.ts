import { ShieldCheck, Landmark, Users, Headset, type LucideIcon } from "lucide-react";

export interface TrustIndicator {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "gold" | "green";
}

export const buyerTrustIndicators: TrustIndicator[] = [
  {
    icon: ShieldCheck,
    title: "Authorized by Companies House",
    description: "Fully compliant UK company formation support.",
    accent: "gold",
  },
  {
    icon: Landmark,
    title: "HMRC Registered Partner",
    description: "Trusted assistance for tax and registration processes.",
    accent: "green",
  },
  {
    icon: Users,
    title: "10,000+ Successful Registrations",
    description: "Helping founders worldwide launch businesses confidently.",
    accent: "gold",
  },
  {
    icon: Headset,
    title: "24-Hour Support",
    description: "Dedicated assistance available anytime you need help.",
    accent: "green",
  },
];
