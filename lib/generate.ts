import { getAnthropic, GENERATION_MODEL } from "./anthropic";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt";
import { SITE_JSON_SCHEMA, siteConfigSchema, type SiteConfig } from "./types";

/**
 * Calls Claude to turn a free-text business brief into a validated SiteConfig.
 *
 * Uses structured outputs (output_config.format) so the model is constrained to
 * our schema, adaptive thinking for design reasoning, and streaming because the
 * response is large enough to risk a non-streaming HTTP timeout.
 */
export async function generateSiteConfig(brief: string): Promise<SiteConfig> {
  const anthropic = getAnthropic();

  // adaptive thinking + output_config are newer than this SDK's static types,
  // but the runtime API accepts them — build the body untyped and cast through
  // unknown so we stay on the documented, current request shape.
  const params = {
    model: GENERATION_MODEL,
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    thinking: { type: "adaptive" },
    // Constrain output to our schema. The first text block is guaranteed JSON.
    output_config: {
      format: {
        type: "json_schema",
        schema: SITE_JSON_SCHEMA,
      },
    },
    messages: [{ role: "user", content: buildUserPrompt(brief) }],
  };

  const stream = anthropic.messages.stream(
    params as unknown as Parameters<typeof anthropic.messages.stream>[0]
  );

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error("The model declined to generate this site. Try a different brief.");
  }

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No content returned from the model.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error("The model returned invalid JSON.");
  }

  // Validate/normalize against zod so the renderer always gets a sane shape.
  return siteConfigSchema.parse(parsed);
}
