# Forge Digital

**Premium website design & development agency — lead-generation site.**

Forge Digital builds modern, high-converting websites for businesses across
Australia. This repository is the studio's own website: a single, premium,
dark-luxury landing page whose one job is to **collect enquiries** from business
owners who want Forge Digital to design and build a website for them.

> This is **not** a website builder. Visitors don't create anything — they read,
> get convinced, and submit an enquiry.

---

## What's on the page

A single scrolling page (`/`) with eight sections:

1. **Hero** — headline, subheadline, dual CTAs, trust statistics, animated gradient background
2. **Why Choose Forge Digital** — eight premium feature cards
3. **Our Process** — four-step journey from enquiry to launch
4. **Recent Projects** — portfolio showcase with realistic browser mockups
5. **Pricing** — Starter / Business / Premium packages with clear inclusions
6. **Testimonials** — star-rated client reviews with business names
7. **Enquiry Form** — the most important section; posts directly to Formspree
8. **Final CTA** — closing call to action

### Design

Dark luxury aesthetic, glassmorphism cards, Lenis smooth scrolling, GSAP +
Framer Motion animations, magnetic hover, staggered text reveals, animated
gradients. Fully responsive, accessible (honours `prefers-reduced-motion`), and
SEO-friendly (semantic structure + rich metadata).

---

## Enquiry form

The form posts **directly to Formspree** from the browser, so it works on any
host with no backend. The endpoint (`https://formspree.io/f/mrevvglw`) is
configured in the Formspree dashboard to deliver every submission to
**forge100000@gmail.com**, and is set in `lib/contact.ts`.

- **Validation** via native HTML5 (`required`, email/url types)
- **Success** shows an in-place thank-you panel
- **Errors** only appear if Formspree actually returns one

Fields: Business Name, Contact Name, Email, Phone, Business Location, Industry,
Current Website (optional), Services Offered, Preferred Website Style, Budget,
Timeline, Additional Information.

Override the endpoint per environment with `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No API keys or environment variables are required.

---

## Editing content

All copy lives in **`lib/site.ts`** — brand, nav, hero, stats, features,
process steps, projects, pricing tiers, testimonials, final CTA, and the form's
dropdown options. Edit that one file to update the site's content; the theme
colours are at the top of the same file (`THEME`).

---

## Tech stack

| Layer     | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js 14 (App Router) + TypeScript       |
| Styling   | Tailwind CSS                               |
| Motion    | GSAP + ScrollTrigger, Lenis, Framer Motion |
| Forms     | Formspree (direct browser POST)            |

---

## Project structure

```
app/
  page.tsx          Composes all landing sections inside SmoothScroll
  layout.tsx        Metadata, fonts
  globals.css       Theme + utilities (glass, grain, gradient)
lib/
  site.ts           All site copy + theme tokens (edit here)
  contact.ts        Formspree endpoint config
  utils.ts          cn(), withAlpha()
components/
  providers/SmoothScroll.tsx   Lenis <-> GSAP ScrollTrigger wiring
  landing/                     Navbar, Hero, WhyUs, Process, Projects,
                               Pricing, Testimonials, EnquiryForm, FinalCta,
                               Footer, SectionHeading
  ui/                          Motion primitives (AnimatedText, Reveal,
                               Magnetic, SpotlightCard, AnimatedGradient,
                               Parallax, Marquee, Icon)
```

---

## Deploy to Vercel

1. Import `CHED11/SiteForgeAI` at [vercel.com/new](https://vercel.com/new).
2. Framework auto-detects as Next.js — no config needed.
3. No environment variables required (the enquiry form works out of the box).
4. Deploy → you get a `*.vercel.app` URL. Pushes to `main` auto-deploy.

---

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```
