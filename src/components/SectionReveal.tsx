import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "../lib/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Wraps content in a calm, once-only fade-up reveal on scroll.
 * Intentionally subtle — no bounce, no spin.
 */
export default function SectionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: SectionRevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
