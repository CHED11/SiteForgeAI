import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "../config/site";
import { heroLine, stagger } from "../lib/motion";
import { useTransition } from "../context/TransitionContext";
import { Button } from "./ui/Button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { enterCollection } = useTransition();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax drift — nothing aggressive.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background: deep black with slow-moving soft spotlights */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-ink" />
        <motion.div
          className="absolute left-1/2 top-[-20%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.10),transparent_60%)]"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        variants={stagger(0.18, 0.2)}
        initial="hidden"
        animate="visible"
        className="container-lux relative z-10 flex flex-col items-center text-center"
      >
        <motion.span variants={heroLine} className="eyebrow mb-8 text-silver">
          {SITE.tagline}
        </motion.span>

        <motion.h1
          variants={heroLine}
          className="max-w-[16ch] text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-chalk sm:text-6xl lg:text-7xl"
        >
          {SITE.hero.headline}
        </motion.h1>

        <motion.p
          variants={heroLine}
          className="mt-7 max-w-prose text-base leading-relaxed text-ash sm:text-lg"
        >
          {SITE.hero.subheadline}
        </motion.p>

        <motion.div
          variants={heroLine}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            variant="metallic"
            onClick={() => enterCollection("/collections/premium", "premium")}
          >
            Shop Premium Collection
          </Button>
          <Button
            variant="ghost"
            onClick={() => enterCollection("/collections/performance", "performance")}
          >
            Shop Performance Collection
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: fade }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
        >
          <span className="h-1.5 w-px rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
