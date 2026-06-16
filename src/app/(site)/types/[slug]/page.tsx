import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { EXPERIENCE_TYPES, ITINERARIES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

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
    alternates: { canonical: `https://rimaafrica.com/types/${slug}` },
  };
}

export default async function TypeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const type = EXPERIENCE_TYPES.find(t => t.slug === slug);
  if (!type) notFound();

  const related = ITINERARIES.slice(0, 3);
  const bgImage = R2 ? `${R2}/${type.heroImage}` : "";

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Types of Travel", url: "https://rimaafrica.com/types" },
        { name: type.label, url: `https://rimaafrica.com/types/${slug}` },
      ]} />

      {/* Full hero — no subtitle, no country strip */}
      <PageHero
        title={type.label}
        titleEm="Tailored to you"
        bgImage={bgImage}
        overlayOpacity={0.45}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Types of Travel", href: "/types" },
          { label: type.label },
        ]}
      />

      {/* Description */}
      <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
        <div className="content-width" style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>THE EXPERIENCE</p>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem,2.5vw,1.7rem)",
            fontWeight: 300, lineHeight: 1.65, color: "var(--rima-dark)", marginBottom: "2.5rem",
            fontStyle: "italic",
          }}>
            {type.description}
          </p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "var(--rima-gray)", marginBottom: "2.5rem" }}>
            Our specialists have spent years curating the finest experiences in this category,
            selecting only the camps, lodges and guides that deliver something genuinely extraordinary.
            Nothing on our list is there by accident.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/plan" className="btn-primary">BEGIN YOUR JOURNEY →</Link>
            <Link href="/contact" className="btn-outline">SPEAK TO A SPECIALIST</Link>
          </div>
        </div>
      </section>

      {/* Related itineraries */}
      {related.length > 0 && (
        <section className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>CURATED JOURNEYS</p>
            <h2 className="font-serif font-light mb-10" style={{ fontSize: "2rem" }}>
              Handpicked for <em>{type.label.toLowerCase()}</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
              {related.map(it => (
                <Link key={it.slug} href={`/itineraries/${it.slug}`}
                  style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    aspectRatio: "3/2", overflow: "hidden",
                    backgroundImage: `url(${r2Url(it.image)})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    background: "var(--rima-jungle-dark)", marginBottom: "1rem",
                  }} />
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                    {it.days} DAYS · {it.destination.toUpperCase()}
                  </p>
                  <h3 className="font-serif font-light" style={{ fontSize: "1.2rem", color: "var(--rima-dark)" }}>
                    {it.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppFloat />
    </>
  );
}