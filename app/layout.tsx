import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteForge AI — Premium AI Website Generator",
  description:
    "Generate websites that feel like a $10,000–$20,000 agency build: GSAP scroll storytelling, Lenis smooth scroll, luxury transitions, and conversion-focused layouts.",
  metadataBase: new URL("https://siteforge.ai"),
  openGraph: {
    title: "SiteForge AI",
    description:
      "AI website generator with Apple-level animations and Framer-quality interactions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
