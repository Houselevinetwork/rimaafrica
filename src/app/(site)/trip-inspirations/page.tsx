import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ITINERARIES } from "@/data/destinations";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Journey Ideas | Safari Inspiration from Rima Africa",
  description: "Let the landscape choose for you. Browse safari ideas across East Africa, the Indian Ocean and Southern Africa, then make it yours.",
  alternates: { canonical: "https://rimaafrica.com/trip-inspirations" },
};

export default function TripInspirationsPage() {
  return (
    <>
      <PageHero
        title="Let the landscape"
        titleEm="choose for you."
        bgVideo={heroMedia.inspirations.video}
        bgImage={heroMedia.inspirations.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journey Ideas" },
        ]}
      />
      <section className="section-wrapper">
        <div className="content-width">
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>JOURNEY IDEAS</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "3rem" }}>
            Somewhere to <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>begin</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {ITINERARIES.map(it => (
              <Link key={it.slug} href={`/itineraries/${it.slug}`}
                style={{ display: "block", textDecoration: "none" }}>
                <div style={{ aspectRatio: "4/3", background: "var(--rima-jungle-dark)", marginBottom: "1rem" }} />
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.35rem" }}>
                  {it.days} DAYS · {it.destination.toUpperCase()}
                </p>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)", marginBottom: "0.3rem" }}>
                  {it.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--rima-gray)", lineHeight: 1.65 }}>
                  {it.bestFor}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppFloat />
    </>
  );
}