import type { StickyScrollCard } from "@/components/ui/sticky-scroll-cards-section";

export const buyerNomineeDirectorDutiesContent = {
  title: "Duties of a UK Nominee Director",
  description:
    "Each nominee director is appointed to act with professionalism, integrity, and complete confidentiality, ensuring your company stays compliant, secure, and ready for investors. While the beneficial owner maintains full control over daily operations, our nominee directors provide the formal governance mandated by UK law.",
  cards: [
    {
      title: "Statutory Compliance",
      description: "Our nominee directors guarantee all legal responsibilities are fulfilled, including:",
      bullets: [
        "Keeping accurate company registers and statutory records",
        "Filing annual returns and confirmation statements with Companies House",
        "Submitting accounts and tax returns to HMRC",
        "Supporting compliance with UK corporate governance standards",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-secondary",
    },
    {
      title: "Non-Interference in Operations",
      description:
        "Nominee directors do not participate in daily management or business decisions. The beneficial owner retains full operational control, while the nominee ensures statutory obligations are met.",
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-muted",
    },
    {
      title: "Fiduciary Duties",
      description:
        "All nominee directors act lawfully, ethically, and in good faith, upholding the highest professional standards by:",
      bullets: [
        "Acting in the company's best interests",
        "Avoiding conflicts of interest",
        "Ensuring compliance with all applicable UK regulatory frameworks",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-accent",
    },
  ] satisfies StickyScrollCard[],
};
