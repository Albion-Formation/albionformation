export interface BuyerHeroContent {
  headline: string;
  intro: string;
  supportingParagraphs?: string[];
  ctaLabel: string;
  imageSrc?: string;
}

export const buyerHeroContent = {
  primary: {
    headline: "Ready to start your UK company from anywhere in the world?",
    intro:
      "Registering a UK limited company shouldn't require you to be in the UK. We handle all the legal filings, documentation, and compliance headaches, freeing you to start trading immediately.",
    supportingParagraphs: [
      "Starting a UK limited company is complicated. Tax codes, Companies House forms, banking requirements, compliance deadlines. And if you're abroad, it feels impossible.",
      "We've helped over 10,000 international founders launch UK companies. We know every hurdle. We've built a process that eliminates the guesswork, and gets your business registered, compliant, and ready to trade in days instead of months.",
    ],
    ctaLabel: "Contact us",
    imageSrc: "/BuyerCopy/buyer-hero-img4.png",
  },
  secondary: {
    headline:
      "Trusted UK Nominee Director Services—Get a Nominee Director Instantly, Fully Compliant & Confidential",
    intro:
      "Start and run your UK company confidently with Albion Formation. If needed, receive an instant nominee director, with our experienced professionals serving as your official representative on Companies House and HMRC records, guaranteeing full compliance while you keep complete control over your business operations.",
    supportingParagraphs: [
      "Whether you're a non-resident founder, international investor, or privacy-focused entrepreneur, our service ensures smooth setup, expert governance, and credibility that's ready for investors.",
    ],
    ctaLabel: "Contact us",
    imageSrc: "/BuyerCopy/buyer-hero-img5.png",
  },
} satisfies Record<string, BuyerHeroContent>;

export type BuyerHeroVariant = keyof typeof buyerHeroContent;
