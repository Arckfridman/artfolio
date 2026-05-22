import { ScrollingMarquee } from "./scrolling-marquee";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#121212] text-[#e8e4dc]">
      <div className="grain-vignette" aria-hidden />
      <div className="noise-layer" aria-hidden />
      <div className="noise-layer-buzz" aria-hidden />
      <ScrollingMarquee />
      {children}
    </div>
  );
}
