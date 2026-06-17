/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Scope remote image hosts explicitly (avoid broad wildcards — they widen
    // the Image Optimizer's SSRF/DoS surface).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
