import { NextResponse } from "next/server";
import { hasAnthropicKey } from "@/lib/anthropic";
import { regenerateSection } from "@/lib/regenerate";
import {
  REGENERATABLE_SECTIONS,
  siteConfigSchema,
  type RegeneratableSection,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  if (!hasAnthropicKey()) {
    return NextResponse.json(
      {
        error:
          "No ANTHROPIC_API_KEY configured. Section regeneration needs an API key.",
      },
      { status: 503 }
    );
  }

  let body: { config?: unknown; section?: unknown; instruction?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const section = body.section;
  if (
    typeof section !== "string" ||
    !REGENERATABLE_SECTIONS.includes(section as RegeneratableSection)
  ) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }

  const parsedConfig = siteConfigSchema.safeParse(body.config);
  if (!parsedConfig.success) {
    return NextResponse.json(
      { error: "Invalid site config." },
      { status: 400 }
    );
  }

  const instruction =
    typeof body.instruction === "string" ? body.instruction : undefined;

  try {
    const value = await regenerateSection(
      parsedConfig.data,
      section as RegeneratableSection,
      instruction
    );
    return NextResponse.json({ section, value });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Regeneration failed. Please try again.";
    console.error("[regenerate] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
