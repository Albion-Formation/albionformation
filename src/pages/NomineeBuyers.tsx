import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyerHeroSection from "@/components/BuyerHeroSection";
import StorytellingCarouselSection from "@/components/StorytellingCarouselSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesCarouselSection from "@/components/FeaturesCarouselSection";
import BuyerCtaSection from "@/components/BuyerCtaSection";
import BuyerApplicationFormSection from "@/components/BuyerApplicationFormSection";
import BuyerFaqSection from "@/components/BuyerFaqSection";
import BuyerTrustIndicatorsSection from "@/components/BuyerTrustIndicatorsSection";

const NomineeBuyers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BuyerHeroSection />

      <StorytellingCarouselSection />

      <TestimonialsSection />

      <FeaturesCarouselSection />

      <BuyerCtaSection />

      <BuyerApplicationFormSection />

      <BuyerFaqSection />

      <BuyerTrustIndicatorsSection />

      <Footer />
    </div>
  );
};

export default NomineeBuyers;
