import { CtaCard } from "@/components/ui/call-to-action-cta";

const CALENDLY_URL = "https://calendly.com/development-albionformation/30min";

const BuyerCtaSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CtaCard
          title="Ready to Launch?"
          description="Get your UK nominee director appointed in as little as 24 hours. Speak with our team and start your company setup today."
          buttonText="Schedule a Free Consultation"
          buttonHref={CALENDLY_URL}
          imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
          mode="button"
        />
      </div>
    </section>
  );
};

export default BuyerCtaSection;
