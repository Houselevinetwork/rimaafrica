import type { MetadataRoute } from "next";
import { DESTINATIONS, EXPERIENCE_TYPES, ITINERARIES } from "@/data/destinations";

const BASE = "https://rimaafrica.com";
const now = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/destinations`,  lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/types`,         lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE}/itineraries`,   lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE}/trip-inspirations`, lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "yearly",  priority: 0.75 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.80 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.70 },
    { url: `${BASE}/plan`,          lastModified: now, changeFrequency: "yearly",  priority: 0.72 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.20 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.20 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.92,
  }));

  const typeRoutes: MetadataRoute.Sitemap = EXPERIENCE_TYPES.map(t => ({
    url: `${BASE}/types/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const itineraryRoutes: MetadataRoute.Sitemap = ITINERARIES.map(i => ({
    url: `${BASE}/itineraries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...typeRoutes,
    ...itineraryRoutes,
  ];
}