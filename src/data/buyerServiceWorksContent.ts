import type { AccordionFeatureItem } from "@/components/ui/accordion-feature-section";

export const buyerServiceWorksContent = {
  title: "How Our UK Nominee Director Service Works",
  description: "Four simple steps to keep your company compliant, protected, and ready for growth.",
  features: [
    {
      id: 1,
      step: "01",
      title: "Choose a Package",
      description:
        "Pick the nominee director package that best fits your business structure and compliance requirements.",
      image:
        "https://images.unsplash.com/photo-1454165804603-c33757a4ab44?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      step: "02",
      title: "Submit Your Company Information",
      description:
        "Provide your beneficial owner details and identification documents for KYC and AML verification.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      step: "03",
      title: "Director Appointment & Registration",
      description:
        "We appoint the nominee director officially and manage the necessary filings with Companies House and HMRC.",
      image:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      step: "04",
      title: "Ongoing Assistance",
      description:
        "Receive continued support with renewals, compliance reviews, and important regulatory updates.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop",
    },
  ] satisfies AccordionFeatureItem[],
};
