import { z } from "zod";
import { getAnthropic, GENERATION_MODEL } from "./anthropic";
import { REGENERATE_SYSTEM_PROMPT, buildRegeneratePrompt } from "./prompt";
import {
  SITE_JSON_SCHEMA,
  themeSchema,
  heroSchema,
  statSchema,
  servicesSchema,
  aboutSchema,
  testimonialsSchema,
  pricingSchema,
  ctaSchema,
  contactSchema,
  type RegeneratableSection,
  type SiteConfig,
} from "./types";

/** Zod validators for each regeneratable section, so merged output stays sane. */
const SECTION_VALIDATORS: Record<RegeneratableSection, z.ZodTypeAny> = {
  theme: themeSchema,
  hero: heroSchema,
  stats: z.array(statSchema).min(3).max(4),
  services: servicesSchema,
  about: aboutSchema,
  testimonials: testimonialsSchema,
  pricing: pricingSchema,
  cta: ctaSchema,
  contact: contactSchema,
};

/**
 * Regenerate a single section of an existing SiteConfig with Claude, keeping the
 * rest of the site untouched. Returns the validated new value for that section.
 */
export async function regenerateSection(
  config: SiteConfig,
  section: RegeneratableSection,
  instruction?: string
): Promise<unknown> {
  const sectionSchema = (SITE_JSON_SCHEMA.properties as Record<string, unknown>)[
    section
  ];
  if (!sectionSchema) {
    throw new Error(`Unknown section: ${section}`);
  }

  // Wrap the section schema in a one-key object so structured output stays strict.
  const outputSchema = {
    type: "object",
    additionalProperties: false,
    properties: { [section]: sectionSchema },
    required: [section],
  };

  const anthropic = getAnthropic();

  const params = {
    model: GENERATION_MODEL,
    max_tokens: 8000,
    system: REGENERATE_SYSTEM_PROMPT,
    thinking: { type: "adaptive" },
    output_config: {
      format: { type: "json_schema", schema: outputSchema },
    },
    messages: [
      {
        role: "user",
        content: buildRegeneratePrompt({
          section,
          currentSite: config,
          currentSection: (config as Record<string, unknown>)[section],
          instruction,
        }),
      },
    ],
  };

  const stream = anthropic.messages.stream(
    params as unknown as Parameters<typeof anthropic.messages.stream>[0]
  );
  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error("The model declined to regenerate this section.");
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

  const value = (parsed as Record<string, unknown>)[section];
  return SECTION_VALIDATORS[section].parse(value);
}
