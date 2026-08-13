import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_R2_URL: process.env.NEXT_PUBLIC_R2_URL || "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev",
  },
  // Cloudflare Pages compatibility
  // DO NOT use output:"export" — we need sitemap.ts and robots.ts to work
  // Cloudflare Pages supports Next.js App Router natively via @cloudflare/next-on-pages

  images: {
    // Allow R2 public bucket images
    remotePatterns: [
      { protocol: "https", hostname: "pub-*.r2.dev" },
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "placehold.co" },
    ],
    // Image optimisation on Cloudflare (uses Cloudflare's built-in optimizer)
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days
  },

  // Compress all responses
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // Cache static R2 assets aggressively
      {
        source: "/(.*)\\.(mp4|jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Old URLs → new structure
      { source: "/safaris", destination: "/itineraries", permanent: true },
      { source: "/tours", destination: "/itineraries", permanent: true },
      { source: "/packages", destination: "/itineraries", permanent: true },
    ];
  },
};

export default nextConfig;