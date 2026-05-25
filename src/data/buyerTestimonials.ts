export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const buyerTestimonials: TestimonialItem[] = [
  {
    quote:
      "We needed a UK director urgently and everything was completed in less than 24 hours. Albion handled the entire appointment without delays.",
    author: "James T.",
    role: "Ecommerce Founder",
    company: "Dubai, UAE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "The process was smooth, professional, and the legal documentation gave us real confidence operating from abroad.",
    author: "Priya M.",
    role: "Agency Owner",
    company: "Singapore",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "Very responsive support team. A better experience than every other nominee provider we contacted.",
    author: "Marco L.",
    role: "Fintech Founder",
    company: "Berlin, Germany",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
];
