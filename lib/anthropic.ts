import Anthropic from "@anthropic-ai/sdk";

/**
 * Lazily-constructed Anthropic client. We resolve the key at call time (not at
 * module load) so the app can boot without a key and fall back to demo content.
 */
let client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local to enable AI generation."
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export function hasAnthropicKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export const GENERATION_MODEL =
  process.env.SITEFORGE_MODEL ?? "claude-opus-4-8";
