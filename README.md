# SiteForge AI

**Premium AI website generator.** Describe a business in a sentence and get a fully animated, conversion-focused website that feels like a custom **$10,000–$20,000 agency build** — not a stock AI template.

Every generated site ships with the motion language of a high-end studio:

- 🌀 **GSAP scroll storytelling** synced to **Lenis smooth scrolling**
- ✨ **Staggered, word-by-word text reveals** (Framer Motion)
- 💡 **Dynamic cursor-tracked lighting** on glassmorphism cards
- 🌊 **Parallax depth** and scroll-linked hero motion
- 🧲 **Magnetic hover** on CTAs and nav
- 🎬 **Luxury page-transition curtain** on load
- 🎨 **Animated gradient lighting** themed per brand
- 📈 **Conversion-focused layout**: hero → proof → services → story → testimonials → **pricing** → CTA → **enquiry form**

It's also a usable product, not just a preview:

- 💾 **Persist & manage sites** — every generation is saved to a local library you can reopen, rename, and delete across sessions
- 📦 **Code export** — download a self-contained, animated `index.html` (Lenis + GSAP + working form, zero build step) or export the raw `SiteConfig` as JSON (and re-import it)
- 🪄 **Per-section regeneration** — restyle or rewrite any single section (hero, pricing, palette…) with an optional instruction, while the rest of the site stays put
- 💬 **Clear pricing + enquiry flow** — AI-generated pricing tiers and a real contact form that delivers enquiries to your business inbox

---

## How it works

```
Business brief  ──▶  /api/generate  ──▶  Claude (claude-opus-4-8)  ──▶  SiteConfig (JSON)
                                              │  structured output      │
                                              │  + adaptive thinking     ▼
                                         art direction + copy     <SiteRenderer />
                                                                  (GSAP · Lenis · Framer Motion)
```

1. You write a short brief in the **studio** (`/`).
2. The API route asks Claude — acting as an agency creative director — to return a
   complete **`SiteConfig`**: palette, copy, services, stats, testimonials, and CTA.
   Output is constrained with **structured outputs** (`output_config.format`) and
   validated with **zod**, so the renderer always gets a clean shape.
3. The config is rendered full-screen at `/preview` by `<SiteRenderer />`, which
   applies the theme colors and the entire animation system. It's also **saved to
   your local library** so you can reopen, edit, and export it later.
4. From the preview's floating **editor dock** you can regenerate any single
   section (`/api/regenerate`), download the site as standalone code, or export
   the config as JSON.

No API key? The studio has a **"Explore a live demo site"** button that renders a
hand-tuned sample config so you can experience the output instantly.

### Enquiry delivery

The generated site's contact form posts **directly to Formspree** from the
browser, so it works identically on the published Next.js site and in downloaded
standalone exports — no server hop, no mailto fallback. The endpoint
(`https://formspree.io/f/mrevvglw`) is configured in the Formspree dashboard to
deliver every submission to **forge100000@gmail.com**, and is baked in at
`lib/contact.ts`. On success the form shows a thank-you message; an error only
appears if Formspree returns one. Override per-environment if ever needed:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mrevvglw
```

---

## Quick start

```bash
# 1. Install
npm install

# 2. Add your Anthropic API key
cp .env.example .env.local
#   then edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...

# 3. Run
npm run dev
```

Open <http://localhost:3000>, describe a business, and hit **Generate site**.

> Get an API key at <https://console.anthropic.com/>. The generator uses
> `claude-opus-4-8` by default; override with `SITEFORGE_MODEL` in `.env.local`.

---

## Tech stack

| Layer        | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 14 (App Router) + TypeScript                |
| Styling      | Tailwind CSS                                         |
| Motion       | GSAP + ScrollTrigger, Lenis, Framer Motion          |
| AI           | Anthropic SDK — `claude-opus-4-8`, structured output |
| Validation   | zod                                                 |

---

## Project structure

```
app/
  page.tsx                Studio — generator UI + saved-site library
  preview/page.tsx        Renders a saved/generated site full-screen + editor dock
  api/generate/route.ts   Calls Claude, returns a validated SiteConfig
  api/regenerate/route.ts Regenerates a single section of an existing SiteConfig
lib/
  types.ts              SiteConfig zod schema + JSON Schema (the contract)
  prompt.ts             Creative-director + section-regeneration prompts
  generate.ts           Claude call (streaming + structured output)
  regenerate.ts         Single-section Claude call
  anthropic.ts          Lazy SDK client
  storage.ts            localStorage site library (save/list/update/export)
  export-html.ts        Standalone animated index.html generator
  contact.ts            Formspree endpoint config for the enquiry form
  samples.ts            Demo SiteConfig + example briefs
  utils.ts              cn(), withAlpha()
components/
  providers/SmoothScroll.tsx   Lenis <-> GSAP ScrollTrigger wiring
  site/                        SiteRenderer + all page sections (incl. Pricing, Contact)
  studio/EditorDock.tsx        Floating per-section regenerate + export controls
  ui/                          Motion primitives (AnimatedText, Reveal,
                               Magnetic, SpotlightCard, Parallax, Marquee, Icon)
```

### The `SiteConfig` contract

`lib/types.ts` is the heart of the system. It defines — in one zod schema — exactly
what a website is made of (theme, hero, stats, services, about, testimonials,
pricing, CTA, contact, footer). Claude is constrained to produce JSON matching its JSON-Schema twin, and
`<SiteRenderer />` knows how to turn every field into animated UI. To add a new
section, extend the schema, add it to the JSON Schema + system prompt, and render it.

---

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

---

## Accessibility & performance

- Honors `prefers-reduced-motion` — all entrance/scroll/parallax motion is disabled
  for users who request it, with a CSS safety net in `globals.css`.
- Animations are transform/opacity-based and GPU-friendly; Lenis is wired through
  GSAP's ticker so scroll-driven motion never desyncs.

---

Crafted with **SiteForge AI**.
