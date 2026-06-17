"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXAMPLE_BRIEFS, SAMPLE_SITE } from "@/lib/samples";
import type { SiteConfig } from "@/lib/types";

const STORAGE_KEY = "siteforge:config";

const FEATURES = [
  "GSAP scroll storytelling",
  "Lenis smooth scroll",
  "Staggered text reveals",
  "Dynamic lighting",
  "Glassmorphism",
  "Parallax depth",
  "Magnetic hover",
  "Luxury page transitions",
];

export default function StudioPage() {
  const router = useRouter();
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openSite(config: SiteConfig) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    router.push("/preview");
  }

  async function handleGenerate() {
    if (brief.trim().length < 12) {
      setError("Describe the business in at least a sentence.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Generation failed.");
      }
      openSite(data.config as SiteConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main className="grain relative min-h-screen overflow-hidden bg-ink px-6 py-16 text-bone">
      {/* Ambient gradient field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#7c5cff]/20 blur-[140px] animate-float" />
        <div className="absolute right-[-10%] top-[20%] h-[55vh] w-[55vh] rounded-full bg-[#22d3a8]/20 blur-[150px] animate-float [animation-delay:-4s]" />
        <div className="absolute bottom-[-20%] left-1/3 h-[50vh] w-[50vh] rounded-full bg-[#ff7a59]/15 blur-[140px] animate-float [animation-delay:-6s]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            SiteForge AI
          </span>
          <h1 className="mt-7 font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            Websites that look like
            <span className="block bg-gradient-to-r from-[#a78bfa] via-[#22d3a8] to-[#ff9a76] bg-clip-text text-transparent animate-gradient-pan [background-size:220%_220%]">
              a $15,000 agency build
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Describe your business. Get a fully animated, conversion-focused site
            with GSAP scroll storytelling, smooth scrolling, and luxury motion —
            generated in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="glass mt-12 rounded-4xl border border-white/10 bg-white/[0.04] p-2"
        >
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="e.g. A boutique coffee roaster in Portland focused on single-origin beans, slow brewing, and a calm, design-forward space."
            rows={4}
            className="w-full resize-none rounded-3xl bg-transparent p-5 text-base leading-relaxed text-bone placeholder:text-white/30 focus:outline-none"
          />
          <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_BRIEFS.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setBrief(ex.brief)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#22d3a8] px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 ease-luxe hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Forging your site…" : "Generate site"}
              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-center text-sm text-red-200"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40"
        >
          {FEATURES.map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
              {f}
            </span>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <button
            onClick={() => openSite(SAMPLE_SITE)}
            className="text-sm font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            No API key? Explore a live demo site →
          </button>
        </div>
      </div>
    </main>
  );
}
