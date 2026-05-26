import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyerHeroSection from "@/components/BuyerHeroSection";
import BuyerNomineeDirectorSection from "@/components/BuyerNomineeDirectorSection";
import BuyerWhyMattersSection from "@/components/BuyerWhyMattersSection";
import BuyerNomineeDirectorWhySection from "@/components/BuyerNomineeDirectorWhySection";
import BuyerNomineeDirectorDutiesSection from "@/components/BuyerNomineeDirectorDutiesSection";
import BuyerNomineeDirectorAudienceSection from "@/components/BuyerNomineeDirectorAudienceSection";
import BuyerWhatWeNeedSection from "@/components/BuyerWhatWeNeedSection";
import BuyerUseCasesSection from "@/components/BuyerUseCasesSection";
import BuyerWhyChooseAlbionSection from "@/components/BuyerWhyChooseAlbionSection";
import BuyerServiceWorksSection from "@/components/BuyerServiceWorksSection";
import StorytellingCarouselSection from "@/components/StorytellingCarouselSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesCarouselSection from "@/components/FeaturesCarouselSection";
import BuyerCtaSection from "@/components/BuyerCtaSection";
import BuyerApplicationFormSection from "@/components/BuyerApplicationFormSection";
import BuyerFaqSection from "@/components/BuyerFaqSection";
import BuyerTrustIndicatorsSection from "@/components/BuyerTrustIndicatorsSection";
import type { BuyerLandingFormType } from "@/lib/buyerLandingRoutes";
import type { BuyerHeroVariant } from "@/data/buyerHeroContent";

interface BuyerLandingPageProps {
  formType?: BuyerLandingFormType;
  heroVariant?: BuyerHeroVariant;
}

const BuyerLandingPage = ({
  formType = "nominee-buyers",
  heroVariant = "primary",
}: BuyerLandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BuyerHeroSection variant={heroVariant} />

      {heroVariant === "secondary" && <BuyerNomineeDirectorSection />}

      {heroVariant === "secondary" && <BuyerWhyMattersSection />}

      {heroVariant === "secondary" && <BuyerNomineeDirectorWhySection />}

      {heroVariant === "secondary" && <BuyerNomineeDirectorDutiesSection />}

      {heroVariant === "secondary" && <BuyerNomineeDirectorAudienceSection />}

      <StorytellingCarouselSection />

      {heroVariant === "secondary" && <BuyerWhatWeNeedSection />}

      {heroVariant === "secondary" && <BuyerUseCasesSection />}

      {heroVariant === "secondary" && <BuyerWhyChooseAlbionSection />}

      {heroVariant === "secondary" && <BuyerServiceWorksSection />}

      <TestimonialsSection />

      {heroVariant !== "secondary" && <FeaturesCarouselSection />}

      <BuyerCtaSection />

      <BuyerApplicationFormSection formType={formType} />

      <BuyerFaqSection />

      <BuyerTrustIndicatorsSection layout={heroVariant === "secondary" ? "3x2" : "3x1"} />

      <Footer />
    </div>
  );
};

export default BuyerLandingPage;
