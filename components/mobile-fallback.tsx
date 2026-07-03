"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MobileFallback() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted || !isMobile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-8 text-center"
      >
        <p className="font-[family-name:var(--font-founders)] text-[clamp(1.2rem,4vw,1.8rem)] font-light leading-[1.5] tracking-normal text-[#d4d0c8]">
          This site looks great on desktop and mediocre on mobile. Let's just skip mediocre
        </p>
      </motion.div>
    </div>
  );
}
