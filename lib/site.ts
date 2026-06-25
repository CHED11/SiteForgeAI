import type { IconName } from "@/components/ui/Icon";

/**
 * Single source of truth for all Forge Digital marketing copy and theme tokens.
 * Forge Digital is a premium website design & development agency — this site
 * exists to collect qualified enquiries from Australian business owners.
 */

export const BRAND = {
  name: "FORGE DIGITAL",
  tagline: "Premium Websites Built To Grow Your Business",
  email: "hello@forgedigital.com.au",
  location: "Servicing businesses Australia-wide",
};

/** Dark luxury palette. */
export const THEME = {
  bg: "#07070c",
  surface: "#10101a",
  primary: "#8b7bff", // violet
  accent: "#2ee6b6", // mint
  text: "#f5f3ee",
  muted: "#9a9ab0",
};

export const NAV_LINKS = [
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
];

export const HERO = {
  eyebrow: "Premium Web Design Agency · Australia",
  headline: "Websites That Turn Visitors Into Customers",
  subheadline:
    "We build modern, high-converting websites for businesses across Australia. Professionally designed, mobile-optimised, fast-loading and built to generate more enquiries and sales.",
  primaryCta: "Get My Free Website Proposal",
  secondaryCta: "View Recent Projects",
};

export const STATS = [
  { value: "120+", label: "Websites launched" },
  { value: "4.9★", label: "Average client rating" },
  { value: "100%", label: "Australian owned & run" },
  { value: "14 days", label: "Average build time" },
];

export const FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "palette",
    title: "Custom Website Design",
    description:
      "Bespoke designs crafted around your brand, your goals, and the exact customers you want to win.",
  },
  {
    icon: "phone",
    title: "Mobile Responsive",
    description:
      "Flawless on every screen. Most visitors are on a phone — we design mobile-first so they convert.",
  },
  {
    icon: "gauge",
    title: "Fast Loading Speeds",
    description:
      "Performance-tuned builds that load in a blink, so visitors stay and Google ranks you higher.",
  },
  {
    icon: "search",
    title: "SEO Ready",
    description:
      "Clean, structured, search-friendly foundations that help the right customers find you first.",
  },
  {
    icon: "target",
    title: "Lead Generation Focused",
    description:
      "Every page is engineered to turn visitors into enquiries, phone calls, and booked jobs.",
  },
  {
    icon: "support",
    title: "Ongoing Support",
    description:
      "We don't disappear at launch. Updates, tweaks, and advice whenever your business needs them.",
  },
  {
    icon: "sparkle",
    title: "Premium User Experience",
    description:
      "Smooth, intuitive, considered. The kind of polish customers instinctively associate with trust.",
  },
  {
    icon: "growth",
    title: "Built For Business Growth",
    description:
      "Scalable foundations ready to grow with you — from your first enquiry to market leader.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Submit Your Enquiry",
    description:
      "Tell us about your business and goals using the enquiry form. It takes about two minutes.",
  },
  {
    step: "02",
    title: "Discovery & Strategy Call",
    description:
      "We map your audience, competitors, and the fastest path to more enquiries and sales.",
  },
  {
    step: "03",
    title: "Design & Development",
    description:
      "We design, write, and build your website — keeping you in the loop at every milestone.",
  },
  {
    step: "04",
    title: "Launch & Optimisation",
    description:
      "We launch, test, and fine-tune for speed, SEO, and conversions — then keep supporting you.",
  },
];

export const PROJECTS: {
  name: string;
  category: string;
  icon: IconName;
  result: string;
  description: string;
}[] = [
  {
    name: "Coastal Plumbing Co",
    category: "Trades",
    icon: "wrench",
    result: "+212% call enquiries",
    description: "A fast, trust-building site that turned a quiet phone into a full booking calendar.",
  },
  {
    name: "Lumen Dental",
    category: "Health & Service",
    icon: "sparkle",
    result: "3× online bookings",
    description: "A calm, premium experience with seamless online booking front and centre.",
  },
  {
    name: "Harvest & Co",
    category: "E-commerce",
    icon: "cart",
    result: "+47% online sales",
    description: "A conversion-optimised store with a checkout customers actually finish.",
  },
  {
    name: "Vertex Accounting",
    category: "Professional Services",
    icon: "shield",
    result: "Premium rebrand",
    description: "An authoritative, polished presence that wins higher-value clients.",
  },
  {
    name: "Apex Electrical",
    category: "Trades",
    icon: "rocket",
    result: "Top of local search",
    description: "Built for local SEO so they own the map pack in their service areas.",
  },
  {
    name: "Bloom Studio",
    category: "Beauty & Service",
    icon: "star",
    result: "Booked out in 6 weeks",
    description: "A beautiful brand showcase that filled the calendar within weeks of launch.",
  },
];

export const PRICING: {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}[] = [
  {
    name: "Starter Website",
    price: "From $799",
    cadence: "one-off",
    description: "For new and small businesses that need a professional presence — fast.",
    features: [
      "Up to 5 custom pages",
      "Mobile-responsive design",
      "Contact & enquiry form",
      "Basic on-page SEO",
      "Google Maps + socials",
      "2 rounds of revisions",
      "Launch in ~1–2 weeks",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Business Website",
    price: "From $1,499",
    cadence: "one-off",
    description: "Our most popular package for established businesses focused on growth.",
    features: [
      "Up to 10 custom pages",
      "Premium conversion design",
      "Professional copywriting",
      "Advanced SEO setup",
      "Lead capture + automation",
      "Analytics & tracking",
      "Speed optimisation",
      "Priority support",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Premium Website",
    price: "From $2,499+",
    cadence: "bespoke",
    description: "A high-end, fully bespoke build for businesses that want to dominate.",
    features: [
      "Unlimited core pages",
      "Fully bespoke design & motion",
      "Full copywriting & strategy",
      "E-commerce or bookings",
      "Advanced integrations",
      "Conversion rate optimisation",
      "3 months support included",
      "Dedicated project manager",
    ],
    cta: "Book a Call",
    featured: false,
  },
];

export const PRICING_NOTE =
  "All packages include hosting setup, SSL, and a mobile-first build. Prices in AUD, GST exclusive.";

export const TESTIMONIALS = [
  {
    quote:
      "Forge Digital rebuilt our site and the difference was immediate — we went from a handful of enquiries a month to booked out weeks ahead. Worth every dollar.",
    author: "Mark T.",
    business: "Coastal Plumbing Co",
    rating: 5,
  },
  {
    quote:
      "Professional from start to finish. They understood our brand, wrote copy that actually sounds like us, and the site looks like a million bucks.",
    author: "Dr. Sarah L.",
    business: "Lumen Dental",
    rating: 5,
  },
  {
    quote:
      "Our online sales jumped almost 50% in the first two months. The team is responsive, sharp, and genuinely cares about results.",
    author: "Jess W.",
    business: "Harvest & Co",
    rating: 5,
  },
  {
    quote:
      "Best investment we've made in the business. Fast, beautiful, and it ranks. Clients constantly compliment the website.",
    author: "Daniel R.",
    business: "Vertex Accounting",
    rating: 5,
  },
  {
    quote:
      "They made the whole process effortless and the result blew us away. Enquiries through the website have tripled.",
    author: "Aisha M.",
    business: "Bloom Studio",
    rating: 5,
  },
  {
    quote:
      "Reliable, talented, and easy to deal with. Forge Digital delivered exactly what they promised, on time and on budget.",
    author: "Tom H.",
    business: "Apex Electrical",
    rating: 5,
  },
];

export const FINAL_CTA = {
  headline: "Ready To Grow Your Business Online?",
  subheadline:
    "Let's build a website that attracts customers and drives results.",
  button: "Request Your Free Proposal",
};

/** Enquiry form select options. */
export const FORM_OPTIONS = {
  industry: [
    "Trades & Construction",
    "Health & Medical",
    "Professional Services",
    "Hospitality & Food",
    "Retail & E-commerce",
    "Beauty & Wellness",
    "Real Estate",
    "Automotive",
    "Other",
  ],
  style: [
    "Modern & Minimal",
    "Bold & Premium",
    "Corporate & Professional",
    "Warm & Friendly",
    "Not sure — guide me",
  ],
  budget: [
    "$799 – $1,499",
    "$1,500 – $2,499",
    "$2,500 – $5,000",
    "$5,000+",
    "Not sure yet",
  ],
  timeline: ["ASAP", "2–4 weeks", "1–2 months", "Just exploring"],
};
