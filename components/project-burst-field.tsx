"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { BurstParticle } from "@/lib/identities-projects";
import { getParticleDimensions } from "@/lib/particle-dimensions";

type ProjectBurstFieldProps = {
  particles: BurstParticle[];
  sceneKey: string;
  originX: number;
  originY: number;
};

const BURST_DURATION = 0.58;
const BURST_STAGGER = 0.045;

function useParticleDimensions(particle: BurstParticle) {
  const fallbackRatio = particle.aspectRatio ?? 1;
  const [dimensions, setDimensions] = useState(() =>
    getParticleDimensions(particle.size, fallbackRatio),
  );

  useEffect(() => {
    if (particle.aspectRatio) {
      setDimensions(
        getParticleDimensions(particle.size, particle.aspectRatio),
      );
      return;
    }

    if (!particle.src) {
      setDimensions(getParticleDimensions(particle.size, 1));
      return;
    }

    const probe = new window.Image();
    probe.onload = () => {
      const ratio = probe.naturalWidth / probe.naturalHeight;
      setDimensions(getParticleDimensions(particle.size, ratio));
    };
    probe.src = particle.src;
  }, [particle.id, particle.size, particle.aspectRatio, particle.src]);

  return dimensions;
}

export function ProjectBurstField({
  particles,
  sceneKey,
  originX,
  originY,
}: ProjectBurstFieldProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    setDragEnabled(false);
    setDraggingId(null);

    const lastDelay = (particles.length - 1) * BURST_STAGGER;
    const timer = window.setTimeout(
      () => setDragEnabled(true),
      (lastDelay + BURST_DURATION) * 1000 + 40,
    );

    return () => window.clearTimeout(timer);
  }, [sceneKey, particles.length]);

  return (
    <div
      ref={sceneRef}
      className="pointer-events-none fixed inset-0 top-[49px] z-[25] overflow-visible"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneKey}
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }}
        >
          {particles.map((particle, index) => (
            <BurstParticle
              key={particle.id}
              particle={particle}
              index={index}
              originX={originX}
              originY={originY}
              sceneRef={sceneRef}
              dragEnabled={dragEnabled}
              isDragging={draggingId === particle.id}
              onDragStart={() => setDraggingId(particle.id)}
              onDragEnd={() => setDraggingId(null)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type BurstParticleProps = {
  particle: BurstParticle;
  index: number;
  originX: number;
  originY: number;
  sceneRef: React.RefObject<HTMLDivElement | null>;
  dragEnabled: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
};

function BurstParticle({
  particle,
  index,
  originX,
  originY,
  sceneRef,
  dragEnabled,
  isDragging,
  onDragStart,
  onDragEnd,
}: BurstParticleProps) {
  const { width, height } = useParticleDimensions(particle);

  return (
    <motion.div
      className="pointer-events-auto absolute touch-none cursor-grab active:cursor-grabbing"
      style={{ width, height }}
      drag={dragEnabled}
      dragConstraints={sceneRef}
      dragElastic={0.12}
      dragMomentum
      dragTransition={{
        bounceStiffness: 420,
        bounceDamping: 24,
        power: 0.28,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{
        scale: 1.06,
        zIndex: 60,
        cursor: "grabbing",
      }}
      initial={{
        left: `${originX}%`,
        top: `${originY}%`,
        scale: 0.12,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        scale: 1,
        opacity: 1,
        rotate: particle.rotation,
      }}
      transition={{
        left: {
          duration: BURST_DURATION,
          delay: index * BURST_STAGGER,
          ease: [0.2, 0.85, 0.25, 1],
        },
        top: {
          duration: BURST_DURATION,
          delay: index * BURST_STAGGER,
          ease: [0.2, 0.85, 0.25, 1],
        },
        scale: {
          duration: 0.5,
          delay: index * BURST_STAGGER,
          ease: [0.16, 1, 0.3, 1],
        },
        opacity: { duration: 0.22, delay: index * BURST_STAGGER * 0.78 },
        rotate: {
          duration: BURST_DURATION,
          delay: index * BURST_STAGGER,
          ease: [0.2, 0.85, 0.25, 1],
        },
      }}
    >
      <motion.div
        className="h-full w-full overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        style={particle.src ? undefined : { background: particle.gradient }}
        animate={isDragging ? { y: 0 } : { y: [0, -7, 0] }}
        transition={
          isDragging
            ? { duration: 0.15 }
            : {
                duration: 3.8 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7 + index * BURST_STAGGER,
              }
        }
      >
        {particle.src ? (
          <Image
            src={particle.src}
            alt=""
            width={width}
            height={height}
            className="h-full w-full object-cover"
            draggable={false}
            sizes={`${width}px`}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
