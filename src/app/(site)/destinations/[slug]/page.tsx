export const runtime = 'edge';

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { DESTINATIONS, ITINERARIES, getDestination } from "@/data/destinations";
import { destinationMedia, coverImages } from "@/lib/media";
import DestinationSchema from "@/components/seo/DestinationSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DESTINATIONS.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} Safaris | ${dest.tagline}`,
    description: dest.aboutText.slice(0, 155),
    openGraph: {
      images: [{ url: destinationMedia[slug]?.heroImage || "" }],
    },
    alternates: { canonical: `https://rimaafrica.com/destinations/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const media = destinationMedia[slug] || { video: "", heroImage: "", coverImage: "" };
  const related = ITINERARIES.filter(
    i => i.destination.toLowerCase() === dest.name.toLowerCase()
  );

  return (
    <>
      <DestinationSchema
        name={dest.name} slug={dest.slug}
        description={dest.aboutText}
        image={media.heroImage}
        fromPrice={dest.fromPrice}
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Destinations", url: "https://rimaafrica.com/destinations" },
        { name: dest.name, url: `https://rimaafrica.com/destinations/${slug}` },
      ]} />

      {/* Full viewport hero — video + photo */}
      <PageHero
        title={dest.name}
        subtitle={dest.tagline}
        bgVideo={media.video}
        bgImage={media.heroImage}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: dest.name },
        ]}
      />

      {/* About */}
      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>
            {dest.region.toUpperCase()}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
            About <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>{dest.name}</em>
          </h2>
          <p style={{ fontSize: "clamp(0.9rem,1.5vw,1rem)", lineHeight: 1.9, color: "var(--rima-gray)", marginBottom: "2rem" }}>
            {dest.aboutText}
          </p>

          {/* Destination photo — real image */}
          {media.heroImage && (
            <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "2rem", position: "relative" }}>
              <img
                src={media.heroImage}
                alt={dest.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/plan" className="btn-primary">PLAN A JOURNEY →</Link>
            <Link href="/contact" className="btn-outline">SPEAK TO A SPECIALIST</Link>
          </div>
        </div>
      </section>

      {/* Seasonal calendar */}
      {dest.seasonalCalendar && dest.seasonalCalendar.length > 0 && (
        <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>BEST TIME TO VISIT</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "2rem" }}>
              Seasonal <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>calendar</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
              {dest.seasonalCalendar.map((entry, i) => (
                <div key={i} style={{ padding: "1.5rem", borderLeft: "2px solid var(--rima-gold)", background: "white" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>
                    {entry.month.toUpperCase()}
                  </p>
                  {entry.highlight && (
                    <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "var(--rima-dark)", marginBottom: "0.4rem" }}>
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
      {related.length > 0 && (
        <section className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>SUGGESTED JOURNEYS</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "2rem" }}>
              {dest.name} <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>itineraries</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
              {related.map(it => {
                const itCover = coverImages[it.destination.toLowerCase().replace(/ /g, "-")] || "";
                return (
                  <Link key={it.slug} href={`/itineraries/${it.slug}`}
                    style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      aspectRatio: "3/2", overflow: "hidden", marginBottom: "1rem",
                      background: itCover
                        ? `url(${itCover}) center/cover`
                        : "var(--rima-jungle-dark)",
                    }} />
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                      {it.days} DAYS
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