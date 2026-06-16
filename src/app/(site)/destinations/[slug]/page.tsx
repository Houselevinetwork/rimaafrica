import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { DESTINATIONS, ITINERARIES, getDestination } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import DestinationSchema from "@/components/seo/DestinationSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DESTINATIONS.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} Safaris & Tours | ${dest.tagline}`,
    description: dest.aboutText.slice(0, 155),
    alternates: { canonical: `https://rimaafrica.com/destinations/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const relatedItineraries = ITINERARIES.filter(
    i => i.destination.toLowerCase() === dest.name.toLowerCase()
  );

  return (
    <>
      <DestinationSchema
        name={dest.name} slug={dest.slug}
        description={dest.aboutText}
        image={R2 ? `${R2}/${dest.heroImage}` : ""}
        fromPrice={dest.fromPrice}
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Destinations", url: "https://rimaafrica.com/destinations" },
        { name: dest.name, url: `https://rimaafrica.com/destinations/${slug}` },
      ]} />

      <PageHero
        title={dest.name}
        subtitle={dest.tagline}
        bgImage={R2 ? `${R2}/${dest.heroImage}` : ""}
        overlayOpacity={0.48}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: dest.name },
        ]}
      />

      {/* About */}
      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>
            {dest.region.toUpperCase()}
          </p>
          <h2 className="font-serif font-light mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
            About <em>{dest.name}</em>
          </h2>
          <p style={{ fontSize: "clamp(0.9rem,1.5vw,1rem)", lineHeight: 1.85, color: "var(--rima-gray)" }}>
            {dest.aboutText}
          </p>

          {dest.fromPrice && (
            <div style={{
              display: "flex", gap: "1rem", alignItems: "center",
              marginTop: "2rem", flexWrap: "wrap",
            }}>
              <Link href="/plan" className="btn-primary">
                PLAN A JOURNEY →
              </Link>
              <Link href="/contact" className="btn-outline">
                SPEAK TO A SPECIALIST
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Seasonal calendar */}
      {dest.seasonalCalendar && dest.seasonalCalendar.length > 0 && (
        <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>BEST TIME TO VISIT</p>
            <h2 className="font-serif font-light mb-8" style={{ fontSize: "2rem" }}>
              Seasonal <em>calendar</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
              {dest.seasonalCalendar.map((entry, i) => (
                <div key={i} style={{
                  padding: "1.5rem",
                  borderLeft: "2px solid var(--rima-gold)",
                  background: "white",
                }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>
                    {entry.month.toUpperCase()}
                  </p>
                  {entry.highlight && (
                    <p className="font-serif font-light mb-2" style={{ fontSize: "1.1rem", color: "var(--rima-dark)" }}>
                      {entry.highlight}
                    </p>
                  )}
                  <p style={{ fontSize: "0.82rem", color: "var(--rima-gray)", lineHeight: 1.7 }}>
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related itineraries */}
      {relatedItineraries.length > 0 && (
        <section className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>SUGGESTED JOURNEYS</p>
            <h2 className="font-serif font-light mb-8" style={{ fontSize: "2rem" }}>
              {dest.name} <em>itineraries</em>
            </h2>
            <div className="grid-3">
              {relatedItineraries.map(it => (
                <Link key={it.slug} href={`/itineraries/${it.slug}`}
                  style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    aspectRatio: "3/2", overflow: "hidden",
                    backgroundImage: `url(${r2Url(it.image)})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    background: "var(--rima-jungle-dark)",
                    marginBottom: "1rem",
                  }} />
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.14em", color: "var(--rima-gold)", marginBottom: "0.35rem" }}>
                    {it.days} DAYS
                  </p>
                  <h3 className="font-serif font-light" style={{ fontSize: "1.15rem", color: "var(--rima-dark)" }}>
                    {it.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--rima-gray)", lineHeight: 1.65, marginTop: "0.3rem" }}>
                    {it.summary.slice(0, 100)}...
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--rima-gold)", fontWeight: 500, marginTop: "0.5rem" }}>
                    From USD {it.fromPrice.toLocaleString()}
                  </p>
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