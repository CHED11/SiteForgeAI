import { motion } from "framer-motion";
import { PRODUCTS } from "../config/products";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import ProductCard from "./ProductCard";
import SectionHeading from "./ui/SectionHeading";

export default function PopularPicks() {
  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Popular Picks Right Now"
          title="What enthusiasts are collecting"
        />

        <motion.div
          variants={stagger(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-7 sm:grid-cols-2"
        >
          {PRODUCTS.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
