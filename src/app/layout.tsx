import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE = "https://rimaafrica.com";
const BRAND = "Rima Africa Safaris";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D4A35",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${BRAND} | Luxury Bespoke Safari Experiences`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Rima Africa Safaris designs bespoke private journeys across East Africa, Southern Africa and the Indian Ocean Islands. Kenya, Tanzania, Rwanda, Uganda, Seychelles, Maldives, Mauritius and Zanzibar. Born in Nairobi.",
  keywords: [
    "Kenya safari","Tanzania safari","Maasai Mara","Serengeti","gorilla trekking Rwanda",
    "gorilla trekking Uganda","luxury safari Africa","bespoke safari","East Africa safari",
    "Seychelles luxury","Maldives safari extension","Mauritius travel","Zanzibar beach",
    "Rwanda safari","Uganda wildlife","safari company Kenya","Botswana Okavango",
    "Namibia dunes","South Africa Kruger","rima africa safaris","safari nairobi",
    "Indian Ocean islands","family safari Africa","honeymoon safari","conservation safari",
  ],
  authors: [{ name: BRAND, url: SITE }],
  creator: BRAND,
  publisher: BRAND,
  category: "Travel",
  classification: "Travel Agency, Safari Operator",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "160x160" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "160x160" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: BRAND,
    locale: "en_KE",
    title: `${BRAND} | Luxury Bespoke Safari Experiences`,
    description: "Bespoke private journeys across East Africa and the Indian Ocean Islands. Designed by specialists who have been there.",
    images: [{
      url: "/og-image.jpg",
      width: 1200, height: 630,
      alt: "Rima Africa Safaris — Luxury Bespoke Safari Experiences",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rimaafricasafaris",
    creator: "@rimaafricasafaris",
    title: `${BRAND} | Luxury Bespoke Safari Experiences`,
    description: "Bespoke private journeys across East Africa and the Indian Ocean Islands.",
    images: [{ url: "/og-image.jpg", alt: "Rima Africa Safaris" }],
  },
  alternates: { canonical: SITE },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  other: {
    "geo.region": "KE",
    "geo.placename": "Nairobi",
    "geo.position": "-1.286389;36.817223",
    "ICBM": "-1.286389, 36.817223",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "Organization"],
  "@id": `${SITE}/#organization`,
  name: BRAND,
  alternateName: ["Rima Africa", "Rima Safaris"],
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo.png`,
    width: 160, height: 160,
  },
  image: `${SITE}/og-image.jpg`,
  description: "Rima Africa Safaris designs bespoke private journeys across East Africa, Southern Africa and the Indian Ocean Islands. Born in Nairobi, Kenya.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Narok Road",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
    postalCode: "00100",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.286389,
    longitude: 36.817223,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "safaris@rimaafrica.com",
      telephone: "+254714728554",
      availableLanguage: ["English", "Swahili"],
      contactOption: "TollFree",
      areaServed: "Worldwide",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rima_africa_safaris/",
    "https://www.facebook.com/rimaafricasafaris",
    "https://www.tiktok.com/@rimasafaris",
    "https://www.linkedin.com/in/rima-africa-safaris-42537b32b",
    "https://wa.me/254714728554",
  ],
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Ethiopia" },
    { "@type": "Country", name: "Botswana" },
    { "@type": "Country", name: "Namibia" },
    { "@type": "Country", name: "South Africa" },
    { "@type": "Country", name: "Zimbabwe" },
    { "@type": "Country", name: "Zambia" },
    { "@type": "Country", name: "Seychelles" },
    { "@type": "Country", name: "Maldives" },
    { "@type": "Country", name: "Mauritius" },
    { "@type": "Country", name: "Madagascar" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bespoke Safari Journeys",
    itemListElement: [
      { "@type": "OfferCatalog", name: "East Africa Safaris" },
      { "@type": "OfferCatalog", name: "Indian Ocean Islands" },
      { "@type": "OfferCatalog", name: "Central & Southern Africa Safaris" },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "12",
    reviewCount: "12",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: BRAND,
  description: "Luxury bespoke safari experiences across Africa and the Indian Ocean Islands.",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en-KE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/destinations?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}