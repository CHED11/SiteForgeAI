"use client";

import { withAlpha } from "@/lib/utils";
import { PRICING, PRICING_NOTE, THEME } from "@/lib/site";
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
          title="Straightforward pricing, premium results"
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

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm" style={{ color: THEME.muted }}>
            {PRICING_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
