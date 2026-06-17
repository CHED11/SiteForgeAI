import { NextResponse } from "next/server";
import { generateSiteConfig } from "@/lib/generate";
import { hasAnthropicKey } from "@/lib/anthropic";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  if (!hasAnthropicKey()) {
    return NextResponse.json(
      {
        error:
          "No ANTHROPIC_API_KEY configured. Add one to .env.local, or explore the built-in demo site.",
      },
      { status: 503 }
    );
  }

  let brief = "";
  try {
    const body = await request.json();
    brief = typeof body?.brief === "string" ? body.brief : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (brief.trim().length < 12) {
    return NextResponse.json(
      { error: "Tell us a little more about the business (at least a sentence)." },
      { status: 400 }
    );
  }

  try {
    const config = await generateSiteConfig(brief);
    return NextResponse.json({ config });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Generation failed. Please try again.";
    console.error("[generate] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
