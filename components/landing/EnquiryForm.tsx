"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { withAlpha } from "@/lib/utils";
import { publicFormspreeEndpoint } from "@/lib/contact";
import { FORM_OPTIONS, THEME } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const fieldStyle = {
  background: withAlpha(THEME.bg, 0.6),
  borderColor: withAlpha(THEME.text, 0.12),
  color: THEME.text,
} as const;

const baseInput =
  "w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:opacity-40 focus:border-current";

function Field({
  label,
  optional,
  full,
  children,
}: {
  label: string;
  optional?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium" style={{ color: THEME.muted }}>
        {label}
        {optional && <span className="opacity-60"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(publicFormspreeEndpoint(), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.reset();
        setStatus({ kind: "success" });
        return;
      }
      const json = await res.json().catch(() => null);
      const message =
        json?.errors?.map((er: { message: string }) => er.message).join(" ") ||
        "Something went wrong sending your enquiry. Please try again.";
      setStatus({ kind: "error", message });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  return (
    <section
      id="enquiry"
      className="relative overflow-hidden px-6 py-28"
      style={{ background: THEME.bg, color: THEME.text }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full blur-[150px]"
        style={{ background: withAlpha(THEME.primary, 0.18) }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Get Your Free Proposal"
          title="Tell us about your business"
          subtitle="Fill in the form and we'll send you a tailored website proposal — no cost, no obligation. We reply within one business day."
        />

        <Reveal>
          <div
            className="glass rounded-4xl border p-6 sm:p-9"
            style={{
              background: withAlpha(THEME.surface, 0.55),
              borderColor: withAlpha("#ffffff", 0.08),
            }}
          >
            <AnimatePresence mode="wait">
              {status.kind === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                      color: THEME.bg,
                    }}
                  >
                    <Icon name="check" size={30} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-medium">
                    Enquiry received — thank you!
                  </h3>
                  <p className="mt-3 max-w-md text-sm" style={{ color: THEME.muted }}>
                    We&apos;ve got your details and will be in touch within one business day with
                    your free website proposal.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate={false}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Business Name">
                      <input name="Business Name" required placeholder="Your business" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Contact Name">
                      <input name="Contact Name" required placeholder="Your name" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Email Address">
                      <input name="Email" type="email" required placeholder="you@business.com.au" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Phone Number">
                      <input name="Phone" type="tel" required placeholder="04xx xxx xxx" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Business Location">
                      <input name="Business Location" required placeholder="e.g. Sydney, NSW" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Industry">
                      <select name="Industry" required defaultValue="" className={baseInput} style={fieldStyle}>
                        <option value="" disabled style={{ color: "#111" }}>
                          Select industry
                        </option>
                        {FORM_OPTIONS.industry.map((o) => (
                          <option key={o} value={o} style={{ color: "#111" }}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Current Website" optional>
                      <input name="Current Website" type="url" placeholder="https://" className={baseInput} style={fieldStyle} />
                    </Field>
                    <Field label="Preferred Website Style">
                      <select name="Preferred Style" required defaultValue="" className={baseInput} style={fieldStyle}>
                        <option value="" disabled style={{ color: "#111" }}>
                          Select a style
                        </option>
                        {FORM_OPTIONS.style.map((o) => (
                          <option key={o} value={o} style={{ color: "#111" }}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Budget">
                      <select name="Budget" required defaultValue="" className={baseInput} style={fieldStyle}>
                        <option value="" disabled style={{ color: "#111" }}>
                          Select a budget
                        </option>
                        {FORM_OPTIONS.budget.map((o) => (
                          <option key={o} value={o} style={{ color: "#111" }}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Timeline">
                      <select name="Timeline" required defaultValue="" className={baseInput} style={fieldStyle}>
                        <option value="" disabled style={{ color: "#111" }}>
                          Select a timeline
                        </option>
                        {FORM_OPTIONS.timeline.map((o) => (
                          <option key={o} value={o} style={{ color: "#111" }}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Services Offered" full>
                      <textarea
                        name="Services Offered"
                        required
                        rows={3}
                        placeholder="What does your business do? e.g. residential plumbing across Greater Sydney"
                        className={`${baseInput} resize-y`}
                        style={fieldStyle}
                      />
                    </Field>
                    <Field label="Additional Information" optional full>
                      <textarea
                        name="Additional Information"
                        rows={3}
                        placeholder="Anything else we should know? Goals, examples you love, deadlines…"
                        className={`${baseInput} resize-y`}
                        style={fieldStyle}
                      />
                    </Field>
                  </div>

                  <input type="hidden" name="_subject" value="New website enquiry — Forge Digital" />

                  <button
                    type="submit"
                    disabled={status.kind === "sending"}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-transform duration-300 ease-luxe hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                      color: THEME.bg,
                      boxShadow: `0 16px 44px ${withAlpha(THEME.primary, 0.4)}`,
                    }}
                  >
                    {status.kind === "sending" ? "Sending…" : "Get My Free Website Proposal"}
                    {status.kind !== "sending" && <span>→</span>}
                  </button>

                  {status.kind === "error" && (
                    <p
                      className="mt-4 rounded-2xl border px-4 py-3 text-center text-sm"
                      style={{
                        borderColor: withAlpha("#ff6b6b", 0.3),
                        background: withAlpha("#ff6b6b", 0.1),
                        color: "#ffb4b4",
                      }}
                    >
                      {status.message}
                    </p>
                  )}

                  <p className="mt-4 text-center text-xs" style={{ color: THEME.muted }}>
                    Your details are only used to prepare your proposal. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
