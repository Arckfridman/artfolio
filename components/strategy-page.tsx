"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { StrategyCarousel } from "./strategy-carousel";
import { SiteChrome } from "./site-chrome";
import { TypewriterText } from "./typewriter-text";
import { useWipe } from "./wipe-provider";

const TEXT_DELAY = 0.55;

const TICKER_ITEMS = [
  "Market research",
  "Brand positioning",
  "Communication strategy",
  "Go-to-market strategy",
  "Hospitality & nightlife strategy",
  "Investment & pitch narratives",
  "Operational design systems",
];

const TICKER_INTERVAL = 3000;

export function StrategyPage() {
  const { navigateWithWipe } = useWipe();
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);

  const handleScrollStart = useCallback(() => {
    setShowScrollPrompt(false);
  }, []);

  useEffect(() => {
    if (showScrollPrompt) return;

    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, TICKER_INTERVAL);

    return () => clearInterval(interval);
  }, [showScrollPrompt]);

  return (
    <SiteChrome>
      <main className="relative z-10 flex min-h-[calc(100vh-49px)] flex-col px-6 pb-10 pt-10 sm:px-12 md:px-16 lg:px-24">
        <div className="relative mx-auto flex w-full flex-1 flex-col items-center justify-center">
          <div className="w-full">
            <StrategyCarousel onScrollStart={handleScrollStart} />
          </div>

          <div className="mt-10 flex h-[2.75rem] w-full items-center justify-center text-center font-[family-name:var(--font-founders)] text-[clamp(1.15rem,2vw,1.55rem)] font-light leading-snug tracking-normal text-white/90">
            <AnimatePresence mode="wait">
              {showScrollPrompt ? (
                <motion.span
                  key="scroll-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                >
                  <TypewriterText
                    text="Scroll"
                    delay={TEXT_DELAY}
                    charInterval={40}
                  />
                </motion.span>
              ) : (
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
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateWithWipe("/")}
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

        <p className="fixed bottom-8 right-6 z-30 font-[family-name:var(--font-founders)] text-sm font-light tracking-normal text-white/40 sm:right-12 md:right-16 lg:right-24">
          Selected projects
        </p>
      </main>
    </SiteChrome>
  );
}
