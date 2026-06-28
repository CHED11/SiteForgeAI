"use client";

import { withAlpha } from "@/lib/utils";
import { GBP_ADDON, PRICING, PRICING_NOTE, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.surface, color: THEME.text }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Straightforward pricing, premium craftsmanship"
          subtitle="Transparent packages with no surprises. Not sure which fits? Send an enquiry and we'll recommend the right one."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1} className="h-full">
              <div
                className="glass group relative flex h-full flex-col overflow-hidden rounded-4xl border p-8 transition-transform duration-500 ease-luxe hover:-translate-y-1.5"
                style={{
                  background: withAlpha(THEME.bg, tier.featured ? 0.85 : 0.5),
                  borderColor: tier.featured ? THEME.primary : withAlpha("#ffffff", 0.08),
                  boxShadow: tier.featured ? `0 28px 70px ${withAlpha(THEME.primary, 0.35)}` : "none",
                }}
              >
                {tier.featured && (
                  <span
                    className="absolute right-7 top-7 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                      color: THEME.bg,
                    }}
                  >
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-medium" style={{ color: THEME.text }}>
                    {tier.price}
                  </span>
                  <span className="text-sm" style={{ color: THEME.muted }}>
                    {tier.cadence}
                  </span>
                </div>
                <p className="mt-3 text-sm" style={{ color: THEME.muted }}>
                  {tier.description}
                </p>

                <ul className="my-7 flex flex-1 flex-col gap-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{ background: withAlpha(THEME.accent, 0.16), color: THEME.accent }}
                      >
                        <Icon name="check" size={11} />
                      </span>
                      <span style={{ color: THEME.text }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {tier.addon && (
                  <a
                    href="#addon"
                    className="mb-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-medium transition-colors duration-300"
                    style={{
                      borderColor: withAlpha(THEME.accent, 0.3),
                      background: withAlpha(THEME.accent, 0.08),
                      color: THEME.accent,
                    }}
                  >
                    <Icon name="star" size={13} />
                    Optional add-on: Google Business Profile &amp; Reviews
                  </a>
                )}

                <Magnetic strength={0.25}>
                  <a
                    href="#enquiry"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.03]"
                    style={
                      tier.featured
                        ? {
                            background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                            color: THEME.bg,
                            boxShadow: `0 14px 36px ${withAlpha(THEME.primary, 0.4)}`,
                          }
                        : { border: `1px solid ${withAlpha(THEME.text, 0.2)}`, color: THEME.text }
                    }
                  >
                    {tier.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Optional premium add-on */}
        <Reveal>
          <div
            id="addon"
            className="glass relative mt-8 overflow-hidden rounded-5xl border p-8 sm:p-10"
            style={{
              background: withAlpha(THEME.bg, 0.6),
              borderColor: withAlpha(THEME.accent, 0.25),
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[110px]"
              style={{ background: withAlpha(THEME.accent, 0.16) }}
            />
            <div className="relative z-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ background: withAlpha(THEME.accent, 0.16), color: THEME.accent }}
                  >
                    <Icon name="star" size={12} /> {GBP_ADDON.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight sm:text-3xl">
                    {GBP_ADDON.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                    {GBP_ADDON.intro}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full border px-4 py-2 text-xs font-medium"
                  style={{ borderColor: withAlpha(THEME.text, 0.16), color: THEME.text }}
                >
                  {GBP_ADDON.availability}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {GBP_ADDON.groups.map((group) => (
                  <div key={group.heading}>
                    <h4
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: THEME.primary }}
                    >
                      {group.heading}
                    </h4>
                    <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                            style={{ background: withAlpha(THEME.accent, 0.16), color: THEME.accent }}
                          >
                            <Icon name="check" size={11} />
                          </span>
                          <span style={{ color: THEME.text }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p
                className="mt-8 border-t pt-6 text-sm leading-relaxed"
                style={{ borderColor: withAlpha(THEME.text, 0.1), color: THEME.muted }}
              >
                {GBP_ADDON.note}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm" style={{ color: THEME.muted }}>
            {PRICING_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
