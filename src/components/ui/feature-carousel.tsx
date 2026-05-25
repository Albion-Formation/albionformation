import { useState, useEffect, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buyerCarouselFeatures, type CarouselFeature } from "@/data/buyerCarouselFeatures";
import { cn } from "@/lib/utils";

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;
const PANEL_BLUE = "#62B2FE";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface FeatureCarouselProps {
  features?: CarouselFeature[];
  className?: string;
  badgeLabel?: string;
}

export function FeatureCarousel({
  features = buyerCarouselFeatures,
  className,
  badgeLabel = "Key Benefit",
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused || features.length <= 1) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, features.length]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className={cn("mx-auto w-full max-w-7xl md:p-8", className)}>
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-border/40 lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        <div
          className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16"
          style={{ backgroundColor: PANEL_BLUE }}
        >
          <div
            className="absolute inset-x-0 top-0 z-40 h-12 bg-gradient-to-b md:h-20 lg:h-16"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${PANEL_BLUE}, ${PANEL_BLUE}cc, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-40 h-12 bg-gradient-to-t md:h-20 lg:h-16"
            style={{
              backgroundImage: `linear-gradient(to top, ${PANEL_BLUE}, ${PANEL_BLUE}cc, transparent)`,
            }}
          />

          <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-features.length / 2, features.length / 2, distance);
              const Icon = feature.icon as LucideIcon;

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-10 md:py-5 lg:px-8 lg:py-4",
                      isActive
                        ? "z-10 border-white bg-white text-[#62B2FE]"
                        : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-[#62B2FE]" : "text-white/40",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                    </div>
                    <span className="whitespace-nowrap text-sm font-normal uppercase tracking-tight md:text-[15px]">
                      {feature.chipLabel ?? feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-border/20 bg-secondary/30 px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              const Icon = feature.icon as LucideIcon;

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 border-background bg-background md:rounded-[2.8rem] md:border-8"
                >
                  {feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700",
                        isActive ? "blur-0 grayscale-0" : "brightness-75 blur-[2px] grayscale",
                      )}
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-full w-full flex-col items-center justify-center gap-4 bg-primary/10 transition-all duration-700",
                        isActive ? "opacity-100" : "opacity-60",
                      )}
                    >
                      <Icon className="h-16 w-16 text-primary/50" strokeWidth={1.5} aria-hidden />
                      <span className="px-6 text-center text-sm font-medium text-primary/60">
                        {feature.label}
                      </span>
                    </div>
                  )}

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                      >
                        <div className="mb-3 w-fit rounded-full border border-border/50 bg-background px-4 py-1.5 text-[11px] font-normal uppercase tracking-[0.2em] text-foreground shadow-lg">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-xl font-normal leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute left-8 top-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="font-mono text-[10px] font-normal uppercase tracking-[0.3em] text-white/80">
                      {badgeLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
