import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ITINERARIES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export const metadata: Metadata = {
  title: "Safari Itineraries | All Destinations",
  description: "Browse 50 handcrafted safari itineraries across Kenya, Tanzania, Rwanda, Uganda, Seychelles, Maldives, Mauritius, Zanzibar and Southern Africa.",
  alternates: { canonical: "https://rimaafrica.com/itineraries" },
};

export default function ItinerariesPage() {
  return (
    <>
      <PageHero
        title="Safari"
        titleEm="itineraries"
        subtitle="50 handcrafted journeys across Africa and the Indian Ocean Islands. Every one is a starting point — none are fixed."
        bgImage={R2 ? `${R2}/ui/itineraries-hero.jpg` : ""}
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries" },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {ITINERARIES.map(it => (
              <Link key={it.slug} href={`/itineraries/${it.slug}`}
                style={{ display: "block", textDecoration: "none", border: "1px solid var(--rima-cream-dark)", transition: "border-color 0.2s" }}
                className="hover:border-rima-gold">
                <div style={{
                  aspectRatio: "3/2", overflow: "hidden",
                  backgroundImage: `url(${r2Url(it.image)})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  background: "var(--rima-jungle-dark)",
                }} />
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.4rem" }}>
                    {it.days} DAYS · {it.destination.toUpperCase()}
                  </p>
                  <h3 className="font-serif font-light mb-2" style={{ fontSize: "1.15rem", color: "var(--rima-dark)" }}>
                    {it.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--rima-gray)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {it.summary}
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

      <WhatsAppFloat />
    </>
  );
}