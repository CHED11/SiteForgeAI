"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import Services from "./Services";
import About from "./About";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

/**
 * Renders a full generated website from a SiteConfig. The `key` on the wrapper
 * should change when the config changes so the entrance transition replays.
 */
export default function SiteRenderer({ config }: { config: SiteConfig }) {
  return (
    <SmoothScroll>
      {/* Luxury page-transition curtain that lifts on load */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{ background: config.theme.background }}
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        <div className="flex h-full items-center justify-center">
          <motion.span
            className="font-display text-2xl tracking-tight"
            style={{ color: config.theme.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.1, times: [0, 0.3, 0.7, 1] }}
          >
            {config.businessName}
          </motion.span>
        </div>
      </motion.div>

      <main
        className="relative"
        style={{ background: config.theme.background, color: config.theme.text }}
      >
        <Navbar config={config} />
        <Hero config={config} />
        <Stats config={config} />
        <Services config={config} />
        <About config={config} />
        <Testimonials config={config} />
        <CTA config={config} />
        <Footer config={config} />
      </main>
    </SmoothScroll>
  );
}
