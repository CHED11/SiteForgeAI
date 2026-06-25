import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgedigital.com.au"),
  title: "Forge Digital — Premium Website Design & Development | Australia",
  description:
    "Forge Digital builds modern, high-converting websites for businesses across Australia. Professionally designed, mobile-optimised, fast-loading and built to generate more enquiries and sales. Get a free website proposal.",
  keywords: [
    "website design Australia",
    "web design agency",
    "small business websites",
    "high-converting websites",
    "lead generation websites",
    "website development",
  ],
  openGraph: {
    title: "Forge Digital — Premium Websites Built To Grow Your Business",
    description:
      "Modern, high-converting websites for businesses across Australia. Get your free website proposal.",
    type: "website",
    locale: "en_AU",
    siteName: "Forge Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Digital — Premium Website Design, Australia",
    description:
      "Modern, high-converting websites built to generate more enquiries and sales.",
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
