# Live Product Images

Drop the two supplied poster files here, named exactly:

| File                | Product                        | Collection   |
| ------------------- | ------------------------------ | ------------ |
| `revuelto.jpg`      | Lamborghini Revuelto Poster    | Premium      |
| `porsche-918.jpg`   | Porsche 918 Spyder Poster      | Performance  |

The site references these paths in `src/config/products.ts`. Until the files
exist, a tasteful gallery placeholder is shown — no fake car art is generated.

**Notes**
- `.jpg`, `.png`, or `.webp` all work. If you use a different extension,
  update the `image` path in `src/config/products.ts`.
- Cards use a 4:5 portrait crop. Posters that are roughly portrait look best.
- Do not rename, recreate, or duplicate the supplied artwork — these are the
  only live product images.
