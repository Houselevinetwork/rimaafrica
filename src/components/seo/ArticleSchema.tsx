interface Props {
  slug: string; title: string; description: string;
  datePublished: string; image?: string;
}

export default function ArticleSchema({ slug, title, description, datePublished, image }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://rimaafrica.com/blog/${slug}`,
    headline: title,
    description,
    url: `https://rimaafrica.com/blog/${slug}`,
    datePublished,
    dateModified: datePublished,
    image: image || "https://rimaafrica.com/images/og/og-default.jpg",
    author: {
      "@type": "Organization",
      "@id": "https://rimaafrica.com/#organization",
      name: "Rima Africa Safaris",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://rimaafrica.com/#organization",
      name: "Rima Africa Safaris",
      logo: { "@type": "ImageObject", url: "https://rimaafrica.com/logo.png" },
    },
    isPartOf: {
      "@type": "Blog",
      name: "The Rima Africa Journal",
      url: "https://rimaafrica.com/blog",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}