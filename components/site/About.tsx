"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import Parallax from "@/components/ui/Parallax";

export default function About({ config }: { config: SiteConfig }) {
  const { theme, about } = config;

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: theme.surface, color: theme.text }}
    >
      {/* Parallax accent ring */}
      <Parallax
        speed={0.3}
        className="pointer-events-none absolute -right-40 top-10 hidden lg:block"
      >
        <div
          className="h-[420px] w-[420px] rounded-full border opacity-30 animate-spin-slow"
          style={{ borderColor: withAlpha(theme.accent, 0.4) }}
        />
      </Parallax>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: theme.accent }}
            >
              {about.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            <AnimatedText text={about.title} />
          </h2>
          <Reveal delay={0.15}>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: theme.muted }}
            >
              {about.body}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {about.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.12} direction="left">
              <div
                className="group flex gap-5 rounded-3xl border p-6 transition-colors duration-500"
                style={{
                  borderColor: withAlpha(theme.text, 0.08),
                  background: withAlpha(theme.background, 0.5),
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium transition-transform duration-500 ease-luxe group-hover:scale-110"
                  style={{
                    background: withAlpha(theme.primary, 0.14),
                    color: theme.primary,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
                    {point.title}
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: theme.muted }}
                  >
                    {point.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
