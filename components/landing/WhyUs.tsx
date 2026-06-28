"use client";

import { withAlpha } from "@/lib/utils";
import { FEATURES, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

export default function WhyUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.bg, color: THEME.text }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Choose Forge Digital"
          title="Crafted with obsessive attention to detail"
          subtitle="Every Forge Digital website is bespoke, beautifully built, and finished to a standard most studios reserve for their biggest clients."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.08} direction="up" className="h-full">
              <SpotlightCard glow={THEME.primary} surface={THEME.surface} className="h-full">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-luxe group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: withAlpha(THEME.primary, 0.12), color: THEME.primary }}
                >
                  <Icon name={f.icon} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                  {f.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
