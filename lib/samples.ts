import type { SiteConfig } from "./types";

/**
 * A hand-tuned demo config so the renderer can be explored without an API key.
 * It also doubles as a reference for the shape and quality bar the model targets.
 */
export const SAMPLE_SITE: SiteConfig = {
  businessName: "Verdant & Stone",
  tagline: "Landscape architecture for the modern home",
  industry: "Landscape design & build",
  theme: {
    mood: "luxury",
    background: "#0c1410",
    surface: "#13201a",
    primary: "#9bd17a",
    accent: "#e7c391",
    text: "#f2f5ef",
    muted: "#9fb0a3",
  },
  nav: {
    links: [
      { label: "Work", href: "#services" },
      { label: "Studio", href: "#about" },
      { label: "Praise", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Book a site visit",
  },
  hero: {
    eyebrow: "Design · Build · Cultivate",
    headline: "Gardens that feel inevitable",
    subheadline:
      "We craft living landscapes that age beautifully — sculpted terrain, native planting, and stonework built to outlast trends.",
    primaryCta: "Start your project",
    secondaryCta: "View the portfolio",
    highlights: [
      "Award-winning design studio",
      "Fully in-house build crews",
      "10-year structural guarantee",
    ],
  },
  stats: [
    { value: "18", label: "Years shaping gardens" },
    { value: "240+", label: "Landscapes delivered" },
    { value: "4.9★", label: "From 130 reviews" },
    { value: "10yr", label: "Build guarantee" },
  ],
  services: {
    eyebrow: "What we do",
    title: "From sketch to standing garden",
    subtitle:
      "A single studio for the whole journey — so the vision never gets lost in translation.",
    items: [
      {
        name: "Landscape architecture",
        description:
          "Master plans that read the light, the slope, and the way you actually live outdoors.",
        icon: "compass",
      },
      {
        name: "Stone & structure",
        description:
          "Hand-laid terraces, walls, and water features engineered to last a generation.",
        icon: "layers",
      },
      {
        name: "Native planting",
        description:
          "Layered, low-water palettes that bloom in sequence and thrive in your microclimate.",
        icon: "growth",
      },
      {
        name: "Lighting & ambience",
        description:
          "Architectural lighting that turns the garden into a second living room after dark.",
        icon: "spark",
      },
      {
        name: "Care & stewardship",
        description:
          "Seasonal programs that keep the garden looking like the day we handed it over.",
        icon: "heart",
      },
      {
        name: "Outdoor living",
        description:
          "Kitchens, fire features, and shade structures built into the landscape, not bolted on.",
        icon: "gem",
      },
    ],
  },
  about: {
    eyebrow: "The studio",
    title: "A small team obsessed with the details others skip",
    body: "Verdant & Stone was founded on a simple belief: a garden should feel like it was always there. We keep design and build under one roof so craft, not handoffs, defines the result.",
    points: [
      {
        title: "One accountable team",
        description:
          "The people who draw your garden are the people who build it.",
      },
      {
        title: "Built for decades",
        description:
          "Proper drainage, real materials, and structural integrity — never shortcuts.",
      },
      {
        title: "Quietly sustainable",
        description:
          "Native species, captured rainwater, and soil we leave healthier than we found it.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kind words",
    title: "Clients who'd hire us again tomorrow",
    items: [
      {
        quote:
          "They turned a steep, unusable slope into the part of the house we never want to leave. Every detail was considered.",
        author: "Marguerite L.",
        role: "Homeowner, Hill Country",
      },
      {
        quote:
          "Three years on, the garden looks better than the day it was finished. That tells you everything about how it was built.",
        author: "David & Ana R.",
        role: "Homeowners, Westlake",
      },
      {
        quote:
          "The most organized, lowest-stress renovation we've done. They under-promised and over-delivered.",
        author: "Priya S.",
        role: "Homeowner, Tarrytown",
      },
    ],
  },
  cta: {
    headline: "Let's design something that lasts",
    subheadline:
      "Tell us about your space. We'll walk it with you and sketch what's possible — no pressure, no templates.",
    button: "Book your site visit",
  },
  footer: {
    tagline: "Landscape architecture for the modern home.",
    columns: [
      {
        heading: "Studio",
        links: ["Our work", "The team", "Process", "Careers"],
      },
      {
        heading: "Services",
        links: ["Design", "Build", "Planting", "Maintenance"],
      },
      {
        heading: "Visit",
        links: ["Book a consult", "Showroom", "Instagram", "Journal"],
      },
    ],
  },
};

export const EXAMPLE_BRIEFS: { label: string; brief: string }[] = [
  {
    label: "Coffee roaster",
    brief:
      "A specialty coffee roaster and café in Portland focused on single-origin beans, slow brewing, and a calm, design-forward space. Wholesale to local restaurants.",
  },
  {
    label: "Dental studio",
    brief:
      "A modern boutique dental practice offering cosmetic dentistry, Invisalign, and a spa-like patient experience. Warm, reassuring, premium.",
  },
  {
    label: "Architecture firm",
    brief:
      "A residential architecture studio designing minimalist, light-filled homes. Confident, editorial, and quietly luxurious.",
  },
  {
    label: "Fitness studio",
    brief:
      "A high-end strength and conditioning studio with small-group coaching and personalized programming. Bold, energetic, motivating.",
  },
];
