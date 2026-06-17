/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep blacks
        ink: {
          DEFAULT: "#050505",
          950: "#050505",
          900: "#0a0a0b",
          850: "#0e0e10",
        },
        // Charcoal sections
        charcoal: {
          DEFAULT: "#121214",
          800: "#161618",
          700: "#1c1c1f",
          600: "#242428",
          500: "#2e2e33",
        },
        // Typography
        chalk: "#f5f5f7", // Apple off-white
        ash: "#86868b", // muted gray
        // Metallic silver
        silver: {
          DEFAULT: "#c8c8cd",
          light: "#e6e6ea",
          dark: "#8a8a90",
        },
        // Tasteful gold
        gold: {
          DEFAULT: "#c9a86a",
          light: "#ddc28e",
          dark: "#a98a52",
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        ultra: "0.35em",
        mega: "0.5em",
      },
      maxWidth: {
        content: "1280px",
        prose: "62ch",
      },
      boxShadow: {
        soft: "0 30px 80px -20px rgba(0,0,0,0.7)",
        frame: "0 40px 120px -30px rgba(0,0,0,0.85)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "silver-sheen":
          "linear-gradient(135deg, #e6e6ea 0%, #c8c8cd 40%, #8a8a90 60%, #e6e6ea 100%)",
        "gold-sheen":
          "linear-gradient(135deg, #ddc28e 0%, #c9a86a 50%, #a98a52 100%)",
        "spotlight":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.10), transparent 70%)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};
