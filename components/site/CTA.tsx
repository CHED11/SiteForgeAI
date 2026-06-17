"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedGradient from "@/components/ui/AnimatedGradient";
import Magnetic from "@/components/ui/Magnetic";

export default function CTA({ config }: { config: SiteConfig }) {
  const { theme, cta } = config;

  return (
    <section id="contact" className="px-6 py-28" style={{ background: theme.background }}>
      <div
        className="grain relative mx-auto max-w-5xl overflow-hidden rounded-5xl border px-8 py-20 text-center"
        style={{
          background: theme.surface,
          borderColor: withAlpha(theme.primary, 0.2),
          color: theme.text,
        }}
      >
        <AnimatedGradient primary={theme.primary} accent={theme.accent} />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            <AnimatedText text={cta.headline} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: theme.muted }}>
              {cta.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Magnetic strength={0.45}>
                <a
                  href="#top"
                  className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.04]"
                  style={{
                    background: theme.primary,
                    color: theme.background,
                    boxShadow: `0 18px 48px ${withAlpha(theme.primary, 0.45)}`,
                  }}
                >
                  {cta.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
