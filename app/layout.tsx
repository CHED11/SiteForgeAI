import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgedigital.com.au"),
  title: "Forge Digital — Premium Custom Website Design Studio | Australia",
  description:
    "Forge Digital is a premium web design studio crafting bespoke, beautifully built, high-performance websites for businesses across Australia. Exceptional design, flawless on every device, finished to the highest standard. Request a free proposal.",
  keywords: [
    "custom website design Australia",
    "bespoke web design",
    "premium web design studio",
    "website design and development",
    "luxury web design",
    "professional website designer",
  ],
  openGraph: {
    title: "Forge Digital — Bespoke Websites, Beautifully Built",
    description:
      "A premium web design studio crafting bespoke, beautifully built websites for businesses across Australia. Request your free proposal.",
    type: "website",
    locale: "en_AU",
    siteName: "Forge Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Digital — Premium Custom Website Design, Australia",
    description:
      "Bespoke, beautifully built, high-performance websites — designed and developed to the highest standard.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "var(--font-sans)" }}>{children}</body>
    </html>
  );
}
