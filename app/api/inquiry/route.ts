import { NextResponse } from "next/server";
import {
  formspreeEndpoint,
  inquiryEmail,
  validateInquiry,
} from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Receives a contact-form submission from a generated site and delivers it to
 * the business inbox via Formspree. When no endpoint is configured we return a
 * `mailto` fallback so the form still works for the visitor.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateInquiry(raw);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const data = result.data;
  const to = inquiryEmail();
  const endpoint = formspreeEndpoint();

  // No backend configured — tell the client to open the visitor's mail client.
  if (!endpoint) {
    console.log("[inquiry] (no FORMSPREE_ENDPOINT) would deliver to", to, data);
    return NextResponse.json({ ok: false, fallback: "mailto", email: to });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        interest: data.interest ?? "",
        message: data.message,
        _subject: `New enquiry${data.business ? ` — ${data.business}` : ""} from ${data.name}`,
        // Formspree honours this to set the reply-to address.
        _replyto: data.email,
        deliverTo: to,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[inquiry] formspree error", res.status, detail);
      return NextResponse.json(
        { ok: false, fallback: "mailto", email: to, error: "Delivery service rejected the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return NextResponse.json(
      { ok: false, fallback: "mailto", email: to, error: "Could not reach the delivery service." },
      { status: 502 }
    );
  }
}
