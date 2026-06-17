/**
 * LIVE PRODUCT CATALOG
 * --------------------
 * The two live products. To add a new live product later, drop its image in
 * /public/products, then append an entry here following the same shape.
 *
 * IMAGE NOTE: place the supplied poster files at the paths referenced by
 * `image`. Until they exist, a tasteful framed placeholder is shown — no
 * fake car art is ever generated.
 */

export type CollectionId = "premium" | "performance";

export type SizeId = "16x20" | "18x24" | "24x36";
export type FrameId = "print-only" | "black-frame";

export interface SizeOption {
  id: SizeId;
  label: string;
  /** Used to build the Stripe SKU, e.g. 16X20 */
  skuPart: string;
}

export interface FrameOption {
  id: FrameId;
  label: string;
  /** Used to build the Stripe SKU, e.g. PRINT_ONLY */
  skuPart: string;
}

export interface Product {
  id: string;
  /** Stripe SKU prefix, e.g. REVUELTO or 918 */
  skuPrefix: string;
  title: string;
  subtitle: string;
  collection: CollectionId;
  collectionLabel: string;
  badge: string;
  image: string;
  /** Short marketing line for cards. */
  tagline: string;
  /** Full gallery-style description for the product page. */
  description: string;
  /** Spec-style detail rows shown on the product page. */
  details: { label: string; value: string }[];
}

export const SIZE_OPTIONS: SizeOption[] = [
  { id: "16x20", label: "16 × 20 in", skuPart: "16X20" },
  { id: "18x24", label: "18 × 24 in", skuPart: "18X24" },
  { id: "24x36", label: "24 × 36 in", skuPart: "24X36" },
];

export const FRAME_OPTIONS: FrameOption[] = [
  { id: "print-only", label: "Print Only", skuPart: "PRINT_ONLY" },
  { id: "black-frame", label: "Black Frame", skuPart: "BLACK_FRAME" },
];

export const DEFAULT_SIZE: SizeId = "16x20";
export const DEFAULT_FRAME: FrameId = "print-only";

export const PRODUCTS: Product[] = [
  {
    id: "lamborghini-revuelto",
    skuPrefix: "REVUELTO",
    title: "Lamborghini Revuelto",
    subtitle: "Premium Collection",
    collection: "premium",
    collectionLabel: "Premium Collection",
    badge: "MOST POPULAR",
    image: "/products/revuelto.jpg",
    tagline: "The V12 hybrid flagship, rendered as collector-grade wall art.",
    description:
      "A study in Italian engineering theatre. The Revuelto poster captures the angular, aeronautics-inspired silhouette of Lamborghini's V12 hybrid flagship in deep contrast and museum-grade tonality. Printed for collectors who treat their walls like a private gallery.",
    details: [
      { label: "Subject", value: "Lamborghini Revuelto" },
      { label: "Collection", value: "Premium" },
      { label: "Finish", value: "Archival matte, gallery grade" },
      { label: "Presentation", value: "Designed for spot-lit display" },
    ],
  },
  {
    id: "porsche-918-spyder",
    skuPrefix: "918",
    title: "Porsche 918 Spyder",
    subtitle: "Performance Collection",
    collection: "performance",
    collectionLabel: "Performance Collection",
    badge: "MOST POPULAR",
    image: "/products/porsche-918.jpg",
    tagline: "Hypercar engineering, distilled into a single technical frame.",
    description:
      "The 918 Spyder defined a generation of hybrid hypercars. This poster treats it as a technical artifact — sharp lines, motorsport contrast, and a darker, more energetic palette built for the performance division. A statement piece for the serious enthusiast.",
    details: [
      { label: "Subject", value: "Porsche 918 Spyder" },
      { label: "Collection", value: "Performance" },
      { label: "Finish", value: "Archival matte, high contrast" },
      { label: "Presentation", value: "Engineered for technical display" },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCollection(collection: CollectionId): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}

/** Builds the Stripe SKU key for a product/size/frame combination. */
export function buildSku(product: Product, size: SizeOption, frame: FrameOption): string {
  return `${product.skuPrefix}_${size.skuPart}_${frame.skuPart}`;
}
