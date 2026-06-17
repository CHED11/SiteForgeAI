import { useState } from "react";
import type { CollectionId } from "../config/products";

interface Props {
  src: string;
  alt: string;
  title: string;
  collection: CollectionId;
  /** Use object-contain (true) for framed shots, cover (false) for designs. */
  contain?: boolean;
  className?: string;
}

/**
 * Renders a poster image. If the supplied file is missing it shows a tasteful
 * gallery placeholder instead of a broken image — we never generate or fake
 * car artwork.
 */
export default function ProductImage({
  src,
  alt,
  title,
  collection,
  contain = false,
  className,
}: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={["relative", className ?? ""].join(" ")}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal-800">
        {!errored ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setErrored(true)}
            className={[
              "h-full w-full",
              contain ? "object-contain" : "object-cover",
            ].join(" ")}
          />
        ) : (
          <Placeholder title={title} collection={collection} />
        )}
        {/* Subtle inner vignette for depth */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />
      </div>
    </div>
  );
}

function Placeholder({ title, collection }: { title: string; collection: CollectionId }) {
  const accent = collection === "premium" ? "text-gold/70" : "text-silver/70";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-charcoal-700 to-ink px-8 text-center">
      <div className="pointer-events-none absolute inset-0 bg-spotlight opacity-60" />
      <span className={["eyebrow mb-4", accent].join(" ")}>CarCentralCo</span>
      <p className="font-light text-2xl tracking-tightest text-chalk/90">{title}</p>
      <p className="mt-4 max-w-[22ch] text-xs leading-relaxed text-ash">
        Poster artwork loads here. Drop the file into{" "}
        <span className="text-chalk/70">/public/products</span>.
      </p>
    </div>
  );
}
