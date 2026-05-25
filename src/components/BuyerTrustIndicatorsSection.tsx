import { TrustIndicatorCard } from "@/components/ui/trust-indicator-card";
import { buyerTrustIndicators } from "@/data/buyerTrustIndicators";

const BuyerTrustIndicatorsSection = () => {
  return (
    <section
      aria-labelledby="trust-indicators-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#081120] py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#C9A962]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962]/80">Why Trust Us</p>
          <h2
            id="trust-indicators-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Built on compliance, experience, and support
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {buyerTrustIndicators.map((item, index) => (
            <TrustIndicatorCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default BuyerTrustIndicatorsSection;
