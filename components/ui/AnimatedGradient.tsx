"use client";

import { withAlpha } from "@/lib/utils";

/**
 * Animated, blurred gradient blobs that drift behind a section. Driven by CSS
 * keyframes so it's GPU-cheap. Colors are pulled from the generated theme so
 * every site gets bespoke lighting.
 */
export default function AnimatedGradient({
  primary,
  accent,
  className,
}: {
  primary: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div
        className="absolute -left-1/4 top-[-20%] h-[55vh] w-[55vh] rounded-full blur-[120px] animate-float"
        style={{ background: withAlpha(primary, 0.5) }}
      />
      <div
        className="absolute right-[-15%] top-[10%] h-[50vh] w-[50vh] rounded-full blur-[130px] animate-float"
        style={{ background: withAlpha(accent, 0.4), animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-25%] left-1/3 h-[45vh] w-[45vh] rounded-full blur-[120px] animate-float"
        style={{ background: withAlpha(primary, 0.35), animationDelay: "-5s" }}
      />
    </div>
  );
}
