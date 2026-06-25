import type { JSX } from "react";

/** Inline stroke-icon set used across the site. Self-contained, no deps. */
export type IconName =
  | "palette"
  | "phone"
  | "gauge"
  | "search"
  | "target"
  | "support"
  | "sparkle"
  | "growth"
  | "rocket"
  | "shield"
  | "layers"
  | "cart"
  | "wrench"
  | "star"
  | "check"
  | "arrow";

const paths: Record<IconName, JSX.Element> = {
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="7.5" r="1" />
      <circle cx="6.5" cy="12.5" r="1" />
      <path d="M12 2a10 10 0 0 0 0 20c1.7 0 2-1.5 1-2.5s-.5-2.5 1-2.5h2a4 4 0 0 0 4-4c0-5.5-4-11-9-11z" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 14l4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="1" />
      <rect x="18" y="14" width="4" height="6" rx="1" />
      <path d="M18 20a3 3 0 0 1-3 2h-1" />
    </>
  ),
  sparkle: (
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 2.5L22.5 18 20 19l-1 2.5L18 19l-2.5-1 2.5-1 1-2.5z" />
  ),
  growth: (
    <>
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0z" />
      <path d="M12 15l-3-3a16 16 0 0 1 7-9c2.5 0 5 .5 5 .5s.5 2.5.5 5a16 16 0 0 1-9 7z" />
      <circle cx="15" cy="9" r="1.2" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="18" cy="21" r="1.5" />
      <path d="M2.5 3h2l2.2 12.4a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21.5 7H6" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6l-6.4 6.4 2.8 2.8 6.4-6.4a4 4 0 0 0 5.6-5.6l-2.5 2.5-2.1-2.1 2.5-2.5z" />
  ),
  star: (
    <polygon points="12 2 15.1 8.6 22 9.3 17 14.1 18.2 21 12 17.6 5.8 21 7 14.1 2 9.3 8.9 8.6 12 2" />
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  arrow: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
};

export default function Icon({
  name,
  className,
  size = 24,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}
