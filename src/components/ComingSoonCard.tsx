import { motion } from "framer-motion";
import type { ComingSoonVehicle } from "../config/comingSoon";
import { EASE_LUX } from "../lib/motion";

/**
 * Text-only premium card. No vehicle imagery is rendered — abstract gradients,
 * glass, and typography only, until real poster artwork is uploaded.
 */
export default function ComingSoonCard({ vehicle }: { vehicle: ComingSoonVehicle }) {
  const isPremium = vehicle.collection === "premium";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: EASE_LUX }}
      className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] glass-card p-6"
    >
      {/* Abstract gradient field — distinct tone per collection */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-90"
        style={{
          background: isPremium
            ? "radial-gradient(120% 80% at 20% 0%, rgba(201,168,106,0.16), transparent 55%), radial-gradient(100% 60% at 100% 100%, rgba(255,255,255,0.06), transparent 60%)"
            : "radial-gradient(120% 80% at 80% 0%, rgba(200,200,205,0.16), transparent 55%), radial-gradient(100% 60% at 0% 100%, rgba(120,140,170,0.10), transparent 60%)",
        }}
      />
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className={[
            "text-[0.6rem] font-medium uppercase tracking-ultra",
            isPremium ? "text-gold/80" : "text-silver/80",
          ].join(" ")}
        >
          {vehicle.collectionLabel}
        </span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-ultra text-chalk/70">
          Coming Soon
        </span>
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-chalk">
          {vehicle.name}
        </h3>
        <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ash transition-colors duration-300 hover:text-chalk">
          Notify Me
          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </motion.article>
  );
}
