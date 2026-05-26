import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type RequirementRow = {
  id: number | string;
  category: string;
  item: string;
  status: string;
  statusVariant: "success" | "danger" | "warning";
};

export type RequirementsTableCardProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  rows?: RequirementRow[];
};

const Badge = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "success" | "danger" | "warning";
}) => {
  const styles =
    variant === "success"
      ? "bg-lime-500/15 text-lime-800 dark:text-lime-300"
      : variant === "danger"
        ? "bg-red-500/15 text-red-800 dark:text-red-300"
        : "bg-yellow-500/15 text-yellow-800 dark:text-yellow-300";

  return <span className={cn("rounded-full px-2 py-1 text-xs font-medium", styles)}>{children}</span>;
};

export default function RequirementsTableCard({
  title = "Requirements",
  subtitle,
  className,
  rows = [],
}: RequirementsTableCardProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-md shadow-foreground/5 ring-1 ring-foreground/5",
        className,
      )}
      aria-label={title}
    >
      <div className="space-y-1 border-b border-border/60 p-6">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
          <span className="size-2 rounded-full border border-black/5 bg-muted" />
        </div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted/50 supports-[backdrop-filter]:backdrop-blur-sm">
            <tr className="text-muted-foreground *:px-3 *:py-3 *:text-left *:font-medium">
              <th className="w-12">#</th>
              <th className="min-w-[140px]">Category</th>
              <th className="min-w-[260px]">Item</th>
              <th className="min-w-[100px] text-right pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/30 *:px-3 *:py-2"
              >
                <td className="text-muted-foreground">{idx + 1}</td>
                <td className="whitespace-nowrap font-medium text-foreground">{row.category}</td>
                <td>{row.item}</td>
                <td className="pr-4 text-right">
                  <Badge variant={row.statusVariant}>{row.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 p-4 text-xs text-muted-foreground">
        <span>
          Showing <strong>{rows.length}</strong> {rows.length === 1 ? "item" : "items"}
        </span>
        <span>Verification checklist</span>
      </div>
    </section>
  );
}
