"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn, withAlpha } from "@/lib/utils";

/**
 * Glassmorphism card with cursor-tracked dynamic lighting. A soft radial glow
 * follows the pointer and the card lifts on hover — the interactive "service
 * showcase" surface.
 */
export default function SpotlightCard({
  children,
  className,
  glow,
  surface,
}: {
  children: ReactNode;
  className?: string;
  glow: string;
  surface: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group glass relative overflow-hidden rounded-4xl border p-8 transition-transform duration-500 ease-luxe will-change-transform hover:-translate-y-1.5",
        className
      )}
      style={{
        background: withAlpha(surface, 0.55),
        borderColor: withAlpha("#ffffff", 0.08),
      }}
    >
      {/* Dynamic lighting layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, ${withAlpha(
            glow,
            active ? 0.18 : 0
          )}, transparent 60%)`,
        }}
      />
      {/* Hairline highlight on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-4xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${withAlpha(glow, 0.25)}`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
