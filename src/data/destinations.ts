import type { Destination, ExperienceType, ContinentGroup } from "@/types";

// ── CONTINENT GROUPS ──────────────────────────────────────────
// East Africa: Kenya, Uganda, Tanzania, Rwanda

export const CONTINENT_GROUPS: ContinentGroup[] = [
  {
    id: "east-africa",
    label: "East Africa",
    image: "ui/continent-east-africa.jpg",
    destinations: [
      { slug: "kenya",    name: "Kenya" },
      { slug: "uganda",   name: "Uganda" },
      { slug: "tanzania", name: "Tanzania" },
      { slug: "rwanda",   name: "Rwanda" },
    ],
  },
];

// ── DESTINATIONS ─────────────────────────────────────────────
export const DESTINATIONS: Destination[] = [
  {
    slug: "kenya",
    name: "Kenya",
    region: "East Africa",
    continentGroup: "east-africa",
    tagline: "The Maasai Mara, Amboseli and the world's greatest wildlife spectacle",
    heroImage: "destinations/kenya/hero.jpg",
    coverImage: "destinations/kenya/cover.jpg",
    featured: true,
    fromPrice: 4500,
    currency: "USD",
    aboutText: "Kenya is the heartland of the African safari. From the sweeping grasslands of the Maasai Mara — where the Great Migration crosses each year — to the elephant-filled plains of Amboseli beneath Kilimanjaro, Kenya delivers wildlife encounters of extraordinary intimacy.",
    galleryImages: [],
    whereToGo: [],
    whereToStay: [],
    itineraries: [
      "ke-mara-group-3", "ke-mara-flyin-3", "ke-mara-amboseli-flyin-4",
      "ke-amboseli-nakuru-naivasha-mara-6", "ke-nakuru-naivasha-mara-4",
      "ke-aberdare-olpejeta-3", "ke-samburu-3", "ke-amboseli-3",
      "ke-olpejeta-2", "ke-mara-classic-7",
    ],
    seasonalCalendar: [
      { month: "January–March", description: "Dry and warm. Excellent game viewing in most reserves.", highlight: "Calving season in Amboseli" },
      { month: "April–May", description: "Long rains. Lush and green, fewer visitors, lower rates." },
      { month: "June–October", description: "Peak season. The Great Migration river crossings in the Mara.", highlight: "Great Migration" },
      { month: "November–December", description: "Short rains. Good birding, resident wildlife active." },
    ],
  },
  {
    slug: "uganda",
    name: "Uganda",
    region: "East Africa",
    continentGroup: "east-africa",
    tagline: "Gorilla trekking in Bwindi, chimpanzees and the source of the Nile",
    heroImage: "destinations/uganda/hero.jpg",
    coverImage: "destinations/uganda/cover.jpg",
    featured: true,
    fromPrice: 5500,
    currency: "USD",
    aboutText: "Uganda is the pearl of Africa. Home to nearly half the world's remaining mountain gorillas in Bwindi Impenetrable Forest, it also offers chimpanzee tracking, the legendary Murchison Falls, and the source of the Nile at Jinja.",
    galleryImages: [],
    whereToGo: [],
    whereToStay: [],
    itineraries: [
      "ug-bwindi-gorilla-3", "ug-bwindi-mburo-5", "ug-queen-elizabeth-4",
      "ug-murchison-kibale-6", "ug-grand-primates-predators-8", "ug-kibale-habituation-3",
      "ug-murchison-4", "ug-gorillas-golden-monkeys-5", "ug-kidepo-7", "ug-jinja-ziwa-2",
    ],
    seasonalCalendar: [
      { month: "June–September", description: "Dry season — best gorilla and chimpanzee trekking.", highlight: "Gorilla trekking" },
      { month: "December–February", description: "Second dry season. Good conditions across all parks." },
    ],
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    region: "East Africa",
    continentGroup: "east-africa",
    tagline: "Serengeti, Ngorongoro Crater and the great migration",
    heroImage: "destinations/tanzania/hero.jpg",
    coverImage: "destinations/tanzania/cover.jpg",
    featured: true,
    fromPrice: 4800,
    currency: "USD",
    aboutText: "Tanzania is home to the Serengeti — the most famous wildlife reserve on earth — and the Ngorongoro Crater, a self-contained ecosystem teeming with the Big Five. From the elephant herds of Tarangire to the wild south at Ruaha, Tanzania offers safari at its most complete.",
    galleryImages: [],
    whereToGo: [],
    whereToStay: [],
    itineraries: [
      "tz-tarangire-ngorongoro-3", "tz-northern-circuit-classic-4", "tz-serengeti-migration-6",
      "tz-ngorongoro-serengeti-manyara-5", "tz-grand-tanzania-8", "tz-manyara-ngorongoro-3",
      "tz-ruaha-southern-4", "tz-selous-nyerere-flyin-5", "tz-arusha-kilimanjaro-culture-6",
      "tz-migration-river-crossing-7",
    ],
    seasonalCalendar: [
      { month: "June–October", description: "Dry season. The Serengeti migration is in full flow.", highlight: "Serengeti Migration" },
      { month: "January–March", description: "Calving season on the short grass plains. Predator activity is peak." },
    ],
  },
  {
    slug: "rwanda",
    name: "Rwanda",
    region: "East Africa",
    continentGroup: "east-africa",
    tagline: "Mountain gorillas in Volcanoes National Park",
    heroImage: "destinations/rwanda/hero.jpg",
    coverImage: "destinations/rwanda/cover.jpg",
    featured: true,
    fromPrice: 5000,
    currency: "USD",
    aboutText: "Rwanda is Africa's finest gorilla destination. Compact, safe and extraordinarily beautiful, the country pairs gorilla trekking in Volcanoes National Park with golden monkey tracking, Lake Kivu and a remarkable story of transformation.",
    galleryImages: [],
    whereToGo: [],
    whereToStay: [],
    itineraries: [
      "rw-volcanoes-express-3", "rw-gorillas-kivu-4", "rw-gorilla-trek-5",
      "rw-grand-rwanda-6", "rw-akagera-3", "rw-nyungwe-canopy-4",
      "rw-kigali-culture-2", "rw-gorilla-akagera-combo-5", "rw-ultimate-primates-7",
      "rw-kivu-nyungwe-relax-4",
    ],
    seasonalCalendar: [
      { month: "June–September", description: "Dry season. Best trekking conditions.", highlight: "Gorilla trekking" },
      { month: "December–February", description: "Short dry season. Good visibility on the volcanoes." },
    ],
  },
];

// ── EXPERIENCE TYPES ──────────────────────────────────────────
export const EXPERIENCE_TYPES: ExperienceType[] = [
  { slug: "safari",       label: "Luxury Safari",         heroImage: "types/safari-hero.jpg",       description: "Private game drives, expert guides and intimate tented camps in Africa's greatest wildlife reserves." },
  { slug: "honeymoon",    label: "Honeymoon",             heroImage: "types/honeymoon-hero.jpg",    description: "Private tented camps, romantic bush dinners and sundowners under the African sky." },
  { slug: "family",       label: "Family Adventures",     heroImage: "types/family-hero.jpg",       description: "Safari experiences designed around children — junior ranger programmes, family-friendly camps and endless wonder." },
  { slug: "gorilla",      label: "Gorilla & Chimp Treks", heroImage: "types/gorilla-hero.jpg",      description: "Come face to face with mountain gorillas in Rwanda and Uganda — one of the most moving wildlife encounters on earth." },
  { slug: "conservation", label: "Conservation Travel",   heroImage: "types/conservation-hero.jpg", description: "Camps and lodges where your visit directly funds anti-poaching, community development and habitat conservation." },
  { slug: "corporate",    label: "Corporate & Groups",    heroImage: "types/corporate-hero.jpg",    description: "Incentive travel and bespoke group experiences for teams who deserve more than a conference room." },
];

// ── HELPER FUNCTIONS ─────────────────────────────────────────
export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find(d => d.slug === slug);
}

export function getExperienceType(slug: string): ExperienceType | undefined {
  return EXPERIENCE_TYPES.find(t => t.slug === slug);
}

export function getDestinationsByGroup(groupId: string): Destination[] {
  return DESTINATIONS.filter(d => d.continentGroup === groupId);
}

export function getFeaturedDestinations(): Destination[] {
  return DESTINATIONS.filter(d => d.featured);
}
