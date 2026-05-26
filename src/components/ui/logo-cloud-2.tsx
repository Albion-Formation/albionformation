import * as React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buyerComplianceLogos3x1,
  buyerComplianceLogos3x2,
} from "@/data/buyerComplianceLogos";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type LogoCloudLayout = "3x1" | "3x2";

export type LogoCloudProps = React.ComponentProps<"div"> & {
  logos?: Logo[];
  layout?: LogoCloudLayout;
};

const GRID_COLS = 3;

export function LogoCloud({ className, logos, layout = "3x1", ...props }: LogoCloudProps) {
  const items =
    logos ?? (layout === "3x2" ? buyerComplianceLogos3x2 : buyerComplianceLogos3x1);

  const isLastRow = (index: number) => index >= items.length - GRID_COLS;

  return (
    <div
      className={cn("relative grid grid-cols-1 overflow-visible sm:grid-cols-3", className)}
      {...props}
    >
      {items.map((logo, index) => {
        const columnIndex = index % GRID_COLS;
        const showBottomBorder = !isLastRow(index);

        return (
          <LogoCard
            key={`${logo.src}-${index}`}
            logo={logo}
            className={cn(
              "relative",
              showBottomBorder && "border-b sm:border-b",
              columnIndex < GRID_COLS - 1 && "sm:border-r",
            )}
          >
            {showBottomBorder && columnIndex === 0 && (
              <PlusIcon className="absolute -bottom-[12.5px] -right-[12.5px] z-10 size-6" strokeWidth={1} />
            )}
            {showBottomBorder && columnIndex === 1 && (
              <>
                <PlusIcon
                  className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 sm:block"
                  strokeWidth={1}
                />
                <PlusIcon className="absolute -bottom-[12.5px] -right-[12.5px] z-10 size-6" strokeWidth={1} />
              </>
            )}
          </LogoCard>
        );
      })}
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[160px] items-center justify-center overflow-visible bg-background px-6 py-10 md:min-h-[200px] md:px-8 md:py-14 lg:min-h-[220px]",
        className,
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-14 w-auto max-w-full origin-center scale-[1.75] select-none object-contain sm:scale-[1.9] md:h-16 md:scale-[2.1] lg:h-[4.5rem] lg:scale-[2.35]"
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
        loading="lazy"
      />
      {children}
    </div>
  );
}
