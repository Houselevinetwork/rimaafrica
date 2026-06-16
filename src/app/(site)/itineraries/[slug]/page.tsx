export const runtime = 'edge';

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ITINERARIES, getItinerary } from "@/data/destinations";
import { destinationMedia } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ITINERARIES.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const it = getItinerary(slug);
  if (!it) return {};
  return {
    title: `${it.title} | ${it.days}-Day ${it.destination} Safari`,
    description: it.summary.slice(0, 155),
    alternates: { canonical: `https://rimaafrica.com/itineraries/${slug}` },
  };
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params;
  const it = getItinerary(slug);
  if (!it) notFound();

  const destSlug = it.destination.toLowerCase().replace(/ /g, "-");
  const media = destinationMedia[destSlug] ?? { video: "", heroImage: "", coverImage: "" };

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Itineraries", url: "https://rimaafrica.com/itineraries" },
        { name: it.title, url: `https://rimaafrica.com/itineraries/${slug}` },
      ]} />

      <PageHero
        title={it.title}
        bgVideo={media.video}
        bgImage={media.heroImage}
        overlayOpacity={0.48}
        badge={`${it.days} days · ${it.destination}`}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: it.title },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "820px", margin: "0 auto" }}>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}>
            {[
              { label: "DURATION",    value: `${it.days} days` },
              { label: "DESTINATION", value: it.destination },
              { label: "FROM",        value: `USD ${it.fromPrice.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{
                padding: "1.25rem",
                background: "var(--rima-cream)",
                borderLeft: "2px solid var(--rima-gold)",
              }}>
                <p style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.2em",
                  color: "var(--rima-gold)",
                  marginBottom: "0.4rem",
                }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--rima-dark)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <p style={{
            fontSize: "0.9rem",
            lineHeight: 1.9,
            color: "var(--rima-gray)",
            marginBottom: "2rem",
            fontWeight: 300,
          }}>
            {it.summary}
          </p>

          <p style={{
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            color: "var(--rima-gold)",
            marginBottom: "0.75rem",
          }}>
            BEST FOR
          </p>
          <p style={{
            fontSize: "0.85rem",
            color: "var(--rima-gray)",
            marginBottom: "2.5rem",
            fontWeight: 300,
          }}>
            {it.bestFor}
          </p>

          {/* Highlights */}
          <h2 style={{ fontSize: "1.6rem", fontWeight: 300, marginBottom: "1.25rem" }}>
            Journey{" "}
            <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>highlights</em>
          </h2>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 3rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}>
            {it.highlights.map((h, i) => (
              <li key={i} style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                fontSize: "0.88rem",
                color: "var(--rima-gray)",
                lineHeight: 1.65,
                fontWeight: 300,
              }}>
                <span style={{ color: "var(--rima-gold)", flexShrink: 0, marginTop: "3px" }}>
                  —
                </span>
                {h}
              </li>
            ))}
          </ul>

          {/* Day by day */}
          <h2 style={{ fontSize: "1.6rem", fontWeight: 300, marginBottom: "1.5rem" }}>
            Day by{" "}
            <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>day</em>
          </h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}>
            {it.dayByDay.map(d => (
              <div key={d.day} style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}>
                <div style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  background: "var(--rima-jungle-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "var(--rima-gold)",
                    letterSpacing: "0.05em",
                  }}>
                    {d.day}
                  </span>
                </div>
                <div>
                  <p style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "var(--rima-dark)",
                    marginBottom: "0.2rem",
                  }}>
                    {d.title}
                  </p>
                  <p style={{
                    fontSize: "0.82rem",
                    color: "var(--rima-gray)",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}>
                    {d.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/plan" style={{
              background: "var(--rima-gold)",
              color: "white",
              padding: "0.85rem 1.5rem",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}>
              ENQUIRE ABOUT THIS JOURNEY →
            </Link>
            <Link href="/itineraries" style={{
              border: "1px solid var(--rima-cream-dark)",
              color: "var(--rima-gray)",
              padding: "0.85rem 1.5rem",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.68rem",
              fontWeight: 300,
              letterSpacing: "0.06em",
            }}>
              ← All Itineraries
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}