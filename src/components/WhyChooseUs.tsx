import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "../config/site";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function WhyChooseUs() {
  return (
    <section className="bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Crafted to the standard of fine art."
          description="Every detail — from composition to print stock — is chosen to make these pieces worthy of the cars that inspired them."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_CHOOSE_US.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="group relative bg-charcoal p-8 transition-colors duration-500 hover:bg-charcoal-700"
            >
              <span className="text-xs font-medium tabular-nums text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-chalk">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
