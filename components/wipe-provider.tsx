"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColorWipeOverlay, type WipePhase } from "./color-wipe-overlay";

type WipeContextValue = {
  navigateWithWipe: (href: string) => void;
};

const WipeContext = createContext<WipeContextValue | null>(null);

export function WipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<WipePhase>("hidden");
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const targetPath = useRef<string | null>(null);

  const navigateWithWipe = useCallback((href: string) => {
    setPendingHref(href);
    setPhase("rising");
  }, []);

  const onPhaseComplete = useCallback(
    (completed: "rising" | "falling") => {
      if (completed === "rising" && pendingHref) {
        targetPath.current = pendingHref;
        setPhase("covered");
        router.push(pendingHref);
        setPendingHref(null);
        return;
      }
      if (completed === "falling") {
        setPhase("hidden");
      }
    },
    [pendingHref, router],
  );

  useEffect(() => {
    if (phase !== "covered" || !targetPath.current) return;
    if (pathname !== targetPath.current) return;

    targetPath.current = null;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("falling"));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, phase]);

  return (
    <WipeContext.Provider value={{ navigateWithWipe }}>
      {children}
      <ColorWipeOverlay phase={phase} onPhaseComplete={onPhaseComplete} />
    </WipeContext.Provider>
  );
}

export function useWipe() {
  const ctx = useContext(WipeContext);
  if (!ctx) {
    throw new Error("useWipe must be used within WipeProvider");
  }
  return ctx;
}
