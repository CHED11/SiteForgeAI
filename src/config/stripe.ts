/**
 * STRIPE PLACEHOLDER MAPPINGS
 * ---------------------------
 * Checkout is NOT live yet. These are placeholder SKU keys mapped to empty
 * Stripe payment / buy-button links.
 *
 * TO GO LIVE LATER:
 *   1. Create each product/price in your Stripe dashboard.
 *   2. Paste the generated Payment Link (or Checkout URL) into the matching
 *      `url` field below. Nothing else in the codebase needs to change —
 *      the product pages read links from this file by SKU.
 *
 * SKU convention: <PRODUCT>_<SIZE>_<FRAME>
 */

export type StripeSku = string;

export interface StripeMapping {
  /** Human label, for the dashboard / your own reference. */
  label: string;
  /** Stripe Payment Link or Checkout URL. Leave "" until checkout is live. */
  url: string;
}

export const STRIPE_LINKS: Record<StripeSku, StripeMapping> = {
  // ── Lamborghini Revuelto ──────────────────────────────────────────────
  REVUELTO_16X20_PRINT_ONLY: { label: "Revuelto · 16x20 · Print Only", url: "" },
  REVUELTO_16X20_BLACK_FRAME: { label: "Revuelto · 16x20 · Black Frame", url: "" },
  REVUELTO_18X24_PRINT_ONLY: { label: "Revuelto · 18x24 · Print Only", url: "" },
  REVUELTO_18X24_BLACK_FRAME: { label: "Revuelto · 18x24 · Black Frame", url: "" },
  REVUELTO_24X36_PRINT_ONLY: { label: "Revuelto · 24x36 · Print Only", url: "" },
  REVUELTO_24X36_BLACK_FRAME: { label: "Revuelto · 24x36 · Black Frame", url: "" },

  // ── Porsche 918 Spyder ────────────────────────────────────────────────
  "918_16X20_PRINT_ONLY": { label: "918 Spyder · 16x20 · Print Only", url: "" },
  "918_16X20_BLACK_FRAME": { label: "918 Spyder · 16x20 · Black Frame", url: "" },
  "918_18X24_PRINT_ONLY": { label: "918 Spyder · 18x24 · Print Only", url: "" },
  "918_18X24_BLACK_FRAME": { label: "918 Spyder · 18x24 · Black Frame", url: "" },
  "918_24X36_PRINT_ONLY": { label: "918 Spyder · 24x36 · Print Only", url: "" },
  "918_24X36_BLACK_FRAME": { label: "918 Spyder · 24x36 · Black Frame", url: "" },
};

/** Returns the live Stripe link for a SKU, or null if not yet configured. */
export function getStripeLink(sku: StripeSku): string | null {
  const entry = STRIPE_LINKS[sku];
  return entry && entry.url ? entry.url : null;
}
