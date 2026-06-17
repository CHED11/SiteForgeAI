import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "../config/site";
import { useTransition } from "../context/TransitionContext";
import { EASE_LUX } from "../lib/motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { enterCollection } = useTransition();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const goPremium = () => enterCollection("/collections/premium", "premium");
  const goPerformance = () => enterCollection("/collections/performance", "performance");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux",
        scrolled ? "glass" : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-lux flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tightest text-chalk">
            CarCentral<span className="text-gold">Co</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          <button onClick={goPremium} className="nav-link">
            Premium
          </button>
          <button onClick={goPerformance} className="nav-link">
            Performance
          </button>
          <Link to="/#next-release" className="nav-link">
            Next Release
          </Link>
          <Link to="/#about" className="nav-link">
            About
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="relative z-50 flex h-9 w-9 items-center justify-center md:hidden"
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-chalk"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-full bg-chalk"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-chalk"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUX }}
            className="glass overflow-hidden md:hidden"
          >
            <nav className="container-lux flex flex-col gap-1 py-6 text-lg">
              <button onClick={goPremium} className="py-3 text-left text-chalk">
                Premium Collection
              </button>
              <button onClick={goPerformance} className="py-3 text-left text-chalk">
                Performance Collection
              </button>
              <Link to="/#next-release" className="py-3 text-chalk">
                Next Release
              </Link>
              <Link to="/#about" className="py-3 text-chalk">
                About
              </Link>
              <p className="mt-3 text-sm text-ash">{SITE.tagline}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
