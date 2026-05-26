type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
  variant?: "overlay" | "sticky-top" | "sticky-bottom";
};

const variantClasses: Record<NonNullable<ProgressiveBlurProps["variant"]>, string> = {
  overlay: "absolute left-0",
  "sticky-top": "sticky top-0 left-0",
  "sticky-bottom": "sticky bottom-0 left-0",
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "#ffffff",
  position = "top",
  height = "150px",
  blurAmount = "4px",
  variant = "overlay",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none z-10 w-full select-none ${variantClasses[variant]} ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export { ProgressiveBlur };
