interface Props {
  slug: string; title: string; description: string;
  days: number; fromPrice: number; image: string; destination: string;
}

export default function ItinerarySchema({ slug, title, description, days, fromPrice, image, destination }: Props) {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `https://rimaafrica.com/itineraries/${slug}`,
    name: title,
    description,
    url: `https://rimaafrica.com/itineraries/${slug}`,
    image,
    touristType: "SafariTourist",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: days,
      name: `${days}-day ${destination} itinerary`,
    },
    provider: {
      "@type": "TravelAgency",
      "@id": "https://rimaafrica.com/#organization",
      name: "Rima Africa Safaris",
    },
    offers: {
      "@type": "Offer",
      price: fromPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      url: `https://rimaafrica.com/itineraries/${slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}