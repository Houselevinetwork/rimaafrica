import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rimaafrica.com"),
  title: {
    default: "Rima Africa Safaris | Luxury Bespoke Safari Experiences",
    template: "%s | Rima Africa Safaris",
  },
  description:
    "Rima Africa Safaris designs bespoke private journeys across East Africa, Southern Africa and the Indian Ocean Islands. Kenya, Tanzania, Rwanda, Uganda, Seychelles, Maldives, Mauritius and Zanzibar.",
  keywords: [
    "Kenya safari","Tanzania safari","Maasai Mara","Serengeti","gorilla trekking",
    "luxury safari","bespoke safari","East Africa","Seychelles","Maldives","Mauritius",
    "Zanzibar","Rwanda gorillas","safari company Kenya","rima africa",
  ],
  authors: [{ name: "Rima Africa Safaris", url: "https://rimaafrica.com" }],
  creator: "Rima Africa Safaris",
  publisher: "Rima Africa Safaris",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://rimaafrica.com",
    siteName: "Rima Africa Safaris",
    locale: "en_KE",
    images: [{ url: "/logo.png", width: 160, height: 160, alt: "Rima Africa Safaris" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rimaafricasafaris",
    creator: "@rimaafricasafaris",
    images: ["/logo.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  alternates: { canonical: "https://rimaafrica.com" },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "Organization"],
  "@id": "https://rimaafrica.com/#organization",
  name: "Rima Africa Safaris",
  alternateName: ["Rima Africa", "Rima Safaris"],
  url: "https://rimaafrica.com",
  logo: {
    "@type": "ImageObject",
    url: "https://rimaafrica.com/logo.png",
    width: 160, height: 160,
  },
  image: "https://rimaafrica.com/logo.png",
  description: "Rima Africa Safaris designs bespoke private journeys across East Africa, Southern Africa and the Indian Ocean Islands. Born in Nairobi, Kenya.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Narok Road",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "safaris@rimaafrica.com",
      telephone: "+254714728554",
      availableLanguage: "English",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rimaafricasafaris",
    "https://wa.me/254714728554",
  ],
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Ethiopia" },
    { "@type": "Country", name: "Seychelles" },
    { "@type": "Country", name: "Maldives" },
    { "@type": "Country", name: "Mauritius" },
    { "@type": "Country", name: "Botswana" },
    { "@type": "Country", name: "South Africa" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rimaafrica.com/#website",
  url: "https://rimaafrica.com",
  name: "Rima Africa Safaris",
  publisher: { "@id": "https://rimaafrica.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://rimaafrica.com/destinations?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}