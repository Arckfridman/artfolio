"use client";

import { WipeProvider } from "./wipe-provider";
import { MobileFallback } from "./mobile-fallback";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileFallback />
      <WipeProvider>{children}</WipeProvider>
    </>
  );
}
