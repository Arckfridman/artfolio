const MARQUEE_TEXT = "ARCK DESIGN ";

export function ScrollingMarquee() {
  const segment = Array.from({ length: 12 }, () => MARQUEE_TEXT).join("");

  return (
    <div
      className="relative z-20 w-full overflow-hidden border-b border-white/[0.08] py-3"
      aria-hidden
    >
      <div className="marquee-track flex w-max">
        <span className="marquee-content font-[family-name:var(--font-founders)] text-[11px] font-normal uppercase tracking-[0.55em] text-white/20">
          {segment}
        </span>
        <span className="marquee-content font-[family-name:var(--font-founders)] text-[11px] font-normal uppercase tracking-[0.55em] text-white/20">
          {segment}
        </span>
      </div>
    </div>
  );
}
