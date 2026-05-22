"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getStrategyMetaText,
  strategySlides,
} from "@/lib/strategy-projects";
import { TypewriterText } from "./typewriter-text";

const MARQUEE_HEIGHT = 49;
const GAP = 28;
const THUMB_SCALE = 0.24;
const WHEEL_LOCK_MS = 480;
const TEXT_DELAY = 0.2;

const SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 38,
  mass: 0.85,
};

type FrameMetrics = {
  frameW: number;
  frameH: number;
  thumbW: number;
  thumbH: number;
};

function measureFrameMetrics(): FrameMetrics {
  const sceneH = window.innerHeight - MARQUEE_HEIGHT;
  const frameH = sceneH * 0.7;
  const frameW = Math.min(frameH * (3 / 4), window.innerWidth * 0.92);
  const thumbH = frameH * THUMB_SCALE;
  const thumbW = thumbH * (3 / 4);
  return { frameW, frameH, thumbW, thumbH };
}

/** Distance from track left edge to the active slide’s horizontal center. */
function getActiveCenterX(
  activeIndex: number,
  { frameW, thumbW }: FrameMetrics,
): number {
  let x = 0;
  for (let i = 0; i < activeIndex; i++) {
    x += thumbW + GAP;
  }
  return x + frameW / 2;
}

type StrategyCarouselProps = {
  onScrollStart?: () => void;
};

export function StrategyCarousel({ onScrollStart }: StrategyCarouselProps) {
  const initialIndex = 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [metrics, setMetrics] = useState<FrameMetrics | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);
  const scrollStartedRef = useRef(false);
  const onScrollStartRef = useRef(onScrollStart);

  useEffect(() => {
    onScrollStartRef.current = onScrollStart;
  }, [onScrollStart]);

  const notifyScrollStart = useCallback(() => {
    if (scrollStartedRef.current) return;
    scrollStartedRef.current = true;
    onScrollStartRef.current?.();
  }, []);

  const activeSlide = strategySlides[activeIndex];

  const measureLayout = useCallback(() => {
    const nextMetrics = measureFrameMetrics();
    setMetrics(nextMetrics);
    const node = viewportRef.current;
    if (node) {
      setContainerWidth(node.offsetWidth);
    }
  }, []);

  useLayoutEffect(() => {
    measureLayout();

    const node = viewportRef.current;
    if (!node) return;

    const observer = new ResizeObserver(measureLayout);
    observer.observe(node);

    window.addEventListener("resize", measureLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureLayout);
    };
  }, [measureLayout]);

  const trackX = useMemo(() => {
    if (!metrics || containerWidth <= 0) return 0;
    const activeCenter = getActiveCenterX(activeIndex, metrics);
    return containerWidth / 2 - activeCenter;
  }, [activeIndex, metrics, containerWidth]);

  const step = useCallback((direction: 1 | -1) => {
    notifyScrollStart();
    if (wheelLockRef.current) return;

    setActiveIndex((index) => {
      const next = index + direction;
      if (next < 0 || next >= strategySlides.length) return index;

      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_LOCK_MS);

      return next;
    });
  }, [notifyScrollStart]);

  useEffect(() => {
    if (!metrics) return;

    const onWheel = (event: WheelEvent) => {
      const node = viewportRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const inCarousel =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inCarousel) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (Math.abs(delta) < 2) return;

      if (delta > 0) step(-1);
      else step(1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step, metrics]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  if (!metrics) {
    return (
      <div ref={viewportRef} className="relative w-full shrink-0">
        <div
          className="mx-auto aspect-[3/4] h-[calc((100dvh-49px)*0.7)] w-auto max-w-[92vw] border border-white/85 bg-[#0a0a0a]/40"
          aria-hidden
        />
      </div>
    );
  }

  const { frameW, frameH, thumbW, thumbH } = metrics;

  return (
    <div
      ref={viewportRef}
      className="relative w-full shrink-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Strategy projects"
    >
      <div
        ref={trackRef}
        className="relative w-full overflow-hidden"
        style={{ height: frameH }}
      >
        <motion.div
          className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center will-change-transform"
          initial={false}
          animate={{ x: trackX }}
          transition={SPRING}
        >
          {strategySlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={slide.id}
                className="relative shrink-0 overflow-hidden"
                initial={false}
                animate={{
                  width: isActive ? frameW : thumbW,
                  height: isActive ? frameH : thumbH,
                  marginRight:
                    index < strategySlides.length - 1 ? GAP : 0,
                }}
                transition={SPRING}
              >
                {slide.src ? (
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes={`${isActive ? frameW : thumbW}px`}
                    draggable={false}
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: slide.gradient }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 border border-white/85"
          style={{ width: frameW, height: frameH }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ width: frameW, height: frameH }}
        >
          <div className="absolute right-[calc(100%+1.25rem)] top-0 hidden w-[min(16rem,28vw)] md:block lg:right-[calc(100%+2rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeSlide.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <p className="font-[family-name:var(--font-founders)] text-[clamp(0.8rem,1.2vw,0.95rem)] font-light leading-relaxed tracking-normal text-white/90">
                  <TypewriterText
                    text={getStrategyMetaText(activeSlide)}
                    delay={TEXT_DELAY}
                    charInterval={14}
                    resetKey={activeSlide.id}
                    multiline
                  />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute left-[calc(100%+1.25rem)] top-0 hidden w-[min(16rem,28vw)] md:block lg:left-[calc(100%+2rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeSlide.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <p className="font-[family-name:var(--font-founders)] text-[clamp(0.8rem,1.2vw,0.95rem)] font-light leading-relaxed tracking-normal text-white/90">
                  <TypewriterText
                    text={activeSlide.description}
                    delay={TEXT_DELAY + 0.08}
                    charInterval={12}
                    resetKey={activeSlide.id}
                    multiline
                  />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
