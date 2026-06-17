"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";

/**
 * Staggered, word-by-word text reveal. Each word rises and unblurs in sequence,
 * the signature "agency headline" entrance.
 */
export default function AnimatedText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return createElement(as, { className }, text);
  }

  return createElement(
    as,
    { className, style: { display: "inline-block" } },
    <motion.span
      style={{ display: "inline" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: i < words.length - 1 ? "0.26em" : 0,
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "115%", opacity: 0, filter: "blur(6px)" },
              visible: {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
