"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Testimonials({ config }: { config: SiteConfig }) {
  const { theme, testimonials } = config;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: theme.background, color: theme.text }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: theme.accent }}
            >
              {testimonials.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            <AnimatedText text={testimonials.title} />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.author} delay={(i % 3) * 0.1}>
              <SpotlightCard
                glow={theme.accent}
                surface={theme.surface}
                className="h-full"
              >
                <div
                  className="font-display text-5xl leading-none"
                  style={{ color: withAlpha(theme.primary, 0.4) }}
                >
                  &ldquo;
                </div>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: theme.text }}
                >
                  {t.quote}
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      background: withAlpha(theme.primary, 0.16),
                      color: theme.primary,
                    }}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.text }}>
                      {t.author}
                    </div>
                    <div className="text-xs" style={{ color: theme.muted }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
