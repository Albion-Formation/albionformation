import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TrustIndicator } from "@/data/buyerTrustIndicators";

interface TrustIndicatorCardProps {
  item: TrustIndicator;
  index: number;
}

const accentStyles = {
  gold: {
    iconRing: "border-[#C9A962]/40 group-hover:border-[#C9A962]/70",
    iconGlow: "group-hover:shadow-[0_0_24px_rgba(201,169,98,0.35)]",
    iconColor: "text-[#D4B978]",
    cardGlow: "group-hover:shadow-[0_8px_40px_rgba(201,169,98,0.12)]",
    gradient: "from-[#C9A962]/10 via-transparent to-transparent",
  },
  green: {
    iconRing: "border-emerald-400/30 group-hover:border-emerald-400/60",
    iconGlow: "group-hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]",
    iconColor: "text-emerald-400",
    cardGlow: "group-hover:shadow-[0_8px_40px_rgba(52,211,153,0.1)]",
    gradient: "from-emerald-400/10 via-transparent to-transparent",
  },
} as const;

export function TrustIndicatorCard({ item, index }: TrustIndicatorCardProps) {
  const styles = accentStyles[item.accent];
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-md",
        "transition-all duration-300 ease-out hover:-translate-y-1",
        styles.cardGlow,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          styles.gradient,
        )}
      />

      <div className="relative flex flex-col items-start gap-5">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#0d1829]/80 transition-all duration-300",
            styles.iconRing,
            styles.iconGlow,
            "group-hover:scale-105",
          )}
        >
          <Icon
            className={cn("h-6 w-6 transition-transform duration-300 group-hover:scale-110", styles.iconColor)}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">{item.title}</h3>
          <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
        </div>
      </div>
    </motion.article>
  );
}
