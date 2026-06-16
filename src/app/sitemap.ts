import type { MetadataRoute } from "next";
import { DESTINATIONS, ITINERARIES, EXPERIENCE_TYPES } from "@/data/destinations";

const BASE = "https://rimaafrica.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/itineraries`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/types`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/trip-inspirations`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/plan`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/conservation`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/travel-insurance`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const itineraryRoutes: MetadataRoute.Sitemap = ITINERARIES.map(i => ({
    url: `${BASE}/itineraries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const typeRoutes: MetadataRoute.Sitemap = EXPERIENCE_TYPES.map(t => ({
    url: `${BASE}/types/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes, ...itineraryRoutes, ...typeRoutes];
}