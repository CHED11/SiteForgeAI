import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { CollectionId } from "../config/products";
import { getProductsByCollection } from "../config/products";
import ProductImage from "../components/ProductImage";
import CollectionBadge from "../components/ui/CollectionBadge";
import { ButtonLink } from "../components/ui/Button";
import ComingSoonSection from "../components/ComingSoonSection";
import { fadeUp, scaleIn, stagger, heroLine } from "../lib/motion";

const VALID: CollectionId[] = ["premium", "performance"];

const COPY: Record<
  CollectionId,
  { eyebrow: string; title: string; subtitle: string; featured: string }
> = {
  premium: {
    eyebrow: "Premium Collection",
    title: "The Gallery",
    subtitle:
      "A private automotive art gallery. Luxury, collector-grade artwork presented under soft spot lighting, framed in black, and given room to breathe.",
    featured: "The Featured Piece",
  },
  performance: {
    eyebrow: "Performance Collection",
    title: "The Division",
    subtitle:
      "The high-performance division. Sharper, darker, more technical — motorsport-inspired artwork engineered for the serious enthusiast.",
    featured: "Headlining Now",
  },
};

export default function CollectionPage() {
  const { collectionId } = useParams<{ collectionId: string }>();

  if (!collectionId || !VALID.includes(collectionId as CollectionId)) {
    return <Navigate to="/" replace />;
  }

  const collection = collectionId as CollectionId;
  const isPremium = collection === "premium";
  const copy = COPY[collection];
  const product = getProductsByCollection(collection)[0];

  return (
    <main className="pt-16">
      {/* Collection hero */}
      <section
        className={[
          "relative flex min-h-[68vh] items-center overflow-hidden",
          isPremium ? "bg-charcoal" : "bg-ink",
        ].join(" ")}
      >
        {isPremium ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-spotlight opacity-80" />
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[-30%] h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]"
              animate={{ opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, transparent 0 38px, rgba(255,255,255,0.6) 38px 39px)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(120,140,170,0.12),transparent_55%)]" />
          </>
        )}

        <motion.div
          variants={stagger(0.16, 0.1)}
          initial="hidden"
          animate="visible"
          className="container-lux relative"
        >
          <motion.div variants={heroLine}>
            <CollectionBadge collection={collection} label={copy.eyebrow} className="mb-7" />
          </motion.div>
          <motion.h1
            variants={heroLine}
            className={[
              "text-5xl font-semibold leading-[1.02] tracking-tightest text-chalk sm:text-7xl lg:text-8xl",
              isPremium ? "" : "uppercase",
            ].join(" ")}
          >
            {copy.title}
          </motion.h1>
          <motion.p
            variants={heroLine}
            className="mt-8 max-w-xl text-base leading-relaxed text-ash sm:text-lg"
          >
            {copy.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Featured live product */}
      {product && (
        <section className={isPremium ? "bg-ink py-24 sm:py-32" : "bg-charcoal py-24 sm:py-32"}>
          <div className="container-lux grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative mx-auto w-full max-w-md"
            >
              {isPremium && (
                <div className="pointer-events-none absolute -inset-12 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_65%)]" />
              )}
              <ProductImage
                src={product.images.design}
                alt={`${product.title} poster design`}
                title={product.title}
                collection={collection}
                className="relative"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="eyebrow mb-5">{copy.featured}</p>
              <h2 className="text-3xl font-semibold tracking-tightest text-chalk sm:text-4xl lg:text-5xl">
                {product.title}
              </h2>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-ash">
                {product.description}
              </p>
              <div className="mt-9">
                <ButtonLink
                  to={`/product/${product.id}`}
                  variant={isPremium ? "metallic" : "primary"}
                >
                  View Product
                </ButtonLink>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ComingSoonSection collection={collection} />
    </main>
  );
}
