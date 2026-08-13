/**
 * RIMA AFRICA — R2 Media Map
 * Base URL set via NEXT_PUBLIC_R2_URL environment variable.
 *
 * Setup:
 *   R2 → rima-africa-media → Settings → Public Bucket URL
 *   Add to .env.local: NEXT_PUBLIC_R2_URL=https://pub-XXXX.r2.dev
 *   Add same to Cloudflare Pages environment variables
 */

const BASE = process.env.NEXT_PUBLIC_R2_URL || "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

function r2(filename: string): string {
  if (!BASE) return "";
  return `${BASE}/${filename}`;
}

// ─────────────────────────────────────────────────────────────
// FILES IN rima-africa-media BUCKET — Kenya, Uganda, Tanzania, Rwanda only
// ─────────────────────────────────────────────────────────────

export const R2 = {
  // ── Kenya ──
  kenyaVideo:             r2("kenyavideo.mp4"),
  kenyaPhoto:             r2("kenyaphoto.jpg"),

  // ── Tanzania — Ngorongoro Crater ──
  ngorongoroPhoto:        r2("ngorongorocrater.jpg"),

  // ── Rwanda — Golden Monkey ──
  goldenMonkeyPhoto:      r2("goldenmonkey.jpg"),

  // ── Uganda ──
  gorillaPhoto:           r2("gorillaphoto.jpg"),

  // ── Landscape / Editorial ──
  landscapePhoto:         r2("henning-borgersen-4Uxu8wnjYOY-unsplash.jpg"),
};

// ─────────────────────────────────────────────────────────────
// PAGE HERO ASSIGNMENTS
// ─────────────────────────────────────────────────────────────

export const heroMedia = {
  home: {
    video: R2.kenyaVideo,
    image: R2.kenyaPhoto,
  },
  destinations: {
    video: "",
    image: R2.ngorongoroPhoto,
  },
  types: {
    video: "",
    image: R2.goldenMonkeyPhoto,
  },
  itineraries: {
    video: R2.kenyaVideo,
    image: R2.kenyaPhoto,
  },
  inspirations: {
    video: "",
    image: R2.gorillaPhoto,
  },
  blog: {
    video: "",
    image: R2.landscapePhoto,
  },
  contact: {
    video: "",
    image: R2.kenyaPhoto,
  },
  about: {
    video: R2.kenyaVideo,
    image: R2.kenyaPhoto,
  },
  plan: {
    video: "",
    image: R2.goldenMonkeyPhoto,
  },
};

// ─────────────────────────────────────────────────────────────
// DESTINATION-SPECIFIC HERO MEDIA
// ─────────────────────────────────────────────────────────────

export const destinationMedia: Record<string, {
  video: string;
  heroImage: string;
  coverImage: string;
}> = {
  kenya: {
    video:      R2.kenyaVideo,
    heroImage:  R2.kenyaPhoto,
    coverImage: R2.kenyaPhoto,
  },
  uganda: {
    video:      "",
    heroImage:  R2.gorillaPhoto,
    coverImage: R2.gorillaPhoto,
  },
  tanzania: {
    video:      "",
    heroImage:  R2.ngorongoroPhoto,   // Ngorongoro Crater
    coverImage: R2.ngorongoroPhoto,
  },
  rwanda: {
    video:      "",
    heroImage:  R2.goldenMonkeyPhoto, // Golden Monkey
    coverImage: R2.goldenMonkeyPhoto,
  },
};

// ─────────────────────────────────────────────────────────────
// TYPE-SPECIFIC HERO MEDIA
// ─────────────────────────────────────────────────────────────

export const typeMedia: Record<string, { video: string; image: string }> = {
  safari:       { video: R2.kenyaVideo, image: R2.kenyaPhoto },
  honeymoon:    { video: "",            image: R2.goldenMonkeyPhoto },
  family:       { video: "",            image: R2.ngorongoroPhoto },
  gorilla:      { video: "",            image: R2.goldenMonkeyPhoto },
  conservation: { video: "",            image: R2.gorillaPhoto },
  corporate:    { video: "",            image: R2.kenyaPhoto },
};

// ─────────────────────────────────────────────────────────────
// CONTINENT CARD IMAGES (TravelByContinent + hero bottom cards)
// ─────────────────────────────────────────────────────────────

export const continentImages = {
  "east-africa": R2.kenyaPhoto,
};

// ─────────────────────────────────────────────────────────────
// COVER IMAGES — destination cards on /destinations + TravelByContinent
// ─────────────────────────────────────────────────────────────

export const coverImages: Record<string, string> = {
  kenya:    R2.kenyaPhoto,
  uganda:   R2.gorillaPhoto,
  tanzania: R2.ngorongoroPhoto,   // Ngorongoro Crater
  rwanda:   R2.goldenMonkeyPhoto, // Golden Monkey
};
