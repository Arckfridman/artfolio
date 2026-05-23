"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TICKER_ITEMS = [
  "Page not found",
  "Nothing to see here",
  "Lost in space",
  "Try again",
];

const TICKER_INTERVAL = 3000;

export default function NotFound() {
  const router = useRouter();
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, TICKER_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a]">
      {/* Ticker at top */}
      <div className="absolute top-10 left-0 right-0 flex h-[2.75rem] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={tickerIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.5vw,1.1rem)] font-light tracking-normal text-white/30"
          >
            {TICKER_ITEMS[tickerIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-[family-name:var(--font-founders)] text-[clamp(2rem,6vw,6rem)] font-normal leading-none text-white/90">
          404
        </h1>
        <p className="font-[family-name:var(--font-founders)] text-[clamp(0.9rem,1.5vw,1.25rem)] font-light tracking-normal text-white/70">
          Ooops, nothing is there!
        </p>
      </div>

      {/* Back arrow button in bottom left corner */}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="group fixed bottom-8 left-6 z-30 flex h-[4.25rem] w-[4.25rem] items-center justify-center overflow-hidden rounded-full border border-white/70 text-white/90 transition-colors hover:border-white hover:text-white sm:left-12 md:left-16 lg:left-24"
        aria-label="Back to home"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100"
          aria-hidden
        />
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 h-6 w-6 text-white/90 transition-colors duration-300 group-hover:text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden
        >
          <path
            d="M14 6 L8 12 L14 18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
