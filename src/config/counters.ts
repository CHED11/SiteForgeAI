/**
 * POPULARITY COUNTERS
 * -------------------
 * Editable counts shown on the "Popular Picks" cards. Update the numbers
 * here whenever you want — they are purely presentational.
 */

export interface PopularityCounter {
  productId: string;
  count: number;
  label: string;
}

export const POPULARITY_COUNTERS: PopularityCounter[] = [
  { productId: "lamborghini-revuelto", count: 312, label: "Collectors Served" },
  { productId: "porsche-918-spyder", count: 428, label: "Enthusiasts Served" },
];

export function getCounter(productId: string): PopularityCounter | undefined {
  return POPULARITY_COUNTERS.find((c) => c.productId === productId);
}
