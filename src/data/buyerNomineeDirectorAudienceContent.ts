export type NomineeDirectorAudienceIconKey =
  | "globe"
  | "building"
  | "shield"
  | "shopping-cart"
  | "landmark"
  | "smartphone";

export const buyerNomineeDirectorAudienceContent = {
  title: "Who Needs a Nominee Resident Director?",
  features: [
    {
      title: "Non-Resident Entrepreneurs",
      description: "You're based abroad. You need a UK company. You need a UK director.",
      iconKey: "globe" as const,
    },
    {
      title: "International Founders",
      description: "Building a UK presence means credibility with banks, partners, and investors.",
      iconKey: "building" as const,
    },
    {
      title: "Privacy-First Business Owners",
      description:
        "You want your company compliant and professional—your name off the public register.",
      iconKey: "shield" as const,
    },
    {
      title: "E-Commerce & Marketplace Sellers",
      description: "Amazon, eBay, TikTok Shop. They all want a real UK director for verification.",
      iconKey: "shopping-cart" as const,
    },
    {
      title: "Property & Investment Structures",
      description: "Holding companies, SPVs, property investments. You need proper governance.",
      iconKey: "landmark" as const,
    },
    {
      title: "Digital Businesses & Fintech",
      description: "Banks require a UK director for account opening and compliance.",
      iconKey: "smartphone" as const,
    },
  ],
};
