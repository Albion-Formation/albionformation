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
  const isV2 = heroVariant === "secondary";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BuyerHeroSection variant={heroVariant} />

      {isV2 && (
        <>
          {/* Understand: urgency, definition, context */}
          <BuyerWhyMattersSection />
          <BuyerNomineeDirectorSection />
          <BuyerNomineeDirectorWhySection />

          {/* Who it's for */}
          <BuyerNomineeDirectorAudienceSection />
          <BuyerUseCasesSection />
        </>
      )}

      {/* What you get */}
      <StorytellingCarouselSection />

      {isV2 && (
        <>
          <BuyerWhyChooseAlbionSection />
          <BuyerNomineeDirectorDutiesSection />
          <BuyerServiceWorksSection />
          <BuyerWhatWeNeedSection />
        </>
      )}

      <TestimonialsSection />

      {!isV2 && <FeaturesCarouselSection />}

      {isV2 && <BuyerTrustIndicatorsSection layout="3x2" />}

      <BuyerCtaSection />

      <BuyerApplicationFormSection formType={formType} />

      <BuyerFaqSection />

      {!isV2 && <BuyerTrustIndicatorsSection layout="3x1" />}

      <Footer />
    </div>
  );
};

export default BuyerLandingPage;
