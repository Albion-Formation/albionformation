import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface AccordionFeatureItem {
  id: number;
  step: string;
  title: string;
  image: string;
  description: string;
}

export interface AccordionFeatureSectionProps {
  title?: string;
  description?: string;
  features: AccordionFeatureItem[];
  className?: string;
}

const AccordionFeatureSection = ({
  title,
  description,
  features,
  className,
}: AccordionFeatureSectionProps) => {
  const [activeTabId, setActiveTabId] = useState(features[0]?.id ?? 1);
  const [activeImage, setActiveImage] = useState(features[0]?.image ?? "");

  const handleValueChange = (value: string) => {
    if (!value) return;

    const id = Number.parseInt(value.replace("item-", ""), 10);
    const feature = features.find((item) => item.id === id);
    if (!feature) return;

    setActiveTabId(feature.id);
    setActiveImage(feature.image);
  };

  return (
    <div className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
            )}
          </header>
        )}

        <div className="grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <Accordion
              type="single"
              collapsible={false}
              className="w-full"
              defaultValue={`item-${features[0]?.id ?? 1}`}
              onValueChange={handleValueChange}
            >
              {features.map((feature) => (
                <AccordionItem key={feature.id} value={`item-${feature.id}`}>
                  <AccordionTrigger className="cursor-pointer py-5 !no-underline transition hover:no-underline">
                    <span className="flex min-w-0 items-start gap-4 pr-2 text-left">
                      <span
                        className={cn(
                          "mt-0.5 shrink-0 text-sm font-semibold tabular-nums tracking-wider",
                          feature.id === activeTabId ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {feature.step}
                      </span>
                      <span
                        className={cn(
                          "text-lg font-semibold md:text-xl",
                          feature.id === activeTabId ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {feature.title}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="ml-10 text-muted-foreground">{feature.description}</p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full max-h-80 w-full rounded-xl object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative hidden min-w-0 overflow-hidden rounded-xl bg-muted md:block">
            <img
              src={activeImage}
              alt=""
              className="aspect-[4/3] w-full rounded-xl object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AccordionFeatureSection };
