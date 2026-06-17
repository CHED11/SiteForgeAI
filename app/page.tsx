"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXAMPLE_BRIEFS } from "@/lib/samples";
import type { SiteConfig } from "@/lib/types";
import { buildStandaloneHtml, exportFilename } from "@/lib/export-html";
import { publicFormspreeEndpoint, publicInquiryEmail } from "@/lib/contact";
import {
  deleteSite,
  importConfigJson,
  listSites,
  saveNewSite,
  setCurrentId,
  type SavedSite,
} from "@/lib/storage";

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

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function StudioPage() {
  const router = useRouter();
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sites, setSites] = useState<SavedSite[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSites(listSites());
  }, []);

  function refresh() {
    setSites(listSites());
  }

  function openSaved(id: string) {
    setCurrentId(id);
    router.push(`/preview?id=${id}`);
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
      const id = saveNewSite(data.config as SiteConfig);
      router.push(`/preview?id=${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const id = importConfigJson(String(reader.result));
        openSaved(id);
      } catch {
        setError("That file isn't a valid SiteForge export.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function downloadCode(site: SavedSite) {
    const html = buildStandaloneHtml(site.config, {
      formspreeEndpoint: publicFormspreeEndpoint(),
      inquiryEmail: publicInquiryEmail(),
    });
    downloadFile(html, exportFilename(site.config), "text/html");
  }

  function remove(id: string) {
    deleteSite(id);
    refresh();
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
            with pricing, a working enquiry form, GSAP scroll storytelling, and
            luxury motion — generated in seconds, then editable section by section.
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
          <button
            onClick={() => router.push("/preview?demo=1")}
            className="text-sm font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            No API key? Explore a live demo site →
          </button>
          <button
            onClick={() => fileInput.current?.click()}
            className="text-sm font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            Import a saved .json
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {/* Saved sites library */}
      {sites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-20 max-w-5xl"
        >
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Your sites
            </h2>
            <span className="text-xs uppercase tracking-[0.18em] text-white/40">
              Saved on this device
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <div
                key={site.id}
                className="glass group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
              >
                {/* Theme swatch preview */}
                <button
                  onClick={() => openSaved(site.id)}
                  className="block h-24 w-full"
                  style={{ background: site.config.theme.background }}
                  aria-label={`Open ${site.name}`}
                >
                  <div className="flex h-full items-center gap-2 px-5">
                    {[
                      site.config.theme.primary,
                      site.config.theme.accent,
                      site.config.theme.surface,
                      site.config.theme.text,
                    ].map((c, i) => (
                      <span
                        key={i}
                        className="h-6 w-6 rounded-full ring-1 ring-white/10"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </button>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {site.name}
                    </h3>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-white/35">
                      {new Date(site.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-white/45">
                    {site.config.industry}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                    <button
                      onClick={() => openSaved(site.id)}
                      className="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white transition-colors hover:bg-white/20"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => downloadCode(site)}
                      className="rounded-full border border-white/12 px-3 py-1.5 font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      Code
                    </button>
                    <button
                      onClick={() =>
                        downloadFile(
                          JSON.stringify(site.config, null, 2),
                          exportFilename(site.config).replace(/\.html$/, ".json"),
                          "application/json"
                        )
                      }
                      className="rounded-full border border-white/12 px-3 py-1.5 font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => remove(site.id)}
                      className="ml-auto rounded-full px-2.5 py-1.5 font-medium text-white/40 transition-colors hover:text-red-300"
                      aria-label={`Delete ${site.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  );
}
