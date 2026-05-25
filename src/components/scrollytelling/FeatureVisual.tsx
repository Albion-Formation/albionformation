import type { ReactNode, ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Building2,
  Banknote,
  Headphones,
  Lock,
  Zap,
  FileText,
  PenLine,
  ScrollText,
  Users,
  ShieldCheck,
  ArrowLeftRight,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Clock,
  Stamp,
} from "lucide-react";
import type { BuyerFeature, FeatureVisualType } from "@/data/buyerFeatures";
import { cn } from "@/lib/utils";

interface FeatureVisualProps {
  feature: BuyerFeature;
  isActive?: boolean;
  compact?: boolean;
  className?: string;
}

const visualTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

function ImageVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  if (!feature.image) return null;

  return (
    <motion.div
      animate={isActive ? { opacity: 1 } : { opacity: 0.95 }}
      transition={visualTransition}
      className={cn("relative h-full w-full", compact ? "min-h-[280px]" : "h-full", className)}
    >
      <img
        src={feature.image}
        alt={feature.title}
        className="h-full w-full object-contain object-center"
      />
    </motion.div>
  );
}

function VisualShell({
  feature,
  isActive,
  compact,
  className,
  children,
}: FeatureVisualProps & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-5 shadow-[0_16px_48px_-20px_rgba(15,23,42,0.15)] backdrop-blur-xl lg:rounded-3xl lg:p-6",
        compact ? "min-h-[280px]" : "h-full",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
          feature.accent,
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

function DirectorVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Companies House
        </span>
        <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">Verified</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <motion.div
          animate={isActive ? { y: 0, opacity: 1 } : { y: 8, opacity: 0.7 }}
          transition={visualTransition}
          className="rounded-2xl border border-border/50 bg-white/80 p-5 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Appointed Director</p>
              <p className="text-lg font-semibold text-foreground">UK Resident · British Citizen</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-secondary/80 px-3 py-2">
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium text-foreground">Active</p>
            </div>
            <div className="rounded-xl bg-secondary/80 px-3 py-2">
              <p className="text-muted-foreground">Jurisdiction</p>
              <p className="font-medium text-foreground">England & Wales</p>
            </div>
          </div>
        </motion.div>
      </div>
    </VisualShell>
  );
}

function BankingVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Banknote className="h-4 w-4" />
        Business Profile
      </div>
      <div className="grid flex-1 grid-rows-[auto_1fr] gap-4">
        <motion.div
          animate={isActive ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.75 }}
          transition={visualTransition}
          className="rounded-2xl border border-border/50 bg-white/85 p-4 shadow-md"
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Credibility score</p>
              <p className="text-3xl font-bold text-foreground">94%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {["Banking", "Payments", "KYC", "Platforms"].map((label, i) => (
            <motion.div
              key={label}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 6 }}
              transition={{ ...visualTransition, delay: i * 0.05 }}
              className="rounded-xl border border-border/40 bg-white/75 p-3"
            >
              <CheckCircle2 className="mb-2 h-4 w-4 text-emerald-600" />
              <p className="text-xs font-medium text-foreground">{label}</p>
              <p className="text-[10px] text-muted-foreground">Approved</p>
            </motion.div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

function SupportVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Headphones className="h-4 w-4" />
        Live Support
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2">
        {[
          { from: "support", text: "Hi — how can we help with your UK company today?" },
          { from: "user", text: "I need help with my confirmation statement filing." },
          { from: "support", text: "Absolutely. We'll prepare and review everything for you." },
        ].map((msg, i) => (
          <motion.div
            key={i}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: msg.from === "user" ? 8 : -8 }}
            transition={{ ...visualTransition, delay: i * 0.08 }}
            className={cn(
              "max-w-[85%] rounded-xl px-3 py-2 text-xs shadow-sm lg:text-sm",
              msg.from === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-white/90 text-foreground",
            )}
          >
            {msg.text}
          </motion.div>
        ))}
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-border/50 bg-white/80 px-3 py-1.5 text-[11px] text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          Response time · under 2 hours
        </div>
      </div>
    </VisualShell>
  );
}

function PrivacyVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <motion.div
          animate={isActive ? { scale: 1, rotate: 0 } : { scale: 0.92, rotate: -2 }}
          transition={visualTransition}
          className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/60 bg-white/70 shadow-xl"
        >
          <Lock className="h-12 w-12 text-primary" />
          <motion.div
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={visualTransition}
            className="absolute -right-2 -top-2 rounded-full bg-success px-2 py-1 text-[10px] font-semibold text-white"
          >
            Protected
          </motion.div>
        </motion.div>
        <div className="w-full space-y-2">
          {["Public records shielded", "Beneficial ownership retained", "Encrypted documentation"].map(
            (item, i) => (
              <motion.div
                key={item}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: -6 }}
                transition={{ ...visualTransition, delay: i * 0.06 }}
                className="flex items-center gap-2 rounded-xl bg-white/75 px-4 py-2 text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
                {item}
              </motion.div>
            ),
          )}
        </div>
      </div>
    </VisualShell>
  );
}

function FastSetupVisual({ feature, isActive, compact, className }: FeatureVisualProps) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Zap className="h-4 w-4" />
        Onboarding Timeline
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {[
          { step: "Application submitted", time: "0h", done: true },
          { step: "Compliance review", time: "4h", done: true },
          { step: "Director appointed", time: "24h", done: true },
          { step: "Documents delivered", time: "48h", done: false },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.55, x: 10 }}
            transition={{ ...visualTransition, delay: i * 0.07 }}
            className="flex items-center gap-3 rounded-xl border border-border/40 bg-white/80 px-3 py-2"
          >
            <div
              className={cn(
                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                item.done ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground",
              )}
            >
              {item.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground lg:text-sm">{item.step}</p>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </VisualShell>
  );
}

function DocumentVisual({
  feature,
  isActive,
  compact,
  className,
  docTitle,
  docSubtitle,
  icon: Icon,
  lines,
}: FeatureVisualProps & {
  docTitle: string;
  docSubtitle: string;
  icon: typeof FileText;
  lines: string[];
}) {
  return (
    <VisualShell feature={feature} isActive={isActive} compact={compact} className={className}>
      <motion.div
        animate={isActive ? { y: 0, rotate: 0, opacity: 1 } : { y: 12, rotate: 2, opacity: 0.8 }}
        transition={visualTransition}
        className="relative mx-auto w-full max-w-sm flex-1"
      >
        <div className="absolute -right-4 top-8 h-full w-full rotate-3 rounded-2xl border border-border/30 bg-white/40 shadow-sm" />
        <div className="absolute -left-3 top-4 h-full w-full -rotate-2 rounded-2xl border border-border/30 bg-white/50 shadow-sm" />
        <div className="relative rounded-2xl border border-border/60 bg-white/95 p-6 shadow-xl">
          <div className="flex items-start justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{docTitle}</p>
                <p className="text-xs text-muted-foreground">{docSubtitle}</p>
              </div>
            </div>
            <Stamp className="h-5 w-5 text-primary/40" />
          </div>
          <div className="mt-5 space-y-2">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                animate={isActive ? { opacity: 1, width: "100%" } : { opacity: 0.35, width: "75%" }}
                transition={{ ...visualTransition, delay: i * 0.05 }}
                className="h-2 rounded-full bg-secondary"
                style={{ width: `${85 - i * 8}%` }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="h-8 w-24 rounded-md border border-dashed border-border" />
            <span className="rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-success">
              Legally Compliant
            </span>
          </div>
        </div>
      </motion.div>
    </VisualShell>
  );
}

const visualMap: Record<FeatureVisualType, (props: FeatureVisualProps) => ReactElement> = {
  director: DirectorVisual,
  banking: BankingVisual,
  support: SupportVisual,
  privacy: PrivacyVisual,
  "fast-setup": FastSetupVisual,
  resignation: (props) => (
    <DocumentVisual
      {...props}
      docTitle="Director Resignation Letter"
      docSubtitle="Companies Act compliant"
      icon={FileText}
      lines={["Formal resignation notice", "Effective date & handover", "Board acknowledgment"]}
    />
  ),
  poa: (props) => (
    <DocumentVisual
      {...props}
      docTitle="Power of Attorney"
      docSubtitle="Operational authority framework"
      icon={PenLine}
      lines={["Grant of authority", "Scope of powers", "Beneficial owner rights"]}
    />
  ),
  direction: (props) => (
    <DocumentVisual
      {...props}
      docTitle="Direction Letter"
      docSubtitle="Nominee boundary agreement"
      icon={ScrollText}
      lines={["Director instructions", "Non-interference clause", "Owner control retained"]}
    />
  ),
  resolution: (props) => (
    <DocumentVisual
      {...props}
      docTitle="Shareholder Resolution"
      docSubtitle="Corporate action record"
      icon={Users}
      lines={["Shareholder approval", "Appointment resolution", "Filing reference"]}
    />
  ),
  trust: (props) => (
    <DocumentVisual
      {...props}
      docTitle="Declaration of Trust"
      docSubtitle="Beneficial ownership record"
      icon={ShieldCheck}
      lines={["Trust declaration", "Beneficial interest", "Nominee arrangement"]}
    />
  ),
  "share-transfer": (props) => (
    <DocumentVisual
      {...props}
      docTitle="Share Transfer Form"
      docSubtitle="J30 stock transfer template"
      icon={ArrowLeftRight}
      lines={["Transferor details", "Transferee details", "Share class & consideration"]}
    />
  ),
};

const FeatureVisual = ({ feature, isActive = true, compact, className }: FeatureVisualProps) => {
  if (feature.image) {
    return (
      <ImageVisual
        feature={feature}
        isActive={isActive}
        compact={compact}
        className={className}
      />
    );
  }

  const Visual = visualMap[feature.visualType];
  return <Visual feature={feature} isActive={isActive} compact={compact} className={className} />;
};

export default FeatureVisual;
