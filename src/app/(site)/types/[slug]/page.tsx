import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { EXPERIENCE_TYPES, ITINERARIES } from "@/data/destinations";
import { typeMedia, coverImages } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export async function generateStaticParams() {
  return EXPERIENCE_TYPES.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const type = EXPERIENCE_TYPES.find(t => t.slug === slug);
  if (!type) return {};
  return {
    title: `${type.label} | Types of Travel`,
    description: type.description,
    openGraph: { images: [{ url: typeMedia[slug]?.image || "" }] },
    alternates: { canonical: `https://rimaafrica.com/types/${slug}` },
  };
}

export default async function TypeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const type = EXPERIENCE_TYPES.find(t => t.slug === slug);
  if (!type) notFound();

  const media = typeMedia[slug] || { video: "", image: "" };
  const related = ITINERARIES.slice(0, 3);

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Types of Travel", url: "https://rimaafrica.com/types" },
        { name: type.label, url: `https://rimaafrica.com/types/${slug}` },
      ]} />

      <PageHero
        title={type.label}
        titleEm="Tailored to you"
        bgVideo={media.video}
        bgImage={media.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Types of Travel", href: "/types" },
          { label: type.label },
        ]}
      />

      <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
        <div className="content-width" style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>THE EXPERIENCE</p>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.3rem,2.5vw,1.7rem)",
            fontWeight: 300, lineHeight: 1.65,
            color: "var(--rima-dark)", fontStyle: "italic", marginBottom: "2rem",
          }}>
            {type.description}
          </p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "var(--rima-gray)", marginBottom: "2.5rem" }}>
            Our specialists have spent years curating the finest experiences in this category —
            selecting only the camps, lodges and guides that deliver something genuinely extraordinary.
          </p>
          {/* Hero image inline */}
          {media.image && (
            <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "2.5rem" }}>
              <img src={media.image} alt={type.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/plan" className="btn-primary">BEGIN YOUR JOURNEY →</Link>
            <Link href="/contact" className="btn-outline">SPEAK TO A SPECIALIST</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>CURATED JOURNEYS</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "2rem" }}>
              Handpicked for <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>{type.label.toLowerCase()}</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
              {related.map(it => {
                const img = coverImages[it.destination.toLowerCase().replace(/ /g,"-")] || "";
                return (
                  <Link key={it.slug} href={`/itineraries/${it.slug}`}
                    style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      aspectRatio: "3/2", overflow: "hidden", marginBottom: "1rem",
                      background: img ? `url(${img}) center/cover` : "var(--rima-jungle-dark)",
                    }} />
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                      {it.days} DAYS · {it.destination.toUpperCase()}
                    </p>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)" }}>
                      {it.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <WhatsAppFloat />
    </>
  );
}