/**
 * Inquiry-delivery configuration. The contact form on every generated site posts
 * to our /api/inquiry route, which forwards to Formspree when configured and
 * otherwise tells the client to fall back to a pre-filled mailto: link — so the
 * form is always usable, with or without a backend secret set.
 *
 * Env (all optional):
 *   FORMSPREE_ENDPOINT        Server-side Formspree form URL (e.g. https://formspree.io/f/abcdwxyz)
 *   INQUIRY_EMAIL             Where enquiries should land (default below)
 *   NEXT_PUBLIC_INQUIRY_EMAIL Public mirror of INQUIRY_EMAIL for the mailto fallback / exported sites
 *   NEXT_PUBLIC_FORMSPREE_ENDPOINT  Endpoint baked into exported standalone sites
 */

/** Default business inbox for enquiries. Overridable via env. */
export const DEFAULT_INQUIRY_EMAIL = "forge100000@gmail.com";

/** Server-side resolved destination address. */
export function inquiryEmail(): string {
  return (
    process.env.INQUIRY_EMAIL ||
    process.env.NEXT_PUBLIC_INQUIRY_EMAIL ||
    DEFAULT_INQUIRY_EMAIL
  );
}

/** Server-side Formspree endpoint, if configured. */
export function formspreeEndpoint(): string | null {
  return process.env.FORMSPREE_ENDPOINT || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || null;
}

/**
 * Client-safe values (only NEXT_PUBLIC_* vars are inlined in the browser bundle).
 * Used when baking a Formspree endpoint / mailto fallback into an exported site.
 */
export function publicFormspreeEndpoint(): string | null {
  return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || null;
}

export function publicInquiryEmail(): string {
  return process.env.NEXT_PUBLIC_INQUIRY_EMAIL || DEFAULT_INQUIRY_EMAIL;
}

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
  business?: string;
};

/** Shape every text field, enforce required ones, and cap lengths. */
export function validateInquiry(input: unknown):
  | { ok: true; data: InquiryPayload }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  const body = input as Record<string, unknown>;
  const str = (v: unknown, max = 2000) =>
    (typeof v === "string" ? v : "").trim().slice(0, max);

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 4000);

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length < 4) return { ok: false, error: "Please add a short message." };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: str(body.phone, 60) || undefined,
      interest: str(body.interest, 120) || undefined,
      message,
      business: str(body.business, 160) || undefined,
    },
  };
}
