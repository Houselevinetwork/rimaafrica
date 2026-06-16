interface Props { title: string; description: string; url: string; image?: string; datePublished: string; dateModified?: string; }
export default function ArticleSchema({ title, description, url, image, datePublished, dateModified }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    ...(image && { image: { "@type": "ImageObject", url: image } }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Rima Africa Safaris",
      url: "https://rimaafrica.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://rimaafrica.com/#organization",
      name: "Rima Africa Safaris",
      logo: { "@type": "ImageObject", url: "https://rimaafrica.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}