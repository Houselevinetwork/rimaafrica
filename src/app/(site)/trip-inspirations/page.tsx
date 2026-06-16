import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { DESTINATIONS, ITINERARIES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export const metadata: Metadata = {
  title: "Safari Journey Inspirations | Trip Ideas",
  description: "Get inspired by our curated safari itineraries. Browse journey ideas by destination across Africa and the Indian Ocean Islands.",
  alternates: { canonical: "https://rimaafrica.com/trip-inspirations" },
};

export default function TripInspirationsPage() {
  return (
    <>
      <PageHero
        title="Safari"
        titleEm="inspirations"
        subtitle="Get inspired by our curated itineraries. Every journey is a starting point — none of them are fixed."
        bgImage={R2 ? `${R2}/ui/inspirations-hero.jpg` : ""}
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journey Inspirations" },
        ]}
        badge="JOURNEY IDEAS"
      />

      {/* Destination circles — like Tatis */}
      <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
        <div className="content-width">
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {DESTINATIONS.map(dest => {
              const count = ITINERARIES.filter(i => i.destination.toLowerCase() === dest.name.toLowerCase()).length || 5;
              return (
                <a key={dest.slug} href={`#${dest.slug}`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textDecoration: "none", cursor: "pointer" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    backgroundImage: `url(${r2Url(dest.heroImage)})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    background: "var(--rima-jungle-dark)",
                  }} />
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--rima-dark)" }}>
                    {dest.name.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "0.6rem", color: "var(--rima-gray)" }}>{count} journeys</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Itineraries by destination */}
      {DESTINATIONS.map(dest => {
        const its = ITINERARIES.filter(i => i.destination.toLowerCase() === dest.name.toLowerCase());
        if (its.length === 0) return null;
        return (
          <section key={dest.slug} id={dest.slug} className="section-wrapper">
            <div className="content-width">
              <p className="eyebrow mb-3" style={{ color: "var(--rima-gold)" }}>{dest.region?.toUpperCase()}</p>
              <h2 className="font-serif font-light mb-8" style={{ fontSize: "2rem" }}>
                {dest.name} <em>journeys</em>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.75rem" }}>
                {its.map(it => (
                  <Link key={it.slug} href={`/itineraries/${it.slug}`}
                    style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      aspectRatio: "3/2", overflow: "hidden",
                      backgroundImage: `url(${r2Url(it.image)})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      background: "var(--rima-jungle-dark)",
                      marginBottom: "1rem",
                    }} />
                    <p style={{ fontSize: "0.58rem", letterSpacing: "0.14em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                      {it.days} DAYS
                    </p>
                    <h3 className="font-serif font-light" style={{ fontSize: "1.1rem", color: "var(--rima-dark)" }}>
                      {it.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <WhatsAppFloat />
    </>
  );
}