import { motion } from "framer-motion";
import type { Product } from "../config/products";
import { SIZE_OPTIONS } from "../config/products";
import { getCounter } from "../config/counters";
import ProductImage from "./ProductImage";
import CollectionBadge from "./ui/CollectionBadge";
import { ButtonLink } from "./ui/Button";
import { EASE_LUX } from "../lib/motion";

export default function ProductCard({ product }: { product: Product }) {
  const counter = getCounter(product.id);

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-charcoal-800/40"
    >
      <div className="relative overflow-hidden">
        {/* Soft spotlight that warms on hover */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-spotlight opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.035 } }}
          transition={{ duration: 1.1, ease: EASE_LUX }}
        >
          <ProductImage
            src={product.image}
            alt={`${product.title} poster`}
            title={product.title}
            collection={product.collection}
          />
        </motion.div>
        <div className="absolute left-4 top-4 z-20">
          <CollectionBadge collection={product.collection} label={product.collectionLabel} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-chalk">{product.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash">{product.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => (
            <span
              key={s.id}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] tracking-wide text-ash"
            >
              {s.label}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
          {counter && (
            <div className="flex flex-col">
              <span className="text-base font-semibold text-chalk">
                {counter.count.toLocaleString()}
              </span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ash">
                {counter.label}
              </span>
            </div>
          )}
          <ButtonLink to={`/product/${product.id}`} variant="ghost" className="px-5 py-2.5 text-xs">
            View Product
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}
