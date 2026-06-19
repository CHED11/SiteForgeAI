# Render'N'co — Gold Coast Rendering Specialists

A production-ready, single-page marketing website for **Render'N'co**, a Gold
Coast rendering company with 35+ years of experience.

Built with **React + Vite + Tailwind CSS**. Mobile-first, fully responsive,
smooth-scrolling, and conversion-focused.

## Features

- ⚡️ Fast Vite build with code-splitting and optimised images
- 📱 Mobile-first responsive layout + sticky mobile call/quote bar
- 🎯 Conversion-focused: working `tel:` buttons and smooth-scroll quote CTAs
- 📨 **Real working enquiry form** via Formspree (loading / success / error states)
- 🔍 SEO meta tags, Open Graph, and LocalBusiness structured data
- ♿️ Accessible markup with reduced-motion support
- 🧩 Clean, reusable components driven by central data files

## Sections

Hero · About · Services · Recent Projects · Why Choose Us · Process ·
Enquiry Form · Contact · Footer

## Getting started

```bash
npm install
cp .env.example .env   # then add your Formspree endpoint
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Enquiry form setup (Formspree)

The enquiry form posts to [Formspree](https://formspree.io). To enable it:

1. Create a free form at <https://formspree.io>.
2. Copy your form endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Add it to a `.env` file in the project root:

   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```

4. Restart the dev server. Submissions will now be delivered to your inbox.

> If the endpoint is missing, the form fails gracefully and prompts visitors to
> call instead — it never silently swallows an enquiry.

## Tech stack

| Tool         | Purpose                          |
| ------------ | -------------------------------- |
| React 18     | UI components                    |
| Vite 5       | Dev server & production build    |
| Tailwind CSS | Styling / design system          |
| lucide-react | Icons                            |
| Formspree    | Enquiry form delivery            |

## Business details

- **Phone:** 0403 667 250
- **Hours:** Monday–Friday, 8am–5pm
- **Service area:** Gold Coast & surrounding areas
