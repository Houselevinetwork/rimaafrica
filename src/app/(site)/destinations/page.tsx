import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { DESTINATIONS, CONTINENT_GROUPS } from "@/data/destinations";
import { r2Url } from "@/lib/utils";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Safari Destinations | East Africa & Indian Ocean Islands",
  description: "Explore safari destinations across East Africa and the Indian Ocean Islands. Kenya, Tanzania, Rwanda, Uganda, Seychelles, Maldives, Mauritius, Zanzibar and Madagascar.",
  alternates: { canonical: "https://rimaafrica.com/destinations" },
};

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export default function DestinationsPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Destinations", url: "https://rimaafrica.com/destinations" },
      ]} />

      {/* Full viewport hero — identical treatment to /types */}
      <PageHero
        title="Where do you"
        titleEm="want to go?"
        bgImage={R2 ? `${R2}/ui/destinations-hero.jpg` : ""}
        overlayOpacity={0.50}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Destinations" },
        ]}
      />

      {/* Continent groups + destination cards */}
      {CONTINENT_GROUPS.map(group => (
        <section key={group.id} id={group.id} className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-2" style={{ color: "var(--rima-gold)" }}>REGION</p>
            <h2 className="font-serif font-light mb-10"
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
              {group.label}
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}>
              {group.destinations.map(d => {
                const dest = DESTINATIONS.find(x => x.slug === d.slug);
                if (!dest) return null;
                return (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}`}
                    style={{
                      display: "block", textDecoration: "none",
                      border: "1px solid var(--rima-cream-dark)",
                      transition: "border-color 0.25s",
                    }}
                    className="dest-card"
                  >
                    <div style={{
                      aspectRatio: "16/9",
                      backgroundImage: `url(${r2Url(dest.heroImage)})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      background: "var(--rima-jungle-dark)",
                      overflow: "hidden",
                    }} />
                    <div style={{ padding: "1.25rem 1rem" }}>
                      <h3 className="font-serif font-light mb-1"
                        style={{ fontSize: "1.3rem", color: "var(--rima-dark)" }}>
                        {dest.name}
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "var(--rima-gray)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                        {dest.tagline}
                      </p>
                      {dest.fromPrice && (
                        <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--rima-gold)", letterSpacing: "0.08em" }}>
                          From USD {dest.fromPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <style>{`
        .dest-card:hover { border-color: var(--rima-gold) !important; }
      `}</style>

      <WhatsAppFloat />
    </>
  );
}