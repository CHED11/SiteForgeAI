import { motion } from "framer-motion";
import { SITE } from "../config/site";
import { fadeUp, viewportOnce } from "../lib/motion";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-lux relative flex flex-col items-center text-center"
      >
        <p className="eyebrow mb-6 text-silver">About CarCentralCo</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tightest text-chalk sm:text-4xl lg:text-5xl">
          {SITE.about.headline}
        </h2>
        <p className="mt-8 max-w-prose text-lg leading-relaxed text-ash">
          {SITE.about.body}
        </p>
      </motion.div>
    </section>
  );
}
