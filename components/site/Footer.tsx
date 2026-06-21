"use client";

import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";

export default function Footer({ config }: { config: SiteConfig }) {
  const { theme, footer, businessName } = config;

  return (
    <footer
      className="border-t px-6 py-16"
      style={{
        background: theme.background,
        borderColor: withAlpha(theme.text, 0.08),
        color: theme.text,
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: theme.primary, color: theme.background }}
            >
              {businessName.charAt(0)}
            </span>
            <span className="font-semibold">{businessName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: theme.muted }}>
            {footer.tagline}
          </p>
        </div>

        {footer.columns.map((col) => (
          <div key={col.heading}>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: theme.muted }}
            >
              {col.heading}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#top"
                    className="text-sm transition-colors duration-300"
                    style={{ color: theme.text }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = theme.text)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row"
        style={{ borderColor: withAlpha(theme.text, 0.08), color: theme.muted }}
      >
        <span>
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          Crafted with
          <span style={{ color: theme.primary }}>SiteForge AI</span>
        </span>
      </div>
    </footer>
  );
}
