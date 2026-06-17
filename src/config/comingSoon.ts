/**
 * COMING SOON VEHICLES
 * --------------------
 * Text-only premium cards. NO imagery is rendered for these until real poster
 * artwork is uploaded and promoted to the live PRODUCTS catalog.
 *
 * To promote one to live later: add the poster image to /public/products,
 * create a PRODUCTS entry, add its Stripe SKUs, and remove it from this list.
 */

import type { CollectionId } from "./products";

export interface ComingSoonVehicle {
  name: string;
  collection: CollectionId;
  collectionLabel: string;
}

export const COMING_SOON: ComingSoonVehicle[] = [
  // ── Premium Collection ────────────────────────────────────────────────
  { name: "Pagani Huayra R", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Koenigsegg CC850", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Ferrari Daytona SP3", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Aston Martin Victor", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Gordon Murray T.50", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Bugatti Tourbillon", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Mercedes-AMG ONE", collection: "premium", collectionLabel: "Premium Collection" },
  { name: "Ferrari Enzo", collection: "premium", collectionLabel: "Premium Collection" },

  // ── Performance Collection ────────────────────────────────────────────
  { name: "Lamborghini SVJ", collection: "performance", collectionLabel: "Performance Collection" },
  { name: "Porsche GT3 RS", collection: "performance", collectionLabel: "Performance Collection" },
  { name: "McLaren P1", collection: "performance", collectionLabel: "Performance Collection" },
  { name: "Aston Martin Valkyrie", collection: "performance", collectionLabel: "Performance Collection" },
  { name: "Ferrari LaFerrari", collection: "performance", collectionLabel: "Performance Collection" },
  { name: "Lamborghini Urus", collection: "performance", collectionLabel: "Performance Collection" },
];

export function getComingSoonByCollection(collection: CollectionId): ComingSoonVehicle[] {
  return COMING_SOON.filter((v) => v.collection === collection);
}
