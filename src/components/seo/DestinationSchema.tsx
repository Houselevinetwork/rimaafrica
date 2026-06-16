interface Props {
  name: string; slug: string; description: string;
  image: string; fromPrice?: number;
}

export default function DestinationSchema({ name, slug, description, image, fromPrice }: Props) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `https://rimaafrica.com/destinations/${slug}`,
    name,
    description,
    url: `https://rimaafrica.com/destinations/${slug}`,
    image,
    touristType: "SafariTourist",
    includesAttraction: [],
  };
  if (fromPrice) {
    schema.offers = {
      "@type": "Offer",
      price: fromPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://rimaafrica.com/destinations/${slug}`,
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}