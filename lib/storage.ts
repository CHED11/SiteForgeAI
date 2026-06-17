"use client";

import { siteConfigSchema, type SiteConfig } from "./types";

/**
 * Local persistence for generated sites. Sites live in localStorage so a visitor
 * can build a small library, reopen, rename, edit, and export them across
 * sessions without any account. The "current" pointer is what /preview opens by
 * default right after a generation.
 */

const LIBRARY_KEY = "siteforge:library:v1";
const CURRENT_KEY = "siteforge:current";

export type SavedSite = {
  id: string;
  name: string;
  config: SiteConfig;
  createdAt: number;
  updatedAt: number;
};

function genId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function readLibrary(): SavedSite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LIBRARY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Validate each config; drop anything corrupt rather than throwing.
    return arr
      .map((s) => {
        const parsed = siteConfigSchema.safeParse(s?.config);
        if (!parsed.success || typeof s?.id !== "string") return null;
        return {
          id: s.id,
          name: typeof s.name === "string" ? s.name : parsed.data.businessName,
          config: parsed.data,
          createdAt: Number(s.createdAt) || Date.now(),
          updatedAt: Number(s.updatedAt) || Date.now(),
        } satisfies SavedSite;
      })
      .filter((s): s is SavedSite => s !== null);
  } catch {
    return [];
  }
}

function writeLibrary(sites: SavedSite[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(sites));
}

/** Newest-first list of saved sites. */
export function listSites(): SavedSite[] {
  return readLibrary().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getSite(id: string): SavedSite | null {
  return readLibrary().find((s) => s.id === id) ?? null;
}

/** Create a new saved site and mark it current. Returns its id. */
export function saveNewSite(config: SiteConfig): string {
  const now = Date.now();
  const site: SavedSite = {
    id: genId(),
    name: config.businessName,
    config,
    createdAt: now,
    updatedAt: now,
  };
  const library = readLibrary();
  library.push(site);
  writeLibrary(library);
  setCurrentId(site.id);
  return site.id;
}

/** Overwrite an existing site's config (used by per-section regeneration). */
export function updateSite(id: string, config: SiteConfig): void {
  const library = readLibrary();
  const idx = library.findIndex((s) => s.id === id);
  if (idx === -1) return;
  library[idx] = { ...library[idx], config, updatedAt: Date.now() };
  writeLibrary(library);
}

export function renameSite(id: string, name: string): void {
  const library = readLibrary();
  const idx = library.findIndex((s) => s.id === id);
  if (idx === -1) return;
  library[idx] = { ...library[idx], name: name.trim() || library[idx].name, updatedAt: Date.now() };
  writeLibrary(library);
}

export function deleteSite(id: string): void {
  writeLibrary(readLibrary().filter((s) => s.id !== id));
  if (getCurrentId() === id) clearCurrentId();
}

export function setCurrentId(id: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRENT_KEY, id);
}

export function getCurrentId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_KEY);
}

export function clearCurrentId(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CURRENT_KEY);
}

/** Import a config exported as JSON; validates before saving. */
export function importConfigJson(json: string): string {
  const parsed = siteConfigSchema.parse(JSON.parse(json));
  return saveNewSite(parsed);
}
