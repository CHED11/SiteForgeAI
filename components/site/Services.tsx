"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Icon from "@/components/ui/Icon";

export default function Services({ config }: { config: SiteConfig }) {
  const { theme, services } = config;

  return (
    <section
      id="services"
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
              {services.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            <AnimatedText text={services.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg" style={{ color: theme.muted }}>
              {services.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.1} direction="up">
              <SpotlightCard
                glow={theme.primary}
                surface={theme.surface}
                className="h-full"
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-luxe group-hover:scale-110 group-hover:-rotate-6"
                  style={{
                    background: withAlpha(theme.primary, 0.12),
                    color: theme.primary,
                  }}
                >
                  <Icon name={item.icon} />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: theme.text }}
                >
                  {item.name}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: theme.muted }}
                >
                  {item.description}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-1 group-hover:opacity-100"
                  style={{ color: theme.primary }}
                >
                  Learn more →
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
