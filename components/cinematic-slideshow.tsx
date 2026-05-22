"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type CinematicSlideshowProps = {
  images: string[];
  interval?: number;
};

const SLIDE_INTERVAL = 3000; // 3 seconds per slide
const FADE_DURATION = 1.5; // Slow fade transition

export function CinematicSlideshow({ images, interval = SLIDE_INTERVAL }: CinematicSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setNextIndex((prev) => (prev + 1) % images.length);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, FADE_DURATION * 1000);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Current slide */}
      <motion.div
        key={`current-${currentIndex}`}
        className="absolute inset-0"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{
          opacity: { duration: FADE_DURATION, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        <Image
          src={images[currentIndex]}
          alt=""
          fill
          className="object-cover"
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
        />
      </motion.div>

      {/* Next slide */}
      {isTransitioning && (
        <motion.div
          key={`next-${nextIndex}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: FADE_DURATION, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          <Image
            src={images[nextIndex]}
            alt=""
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
          />
        </motion.div>
      )}
    </div>
  );
}
