"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  REGENERATABLE_SECTIONS,
  SECTION_LABELS,
  type RegeneratableSection,
  type SiteConfig,
} from "@/lib/types";
import { buildStandaloneHtml, exportFilename } from "@/lib/export-html";
import { publicFormspreeEndpoint } from "@/lib/contact";

function download(content: string, filename: string, type: string) {
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

/**
 * Floating control dock shown over a previewed site. Handles per-section AI
 * regeneration, code/JSON export, and surfaces the save state. It owns no config
 * itself — it lifts every change up via onConfigChange so the parent persists.
 */
export default function EditorDock({
  config,
  onConfigChange,
  saved,
}: {
  config: SiteConfig;
  onConfigChange: (next: SiteConfig) => void;
  saved: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<RegeneratableSection | null>(null);
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState<RegeneratableSection | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Only offer sections that actually exist on this config.
  const sections = REGENERATABLE_SECTIONS.filter(
    (s) => (config as Record<string, unknown>)[s] != null
  );

  async function regenerate(section: RegeneratableSection) {
    setBusy(section);
    setError(null);
    try {
      const res = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, section, instruction }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Regeneration failed.");
      onConfigChange({ ...config, [section]: json.value });
      setInstruction("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  function downloadHtml() {
    const html = buildStandaloneHtml(config, {
      formspreeEndpoint: publicFormspreeEndpoint(),
    });
    download(html, exportFilename(config), "text/html");
  }

  function downloadJson() {
    download(
      JSON.stringify(config, null, 2),
      exportFilename(config).replace(/\.html$/, ".json"),
      "application/json"
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-[110] flex w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 flex-col items-center gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass w-full rounded-3xl border border-white/12 bg-black/60 p-4 text-white shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Regenerate a section
              </span>
              <span className="text-xs text-white/40">
                AI rewrites one section, keeps the rest
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setActive(active === s ? null : s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                    active === s
                      ? "border-emerald-300/60 bg-emerald-300/15 text-white"
                      : "border-white/12 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {SECTION_LABELS[s]}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      placeholder={`Optional direction for "${SECTION_LABELS[active]}" — e.g. make it bolder, add a budget tier…`}
                      className="flex-1 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !busy) regenerate(active);
                      }}
                    />
                    <button
                      onClick={() => regenerate(active)}
                      disabled={busy !== null}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#22d3a8] px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {busy === active ? "Regenerating…" : "Regenerate"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-3 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200">
                {error}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 p-1.5 text-sm text-white shadow-2xl">
        <Link
          href="/"
          className="rounded-full px-4 py-2 font-medium text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
        >
          ← Studio
        </Link>
        <span className="h-5 w-px bg-white/10" />
        <button
          onClick={() => setOpen((o) => !o)}
          className={`rounded-full px-4 py-2 font-medium transition-colors duration-300 ${
            open ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"
          }`}
        >
          {open ? "Done editing" : "Edit sections"}
        </button>
        <button
          onClick={downloadHtml}
          className="rounded-full px-4 py-2 font-medium text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
        >
          Download code
        </button>
        <button
          onClick={downloadJson}
          className="hidden rounded-full px-4 py-2 font-medium text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white sm:inline"
        >
          Export JSON
        </button>
        <span
          className="ml-1 mr-2 flex items-center gap-1.5 text-xs text-white/45"
          title={saved ? "Saved to your library" : "Saving…"}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              saved ? "bg-emerald-400" : "animate-pulse bg-amber-400"
            }`}
          />
          {saved ? "Saved" : "Saving"}
        </span>
      </div>
    </div>
  );
}
