"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";
import { withAlpha } from "@/lib/utils";
import { publicFormspreeEndpoint } from "@/lib/contact";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

export default function Contact({ config }: { config: SiteConfig }) {
  const { theme, contact, businessName } = config;
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  if (!contact) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(publicFormspreeEndpoint(), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        form.reset();
        setStatus({
          kind: "ok",
          message: "Thank you — we'll be in touch shortly.",
        });
        return;
      }
      // Surface the actual Formspree error only.
      const json = await res.json().catch(() => null);
      const message =
        json?.errors?.map((er: { message: string }) => er.message).join(" ") ||
        "Something went wrong sending your message. Please try again.";
      setStatus({ kind: "error", message });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  const fieldStyle = {
    background: withAlpha(theme.background, 0.6),
    borderColor: withAlpha(theme.text, 0.12),
    color: theme.text,
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: theme.background, color: theme.text }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <Reveal>
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: theme.accent }}
            >
              {contact.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            <AnimatedText text={contact.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-lg" style={{ color: theme.muted }}>
              {contact.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 flex flex-col gap-6">
              {[
                {
                  label: "Email",
                  value: contact.email,
                  href: `mailto:${contact.email}`,
                },
                {
                  label: "Phone",
                  value: contact.phone,
                  href: `tel:${contact.phone.replace(/[^0-9+]/g, "")}`,
                },
                { label: "Where", value: contact.location },
                { label: "Hours", value: contact.hours },
              ].map((row) => (
                <li key={row.label} className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-[0.14em]"
                    style={{ color: theme.muted }}
                  >
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="text-base transition-colors duration-300"
                      style={{ color: theme.text }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = theme.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = theme.text)
                      }
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-base">{row.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass rounded-4xl border p-8"
            style={{
              background: withAlpha(theme.surface, 0.55),
              borderColor: withAlpha("#ffffff", 0.08),
            }}
          >
            <div className="grid gap-5">
              <Field label="Name">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:opacity-50 focus:border-current"
                  style={fieldStyle}
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:opacity-50 focus:border-current"
                  style={fieldStyle}
                />
              </Field>
              <Field label="Phone" optional>
                <input
                  name="phone"
                  placeholder="Best number to reach you"
                  className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:opacity-50 focus:border-current"
                  style={fieldStyle}
                />
              </Field>
              <Field label="I'm interested in">
                <select
                  name="interest"
                  className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-current"
                  style={fieldStyle}
                >
                  {contact.interests.map((opt) => (
                    <option key={opt} value={opt} style={{ color: "#111" }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project"
                  className="w-full resize-y rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:opacity-50 focus:border-current"
                  style={fieldStyle}
                />
              </Field>

              <input
                type="hidden"
                name="_subject"
                value={`New enquiry — ${businessName}`}
              />

              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: theme.primary,
                  color: theme.background,
                  boxShadow: `0 16px 44px ${withAlpha(theme.primary, 0.4)}`,
                }}
              >
                {status.kind === "sending" ? "Sending…" : contact.buttonLabel}
              </button>

              {status.kind === "ok" && (
                <p className="text-sm" style={{ color: theme.primary }}>
                  {status.message}
                </p>
              )}
              {status.kind === "error" && (
                <p className="text-sm text-red-400">{status.message}</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium opacity-70">
        {label}
        {optional && <span className="opacity-60"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}
