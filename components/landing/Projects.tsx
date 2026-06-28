"use client";

import { withAlpha } from "@/lib/utils";
import { PROJECTS, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

function BrowserMockup({
  name,
  domain,
  icon,
}: {
  name: string;
  domain: string;
  icon: IconName;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: withAlpha("#ffffff", 0.1), background: THEME.bg }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ background: withAlpha("#ffffff", 0.04) }}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span
          className="ml-2 flex-1 truncate rounded-md px-3 py-1 text-[10px]"
          style={{ background: withAlpha("#ffffff", 0.06), color: THEME.muted }}
        >
          {domain}
        </span>
      </div>

      {/* Faux site screenshot */}
      <div
        className="relative aspect-[16/10] overflow-hidden p-5"
        style={{
          background: `radial-gradient(120% 100% at 80% 0%, ${withAlpha(
            THEME.primary,
            0.28
          )}, transparent 55%), radial-gradient(120% 100% at 0% 100%, ${withAlpha(
            THEME.accent,
            0.22
          )}, transparent 55%), ${THEME.surface}`,
        }}
      >
        {/* mini nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-black"
              style={{
                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                color: THEME.bg,
              }}
            >
              {name.charAt(0)}
            </span>
            <span className="text-[8px] font-semibold" style={{ color: THEME.text }}>
              {name}
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[7px] font-semibold"
            style={{ background: withAlpha(THEME.primary, 0.9), color: THEME.bg }}
          >
            Contact
          </span>
        </div>

        {/* mini hero */}
        <div className="mt-5 flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: withAlpha(THEME.text, 0.06), color: THEME.primary }}
          >
            <Icon name={icon} size={22} />
          </div>
          <div className="flex-1">
            <div
              className="h-2.5 w-4/5 rounded-full"
              style={{ background: withAlpha(THEME.text, 0.85) }}
            />
            <div
              className="mt-1.5 h-2.5 w-3/5 rounded-full"
              style={{ background: withAlpha(THEME.text, 0.45) }}
            />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full" style={{ background: withAlpha(THEME.text, 0.18) }} />
          <div className="h-1.5 w-5/6 rounded-full" style={{ background: withAlpha(THEME.text, 0.18) }} />
        </div>
        <div className="mt-4 flex gap-2">
          <span
            className="rounded-md px-3 py-1.5 text-[8px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
              color: THEME.bg,
            }}
          >
            Get a quote
          </span>
          <span
            className="rounded-md px-3 py-1.5 text-[8px] font-semibold"
            style={{ border: `1px solid ${withAlpha(THEME.text, 0.2)}`, color: THEME.text }}
          >
            Our work
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.bg, color: THEME.text }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Recent Work"
          title="Websites we're proud to put our name to"
          subtitle="A selection of recent builds across trades, services, healthcare, and e-commerce — each crafted to the highest standard."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => {
            const domain = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com.au`;
            return (
              <Reveal key={p.name} delay={(i % 3) * 0.1} className="h-full">
                <div
                  className="group glass h-full overflow-hidden rounded-4xl border p-4 transition-transform duration-500 ease-luxe hover:-translate-y-1.5"
                  style={{
                    background: withAlpha(THEME.surface, 0.5),
                    borderColor: withAlpha("#ffffff", 0.08),
                  }}
                >
                  <BrowserMockup name={p.name} domain={domain} icon={p.icon} />
                  <div className="px-2 pb-1 pt-5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ background: withAlpha(THEME.accent, 0.14), color: THEME.accent }}
                      >
                        {p.category}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: THEME.primary }}>
                        {p.result}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold" style={{ color: THEME.text }}>
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
