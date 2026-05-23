"use client";

import { ProjectDetailPanel } from "./project-detail-panel";
import { SiteChrome } from "./site-chrome";
import { useWipe } from "./wipe-provider";
import {
  websitesDescription,
  websitesVideoSrc,
} from "@/lib/websites-content";
import { useState, useRef, useEffect } from "react";

const TEXT_DELAY = 0.55;
const FRAME_HEIGHT = "calc((100dvh - 49px) * 0.6)";

export function WebsitesPage() {
  const { navigateWithWipe } = useWipe();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };
      video.addEventListener("loadeddata", handleLoadedData);
      return () => video.removeEventListener("loadeddata", handleLoadedData);
    }
  }, []);

  return (
    <SiteChrome>
      <main className="relative z-10 flex min-h-[calc(100vh-49px)] flex-col px-6 pb-10 pt-20 pr-12 sm:px-12 sm:pr-16 md:px-16 md:pr-20 lg:px-24 lg:pr-28">
        <div className="relative mx-auto flex w-full flex-1 flex-col items-center justify-start pt-[clamp(0.75rem,2vh,1.5rem)]">
          <div className="grid w-full grid-cols-1 items-center md:grid-cols-[1fr_auto_1fr] md:gap-x-6 lg:gap-x-10">
            <div className="hidden md:block" aria-hidden />

            <div
              className="relative z-20 mx-auto aspect-[16/9] w-auto max-w-[92vw] shrink-0 overflow-hidden border border-white/85 bg-[#0a0a0a]/40 md:col-start-2 md:mx-0"
              style={{ height: FRAME_HEIGHT }}
            >
              {!isVideoLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#1a1a1a]/80 via-[#2a2a2a]/70 to-[#1a1a1a]/80 opacity-100 transition-opacity duration-700 ease-out" />
              )}
              <video
                ref={videoRef}
                src={websitesVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <aside
              className="hidden min-w-0 md:col-start-3 md:flex md:flex-col md:justify-end"
              style={{ height: FRAME_HEIGHT }}
            >
              <div className="w-[min(12rem,100%)] max-w-[10rem] lg:max-w-[12rem]">
                <ProjectDetailPanel
                  text={websitesDescription}
                  panelKey="websites-intro"
                  delay={TEXT_DELAY}
                  textColor="#f5f5f0"
                />
              </div>
            </aside>
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
