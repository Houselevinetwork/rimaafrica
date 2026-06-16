import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/booking/", "/_next/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "Bytespider"],
        disallow: "/",
      },
    ],
    sitemap: "https://rimaafrica.com/sitemap.xml",
    host: "https://rimaafrica.com",
  };
}