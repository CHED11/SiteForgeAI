import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost" | "metallic";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  full?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 ease-lux focus:outline-none focus-visible:ring-1 focus-visible:ring-silver/50";

const variants: Record<Variant, string> = {
  primary:
    "bg-chalk text-ink hover:bg-white",
  ghost:
    "border border-white/15 text-chalk hover:border-white/40 hover:bg-white/[0.04]",
  metallic:
    "text-ink bg-silver-sheen bg-[length:200%_100%] hover:bg-[position:100%_0] [transition:background-position_.8s_ease]",
};

function classes(variant: Variant, full?: boolean, className?: string) {
  return [base, variants[variant], full ? "w-full" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

const hover = { scale: 1.015 };
const tap = { scale: 0.985 };

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
  full,
}: BaseProps & { to: string }) {
  return (
    <motion.span whileHover={hover} whileTap={tap} className={full ? "block w-full" : "inline-block"}>
      <Link to={to} className={classes(variant, full, className)}>
        {children}
      </Link>
    </motion.span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  full,
  onClick,
  type = "button",
  disabled,
}: BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={disabled ? undefined : hover}
      whileTap={disabled ? undefined : tap}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classes(variant, full, className) + (disabled ? " opacity-50 cursor-not-allowed" : "")}
    >
      {children}
    </motion.button>
  );
}
