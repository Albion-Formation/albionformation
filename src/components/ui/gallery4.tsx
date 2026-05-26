import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href?: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  eyebrow?: string;
  description?: string;
  items: Gallery4Item[];
  className?: string;
}

const Gallery4 = ({
  title = "Case Studies",
  eyebrow,
  description,
  items,
  className,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => carouselApi.off("select", updateSelection);
  }, [carouselApi]);

  return (
    <div className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex max-w-3xl flex-col gap-4">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
            )}
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{title}</h2>
            {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label="Next slide"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-[88%] pl-4 sm:basis-[55%] lg:basis-[38%] xl:basis-[32%]"
                >
                  <GalleryCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentSlide === index ? "bg-primary" : "bg-primary/20",
              )}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryCard = ({ item }: { item: Gallery4Item }) => {
  const content = (
    <>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
        <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.title}</div>
        <div className="line-clamp-4 md:line-clamp-3">{item.description}</div>
        {item.href && (
          <div className="mt-6 flex items-center text-sm md:mt-8">
            Read more
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  );

  const cardClassName =
    "group relative h-full min-h-[24rem] w-full overflow-hidden rounded-xl sm:min-h-[26rem] lg:min-h-[22rem] lg:aspect-[4/3]";

  if (item.href) {
    return (
      <a href={item.href} className="group block rounded-xl">
        <div className={cardClassName}>{content}</div>
      </a>
    );
  }

  return (
    <div className="group rounded-xl">
      <div className={cardClassName}>{content}</div>
    </div>
  );
};

export { Gallery4 };
