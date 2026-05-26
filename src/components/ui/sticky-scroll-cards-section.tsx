import { useState, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

export type StickyScrollCard = {
  title: string;
  description: string;
  bullets?: string[];
  imageUrl: string;
  bgColor?: string;
};

export type StickyScrollCardsSectionProps = {
  title: string;
  description?: string;
  cards: StickyScrollCard[];
  stickyTop?: string;
  className?: string;
};

const useScrollAnimation = (): [RefObject<HTMLElement>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

type AnimatedBlockProps = {
  as?: "h2" | "p";
  className?: string;
  delayClass?: string;
  children: ReactNode;
};

const AnimatedBlock = ({ as: Tag = "h2", className, delayClass = "", children }: AnimatedBlockProps) => {
  const [ref, inView] = useScrollAnimation();

  return (
    <Tag
      ref={ref as RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        delayClass,
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </Tag>
  );
};

export function StickyScrollCardsSection({
  title,
  description,
  cards,
  stickyTop = "120px",
  className,
}: StickyScrollCardsSectionProps) {
  return (
    <div className={cn("bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <AnimatedBlock className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </AnimatedBlock>
          {description && (
            <AnimatedBlock
              as="p"
              delayClass="delay-200"
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {description}
            </AnimatedBlock>
          )}
        </div>

        <div className="w-full pb-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={cn(
                "sticky mb-16 grid grid-cols-1 items-center gap-6 rounded-3xl border border-border/60 p-8 md:grid-cols-2 md:gap-10 md:p-12",
                card.bgColor ?? "bg-secondary",
              )}
              style={{ top: stickyTop, zIndex: index + 1 }}
            >
              <div className="flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{card.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{card.description}</p>
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  loading="lazy"
                  className="h-auto w-full rounded-xl object-cover shadow-md aspect-[4/3]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/334155?text=Image+Unavailable";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
