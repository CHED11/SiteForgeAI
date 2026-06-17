# Live Product Images

Each product uses **two** images, in this order:

1. **Poster Design** (primary — shown first, used on all cards & previews)
2. **Framed Poster** (secondary — shown second in the product-page gallery)

The four supplied files live here, named exactly:

| File                        | Product              | Role               |
| --------------------------- | -------------------- | ------------------ |
| `revuelto-design.webp`      | Lamborghini Revuelto | Poster Design (1)  |
| `revuelto-framed.webp`      | Lamborghini Revuelto | Framed Poster (2)  |
| `porsche-918-design.webp`   | Porsche 918 Spyder   | Poster Design (1)  |
| `porsche-918-framed.webp`   | Porsche 918 Spyder   | Framed Poster (2)  |

The site references these paths in `src/config/products.ts`. Until the files
exist, a tasteful gallery placeholder is shown — no fake car art is generated.

**Notes**
- `.jpg`, `.png`, or `.webp` all work. If you use a different extension,
  update the `images` paths in `src/config/products.ts`.
- The framed version never appears before the design version anywhere.
- On the product page, choosing the **Black Frame** option previews the framed
  shot; **Print Only** previews the poster design.
- Do not rename, recreate, or duplicate the supplied artwork.
