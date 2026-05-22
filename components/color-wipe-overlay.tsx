"use client";

import { motion } from "framer-motion";

export type WipePhase = "hidden" | "rising" | "covered" | "falling";

type ColorWipeOverlayProps = {
  phase: WipePhase;
  onPhaseComplete?: (completed: "rising" | "falling") => void;
};

export function ColorWipeOverlay({
  phase,
  onPhaseComplete,
}: ColorWipeOverlayProps) {
  if (phase === "hidden") return null;

  const motionKey = phase === "falling" ? "falling" : "active";
  const targetY = phase === "falling" ? "100%" : "0%";
  const initialY = phase === "falling" ? "0%" : "100%";

  return (
    <motion.div
      key={motionKey}
      className="pointer-events-none fixed inset-0 z-[200] bg-white"
      initial={{ y: initialY }}
      animate={{ y: targetY }}
      transition={{ duration: 0.62, ease: [0.45, 0, 0.15, 1] }}
      onAnimationComplete={() => {
        if (phase === "rising") onPhaseComplete?.("rising");
        if (phase === "falling") onPhaseComplete?.("falling");
      }}
    />
  );
}
