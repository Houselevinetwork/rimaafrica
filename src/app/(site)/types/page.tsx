import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { EXPERIENCE_TYPES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Types of Travel | Safari, Honeymoon, Family & More",
  description: "Discover your perfect journey style — luxury safari, honeymoon, gorilla trekking, family adventure, beach escape, conservation travel or corporate retreat.",
  alternates: { canonical: "https://rimaafrica.com/types" },
};

export default function TypesPage() {
  return (
    <>
      <PageHero
        title="Types of travel"
        bgVideo={heroMedia.types.video}
        bgImage={heroMedia.types.image}
        subtitle="Every journey is different. Choose the style that speaks to you — we will design the rest."
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Types of travel" },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width">
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>HOW WOULD YOU LIKE TO TRAVEL</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "3rem" }}>
            Find your <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>style</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {EXPERIENCE_TYPES.map(type => (
              <Link key={type.slug} href={`/types/${type.slug}`}
                style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  aspectRatio: "4/3",
                  background: `url(${r2Url(type.heroImage)}) center/cover var(--rima-jungle-dark)`,
                  position: "relative", overflow: "hidden", marginBottom: "1rem",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)",
                  }} />
                  <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                    <h3 style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.5rem", fontWeight: 300, color: "white", margin: 0,
                    }}>
                      {type.label}
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--rima-gray)", lineHeight: 1.65 }}>
                  {type.description}
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