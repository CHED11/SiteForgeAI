import { z } from "zod";

/**
 * SiteConfig is the single contract between the AI generator and the premium
 * renderer. Claude returns JSON matching this schema; <SiteRenderer /> turns it
 * into an animated, agency-grade website. Keep this schema renderer-driven:
 * every field here maps to something the component layer knows how to display.
 */

export const themeSchema = z.object({
  // Visual mood drives subtle renderer choices (lighting intensity, grain).
  mood: z
    .enum(["luxury", "editorial", "futuristic", "warm", "minimal", "bold"])
    .describe("Overall art direction of the site."),
  background: z.string().describe("Primary page background, hex."),
  surface: z.string().describe("Card/elevated surface color, hex."),
  primary: z.string().describe("Primary brand color, hex."),
  accent: z.string().describe("Secondary accent color, hex."),
  text: z.string().describe("Main foreground text color, hex."),
  muted: z.string().describe("Muted/secondary text color, hex."),
});

export const linkSchema = z.object({
  label: z.string(),
  href: z.string().describe("In-page anchor like #services or a URL."),
});

export const heroSchema = z.object({
  eyebrow: z.string().describe("Short kicker above the headline."),
  headline: z.string().describe("Big headline, 3-7 words, conversion-focused."),
  subheadline: z.string().describe("One or two sentences of supporting copy."),
  primaryCta: z.string(),
  secondaryCta: z.string(),
  highlights: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe("Trust-building one-liners shown under the hero."),
});

export const statSchema = z.object({
  value: z.string().describe("e.g. '15+', '4.9★', '2,400'"),
  label: z.string(),
});

export const serviceSchema = z.object({
  name: z.string(),
  description: z.string(),
  // Icon is a keyword the renderer maps to an inline SVG glyph.
  icon: z
    .enum([
      "spark",
      "shield",
      "bolt",
      "compass",
      "layers",
      "growth",
      "heart",
      "gem",
      "tools",
      "clock",
    ])
    .describe("Pick the keyword that best fits the service."),
});

export const servicesSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(serviceSchema).min(3).max(6),
});

export const aboutSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string().describe("2-3 sentence story / value proposition."),
  points: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .min(2)
    .max(4),
});

export const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().describe("Role or location, e.g. 'Homeowner, Austin'."),
});

export const testimonialsSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  items: z.array(testimonialSchema).min(2).max(4),
});

export const ctaSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  button: z.string(),
});

export const footerSchema = z.object({
  tagline: z.string(),
  columns: z
    .array(z.object({ heading: z.string(), links: z.array(z.string()).min(2).max(5) }))
    .min(2)
    .max(4),
});

export const siteConfigSchema = z.object({
  businessName: z.string(),
  tagline: z.string().describe("Short positioning line for the navbar/footer."),
  industry: z.string(),
  theme: themeSchema,
  nav: z.object({
    links: z.array(linkSchema).min(3).max(6),
    cta: z.string(),
  }),
  hero: heroSchema,
  stats: z.array(statSchema).min(3).max(4),
  services: servicesSchema,
  about: aboutSchema,
  testimonials: testimonialsSchema,
  cta: ctaSchema,
  footer: footerSchema,
});

export type Theme = z.infer<typeof themeSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type IconName = Service["icon"];

/**
 * JSON Schema handed to Claude's structured-output API. Derived by hand from the
 * zod schema above (the API needs `additionalProperties: false` everywhere and
 * a flat JSON Schema, which is cleaner to maintain explicitly than to transpile).
 */
export const SITE_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    businessName: { type: "string" },
    tagline: { type: "string" },
    industry: { type: "string" },
    theme: {
      type: "object",
      additionalProperties: false,
      properties: {
        mood: {
          type: "string",
          enum: ["luxury", "editorial", "futuristic", "warm", "minimal", "bold"],
        },
        background: { type: "string" },
        surface: { type: "string" },
        primary: { type: "string" },
        accent: { type: "string" },
        text: { type: "string" },
        muted: { type: "string" },
      },
      required: ["mood", "background", "surface", "primary", "accent", "text", "muted"],
    },
    nav: {
      type: "object",
      additionalProperties: false,
      properties: {
        links: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: { label: { type: "string" }, href: { type: "string" } },
            required: ["label", "href"],
          },
        },
        cta: { type: "string" },
      },
      required: ["links", "cta"],
    },
    hero: {
      type: "object",
      additionalProperties: false,
      properties: {
        eyebrow: { type: "string" },
        headline: { type: "string" },
        subheadline: { type: "string" },
        primaryCta: { type: "string" },
        secondaryCta: { type: "string" },
        highlights: { type: "array", items: { type: "string" } },
      },
      required: [
        "eyebrow",
        "headline",
        "subheadline",
        "primaryCta",
        "secondaryCta",
        "highlights",
      ],
    },
    stats: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: { value: { type: "string" }, label: { type: "string" } },
        required: ["value", "label"],
      },
    },
    services: {
      type: "object",
      additionalProperties: false,
      properties: {
        eyebrow: { type: "string" },
        title: { type: "string" },
        subtitle: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              icon: {
                type: "string",
                enum: [
                  "spark",
                  "shield",
                  "bolt",
                  "compass",
                  "layers",
                  "growth",
                  "heart",
                  "gem",
                  "tools",
                  "clock",
                ],
              },
            },
            required: ["name", "description", "icon"],
          },
        },
      },
      required: ["eyebrow", "title", "subtitle", "items"],
    },
    about: {
      type: "object",
      additionalProperties: false,
      properties: {
        eyebrow: { type: "string" },
        title: { type: "string" },
        body: { type: "string" },
        points: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              description: { type: "string" },
            },
            required: ["title", "description"],
          },
        },
      },
      required: ["eyebrow", "title", "body", "points"],
    },
    testimonials: {
      type: "object",
      additionalProperties: false,
      properties: {
        eyebrow: { type: "string" },
        title: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              quote: { type: "string" },
              author: { type: "string" },
              role: { type: "string" },
            },
            required: ["quote", "author", "role"],
          },
        },
      },
      required: ["eyebrow", "title", "items"],
    },
    cta: {
      type: "object",
      additionalProperties: false,
      properties: {
        headline: { type: "string" },
        subheadline: { type: "string" },
        button: { type: "string" },
      },
      required: ["headline", "subheadline", "button"],
    },
    footer: {
      type: "object",
      additionalProperties: false,
      properties: {
        tagline: { type: "string" },
        columns: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              heading: { type: "string" },
              links: { type: "array", items: { type: "string" } },
            },
            required: ["heading", "links"],
          },
        },
      },
      required: ["tagline", "columns"],
    },
  },
  required: [
    "businessName",
    "tagline",
    "industry",
    "theme",
    "nav",
    "hero",
    "stats",
    "services",
    "about",
    "testimonials",
    "cta",
    "footer",
  ],
} as const;
