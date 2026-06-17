"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfigSchema, type SiteConfig } from "@/lib/types";
import { SAMPLE_SITE } from "@/lib/samples";
import SiteRenderer from "@/components/site/SiteRenderer";

const STORAGE_KEY = "siteforge:config";

export default function PreviewPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        setConfig(siteConfigSchema.parse(JSON.parse(raw)));
        return;
      }
    } catch {
      /* fall through to demo */
    }
    setConfig(SAMPLE_SITE);
  }, []);

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-bone">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          Loading your site…
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating return-to-studio control */}
      <Link
        href="/"
        className="glass fixed bottom-5 left-1/2 z-[110] -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-white transition-transform duration-300 ease-luxe hover:scale-[1.04]"
      >
        ← Back to studio
      </Link>
      <SiteRenderer key={config.businessName} config={config} />
    </>
  );
}
