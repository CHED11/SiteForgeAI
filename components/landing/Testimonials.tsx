"use client";

import { withAlpha } from "@/lib/utils";
import { TESTIMONIALS, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#ffc24b" }}>
          <Icon name="star" size={15} />
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.bg, color: THEME.text }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Client Results"
          title="Trusted by businesses across Australia"
          subtitle="Real words from real owners who've grown their enquiries with a Forge Digital website."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={(i % 3) * 0.1} className="h-full">
              <SpotlightCard glow={THEME.accent} surface={THEME.surface} className="h-full">
                <Stars count={t.rating} />
                <p className="mt-4 text-base leading-relaxed" style={{ color: THEME.text }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${withAlpha(
                        THEME.primary,
                        0.9
                      )}, ${withAlpha(THEME.accent, 0.9)})`,
                      color: THEME.bg,
                    }}
                    aria-hidden
                  >
                    {t.author
                      .split(" ")
                      .map((w) => w.charAt(0))
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: THEME.text }}>
                      {t.author}
                    </div>
                    <div className="text-xs" style={{ color: THEME.muted }}>
                      {t.business}
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
