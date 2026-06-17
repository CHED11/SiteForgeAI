import type { Variants, Transition } from "framer-motion";

/** Signature luxury easing — slow settle, no bounce. */
export const EASE_LUX: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const transitionLux: Transition = {
  duration: 0.9,
  ease: EASE_LUX,
};

/** Gentle fade-up used for nearly all scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUX },
  },
};

/** Soft scale-in for product / hero imagery. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_LUX },
  },
};

/** Staggered container for sequential reveals. */
export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Slow fade with a touch of upward drift — used for hero lines. */
export const heroLine: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: EASE_LUX },
  },
};

/** Shared viewport config so reveals trigger once, comfortably in view. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
