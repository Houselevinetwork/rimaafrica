/**
 * RIMA AFRICA — Complete R2 Media Map
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
// ALL FILES IN rima-africa-media BUCKET
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

  // ── Ethiopia ──
  ethiopiaVideo:          r2("ethiopiaherovideo.mp4"),
  ethiopiaPhoto:          r2("ethipiaphoto.jpg"),

  // ── Zanzibar ──
  zanzibarHeroPhoto:      r2("zanzibarherophoto.jpg"),
  zanzibarDestPhoto:      r2("zanzibardestinationpage.jpg"),
  zanzibarLandingPhoto:   r2("zanzibarlandingpage.jpg"),

  // ── Madagascar ──
  madagascarVideo:        r2("madagascarherovideo.mp4"),
  madagascarHeroPhoto:    r2("madagascarherophoto.jpg"),
  madagascarLandingPhoto: r2("madagascarlandingpagephoto.jpg"),

  // ── Mauritius ──
  mauritiusVideo:         r2("mauritiusherovideo.mp4"),
  mauritiusHeroPhoto:     r2("mauritiusherophoto.jpg"),
  mauritiusDestPhoto:     r2("mauritiusdestinationpagephoto.jpg"),
  mauritiusLandingPhoto:  r2("mauritiusphotolandingpage.jpg"),

  // ── Seychelles ──
  seychellesVideo:        r2("seychelesherovideo.mp4"),
  seychellesHeroPhoto:    r2("seychelesherophoto.jpg"),
  seychellesLandingPhoto: r2("seychelesphotolandingpage.jpg"),
  seychellesDestPhoto:    r2("seychelesvideodestinationpage.jpg"),

  // ── Maldives ──
  maldivesVideo:          r2("maldivesvideo.mp4"),
  maldivesHeroPhoto:      r2("maldivesherophoto.jpg"),
  maldivesDestPhoto:      r2("maldivesdestinationpagephoto.jpg"),
  maldivesLandingPhoto:   r2("maldivesphotolandingpage.jpg"),

  // ── Botswana ──
  botswanaVideo:          r2("botswanaherovideo.mp4"),
  botswanaPhoto:          r2("botswanaphoto.jpg"),

  // ── Zambia Safari ──
  zambiaSafariPhoto:      r2("zambiasafari.jpg"),

  // ── Zimbabwe ──
  zimbabweHeroPhoto:      r2("Zimbabweherophoto.jpg"),

  // ── Namibia ──
  namibiaVideo:           r2("Namibiaherovideo.mp4"),
  namibiaPhoto:           r2("Namibiaphoto.jpg"),

  // ── South Africa — Kruger ──
  southAfricaVideo:       r2("southafricaherovideo.mp4"),
  southAfricaHeroPhoto:   r2("krugerherophoto.jpg"),
  southAfricaDestPhoto:   r2("krugerdestinationpagephoto.jpg"),

  // ── Landscape / Editorial ──
  landscapePhoto:         r2("henning-borgersen-4Uxu8wnjYOY-unsplash.jpg"),
};

// ─────────────────────────────────────────────────────────────
// PAGE HERO ASSIGNMENTS
// ─────────────────────────────────────────────────────────────

export const heroMedia = {
  home: {
    video:    R2.kenyaVideo,
    image:    R2.kenyaPhoto,
    videoAlt: R2.maldivesVideo,
  },
  destinations: {
    video: R2.seychellesVideo,
    image: R2.seychellesHeroPhoto,
  },
  types: {
    video: R2.mauritiusVideo,
    image: R2.mauritiusHeroPhoto,
  },
  itineraries: {
    video: R2.botswanaVideo,
    image: R2.botswanaPhoto,
  },
  inspirations: {
    video: R2.madagascarVideo,
    image: R2.madagascarHeroPhoto,
  },
  blog: {
    video: "",
    image: R2.landscapePhoto,
  },
  contact: {
    video: "",
    image: R2.zanzibarHeroPhoto,
  },
  about: {
    video: R2.kenyaVideo,
    image: R2.kenyaPhoto,
  },
  plan: {
    video: R2.namibiaVideo,
    image: R2.namibiaPhoto,
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
  ethiopia: {
    video:      R2.ethiopiaVideo,
    heroImage:  R2.ethiopiaPhoto,
    coverImage: R2.ethiopiaPhoto,
  },
  zanzibar: {
    video:      "",
    heroImage:  R2.zanzibarHeroPhoto,
    coverImage: R2.zanzibarLandingPhoto,
  },
  madagascar: {
    video:      R2.madagascarVideo,
    heroImage:  R2.madagascarHeroPhoto,
    coverImage: R2.madagascarLandingPhoto,
  },
  mauritius: {
    video:      R2.mauritiusVideo,
    heroImage:  R2.mauritiusHeroPhoto,
    coverImage: R2.mauritiusLandingPhoto,
  },
  seychelles: {
    video:      R2.seychellesVideo,
    heroImage:  R2.seychellesHeroPhoto,
    coverImage: R2.seychellesLandingPhoto,
  },
  maldives: {
    video:      R2.maldivesVideo,
    heroImage:  R2.maldivesHeroPhoto,
    coverImage: R2.maldivesLandingPhoto,
  },
  botswana: {
    video:      R2.botswanaVideo,
    heroImage:  R2.botswanaPhoto,
    coverImage: R2.botswanaPhoto,
  },
  zambia: {
    video:      "",
    heroImage:  R2.zambiaSafariPhoto,  // Zambia Safari
    coverImage: R2.zambiaSafariPhoto,
  },
  zimbabwe: {
    video:      "",
    heroImage:  R2.zimbabweHeroPhoto,
    coverImage: R2.zimbabweHeroPhoto,
  },
  namibia: {
    video:      R2.namibiaVideo,
    heroImage:  R2.namibiaPhoto,
    coverImage: R2.namibiaPhoto,
  },
  "south-africa": {
    video:      R2.southAfricaVideo,
    heroImage:  R2.southAfricaHeroPhoto,
    coverImage: R2.southAfricaDestPhoto,
  },
};

// ─────────────────────────────────────────────────────────────
// TYPE-SPECIFIC HERO MEDIA
// ─────────────────────────────────────────────────────────────

export const typeMedia: Record<string, { video: string; image: string }> = {
  safari:       { video: R2.kenyaVideo,      image: R2.kenyaPhoto },
  honeymoon:    { video: R2.seychellesVideo, image: R2.seychellesHeroPhoto },
  family:       { video: R2.botswanaVideo,   image: R2.botswanaPhoto },
  beach:        { video: R2.maldivesVideo,   image: R2.maldivesHeroPhoto },
  gorilla:      { video: "",                 image: R2.goldenMonkeyPhoto },
  conservation: { video: R2.namibiaVideo,    image: R2.namibiaPhoto },
  corporate:    { video: R2.mauritiusVideo,  image: R2.mauritiusHeroPhoto },
};

// ─────────────────────────────────────────────────────────────
// CONTINENT CARD IMAGES (TravelByContinent + hero bottom cards)
// ─────────────────────────────────────────────────────────────

export const continentImages = {
  "east-africa":     R2.kenyaPhoto,
  "indian-ocean":    R2.seychellesHeroPhoto,
  "southern-africa": R2.botswanaPhoto,
};

// ─────────────────────────────────────────────────────────────
// COVER IMAGES — destination cards on /destinations + TravelByContinent
// ─────────────────────────────────────────────────────────────

export const coverImages: Record<string, string> = {
  // East Africa
  kenya:          R2.kenyaPhoto,
  uganda:         R2.gorillaPhoto,
  tanzania:       R2.ngorongoroPhoto,    // Ngorongoro Crater ✓
  rwanda:         R2.goldenMonkeyPhoto,  // Golden Monkey ✓
  ethiopia:       R2.ethiopiaPhoto,

  // Indian Ocean Islands
  zanzibar:       R2.zanzibarLandingPhoto,
  madagascar:     R2.madagascarLandingPhoto,
  mauritius:      R2.mauritiusLandingPhoto,
  seychelles:     R2.seychellesLandingPhoto,
  maldives:       R2.maldivesLandingPhoto,

  // Central & Southern Africa
  botswana:       R2.botswanaPhoto,
  zambia:         R2.zambiaSafariPhoto,  // Zambia Safari ✓
  zimbabwe:       R2.zimbabweHeroPhoto,
  namibia:        R2.namibiaPhoto,
  "south-africa": R2.southAfricaDestPhoto,
};