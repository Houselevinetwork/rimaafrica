import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ITINERARIES } from "@/data/destinations";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Safari Itineraries | Curated African Journeys",
  description: "Handpicked itineraries across East Africa, Southern Africa and the Indian Ocean Islands. Each journey begins with a conversation.",
  alternates: { canonical: "https://rimaafrica.com/itineraries" },
};

export default function ItinerariesPage() {
  return (
    <>
      <PageHero
        title="Curated journeys"
        titleEm="across Africa"
        bgVideo={heroMedia.itineraries.video}
        bgImage={heroMedia.itineraries.image}
        overlayOpacity={0.45}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries" },
        ]}
      />
      <section className="section-wrapper">
        <div className="content-width">
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>SAMPLE JOURNEYS</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "3rem" }}>
            Where would you like to <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>go?</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {ITINERARIES.map(it => (
              <Link key={it.slug} href={`/itineraries/${it.slug}`}
                style={{ display: "block", textDecoration: "none", border: "1px solid var(--rima-cream-dark)" }}
                className="it-card">
                <div style={{ aspectRatio: "16/9", background: "var(--rima-jungle-dark)" }} />
                <div style={{ padding: "1.25rem 1rem" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                    {it.days} DAYS · {it.destination.toUpperCase()}
                  </p>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)", marginBottom: "0.4rem" }}>{it.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--rima-gray)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {it.summary.slice(0, 100)}...
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--rima-gold)", fontWeight: 500 }}>
                    From USD {it.fromPrice.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <style>{`.it-card:hover { border-color: var(--rima-gold) !important; }`}</style>
      <WhatsAppFloat />
    </>
  );
}