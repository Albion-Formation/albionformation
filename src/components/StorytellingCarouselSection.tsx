import FeatureCarousel from "@/components/ui/feature-carousel";
import { buyerStoryCarouselFeatures } from "@/data/buyerStoryCarouselFeatures";

const StorytellingCarouselSection = () => {
  return (
    <section
      id="everything-included"
      className="relative bg-gradient-to-b from-background via-secondary/30 to-background py-20 lg:pb-16 lg:pt-28"
      aria-label="Service features"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.04)_0%,transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-6 max-w-3xl text-center lg:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Everything Included
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            A complete nominee director service, built for international founders
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From appointment to legal documentation — every component you need to operate a UK company
            confidently, delivered in one structured package.
          </p>
        </header>

        <FeatureCarousel
          features={buyerStoryCarouselFeatures}
          badgeLabel="Included"
          className="md:p-0"
        />
      </div>
    </section>
  );
};

export default StorytellingCarouselSection;
