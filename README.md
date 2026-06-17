# CarCentralCo

**Automotive Art For Enthusiasts.**

A premium ecommerce experience for collector-grade automotive wall art. Built to
feel like an Apple product page crossed with a private automotive gallery —
minimal, smooth, intentional, and fast.

Stack: **React · Vite · TypeScript · Tailwind CSS · Framer Motion** — Vercel-ready.

---

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
```

## Add the live product images

Each product has **two** images — the poster design (primary) and the framed
poster (secondary). The design always shows first. Drop the four files into
`public/products/`:

| File                     | Product              | Role            |
| ------------------------ | -------------------- | --------------- |
| `revuelto-design.jpg`    | Lamborghini Revuelto | Poster Design   |
| `revuelto-framed.jpg`    | Lamborghini Revuelto | Framed Poster   |
| `porsche-918-design.jpg` | Porsche 918 Spyder   | Poster Design   |
| `porsche-918-framed.jpg` | Porsche 918 Spyder   | Framed Poster   |

Until they exist, a tasteful gallery placeholder is shown. No car artwork is
ever generated or faked.

---

## Everything is data-driven (edit, don't code)

All content lives in `src/config/`:

| File             | What it controls                                            |
| ---------------- | ----------------------------------------------------------- |
| `products.ts`    | Live products, sizes (16×20 / 18×24 / 24×36), frame options |
| `stripe.ts`      | Stripe SKU → payment-link mappings (paste links to go live) |
| `counters.ts`    | "Collectors / Enthusiasts Served" popularity counters       |
| `countdown.ts`   | Next-release date, headings, and the "now live" label       |
| `comingSoon.ts`  | Text-only Coming Soon vehicles per collection               |
| `site.ts`        | Brand copy, hero, About, and Why-Choose-Us pillars          |

### Going live with Stripe later

Checkout is intentionally **not** built yet. When ready: create each product in
Stripe, then paste the Payment Link into the matching SKU `url` in
`src/config/stripe.ts`. No other code changes needed — the product page reads
links by SKU. Placeholder SKUs follow `REVUELTO_16X20_PRINT_ONLY`,
`918_24X36_BLACK_FRAME`, etc.

---

## Architecture

```
src/
  components/        Header, Hero, ProductCard, CollectionPreview,
                     ComingSoonCard, CountdownTimer, TransitionOverlay, Footer …
    ui/              Button, CollectionBadge, SectionHeading
  pages/             Home, CollectionPage, ProductPage
  config/            All editable data (see table above)
  context/           TransitionContext — the signature collection transitions
  hooks/             useCountdown
  lib/               Shared Framer Motion presets + easing
```

### Signature transitions

Entering a collection plays a cinematic, route-level overlay:

- **Premium** → calm gallery: a black wash with a soft spotlight sweep and a
  hairline gold seam. Feels like stepping into a private art gallery.
- **Performance** → high-performance division: a dark panel sweep with a light
  scan streak and subtle technical scan lines.

Both respect `prefers-reduced-motion` and fall back to instant navigation.

## Deployment (Vercel)

The repo includes `vercel.json` (framework `vite`, SPA rewrites). Import the
repo into Vercel and deploy — no extra configuration required.
