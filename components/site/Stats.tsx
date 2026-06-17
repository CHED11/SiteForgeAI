"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function Stats({ config }: { config: SiteConfig }) {
  const { theme, stats } = config;
  return (
    <section
      className="relative z-10 px-6 py-16"
      style={{ background: theme.background }}
    >
      <div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-4xl border md:grid-cols-4"
        style={{
          borderColor: withAlpha(theme.text, 0.08),
          background: withAlpha(theme.text, 0.08),
        }}
      >
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className="flex h-full flex-col items-center justify-center gap-2 px-6 py-10 text-center"
              style={{ background: theme.background }}
            >
              <span
                className="font-display text-4xl font-medium md:text-5xl"
                style={{ color: theme.primary }}
              >
                {s.value}
              </span>
              <span
                className="text-xs uppercase tracking-[0.15em]"
                style={{ color: theme.muted }}
              >
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
