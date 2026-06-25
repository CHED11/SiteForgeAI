"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { withAlpha } from "@/lib/utils";
import { BRAND, NAV_LINKS, THEME } from "@/lib/site";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          background: withAlpha(THEME.surface, scrolled ? 0.78 : 0.4),
          borderColor: withAlpha("#ffffff", scrolled ? 0.1 : 0.06),
          boxShadow: scrolled ? `0 18px 50px ${withAlpha("#000000", 0.5)}` : "none",
        }}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 text-sm font-bold tracking-[0.12em]"
          style={{ color: THEME.text }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black"
            style={{
              background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
              color: THEME.bg,
            }}
          >
            F
          </span>
          {BRAND.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.2}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{ color: THEME.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = THEME.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = THEME.muted)}
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.3} className="hidden sm:block">
            <a
              href="#enquiry"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.03]"
              style={{
                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                color: THEME.bg,
                boxShadow: `0 10px 30px ${withAlpha(THEME.primary, 0.4)}`,
              }}
            >
              Free Proposal
            </a>
          </Magnetic>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: withAlpha("#ffffff", 0.12), color: THEME.text }}
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 mx-4 w-[calc(100%-2rem)] max-w-6xl rounded-3xl border p-3 md:hidden"
          style={{
            background: withAlpha(THEME.surface, 0.92),
            borderColor: withAlpha("#ffffff", 0.1),
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium"
              style={{ color: THEME.text }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl px-4 py-3 text-center text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
              color: THEME.bg,
            }}
          >
            Get My Free Proposal
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
