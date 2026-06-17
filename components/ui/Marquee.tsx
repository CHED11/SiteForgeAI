"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee for stat strips / trust badges. Duplicates its
 * content and translates seamlessly.
 */
export default function Marquee({
  children,
  duration = 28,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex flex-wrap justify-center gap-x-12 gap-y-4 ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative flex overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
