import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const MIN_RANGE = 50;
const ROTATION_DEG = -2.76;
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface SliderChange {
  left: number;
  right: number;
  range: number;
}

interface DynamicTextSliderProps {
  titleBefore: string;
  sliderText: string;
  description?: string;
  className?: string;
  onChange?: (values: SliderChange) => void;
}

interface TextRevealSliderProps {
  width: number;
  text: string;
  height?: number;
  handleSize?: number;
  onChange?: (values: SliderChange) => void;
}

function TextRevealSlider({
  width: initialWidth,
  text,
  height = 70,
  handleSize = 28,
  onChange,
}: TextRevealSliderProps) {
  const width = initialWidth > 0 ? initialWidth + 35 : 0;

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(width);
  const [draggingHandle, setDraggingHandle] = useState<"left" | "right" | null>(null);
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef<{
    handle: "left" | "right";
    startX: number;
    startY: number;
    initialLeft: number;
    initialRight: number;
  } | null>(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
    onChange?.({ left, right, range: right - left });
  }, [left, right, onChange]);

  useEffect(() => {
    if (width > 0) {
      const handleMidpoint = (left + right) / 2;
      const sliderCenter = width / 2;
      const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
      const maxAdditionalTilt = 3;
      const newRotation = ROTATION_DEG + deviationFactor * maxAdditionalTilt;
      setDynamicRotation(newRotation);
    }
  }, [left, right, width]);

  useEffect(() => {
    setRight(width);
  }, [width]);

  const startDrag = (handle: "left" | "right", e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const dX = e.clientX - startX;
      const dY = e.clientY - startY;
      const projected = dX * COS_THETA + dY * SIN_THETA;

      if (handle === "left") {
        const newLeft = clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE);
        setLeft(newLeft);
      } else {
        const newRight = clamp(initialRight + projected, leftRef.current + MIN_RANGE, width);
        setRight(newRight);
      }
    },
    [width],
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  const nudgeHandle = (handle: "left" | "right") => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowLeft" ? -10 : 10;
    if (handle === "left") {
      setLeft((prev) => clamp(prev + delta, 0, rightRef.current - MIN_RANGE));
    } else {
      setRight((prev) => clamp(prev + delta, leftRef.current + MIN_RANGE, width));
    }
  };

  if (width <= 0) return null;

  return (
    <div
      className="relative select-none transition-transform duration-300 ease-out"
      style={{ width, height, transform: `rotate(${dynamicRotation}deg)` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/40" />
      {(["left", "right"] as const).map((handle) => {
        const x = handle === "left" ? left : right - handleSize;
        const scaleClass = draggingHandle === handle ? "scale-125" : "hover:scale-110";

        return (
          <button
            key={handle}
            type="button"
            aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
            onPointerDown={(e) => startDrag(handle, e)}
            onKeyDown={nudgeHandle(handle)}
            className={cn(
              "absolute top-0 z-20 flex h-full w-7 cursor-ew-resize items-center justify-center rounded-full border border-primary/50 bg-primary text-primary-foreground opacity-100 transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring",
              scaleClass,
            )}
            style={{ left: x, touchAction: "none" }}
          >
            <span className="h-8 w-1 rounded-full bg-primary-foreground/80" />
          </button>
        );
      })}
      <div
        className="pointer-events-none z-10 flex h-full w-full items-center justify-center overflow-hidden px-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)` }}
      >
        {text}
      </div>
    </div>
  );
}

export function DynamicTextSlider({
  titleBefore,
  sliderText,
  description,
  className,
  onChange,
}: DynamicTextSliderProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(408);

  useEffect(() => {
    const measure = () => setTextWidth(measureRef.current?.clientWidth ?? 408);
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [sliderText]);

  return (
    <div className={cn("w-full text-center", className)}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {titleBefore}
        </h2>

        <span
          ref={measureRef}
          className="absolute -left-[9999px] whitespace-nowrap px-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
          aria-hidden="true"
        >
          {sliderText}
        </span>

        <div className="mt-4 flex justify-center md:mt-6">
          <TextRevealSlider width={textWidth} text={sliderText} onChange={onChange} />
        </div>

        {description ? (
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
