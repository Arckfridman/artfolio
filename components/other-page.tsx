"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CinematicSlideshow } from "./cinematic-slideshow";
import { ProjectDetailPanel } from "./project-detail-panel";
import { SiteChrome } from "./site-chrome";
import { useWipe } from "./wipe-provider";
import { otherProjects } from "@/lib/other-projects";

const TEXT_DELAY = 0.2;
const FRAME_HEIGHT = "calc((100dvh - 49px) * 0.7)";

export function OtherPage() {
  const { navigateWithWipe } = useWipe();
  const [selected, setSelected] = useState(0);
  const [wipePhase, setWipePhase] = useState<"idle" | "up" | "down">("idle");
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const active = otherProjects[selected];

  const handleProjectChange = (index: number) => {
    if (index === selected || wipePhase !== "idle") return;
    setPendingIndex(index);
    setWipePhase("up");
  };

  const handleWipeUpComplete = () => {
    if (pendingIndex !== null) {
      setSelected(pendingIndex);
      setPendingIndex(null);
      setTimeout(() => setWipePhase("down"), 50);
    }
  };

  const handleWipeDownComplete = () => {
    setWipePhase("idle");
  };

  return (
    <SiteChrome>
      <main className="relative z-10 flex min-h-[calc(100vh-49px)] flex-col px-6 pb-10 pt-10 sm:px-12 md:px-16 lg:px-24">
        <div className="relative mx-auto flex w-full flex-1 flex-col items-center justify-start pt-[clamp(0.75rem,2vh,1.5rem)]">
          <div className="flex w-full flex-col items-center">
            <div className="grid w-full grid-cols-1 items-center md:grid-cols-[1fr_auto_1fr] md:gap-x-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
              <div className="hidden md:block" aria-hidden />

              <div
                className="relative z-20 mx-auto aspect-[16/9] w-auto max-w-[92vw] shrink-0 overflow-hidden border border-white/85 bg-[#0a0a0a]/40 md:col-start-2 md:mx-0"
                style={{ height: FRAME_HEIGHT }}
              >
                <CinematicSlideshow key={active.id} images={active.frameImages} />
                <AnimatePresence>
                  {wipePhase === "up" && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onAnimationComplete={handleWipeUpComplete}
                    />
                  )}
                  {wipePhase === "down" && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ y: "0%" }}
                      animate={{ y: "100%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onAnimationComplete={handleWipeDownComplete}
                    />
                  )}
                </AnimatePresence>
              </div>

              <aside
                className="hidden min-w-0 w-[7.5rem] md:col-start-3 md:flex md:flex-col md:justify-end md:pr-2 lg:w-[9rem] lg:pr-3"
                style={{ height: FRAME_HEIGHT }}
              >
                <div className="w-full overflow-hidden">
                  <ProjectDetailPanel
                    text={active.description}
                    panelKey={active.id}
                    delay={TEXT_DELAY}
                    textColor="#f5f5f0"
                    className="w-full max-w-full shrink-0"
                  />
                </div>
              </aside>
            </div>

            <ul className="relative z-20 mt-10 flex max-w-[92vw] flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {otherProjects.map((project, index) => (
                <li key={project.id}>
                  <motion.button
                    type="button"
                    onClick={() => handleProjectChange(index)}
                    aria-label={`Select ${project.label}`}
                    aria-pressed={selected === index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 1.02, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 26,
                      mass: 0.55,
                    }}
                    className={[
                      "block h-10 w-10 origin-center overflow-hidden rounded-full sm:h-11 sm:w-11",
                      selected === index
                        ? "opacity-100 ring-1 ring-white/90 ring-offset-2 ring-offset-transparent"
                        : "opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    <img
                      src={project.iconSrc}
                      alt={project.label}
                      className={[
                        "h-full w-full object-cover transition-all duration-300",
                        selected === index ? "" : "grayscale hover:grayscale-0",
                      ].join(" ")}
                    />
                  </motion.button>
                </li>
              ))}
            </ul>
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
      </main>
    </SiteChrome>
  );
}
