import type { IconName } from "@/components/ui/Icon";

/**
 * Single source of truth for all Forge Digital copy and theme tokens.
 *
 * Forge Digital is a premium web DESIGN & DEVELOPMENT STUDIO — we design, build,
 * and launch bespoke, high-end websites. We are NOT a marketing, advertising,
 * SEO, or lead-generation agency: no ad campaigns, sales funnels, CRO services,
 * growth consulting, or business strategy.
 *
 * We DO talk about conversion-focused website DESIGN — websites strategically
 * designed with proven UI/UX principles and intuitive customer journeys that
 * help businesses build trust, encourage enquiries, and convert visitors into
 * customers through excellent design and user experience. The throughline is
 * craft: bespoke design, performance, UX, animation, presentation, clean code.
 */

export const BRAND = {
  name: "FORGE DIGITAL",
  tagline: "Bespoke Websites, Beautifully Built",
  email: "hello@forgedigital.com.au",
  location: "Designing for businesses Australia-wide",
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
  { label: "Work", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
];

export const HERO = {
  eyebrow: "Premium Web Design Studio · Australia",
  headline: "The Best-Looking Website In Your Industry",
  subheadline:
    "Forge Digital is a premium web design studio crafting bespoke, beautifully built websites for businesses across Australia. Meticulously designed, exceptionally fast, and strategically built to turn visitors into customers.",
  primaryCta: "Get My Free Proposal",
  secondaryCta: "View Our Work",
};

export const STATS = [
  { value: "120+", label: "Websites crafted" },
  { value: "4.9★", label: "Average client rating" },
  { value: "100%", label: "Custom-built, no templates" },
  { value: "14 days", label: "Average build time" },
];

export const FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "palette",
    title: "Bespoke Website Design",
    description:
      "Every website is designed from scratch around your brand — no templates, no shortcuts. Just original, considered design.",
  },
  {
    icon: "layers",
    title: "Premium Development",
    description:
      "Hand-built with clean, modern code by senior developers — robust, refined, and crafted with genuine care.",
  },
  {
    icon: "phone",
    title: "Mobile Responsive",
    description:
      "Immaculate on every device. Your site looks and feels flawless across phones, tablets, and desktops alike.",
  },
  {
    icon: "gauge",
    title: "Fast Loading Performance",
    description:
      "Meticulously optimised to load in an instant, so your website feels effortless and premium the moment it opens.",
  },
  {
    icon: "target",
    title: "Strategic UX & Layouts",
    description:
      "Intuitive customer journeys and conversion-focused layouts that guide visitors naturally and turn interest into enquiries.",
  },
  {
    icon: "sparkle",
    title: "Modern Animations",
    description:
      "Tasteful motion and subtle micro-interactions that bring your website to life — elegant, never gimmicky.",
  },
  {
    icon: "star",
    title: "Professional Presentation",
    description:
      "A polished, credible presence that reflects the true quality of your business and builds instant trust.",
  },
  {
    icon: "shield",
    title: "Clean, Maintainable Code",
    description:
      "Tidy, well-structured code built to best-practice standards — easy to maintain, extend, and rely on for years.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Submit Your Enquiry",
    description:
      "Tell us about your business and the website you have in mind. It takes about two minutes.",
  },
  {
    step: "02",
    title: "Discovery & Design Direction",
    description:
      "We get to know your brand and shape the look, feel, and structure of your new website together.",
  },
  {
    step: "03",
    title: "Design & Development",
    description:
      "We craft your website — designing, refining, and hand-building every detail with you in the loop.",
  },
  {
    step: "04",
    title: "Launch & Handover",
    description:
      "We polish, test across every device, launch, and hand over a website you'll be proud of — with support if you need it.",
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
    result: "Bold, bespoke design",
    description: "A confident, trustworthy design that gives an established trade business the premium presence it deserves.",
  },
  {
    name: "Lumen Dental",
    category: "Health & Service",
    icon: "sparkle",
    result: "Calm, premium UX",
    description: "A refined, reassuring experience with beautifully considered details throughout.",
  },
  {
    name: "Harvest & Co",
    category: "E-commerce",
    icon: "cart",
    result: "Refined online store",
    description: "A clean, elegant online store with a shopping experience as polished as the products.",
  },
  {
    name: "Vertex Accounting",
    category: "Professional Services",
    icon: "shield",
    result: "Polished & credible",
    description: "An authoritative, sophisticated website befitting a high-end professional firm.",
  },
  {
    name: "Apex Electrical",
    category: "Trades",
    icon: "rocket",
    result: "Sleek custom build",
    description: "A modern, crisp build with sharp typography and smooth, tasteful motion.",
  },
  {
    name: "Bloom Studio",
    category: "Beauty & Service",
    icon: "star",
    result: "Elegant brand showcase",
    description: "A beautiful brand showcase with graceful galleries and effortless navigation.",
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
  addon: boolean;
}[] = [
  {
    name: "Starter Website",
    price: "From $999",
    cadence: "AUD",
    description:
      "Perfect for startups and small businesses wanting a professionally designed online presence.",
    features: [
      "Up to 5 custom pages",
      "Premium responsive website",
      "Custom UI design",
      "Contact & enquiry forms",
      "Basic on-page SEO",
      "Google Maps integration",
      "Social media integration",
      "SSL certificate configuration",
      "Domain connection",
      "Hosting setup",
      "Image optimisation",
      "Website speed optimisation",
      "Mobile responsive",
      "Security best practices",
      "2 rounds of revisions",
      "Launch within approx. 1–2 weeks",
    ],
    cta: "Get Started",
    featured: false,
    addon: false,
  },
  {
    name: "Business Website",
    price: "From $1,999",
    cadence: "AUD",
    description:
      "For businesses wanting a premium online presence built with exceptional design, strategic layouts, and a polished customer experience.",
    features: [
      "Up to 10 custom pages",
      "Conversion-focused website design",
      "Premium UI/UX",
      "Custom animations",
      "CMS integration",
      "Booking system integration (if required)",
      "Gallery & portfolio pages",
      "Contact forms",
      "Website speed optimisation",
      "Image optimisation",
      "Security optimisation",
      "Domain connection",
      "Hosting configuration",
      "Priority support",
    ],
    cta: "Get Started",
    featured: true,
    addon: true,
  },
  {
    name: "Premium Website",
    price: "From $3,999+",
    cadence: "AUD",
    description:
      "Completely bespoke websites designed and developed from the ground up for businesses wanting a truly premium digital presence.",
    features: [
      "Unlimited core pages",
      "Completely bespoke design",
      "Premium animations",
      "Advanced custom functionality",
      "Ecommerce integration",
      "Booking systems",
      "Membership functionality (if required)",
      "API integrations",
      "Advanced CMS",
      "Custom dashboards (if required)",
      "Performance optimisation",
      "Security hardening",
      "Accessibility optimisation",
      "Dedicated project management",
      "Priority support after launch",
    ],
    cta: "Book a Call",
    featured: false,
    addon: true,
  },
];

export const PRICING_NOTE =
  "Every project is tailored to your business. Prices shown are starting prices and may vary depending on project scope, integrations and custom functionality.";

/**
 * Optional premium add-on offered with the Business and Premium packages.
 * A manually configured technical implementation — not an automated product.
 */
export const GBP_ADDON = {
  badge: "Optional Premium Add-on",
  title: "Google Business Profile & Review Infrastructure",
  intro:
    "A premium, hand-configured technical implementation — not an automated software product. Every setup is completed manually and tailored specifically to your business, giving you a professional review-collection infrastructure that makes it simple for genuine customers to leave Google reviews.",
  availability: "Available with the Business and Premium packages.",
  groups: [
    {
      heading: "Profile setup & optimisation",
      items: [
        "Google Business Profile creation (where required)",
        "Existing profile optimisation",
        "Assistance with ownership verification",
        "Business information configuration",
        "Categories & services configuration",
        "Contact information setup",
        "Opening hours configuration",
        "Service area configuration",
        "Google Maps optimisation",
        "Professional business description",
        "Profile branding optimisation",
        "Photo recommendations",
      ],
    },
    {
      heading: "Review collection infrastructure",
      items: [
        "Google Review landing page development",
        "Custom branded review page",
        "Direct Google Review link generation",
        "QR code generation",
        "Review request workflow setup",
        "Email review request integration (your email or a dedicated business email configured during setup)",
      ],
    },
    {
      heading: "Hosting & delivery",
      items: [
        "Domain or subdomain connection (where applicable)",
        "SSL configuration",
        "Secure hosting of the review landing page",
        "End-to-end testing before delivery",
      ],
    },
  ],
  note: "Every implementation is professionally configured by Forge Digital. We don't guarantee rankings or specific review numbers — just a polished, reliable way for your genuine customers to share their experience.",
};

export const TESTIMONIALS = [
  {
    quote:
      "The website looks absolutely stunning — better than anything else in our industry. The whole process was smooth and completely stress-free.",
    author: "Mark T.",
    business: "Coastal Plumbing Co",
    rating: 5,
  },
  {
    quote:
      "Forge Digital understood exactly the look we wanted. The attention to detail is incredible and the finished site feels genuinely premium.",
    author: "Dr. Sarah L.",
    business: "Lumen Dental",
    rating: 5,
  },
  {
    quote:
      "Beautiful, clean, and so well made. They were a pleasure to work with from start to finish and nothing was ever too much trouble.",
    author: "Jess W.",
    business: "Harvest & Co",
    rating: 5,
  },
  {
    quote:
      "Easily the most professional website we've ever had. Polished, elegant, and perfectly on brand. The quality speaks for itself.",
    author: "Daniel R.",
    business: "Vertex Accounting",
    rating: 5,
  },
  {
    quote:
      "I'm obsessed with how it looks. Every little detail is considered and the animations feel so smooth and high-end.",
    author: "Aisha M.",
    business: "Bloom Studio",
    rating: 5,
  },
  {
    quote:
      "Reliable, talented, and genuinely easy to deal with. They delivered a gorgeous website on time and made the whole thing effortless.",
    author: "Tom H.",
    business: "Apex Electrical",
    rating: 5,
  },
];

export const FINAL_CTA = {
  headline: "Ready For A Website You're Proud Of?",
  subheadline: "Let's design and build something beautiful for your business.",
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
