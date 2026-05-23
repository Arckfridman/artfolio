"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  InteractiveWord,
  type PreviewCard,
  type WordVariant,
} from "./interactive-word";
import { SiteChrome } from "./site-chrome";
import { useWipe } from "./wipe-provider";

const previewSets: Record<WordVariant, PreviewCard[]> = {
  strategy: [
    {
      id: "s1",
      gradient: "linear-gradient(145deg, #1a1a1a 30%, #ff4d6d 100%)",
      caption: "position",
      image: "/Previews/Strategy-preview-1.webp",
    },
    {
      id: "s2",
      gradient: "linear-gradient(160deg, #0d0d0d 20%, #8b2635 90%)",
      caption: "narrative",
      image: "/Previews/Strategy-preview-2.webp",
    },
    {
      id: "s3",
      gradient: "linear-gradient(135deg, #222 40%, #ff758f 100%)",
      caption: "systems",
      image: "/Previews/Strategy-preview-3.webp",
    },
  ],
  identity: [
    {
      id: "i1",
      gradient: "linear-gradient(160deg, #111 25%, #c9f06a 85%)",
      caption: "mark",
      image: "/Previews/Identities-preview-1.webp",
    },
    {
      id: "i2",
      gradient: "linear-gradient(140deg, #0a0a0a 30%, #5a7d2e 100%)",
      caption: "type",
      image: "/Previews/Identities-preview-2.webp",
    },
    {
      id: "i3",
      gradient: "linear-gradient(155deg, #1c1c1c 35%, #e8ff9a 95%)",
      caption: "voice",
      image: "/Previews/Identities-preview-3.webp",
    },
  ],
  websites: [
    {
      id: "w1",
      gradient: "linear-gradient(150deg, #050505 20%, #6ec8ff 100%)",
      caption: "layout",
      image: "/Previews/Website-preview-1.webp",
    },
    {
      id: "w2",
      gradient: "linear-gradient(135deg, #0f0f0f 40%, #2d6a9f 90%)",
      caption: "motion",
      image: "/Previews/Website-preview-2.webp",
    },
    {
      id: "w3",
      gradient: "linear-gradient(170deg, #121212 30%, #90e0ef 100%)",
      caption: "build",
      image: "/Previews/Website-preview-3.webp",
    },
  ],
  other: [
    {
      id: "o1",
      gradient: "linear-gradient(145deg, #0a0a0a 25%, #ffb347 100%)",
      caption: "print",
    },
    {
      id: "o2",
      gradient: "linear-gradient(160deg, #151515 35%, #e85d04 95%)",
      caption: "film",
    },
    {
      id: "o3",
      gradient: "linear-gradient(130deg, #111 45%, #f48c06 100%)",
      caption: "misc",
    },
  ],
};

const tintByVariant: Record<WordVariant, string> = {
  strategy: "rgba(255, 77, 109, 0.06)",
  identity: "rgba(201, 240, 106, 0.05)",
  websites: "rgba(110, 200, 255, 0.06)",
  other: "rgba(224, 123, 224, 0.05)",
};

export function PortfolioHome() {
  const [active, setActive] = useState<WordVariant | null>(null);
  const { navigateWithWipe } = useWipe();

  return (
    <SiteChrome>

      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{
          backgroundColor: active ? tintByVariant[active] : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <main className="relative z-10 flex h-[calc(100vh-49px)] flex-col overflow-y-scroll snap-y snap-mandatory">
        <section className="flex min-h-full flex-col justify-end px-6 pb-[12vh] snap-start sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <p className="font-[family-name:var(--font-founders)] font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.4] tracking-normal text-[#d4d0c8]">
              <span className="mb-8 block text-[0.72em] font-normal uppercase tracking-[0.35em] text-[#8a8680]">
                —
              </span>
              Hi, I&apos;m Artur. I do{" "}
              <InteractiveWord
                variant="strategy"
                previews={previewSets.strategy}
                hoverColor="#ff4d6d"
                isActive={active === "strategy"}
                onHoverStart={() => setActive("strategy")}
                onHoverEnd={() => setActive(null)}
                onClick={() => navigateWithWipe("/strategy")}
              >
                strategy
              </InteractiveWord>
              ,{" "}
              <InteractiveWord
                variant="identity"
                previews={previewSets.identity}
                hoverColor="#c9f06a"
                isActive={active === "identity"}
                onHoverStart={() => setActive("identity")}
                onHoverEnd={() => setActive(null)}
                onClick={() => navigateWithWipe("/identities")}
              >
                identities
              </InteractiveWord>
              ,<br />{" "}
              <InteractiveWord
                variant="websites"
                previews={previewSets.websites}
                hoverColor="#6ec8ff"
                isActive={active === "websites"}
                onHoverStart={() => setActive("websites")}
                onHoverEnd={() => setActive(null)}
                onClick={() => navigateWithWipe("/websites")}
              >
                websites
              </InteractiveWord>
              , and a whole mess of{" "}
              <InteractiveWord
                variant="other"
                previews={previewSets.other}
                hoverColor="#ffb347"
                isActive={active === "other"}
                onHoverStart={() => setActive("other")}
                onHoverEnd={() => setActive(null)}
                onClick={() => navigateWithWipe("/other")}
              >
                other stuff
              </InteractiveWord>
              .<br />Usually all at once
            </p>

            <motion.p
              className="mt-20 max-w-lg font-[family-name:var(--font-founders)] text-[clamp(1.1rem,2.2vw,1.45rem)] font-light leading-relaxed tracking-normal text-[#6a6660]"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: active ? 0.45 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              Let&apos;s make something nice together
              <span className="inline-block w-[0.35em] animate-pulse">_</span>
            </motion.p>
          </div>

          <div
            className="pointer-events-none absolute top-[22%] left-[6%] font-[family-name:var(--font-founders)] text-[10px] font-normal uppercase tracking-[0.5em] text-white/15"
            aria-hidden
          >
            artfolio / 26
          </div>
        </section>

        <section className="relative flex min-h-full flex-col justify-center px-6 py-20 snap-start sm:px-12 md:px-16 lg:px-24">
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/10" aria-hidden />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-white/10" aria-hidden />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-white/10 md:hidden" aria-hidden />

          <div className="pointer-events-none absolute bottom-6 right-6 font-[family-name:var(--font-founders)] text-[0.65em] font-normal uppercase tracking-[0.35em] text-white/20 sm:right-12 md:right-16 lg:right-24" aria-hidden>
            Made by ARCK
          </div>

          <div className="flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-white/20" aria-hidden />
                <p className="font-[family-name:var(--font-founders)] text-[0.65em] font-normal uppercase tracking-[0.5em] text-[#6a6660]">
                  A bit about me:
                </p>
              </div>

              <p className="mt-8 font-[family-name:var(--font-founders)] font-light text-[clamp(0.95rem,2vw,1.25rem)] leading-[1.6] tracking-normal text-[#d4d0c8]">
                I often work beyond design, helping founders shape hospitality and cultural concepts from idea to reality. I am very interested in transitions, the ever-changing nature of things, and building adaptive systems and designs.
              </p>

              <p className="mt-6 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.8vw,1.1rem)] font-light leading-relaxed tracking-normal text-[#8a8680]">
                Bars, spaces, events, visual systems, communication, atmosphere, and especially transitional spaces.
              </p>

              <p className="mt-10 font-[family-name:var(--font-founders)] font-light text-[clamp(0.95rem,2vw,1.25rem)] leading-[1.5] tracking-normal text-[#d4d0c8]">
                Interested in projects made by people, for people.
              </p>

              <p className="mt-6 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.8vw,1.1rem)] font-light leading-relaxed tracking-normal text-[#6a6660]">
                If that sounds close to what you're building, feel free to get in touch.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col border-l border-white/10 pl-0 md:ml-12 md:pl-12">
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-founders)] text-[clamp(1.2rem,2vw,1.5rem)] font-light tracking-normal text-[#d4d0c8]">
                  Artur Fridman
                </p>
                <p className="font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.6vw,1.05rem)] font-light tracking-normal text-[#8a8680]">
                  Based in Italy
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-6">
              <a
                href="mailto:Arckfridman@gmail.com"
                className="group flex items-center gap-3 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.6vw,1.05rem)] font-light tracking-normal text-[#8a8680] transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>Arckfridman@gmail.com</span>
              </a>

              <a
                href="https://t.me/arckfridman"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.6vw,1.05rem)] font-light tracking-normal text-[#8a8680] transition-all hover:text-[#0088cc] hover:drop-shadow-[0_0_8px_rgba(0,136,204,0.6)]"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                <span>Arckfridman</span>
              </a>

              <a
                href="https://www.instagram.com/arck.fridman/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.6vw,1.05rem)] font-light tracking-normal text-[#8a8680] transition-all hover:text-[#a855f7] hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Arck.Fridman</span>
              </a>

              <a
                href="https://wa.me/393792389672"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-[family-name:var(--font-founders)] text-[clamp(0.85rem,1.6vw,1.05rem)] font-light tracking-normal text-[#8a8680] transition-all hover:text-[#22c55e] hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>+39 379 238 9672</span>
              </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
