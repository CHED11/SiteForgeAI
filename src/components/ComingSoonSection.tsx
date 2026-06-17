import { motion } from "framer-motion";
import type { CollectionId } from "../config/products";
import { getComingSoonByCollection } from "../config/comingSoon";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import ComingSoonCard from "./ComingSoonCard";
import SectionHeading from "./ui/SectionHeading";

export default function ComingSoonSection({ collection }: { collection: CollectionId }) {
  const vehicles = getComingSoonByCollection(collection);
  if (vehicles.length === 0) return null;

  return (
    <section className="bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Coming Soon"
          title="On the wall next."
          description="New collector-grade posters join this collection regularly. Be first to know."
          tone={collection === "premium" ? "gold" : "silver"}
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {vehicles.map((v) => (
            <motion.div key={v.name} variants={fadeUp}>
              <ComingSoonCard vehicle={v} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
