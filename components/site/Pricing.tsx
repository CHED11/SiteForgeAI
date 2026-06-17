"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import Magnetic from "@/components/ui/Magnetic";

export default function Pricing({ config }: { config: SiteConfig }) {
  const { theme, pricing } = config;
  if (!pricing) return null;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: theme.surface, color: theme.text }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: theme.accent }}
            >
              {pricing.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            <AnimatedText text={pricing.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg" style={{ color: theme.muted }}>
              {pricing.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 3) * 0.1} className="h-full">
              <div
                className="glass group relative flex h-full flex-col overflow-hidden rounded-4xl border p-8 transition-transform duration-500 ease-luxe hover:-translate-y-1.5"
                style={{
                  background: withAlpha(theme.surface, tier.featured ? 0.85 : 0.5),
                  borderColor: tier.featured
                    ? theme.primary
                    : withAlpha("#ffffff", 0.08),
                  boxShadow: tier.featured
                    ? `0 24px 60px ${withAlpha(theme.primary, 0.35)}`
                    : "none",
                }}
              >
                {tier.featured && (
                  <span
                    className="absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{ background: theme.primary, color: theme.background }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="font-display text-4xl font-medium"
                    style={{ color: theme.text }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm" style={{ color: theme.muted }}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm" style={{ color: theme.muted }}>
                  {tier.description}
                </p>
                <ul className="my-7 flex flex-1 flex-col gap-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={theme.primary}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: theme.text }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.25}>
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.03]"
                    style={
                      tier.featured
                        ? {
                            background: theme.primary,
                            color: theme.background,
                            boxShadow: `0 12px 32px ${withAlpha(theme.primary, 0.4)}`,
                          }
                        : {
                            border: `1px solid ${withAlpha(theme.text, 0.2)}`,
                            color: theme.text,
                          }
                    }
                  >
                    {tier.cta}
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm" style={{ color: theme.muted }}>
            {pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
