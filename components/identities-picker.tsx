"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { BrandIrisBackground } from "./brand-iris-background";
import { CinematicSlideshow } from "./cinematic-slideshow";
import { ProjectBurstField } from "./project-burst-field";
import { ProjectDetailPanel } from "./project-detail-panel";
import { SiteChrome } from "./site-chrome";
import { TypewriterText } from "./typewriter-text";
import { getReadableTextColor } from "@/lib/color-utils";
import {
  getProjectDetailText,
  identityProjects,
} from "@/lib/identities-projects";
import { useWipe } from "./wipe-provider";

const TEXT_DELAY = 0.55;
const MARQUEE_HEIGHT = 49;

type SlideOrigin = {
  x: number;
  y: number;
  size: number;
};

type BurstOrigin = {
  x: number;
  y: number;
};

export function IdentitiesPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  const [irisOpen, setIrisOpen] = useState(false);
  const [slideOrigin, setSlideOrigin] = useState<SlideOrigin | null>(null);
  const [burstOrigin, setBurstOrigin] = useState<BurstOrigin>({
    x: 50,
    y: 42,
  });
  const { navigateWithWipe } = useWipe();
  const frameRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = selected !== null ? identityProjects[selected] : null;
  const hasSelection = selected !== null;
  const detailTextColor = active
    ? active.detailTextColor ?? getReadableTextColor(active.brandColor)
    : "#f5f5f0";

  const measureBurstOrigin = useCallback((): BurstOrigin => {
    const frame = frameRef.current;
    if (!frame) return { x: 50, y: 42 };

    const rect = frame.getBoundingClientRect();
    const sceneHeight = window.innerHeight - MARQUEE_HEIGHT;

    return {
      x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
      y: ((rect.top + rect.height / 2 - MARQUEE_HEIGHT) / sceneHeight) * 100,
    };
  }, []);

  const selectProject = (index: number) => {
    const thumb = thumbRefs.current[index];
    const frame = frameRef.current;

    if (thumb && frame) {
      const t = thumb.getBoundingClientRect();
      const f = frame.getBoundingClientRect();
      setSlideOrigin({
        x: t.left + t.width / 2 - f.left,
        y: t.top + t.height / 2 - f.top,
        size: t.width,
      });
    }

    setBurstOrigin(measureBurstOrigin());
    setIrisOpen(true);
    setSelected(index);
  };

  return (
    <SiteChrome>
      <BrandIrisBackground
        color={active?.brandColor ?? "#121212"}
        backgroundGradient={active?.backgroundGradient}
        open={irisOpen}
      />

      {active && (
        <ProjectBurstField
          particles={active.particles}
          sceneKey={active.id}
          originX={burstOrigin.x}
          originY={burstOrigin.y}
        />
      )}

      <main className="relative z-10 flex min-h-[calc(100vh-49px)] flex-col px-6 pb-10 pt-10 sm:px-12 md:px-16 lg:px-24">
        <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-start pt-[clamp(0.75rem,2vh,1.5rem)]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                ref={frameRef}
                className="relative z-20 aspect-[3/4] h-[calc((100dvh-49px)*0.7)] w-auto max-w-[35vw] shrink-0 overflow-hidden border border-white/85 bg-[#0a0a0a]/40"
              >
                <AnimatePresence mode="popLayout">
                  {active && slideOrigin && (
                    <motion.div
                      key={active.id}
                      className="absolute inset-0"
                      initial={{
                        left: slideOrigin.x,
                        top: slideOrigin.y,
                        width: slideOrigin.size,
                        height: slideOrigin.size,
                        x: "-50%",
                        y: "-50%",
                      }}
                      animate={{
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        x: 0,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.22, ease: "easeIn" },
                      }}
                      transition={{
                        duration: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <CinematicSlideshow images={active.frameImages} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {active && (
                <div className="absolute left-[calc(100%+2rem)] top-1/2 z-20 -translate-y-1/2 md:block">
                  <ProjectDetailPanel
                    text={getProjectDetailText(active)}
                    panelKey={active.id}
                    delay={0.95}
                    textColor={detailTextColor}
                  />
                </div>
              )}
            </div>

            <ul className="relative z-20 mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {identityProjects.map((project, index) => (
                <li key={project.id}>
                  <motion.button
                    ref={(el) => {
                      thumbRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => selectProject(index)}
                    aria-label={`Select project ${project.label}`}
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
                      "block h-11 w-11 origin-center overflow-hidden rounded-sm sm:h-12 sm:w-12",
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

            <div className="mt-10 flex h-[2.75rem] items-center justify-center text-center font-[family-name:var(--font-founders)] text-[clamp(1.15rem,2vw,1.55rem)] font-light leading-snug tracking-normal text-white/90">
              <AnimatePresence mode="wait">
                {!hasSelection ? (
                  <motion.span
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  >
                    <TypewriterText
                      text="Choose a project"
                      delay={TEXT_DELAY}
                      charInterval={40}
                    />
                  </motion.span>
                ) : (
                  <span className="invisible" aria-hidden>
                    Choose a project
                  </span>
                )}
              </AnimatePresence>
            </div>
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

        <p className="fixed bottom-8 right-6 z-30 font-[family-name:var(--font-founders)] text-sm font-light tracking-normal text-white/20 sm:right-12 md:right-16 lg:right-24">
          Selected projects
        </p>
      </main>
    </SiteChrome>
  );
}
