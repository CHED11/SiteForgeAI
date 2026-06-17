import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUX } from "../lib/motion";
import { useTransition } from "../context/TransitionContext";

/**
 * Full-screen cinematic overlay played when entering a collection.
 *
 *  • Premium  → calm gallery: black wash fades in with a soft spotlight sweep.
 *  • Performance → high-performance room: dark panel sweep + light scan streak.
 *
 * Driven by TransitionContext phases: "cover" (hide page) then "reveal" (clear).
 */
export default function TransitionOverlay() {
  const { state } = useTransition();

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key="transition-overlay"
          className="pointer-events-none fixed inset-0 z-[200]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {state.collection === "premium" ? (
            <PremiumTransition phase={state.phase} />
          ) : (
            <PerformanceTransition phase={state.phase} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PremiumTransition({ phase }: { phase: "cover" | "reveal" }) {
  const covering = phase === "cover";
  return (
    <>
      {/* Deep gallery wash */}
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: covering ? 1 : 0 }}
        transition={{ duration: covering ? 0.7 : 0.8, ease: EASE_LUX }}
      />
      {/* Soft spotlight sweeping down the gallery wall */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% var(--y, 0%), rgba(255,255,255,0.16), transparent 70%)",
        }}
        initial={{ opacity: 0, ["--y" as string]: "-10%" }}
        animate={{
          opacity: covering ? [0, 0.9, 0.4] : 0,
          ["--y" as string]: covering ? "120%" : "120%",
        }}
        transition={{ duration: covering ? 0.72 : 0.5, ease: EASE_LUX }}
      />
      {/* Hairline gold seam — gallery detail */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[42vw] -translate-x-1/2 -translate-y-1/2 bg-gold/60"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: covering ? 1 : 0,
          opacity: covering ? [0, 1, 0] : 0,
        }}
        transition={{ duration: covering ? 0.7 : 0.4, ease: EASE_LUX }}
      />
    </>
  );
}

function PerformanceTransition({ phase }: { phase: "cover" | "reveal" }) {
  const covering = phase === "cover";
  return (
    <>
      {/* Dark panel sweep across the screen */}
      <motion.div
        className="absolute inset-0 bg-[#060608]"
        initial={{ x: "-100%" }}
        animate={{ x: covering ? "0%" : "100%" }}
        transition={{ duration: covering ? 0.62 : 0.7, ease: [0.7, 0, 0.2, 1] }}
      />
      {/* Bright leading light streak — scanning edge */}
      <motion.div
        className="absolute inset-y-0 w-[14vw]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,200,205,0.0), rgba(230,230,234,0.85), rgba(255,255,255,0.0))",
          filter: "blur(2px)",
        }}
        initial={{ x: "-30vw", opacity: 0 }}
        animate={{
          x: covering ? "110vw" : "130vw",
          opacity: covering ? [0, 1, 1, 0] : 0,
        }}
        transition={{ duration: covering ? 0.62 : 0.5, ease: [0.7, 0, 0.2, 1] }}
      />
      {/* Subtle technical scan lines */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: covering ? 0.5 : 0 }}
        transition={{ duration: 0.5, ease: EASE_LUX }}
      />
    </>
  );
}
