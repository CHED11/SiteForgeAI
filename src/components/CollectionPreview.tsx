import { motion } from "framer-motion";
import type { CollectionId } from "../config/products";
import { getProductsByCollection } from "../config/products";
import { useTransition } from "../context/TransitionContext";
import { fadeUp, scaleIn, viewportOnce } from "../lib/motion";
import ProductImage from "./ProductImage";
import CollectionBadge from "./ui/CollectionBadge";
import { Button, ButtonLink } from "./ui/Button";

interface Props {
  collection: CollectionId;
  /** Flip image/text sides for visual rhythm. */
  reverse?: boolean;
}

const COPY: Record<CollectionId, { eyebrow: string; title: string; body: string }> = {
  premium: {
    eyebrow: "Premium Collection",
    title: "A private automotive gallery.",
    body: "Luxury, collector-grade artwork presented like fine art — dark gallery walls, spot lighting, and elegant black frames. Curated for those who treat their space as a gallery.",
  },
  performance: {
    eyebrow: "Performance Collection",
    title: "The high-performance division.",
    body: "Sharper, darker, more technical. Motorsport-inspired compositions engineered for enthusiasts who live for the edge. A statement room for the serious driver.",
  },
};

export default function CollectionPreview({ collection, reverse = false }: Props) {
  const { enterCollection } = useTransition();
  const product = getProductsByCollection(collection)[0];
  const copy = COPY[collection];
  const isPremium = collection === "premium";

  return (
    <section
      className={[
        "relative overflow-hidden py-24 sm:py-32",
        isPremium ? "bg-charcoal" : "bg-ink",
      ].join(" ")}
    >
      {/* Distinct ambience per collection */}
      {isPremium ? (
        <div className="pointer-events-none absolute inset-0 bg-spotlight opacity-70" />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent 0 38px, rgba(255,255,255,0.5) 38px 39px)",
          }}
        />
      )}

      <div className="container-lux relative">
        <div
          className={[
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
            reverse ? "lg:[&>*:first-child]:order-2" : "",
          ].join(" ")}
        >
          {/* Product showcase */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-md"
          >
            {isPremium && (
              <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_65%)]" />
            )}
            {product && (
              <ProductImage
                src={product.image}
                alt={`${product.title} poster`}
                title={product.title}
                collection={collection}
                framed={isPremium}
                className="relative"
              />
            )}
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <CollectionBadge collection={collection} label={copy.eyebrow} className="mb-6" />
            <h2
              className={[
                "text-3xl font-semibold leading-tight tracking-tightest text-chalk sm:text-4xl lg:text-5xl",
                isPremium ? "" : "uppercase",
              ].join(" ")}
            >
              {copy.title}
            </h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ash">{copy.body}</p>

            {product && (
              <p className="mt-8 text-sm text-ash">
                Featured ·{" "}
                <span className="text-chalk">{product.title}</span>
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                variant={isPremium ? "metallic" : "primary"}
                onClick={() =>
                  enterCollection(`/collections/${collection}`, collection)
                }
              >
                Explore {isPremium ? "Premium" : "Performance"}
              </Button>
              {product && (
                <ButtonLink to={`/product/${product.id}`} variant="ghost">
                  View Featured Poster
                </ButtonLink>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
