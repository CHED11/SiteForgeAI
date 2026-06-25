"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { THEME } from "@/lib/site";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <div className={`mb-14 ${alignment}`}>
      <Reveal>
        <span
          className="text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: THEME.accent }}
        >
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
        <AnimatedText text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className="mt-5 text-lg leading-relaxed"
            style={{ color: THEME.muted }}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
