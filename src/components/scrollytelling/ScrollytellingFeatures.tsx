import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buyerFeatures, type BuyerFeature } from "@/data/buyerFeatures";
import FeatureVisual from "@/components/scrollytelling/FeatureVisual";
import { cn } from "@/lib/utils";

const SCROLL_STEP_HEIGHT = "h-[45vh] min-h-[340px]";
const VISUAL_HEIGHT = "h-[360px] lg:h-[380px]";
const STAGE_HEIGHT = 420;
const STICKY_TOP = `max(7rem, calc(50vh - ${STAGE_HEIGHT / 2}px))`;

interface ScrollytellingFeaturesProps {
  features?: BuyerFeature[];
  sectionId?: string;
  ariaLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "gradient" | "plain";
}

function MobileFeatureBlock({ feature, index }: { feature: BuyerFeature; index: number }) {
  return (
    <article className="space-y-6">
      <FeatureVisual feature={feature} isActive compact className="h-[300px]" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-xl font-bold text-foreground">{feature.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>
    </article>
  );
}

const ScrollytellingFeatures = ({
  features = buyerFeatures,
  sectionId,
  ariaLabel = "Service features",
  eyebrow = "Everything Included",
  title = "A complete nominee director service, built for international founders",
  description = "From appointment to legal documentation — every component you need to operate a UK company confidently, delivered in one structured package.",
  variant = "gradient",
}: ScrollytellingFeaturesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  const setStepRef = (index: number, node: HTMLElement | null) => {
    stepRefs.current[index] = node;
  };

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, features.length);
  }, [features.length]);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (steps.length === 0) return;

    const updateActiveStep = () => {
      const centerY = window.innerHeight * 0.5;
      let nextIndex = 0;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom > centerY) {
          nextIndex = index;
        }
      });

      const firstRect = steps[0].getBoundingClientRect();
      if (firstRect.top > centerY) {
        nextIndex = 0;
      }

      const lastIndex = steps.length - 1;
      const lastRect = steps[lastIndex].getBoundingClientRect();
      if (lastRect.bottom < centerY) {
        nextIndex = lastIndex;
      }

      setActiveIndex(nextIndex);
    };

    updateActiveStep();

    const observer = new IntersectionObserver(() => updateActiveStep(), {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    steps.forEach((step) => observer.observe(step));
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [features.length]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id={sectionId}
      className={cn(
        "relative py-20 lg:pb-16 lg:pt-28",
        variant === "gradient"
          ? "bg-gradient-to-b from-background via-secondary/30 to-background"
          : "bg-background",
      )}
      aria-label={ariaLabel}
    >
      {variant === "gradient" && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.04)_0%,transparent_50%)]"
          aria-hidden
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 className={cn("text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl", eyebrow && "mt-4")}>
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </header>

        <div className="relative hidden lg:block">
          <div className="sticky z-10" style={{ top: STICKY_TOP }}>
            <div className="relative w-full" style={{ height: STAGE_HEIGHT }}>
              <div className="flex h-[calc(100%-2.5rem)] items-center">
                <div className="grid w-full grid-cols-2 items-center gap-16 xl:gap-20">
                  <div className="relative flex min-h-[200px] items-center">
                    {features.map((feature, index) => (
                      <motion.article
                        key={feature.id}
                        aria-hidden={activeIndex !== index}
                        aria-current={activeIndex === index ? "step" : undefined}
                        initial={false}
                        animate={{
                          opacity: activeIndex === index ? 1 : 0,
                          y: activeIndex === index ? 0 : prefersReducedMotion ? 0 : 10,
                        }}
                        transition={transition}
                        className="absolute inset-0 flex items-center"
                        style={{
                          pointerEvents: activeIndex === index ? "auto" : "none",
                          visibility: activeIndex === index ? "visible" : "hidden",
                        }}
                      >
                        <div className="max-w-lg">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                            {feature.title}
                          </h3>
                          <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                            {feature.description}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  <div className="pr-6 xl:pr-10">
                    <div className={cn("relative w-full", VISUAL_HEIGHT)}>
                      {features.map((feature, index) => (
                        <motion.div
                          key={feature.id}
                          aria-hidden={activeIndex !== index}
                          className="absolute inset-0"
                          initial={false}
                          animate={{
                            opacity: activeIndex === index ? 1 : 0,
                            y: activeIndex === index ? 0 : prefersReducedMotion ? 0 : 12,
                          }}
                          transition={transition}
                          style={{
                            pointerEvents: activeIndex === index ? "auto" : "none",
                            visibility: activeIndex === index ? "visible" : "hidden",
                            zIndex: activeIndex === index ? 1 : 0,
                          }}
                        >
                          <FeatureVisual
                            feature={feature}
                            isActive={activeIndex === index}
                            className="h-full"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between pr-6 xl:pr-10">
                <p className="text-sm font-medium text-muted-foreground">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </p>
                <div className="flex gap-1.5" role="tablist" aria-label="Feature progress">
                  {features.map((feature, index) => (
                    <span
                      key={feature.id}
                      role="tab"
                      aria-selected={activeIndex === index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeIndex === index ? "w-6 bg-primary" : "w-1.5 bg-border",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: -STAGE_HEIGHT }}>
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(node) => setStepRef(index, node)}
                data-index={index}
                aria-hidden="true"
                className={SCROLL_STEP_HEIGHT}
              />
            ))}
          </div>
        </div>

        <div className="space-y-12 lg:hidden">
          {features.map((feature, index) => (
            <MobileFeatureBlock key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingFeatures;
