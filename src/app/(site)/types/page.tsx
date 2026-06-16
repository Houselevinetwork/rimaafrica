import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { EXPERIENCE_TYPES } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export const metadata: Metadata = {
  title: "Types of Travel | Safari, Honeymoon, Family & More",
  description: "Discover our curated travel styles — luxury safari, honeymoon, family adventures, beach escapes, corporate retreats and sustainable travel across Africa and the Indian Ocean.",
  alternates: { canonical: "https://rimaafrica.com/types" },
};

export default function TypesPage() {
  return (
    <>
      <PageHero
        title="Types of travel"
        subtitle="Every journey is different. Choose the style that speaks to you — we will design the rest."
        bgImage={R2 ? `${R2}/ui/types-hero.jpg` : ""}
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Types of travel" },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {EXPERIENCE_TYPES.map(type => (
              <Link
                key={type.slug}
                href={`/types/${type.slug}`}
                style={{ display: "block", textDecoration: "none", group: true } as any}
                className="group"
              >
                <div style={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  background: "var(--rima-jungle-dark)",
                  backgroundImage: `url(${r2Url(type.heroImage)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "1.25rem",
                  transition: "transform 0.5s ease",
                }} />
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.35rem" }}>
                  TYPES OF TRAVEL
                </p>
                <h3 className="font-serif font-light mb-2" style={{ fontSize: "1.4rem", color: "var(--rima-dark)" }}>
                  {type.label}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--rima-gray)", lineHeight: 1.7 }}>
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