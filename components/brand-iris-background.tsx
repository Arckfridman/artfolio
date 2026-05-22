"use client";

import { motion } from "framer-motion";

type BrandIrisBackgroundProps = {
  color: string;
  backgroundGradient?: string;
  open: boolean;
};

export function BrandIrisBackground({ color, backgroundGradient, open }: BrandIrisBackgroundProps) {
  if (!open) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5]"
      initial={{ clipPath: "circle(0% at 50% 42%)" }}
      animate={{
        clipPath: "circle(150% at 50% 42%)",
        background: backgroundGradient || color,
      }}
      transition={{
        clipPath: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
        background: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      aria-hidden
    />
  );
}
