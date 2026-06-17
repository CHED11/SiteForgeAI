"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfigSchema, type SiteConfig } from "@/lib/types";
import { SAMPLE_SITE } from "@/lib/samples";
import SiteRenderer from "@/components/site/SiteRenderer";
import EditorDock from "@/components/studio/EditorDock";
import {
  getCurrentId,
  getSite,
  saveNewSite,
  setCurrentId,
  updateSite,
} from "@/lib/storage";

// Legacy session pointer from earlier versions — read once for back-compat.
const SESSION_KEY = "siteforge:config";

function PreviewInner() {
  const params = useSearchParams();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [siteId, setSiteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resolve which site to show: ?demo → ?id= → current pointer → legacy session → demo.
  useEffect(() => {
    if (params.get("demo")) {
      setSiteId(null);
      setConfig(SAMPLE_SITE);
      return;
    }
    const queryId = params.get("id");
    const id = queryId ?? getCurrentId();
    if (id) {
      const site = getSite(id);
      if (site) {
        setSiteId(site.id);
        setConfig(site.config);
        setCurrentId(site.id);
        return;
      }
    }
    // Back-compat: a config left in sessionStorage by an older build.
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = siteConfigSchema.parse(JSON.parse(raw));
        const newId = saveNewSite(parsed);
        sessionStorage.removeItem(SESSION_KEY);
        setSiteId(newId);
        setConfig(parsed);
        return;
      }
    } catch {
      /* ignore and fall through to demo */
    }
    // Demo: render the sample without persisting it to the library.
    setConfig(SAMPLE_SITE);
  }, [params]);

  // Persist edits (debounced) whenever a saved site's config changes.
  const handleChange = useCallback(
    (next: SiteConfig) => {
      setConfig(next);
      if (!siteId) return;
      setSaved(false);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        updateSite(siteId, next);
        setSaved(true);
      }, 500);
    },
    [siteId]
  );

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
      <EditorDock config={config} onConfigChange={handleChange} saved={saved} />
      <SiteRenderer key={siteId ?? config.businessName} config={config} />
    </>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <PreviewInner />
    </Suspense>
  );
}
