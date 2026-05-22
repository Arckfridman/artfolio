"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterTextProps = {
  text: string;
  delay?: number;
  charInterval?: number;
  className?: string;
  onComplete?: () => void;
  resetKey?: string;
  multiline?: boolean;
};

export function TypewriterText({
  text,
  delay = 0.6,
  charInterval = 42,
  className = "",
  onComplete,
  resetKey,
  multiline = false,
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const completedRef = useRef(false);
  const done = visibleCount >= text.length;

  useEffect(() => {
    setVisibleCount(0);
    setStarted(false);
    completedRef.current = false;
  }, [resetKey, text]);

  useEffect(() => {
    const startId = window.setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startId);
  }, [delay, resetKey, text]);

  useEffect(() => {
    if (!started || done) return;
    const id = window.setTimeout(
      () => setVisibleCount((count) => count + 1),
      charInterval,
    );
    return () => clearTimeout(id);
  }, [started, done, charInterval, visibleCount, text.length]);

  useEffect(() => {
    if (!done || !started || completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [done, started, onComplete]);

  if (multiline) {
    return (
      <span className={`relative block ${className}`}>
        <span className="invisible block whitespace-pre-wrap" aria-hidden>
          {text}
        </span>
        <span className="absolute left-0 top-0 block w-full whitespace-pre-wrap">
          {text.slice(0, visibleCount)}
          {!done && started && (
            <span className="ml-px inline-block w-[0.45em] animate-pulse opacity-70">
              |
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="absolute left-0 top-0 whitespace-nowrap">
        {text.slice(0, visibleCount)}
        {!done && started && (
          <span className="ml-px inline-block w-[0.45em] animate-pulse opacity-70">
            |
          </span>
        )}
      </span>
    </span>
  );
}
