import * as React from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 rounded-2xl p-4 text-left",
        "bg-card text-foreground transition-all hover:bg-secondary/50 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "data-[state=open]:bg-secondary/60 data-[state=open]:shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <HelpCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
        <span className="text-base font-medium tracking-wide sm:text-lg">{children}</span>
      </div>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 text-foreground" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-muted-foreground",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-2",
      className,
    )}
    {...props}
  >
    <div className="ml-14 mt-4">
      <div className="flex items-start gap-4 rounded-2xl bg-card p-4 shadow-md transition-all">
        <span className="flex-1 text-sm leading-relaxed sm:text-base">{children}</span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  className?: string;
  defaultOpenIndex?: number;
}

export function FaqAccordion({ faqs, className, defaultOpenIndex = 0 }: FaqAccordionProps) {
  return (
    <CustomAccordion
      type="single"
      collapsible
      defaultValue={defaultOpenIndex >= 0 ? `item-${defaultOpenIndex}` : undefined}
      className={cn("space-y-4", className)}
    >
      {faqs.map((faq, index) => (
        <CustomAccordionItem key={faq.question} value={`item-${index}`}>
          <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
          <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
        </CustomAccordionItem>
      ))}
    </CustomAccordion>
  );
}

export { CustomAccordion, CustomAccordionItem, CustomAccordionTrigger, CustomAccordionContent };
