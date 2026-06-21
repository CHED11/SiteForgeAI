"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar({ config }: { config: SiteConfig }) {
  const { theme, nav, businessName } = config;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className="glass flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 ease-luxe"
        style={{
          background: withAlpha(theme.surface, scrolled ? 0.72 : 0.35),
          borderColor: withAlpha("#ffffff", scrolled ? 0.1 : 0.06),
          boxShadow: scrolled
            ? `0 18px 50px ${withAlpha("#000000", 0.45)}`
            : "none",
        }}
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          style={{ color: theme.text }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: theme.primary, color: theme.background }}
          >
            {businessName.charAt(0)}
          </span>
          <span className="hidden sm:inline">{businessName}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <Magnetic key={link.href} strength={0.25}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{ color: theme.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <Magnetic strength={0.3}>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.03]"
            style={{
              background: theme.primary,
              color: theme.background,
              boxShadow: `0 10px 30px ${withAlpha(theme.primary, 0.35)}`,
            }}
          >
            {nav.cta}
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
