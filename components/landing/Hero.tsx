"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { withAlpha } from "@/lib/utils";
import { HERO, STATS, THEME } from "@/lib/site";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedGradient from "@/components/ui/AnimatedGradient";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-36"
      style={{ background: THEME.bg, color: THEME.text }}
    >
      <AnimatedGradient primary={THEME.primary} accent={THEME.accent} />

      {/* Architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${withAlpha(
            THEME.text,
            0.5
          )} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(
            THEME.text,
            0.5
          )} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            borderColor: withAlpha(THEME.primary, 0.3),
            color: THEME.primary,
            background: withAlpha(THEME.primary, 0.06),
          }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: THEME.accent }}
          />
          {HERO.eyebrow}
        </motion.span>

        <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl md:text-[5.25rem]">
          <AnimatedText text={HERO.headline} as="span" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed"
          style={{ color: THEME.muted }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href="#enquiry"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                color: THEME.bg,
                boxShadow: `0 16px 44px ${withAlpha(THEME.primary, 0.45)}`,
              }}
            >
              {HERO.primaryCta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-colors duration-300"
              style={{ borderColor: withAlpha(THEME.text, 0.2), color: THEME.text }}
            >
              {HERO.secondaryCta}
            </a>
          </Magnetic>
        </motion.div>

        {/* Trust-building statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border sm:grid-cols-4"
          style={{
            borderColor: withAlpha(THEME.text, 0.1),
            background: withAlpha(THEME.text, 0.08),
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 px-4 py-6"
              style={{ background: THEME.bg }}
            >
              <span
                className="font-display text-3xl font-medium"
                style={{ color: THEME.primary }}
              >
                {s.value}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: THEME.muted }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div
          className="flex h-9 w-5 items-start justify-center rounded-full border p-1"
          style={{ borderColor: withAlpha(THEME.text, 0.25) }}
        >
          <motion.span
            className="h-1.5 w-1 rounded-full"
            style={{ background: THEME.text }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
