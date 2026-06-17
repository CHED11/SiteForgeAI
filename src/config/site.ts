/**
 * SITE-WIDE CONTENT CONFIG
 * ------------------------
 * Brand copy, navigation, and the "Why Choose Us" pillars. Edit freely.
 */

export const SITE = {
  brand: "CarCentralCo",
  tagline: "Automotive Art For Enthusiasts.",
  hero: {
    headline: "AUTOMOTIVE ART FOR ENTHUSIASTS",
    subheadline:
      "Collector-grade automotive artwork inspired by the world's most iconic performance cars.",
  },
  about: {
    headline: "Built For Car Enthusiasts.",
    body:
      "CarCentralCo creates premium automotive artwork inspired by the world's most iconic performance cars. Every design is created to celebrate engineering, design, and automotive passion.",
  },
  email: "hello@carcentralco.com",
} as const;

export interface WhyPillar {
  title: string;
  description: string;
}

export const WHY_CHOOSE_US: WhyPillar[] = [
  {
    title: "Collector Grade Artwork",
    description: "Each design is treated as a gallery piece, not a mass-market print.",
  },
  {
    title: "Premium Print Quality",
    description: "Archival inks and heavyweight stock built to last for decades.",
  },
  {
    title: "Designed For Enthusiasts",
    description: "Created by people who obsess over the cars as much as you do.",
  },
  {
    title: "Luxury Home & Office Décor",
    description: "Statement pieces for modern homes, garages, offices, and showrooms.",
  },
  {
    title: "Museum-Inspired Presentation",
    description: "Composition and tonality drawn from fine-art and gallery curation.",
  },
  {
    title: "Multiple Sizes Available",
    description: "From intimate 16×20 prints to commanding 24×36 centrepieces.",
  },
];
