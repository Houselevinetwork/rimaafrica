// ─────────────────────────────────────────────────────────────
// RIMA AFRICA SAFARIS — Global Type Definitions
// ─────────────────────────────────────────────────────────────

// ── Destination types ─────────────────────────────────────────

export interface SeasonEntry {
  month: string;
  description: string;
  highlight?: string;
}

export interface DestinationRef {
  slug: string;
  name: string;
}

export interface ContinentGroup {
  id: string;
  label: string;
  image: string;
  destinations: DestinationRef[];
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  continentGroup: string;
  tagline: string;
  heroImage: string;
  coverImage: string;
  featured: boolean;
  fromPrice: number;
  currency: string;
  aboutText: string;
  galleryImages: string[];
  whereToGo: string[];
  whereToStay: string[];
  itineraries: string[];
  seasonalCalendar: SeasonEntry[];
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

export interface ExperienceType {
  slug: string;
  label: string;
  heroImage: string;
  description: string;
}

// ── Plan Wizard / Enquiry types ───────────────────────────────
// These match the actual field names used in PlanWizard.tsx

export type BudgetTier =
  | "essential"
  | "mid-range"
  | "luxury"
  | "ultra-luxury"
  | "open";

export interface InquiryPayload {
  // Step 1 — When
  arrivalDate?: string;
  durationNights?: string;
  duration?: string;
  datesApproximate?: boolean;
  travelMonth?: string;
  travelYear?: string;
  flexibility?: "exact" | "flexible" | "open";

  // Step 2 — Where
  destinations?: string[];
  continentGroups?: string[];

  // Step 3 — Who
  adults?: number;
  children?: number;
  childAges?: string;
  specialOccasion?: string;
  firstTimeSafari?: boolean;

  // Step 4 — Experience
  experienceTypes?: string[];
  tripType?: string;
  budget?: BudgetTier;
  budgetTier?: BudgetTier;
  accommodationStyle?: string;
  otherNotes?: string;

  // Step 5 — Contact
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  hearAboutUs?: string;
  additionalNotes?: string;
  preferredContact?: string[];
  message?: string;
}

// ── Newsletter ────────────────────────────────────────────────

export interface NewsletterSignup {
  email: string;
  source?: string;
}

// ── Contact form ──────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  destination?: string;
  dates?: string;
  travellers?: string;
  message?: string;
}

// ── Blog ─────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  datePublished: string;
  category: string;
  excerpt: string;
  body: string;
  image?: string;
  author?: string;
}

// ── SEO ──────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SchemaCrumb {
  name: string;
  url: string;
}