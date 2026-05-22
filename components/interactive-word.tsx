"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type WordVariant = "strategy" | "identity" | "websites" | "other";

export type PreviewCard = {
  id: string;
  gradient: string;
  caption: string;
  image?: string;
};

type InteractiveWordProps = {
  variant: WordVariant;
  children: React.ReactNode;
  previews: PreviewCard[];
  hoverColor: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isActive: boolean;
  onClick?: () => void;
};

const variantStyles: Record<
  WordVariant,
  { className: string; activeClass: string }
> = {
  strategy: {
    className:
      "font-[family-name:var(--font-unno)] font-semibold text-[0.92em] tracking-normal underline decoration-1 decoration-dotted underline-offset-[6px]",
    activeClass: "decoration-solid decoration-[#ff4d6d]",
  },
  identity: {
    className:
      "font-[family-name:var(--font-domaine)] italic text-[1.05em] tracking-normal",
    activeClass: "not-italic text-[#c9f06a]",
  },
  websites: {
    className:
      "font-[family-name:var(--font-founders)] font-medium tracking-normal",
    activeClass: "text-[#6ec8ff]",
  },
  other: {
    className: "",
    activeClass: "",
  },
};

const buttonClickProps = (onClick?: () => void) =>
  onClick
    ? {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          onClick();
        },
      }
    : {};

export function InteractiveWord({
  variant,
  children,
  previews,
  hoverColor,
  onHoverStart,
  onHoverEnd,
  isActive,
  onClick,
}: InteractiveWordProps) {
  const [hovered, setHovered] = useState(false);
  const show = hovered || isActive;
  const styles = variantStyles[variant];

  return (
    <span
      className="relative inline-block align-baseline"
      onMouseEnter={() => {
        setHovered(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHoverEnd();
      }}
      onFocus={() => {
        setHovered(true);
        onHoverStart();
      }}
      onBlur={() => {
        setHovered(false);
        onHoverEnd();
      }}
    >
      {variant === "other" ? (
        <button
          type="button"
          data-active={show}
          {...buttonClickProps(onClick)}
          className={[
            "relative z-10 cursor-pointer font-[family-name:var(--font-founders)] text-[0.9em] font-normal rounded-full border px-3 py-0.5 transition-all duration-200",
            show
              ? "border-[#ffb347] bg-[#ffb347] text-[#121212]"
              : "border-white/30 bg-transparent text-inherit",
          ].join(" ")}
        >
          {children}
        </button>
      ) : variant === "websites" ? (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[0.12em] z-0 h-[0.22em] origin-center bg-[#6ec8ff]/25"
            animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <button
            type="button"
            data-active={show}
            {...buttonClickProps(onClick)}
            className={[
              "relative z-10 cursor-pointer border-0 bg-transparent p-0 text-inherit transition-colors duration-300 ease-out",
              styles.className,
              show ? styles.activeClass : "",
            ].join(" ")}
            style={{
              color: show ? hoverColor : undefined,
            }}
          >
            {children}
          </button>
        </>
      ) : (
        <button
          type="button"
          data-active={show}
          {...buttonClickProps(onClick)}
          className={[
            "relative z-10 cursor-pointer border-0 bg-transparent p-0 text-inherit transition-colors duration-200",
            styles.className,
            show ? styles.activeClass : "",
          ].join(" ")}
          style={{
            color: show ? hoverColor : undefined,
          }}
        >
          {children}
        </button>
      )}

      <AnimatePresence>
        {show && variant !== "other" && (
          <motion.span
            className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span className="relative block h-[148px] w-[220px]">
              {previews.map((card, i) => {
                const spread = [
                  { x: -52, y: -8, rotate: -11 },
                  { x: 0, y: -28, rotate: 2 },
                  { x: 52, y: -4, rotate: 13 },
                ][i];

                return (
                  <motion.span
                    key={card.id}
                    className="absolute left-1/2 top-1/2 block h-[108px] w-[76px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/20 shadow-[4px_8px_24px_rgba(0,0,0,0.7)]"
                    style={{
                      background: card.image ? undefined : card.gradient,
                      zIndex: i + 1,
                    }}
                    initial={{
                      x: 0,
                      y: 72,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.82,
                    }}
                    animate={{
                      x: spread.x,
                      y: spread.y,
                      rotate: spread.rotate,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      x: 0,
                      y: 56,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.88,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 26,
                      delay: i * 0.045,
                    }}
                  >
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.caption}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-black/50 px-1.5 py-1 font-[family-name:var(--font-founders)] text-[9px] font-medium uppercase tracking-[0.2em] text-white/80">
                      {card.caption}
                    </span>
                  </motion.span>
                );
              })}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
