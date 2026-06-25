"use client";

import { withAlpha } from "@/lib/utils";
import { FINAL_CTA, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedGradient from "@/components/ui/AnimatedGradient";
import Magnetic from "@/components/ui/Magnetic";

export default function FinalCta() {
  return (
    <section className="px-6 py-28" style={{ background: THEME.surface }}>
      <div
        className="grain relative mx-auto max-w-5xl overflow-hidden rounded-5xl border px-8 py-20 text-center"
        style={{
          background: THEME.bg,
          borderColor: withAlpha(THEME.primary, 0.25),
          color: THEME.text,
        }}
      >
        <AnimatedGradient primary={THEME.primary} accent={THEME.accent} />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            <AnimatedText text={FINAL_CTA.headline} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: THEME.muted }}>
              {FINAL_CTA.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Magnetic strength={0.45}>
                <a
                  href="#enquiry"
                  className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.04]"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                    color: THEME.bg,
                    boxShadow: `0 18px 48px ${withAlpha(THEME.primary, 0.5)}`,
                  }}
                >
                  {FINAL_CTA.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
