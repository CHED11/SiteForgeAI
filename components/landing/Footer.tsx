"use client";

import { withAlpha } from "@/lib/utils";
import { BRAND, NAV_LINKS, THEME } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-16"
      style={{
        background: THEME.bg,
        borderColor: withAlpha(THEME.text, 0.08),
        color: THEME.text,
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5 text-sm font-bold tracking-[0.12em]">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black"
              style={{
                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                color: THEME.bg,
              }}
            >
              F
            </span>
            {BRAND.name}
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: THEME.muted }}>
            {BRAND.tagline}. {BRAND.location}.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: THEME.muted }}>
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors duration-300"
                  style={{ color: THEME.text }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = THEME.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = THEME.text)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: THEME.muted }}>
            Get in touch
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="transition-colors duration-300"
                style={{ color: THEME.text }}
                onMouseEnter={(e) => (e.currentTarget.style.color = THEME.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = THEME.text)}
              >
                {BRAND.email}
              </a>
            </li>
            <li style={{ color: THEME.muted }}>{BRAND.location}</li>
            <li>
              <a
                href="#enquiry"
                className="font-semibold"
                style={{ color: THEME.accent }}
              >
                Request a free proposal →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row"
        style={{ borderColor: withAlpha(THEME.text, 0.08), color: THEME.muted }}
      >
        <span>
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </span>
        <span>Premium websites for businesses across Australia.</span>
      </div>
    </footer>
  );
}
