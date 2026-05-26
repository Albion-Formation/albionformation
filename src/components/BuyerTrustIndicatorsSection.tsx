import { LogoCloud } from "@/components/ui/logo-cloud-2";

const BuyerTrustIndicatorsSection = () => {
  return (
    <section
      aria-labelledby="compliance-logo-cloud-heading"
      className="bg-background py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="compliance-logo-cloud-heading"
          className="mb-6 text-center text-lg font-medium tracking-tight text-muted-foreground md:text-2xl"
        >
          Built on{" "}
          <span className="font-semibold text-primary">compliance</span>, experience, and support.
        </h2>

        <LogoCloud />
      </div>
    </section>
  );
};

export default BuyerTrustIndicatorsSection;
