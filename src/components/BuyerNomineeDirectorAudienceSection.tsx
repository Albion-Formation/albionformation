import { motion, useReducedMotion } from "framer-motion";
import { Building2, Globe, Landmark, Shield, ShoppingCart, Smartphone } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import {
  buyerNomineeDirectorAudienceContent,
  type NomineeDirectorAudienceIconKey,
} from "@/data/buyerNomineeDirectorAudienceContent";

const iconMap = {
  globe: Globe,
  building: Building2,
  shield: Shield,
  "shopping-cart": ShoppingCart,
  landmark: Landmark,
  smartphone: Smartphone,
} satisfies Record<NomineeDirectorAudienceIconKey, typeof Globe>;

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

const AnimatedContainer = ({ className, delay = 0.1, children }: AnimatedContainerProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const BuyerNomineeDirectorAudienceSection = () => {
  const { title, features } = buyerNomineeDirectorAudienceContent;

  return (
    <section className="border-t border-border/60 bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed border-border sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={{
                title: feature.title,
                description: feature.description,
                icon: iconMap[feature.iconKey],
              }}
            />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default BuyerNomineeDirectorAudienceSection;
