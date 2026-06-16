interface Props { name: string; slug: string; description: string; image: string; fromPrice?: number; }
export default function DestinationSchema({ name, slug, description, image, fromPrice }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `https://rimaafrica.com/destinations/${slug}`,
    name,
    description,
    image,
    url: `https://rimaafrica.com/destinations/${slug}`,
    touristType: ["Safari", "Wildlife", "Adventure", "Luxury Travel"],
    ...(fromPrice && {
      offers: {
        "@type": "Offer",
        price: fromPrice,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `https://rimaafrica.com/destinations/${slug}`,
        seller: {
          "@type": "TravelAgency",
          name: "Rima Africa Safaris",
          url: "https://rimaafrica.com",
        },
      },
    }),
    provider: {
      "@type": "TravelAgency",
      "@id": "https://rimaafrica.com/#organization",
      name: "Rima Africa Safaris",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}