"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedGradient from "@/components/ui/AnimatedGradient";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero({ config }: { config: SiteConfig }) {
  const { theme, hero } = config;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Content drifts up and fades as you scroll past — cinematic exit.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32"
      style={{ background: theme.background, color: theme.text }}
    >
      <AnimatedGradient primary={theme.primary} accent={theme.accent} />

      {/* Fine grid for technical/architectural depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${withAlpha(
            theme.text,
            0.5
          )} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(
            theme.text,
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
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            borderColor: withAlpha(theme.primary, 0.3),
            color: theme.primary,
            background: withAlpha(theme.primary, 0.06),
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: theme.primary }}
          />
          {hero.eyebrow}
        </motion.span>

        <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
          <AnimatedText text={hero.headline} as="span" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed"
          style={{ color: theme.muted }}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.04]"
              style={{
                background: theme.primary,
                color: theme.background,
                boxShadow: `0 16px 44px ${withAlpha(theme.primary, 0.4)}`,
              }}
            >
              {hero.primaryCta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-colors duration-300"
              style={{
                borderColor: withAlpha(theme.text, 0.2),
                color: theme.text,
              }}
            >
              {hero.secondaryCta}
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm"
          style={{ color: theme.muted }}
        >
          {hero.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {h}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div
          className="flex h-9 w-5 items-start justify-center rounded-full border p-1"
          style={{ borderColor: withAlpha(theme.text, 0.25) }}
        >
          <motion.span
            className="h-1.5 w-1 rounded-full"
            style={{ background: theme.text }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
