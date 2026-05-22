"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TypewriterText } from "./typewriter-text";

type ProjectDetailPanelProps = {
  text: string;
  panelKey: string;
  delay?: number;
  textColor: string;
  className?: string;
};

export function ProjectDetailPanel({
  text,
  panelKey,
  delay = 0.2,
  textColor,
  className,
}: ProjectDetailPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panelKey}
        className={className || "w-[17vw] max-w-[20vw] shrink-0 lg:w-[20vw] lg:max-w-[23vw]"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p
          className="font-[family-name:var(--font-founders)] text-[clamp(0.8rem,1.2vw,0.95rem)] font-light leading-relaxed tracking-normal break-words transition-colors duration-500"
          style={{ color: textColor }}
        >
          <TypewriterText
            text={text}
            delay={delay}
            charInterval={14}
            resetKey={panelKey}
            multiline
          />
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
