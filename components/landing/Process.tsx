"use client";

import { withAlpha } from "@/lib/utils";
import { PROCESS, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.surface, color: THEME.text }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Process"
          title="From enquiry to launch in four simple steps"
          subtitle="A clear, collaborative process designed to be effortless for you and obsessive about craft."
        />

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[2.4rem] hidden h-px lg:block"
            style={{
              background: `linear-gradient(90deg, transparent, ${withAlpha(
                THEME.primary,
                0.4
              )}, ${withAlpha(THEME.accent, 0.4)}, transparent)`,
            }}
          />

          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.12} className="h-full">
              <div
                className="glass relative h-full rounded-4xl border p-7"
                style={{
                  background: withAlpha(THEME.bg, 0.5),
                  borderColor: withAlpha("#ffffff", 0.08),
                }}
              >
                <div
                  className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                    color: THEME.bg,
                  }}
                >
                  {p.step}
                </div>
                <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
