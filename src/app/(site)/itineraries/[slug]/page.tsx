import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ITINERARIES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import ItinerarySchema from "@/components/seo/ItinerarySchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export async function generateStaticParams() {
  return ITINERARIES.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const it = ITINERARIES.find(i => i.slug === slug);
  if (!it) return {};
  return {
    title: `${it.title} | ${it.days}-Day ${it.destination} Safari`,
    description: it.summary,
    alternates: { canonical: `https://rimaafrica.com/itineraries/${slug}` },
  };
}

export default async function ItinerarySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const it = ITINERARIES.find(i => i.slug === slug);
  if (!it) notFound();

  return (
    <>
      <ItinerarySchema
        slug={it.slug} title={it.title} description={it.summary}
        days={it.days} fromPrice={it.fromPrice}
        image={r2Url(it.image)} destination={it.destination}
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Itineraries", url: "https://rimaafrica.com/itineraries" },
        { name: it.title, url: `https://rimaafrica.com/itineraries/${slug}` },
      ]} />

      <PageHero
        title={it.title}
        subtitle={it.summary}
        bgImage={R2 ? `${R2}/${it.image}` : ""}
        overlayOpacity={0.5}
        meta={`${it.days} DAYS`}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: it.destination },
          { label: it.title },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start" }}
          className="flex-col-on-mobile content-width">

          {/* Day-by-day */}
          <div>
            <p className="eyebrow mb-6" style={{ color: "var(--rima-gold)" }}>THE JOURNEY</p>
            {it.dayByDay.map(day => (
              <div key={day.day} style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem" }}>
                <div style={{ flexShrink: 0, width: "48px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--rima-cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--rima-earth)", letterSpacing: "0.05em" }}>D{day.day}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-light mb-2" style={{ fontSize: "1.2rem", color: "var(--rima-dark)" }}>{day.title}</h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "var(--rima-gray)" }}>{day.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div style={{ border: "1px solid var(--rima-cream-dark)", padding: "1.75rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>FROM</p>
              <p className="font-serif" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--rima-dark)" }}>
                USD {it.fromPrice.toLocaleString()}
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--rima-gray)", marginBottom: "1.5rem" }}>per person</p>
              <Link href="/plan" style={{ display: "block", background: "var(--rima-gold)", color: "white", padding: "0.85rem", fontSize: "0.7rem", letterSpacing: "0.14em", fontWeight: 500, textDecoration: "none", textAlign: "center", marginBottom: "0.75rem" }}>
                BOOK THIS JOURNEY →
              </Link>
              <Link href="/contact" style={{ display: "block", border: "1px solid var(--rima-cream-dark)", color: "var(--rima-dark)", padding: "0.85rem", fontSize: "0.7rem", letterSpacing: "0.14em", textDecoration: "none", textAlign: "center" }}>
                ASK A QUESTION
              </Link>
            </div>

            <div style={{ border: "1px solid var(--rima-cream-dark)", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--rima-earth)", marginBottom: "1rem" }}>HIGHLIGHTS</p>
              {it.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--rima-gold)", marginTop: "0.15rem" }}>✦</span>
                  <p style={{ fontSize: "0.82rem", color: "var(--rima-dark)", lineHeight: 1.6 }}>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}