export interface WhereToGo {
  name: string;
  description: string;
  image?: string;
}

export interface SeasonalEntry {
  month: string;
  description: string;
  highlight?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  days: number;
  destination: string;
  fromPrice: number;
  image: string;
  summary: string;
  bestFor: string;
  highlights: string[];
  dayByDay: ItineraryDay[];
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  continentGroup: string;
  tagline: string;
  heroImage: string;
  coverImage?: string;
  heroVideo?: string;
  featured: boolean;
  fromPrice?: number;
  currency?: string;
  aboutText: string;
  galleryImages: string[];
  whereToGo: WhereToGo[];
  whereToStay: any[];
  itineraries: Itinerary[];
  seasonalCalendar: SeasonalEntry[];
}

export interface WhyUsItem {
  number: string;
  total: string;
  title: string;
  description: string;
  image: string;
}

export interface ExperienceType {
  slug: string;
  label: string;
  heroImage: string;
  description: string;
}

export interface ContinentGroup {
  id: string;
  label: string;
  image: string;
  destinations: { slug: string; name: string }[];
}