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
- 📈 **Conversion-focused layout**: hero → proof → services → story → testimonials → CTA

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
   applies the theme colors and the entire animation system.

No API key? The studio has a **"Explore a live demo site"** button that renders a
hand-tuned sample config so you can experience the output instantly.

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
  page.tsx              Studio — the generator UI
  preview/page.tsx      Renders a generated site full-screen
  api/generate/route.ts Calls Claude, returns a validated SiteConfig
lib/
  types.ts              SiteConfig zod schema + JSON Schema (the contract)
  prompt.ts             Creative-director system prompt
  generate.ts           Claude call (streaming + structured output)
  anthropic.ts          Lazy SDK client
  samples.ts            Demo SiteConfig + example briefs
  utils.ts              cn(), withAlpha()
components/
  providers/SmoothScroll.tsx   Lenis <-> GSAP ScrollTrigger wiring
  site/                        SiteRenderer + all page sections
  ui/                          Motion primitives (AnimatedText, Reveal,
                               Magnetic, SpotlightCard, Parallax, Marquee, Icon)
```

### The `SiteConfig` contract

`lib/types.ts` is the heart of the system. It defines — in one zod schema — exactly
what a website is made of (theme, hero, stats, services, about, testimonials, CTA,
footer). Claude is constrained to produce JSON matching its JSON-Schema twin, and
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
