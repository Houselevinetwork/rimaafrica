import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { DESTINATIONS, CONTINENT_GROUPS } from "@/data/destinations";
import { heroMedia, coverImages } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Safari Destinations | East Africa & Indian Ocean Islands",
  description: "Explore safari destinations across East Africa and the Indian Ocean Islands. Kenya, Tanzania, Rwanda, Uganda, Seychelles, Maldives, Mauritius and Zanzibar.",
  alternates: { canonical: "https://rimaafrica.com/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Destinations", url: "https://rimaafrica.com/destinations" },
      ]} />

      <PageHero
        title="Where do you"
        titleEm="want to go?"
        bgVideo={heroMedia.destinations.video}
        bgImage={heroMedia.destinations.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Destinations" },
        ]}
      />

      {CONTINENT_GROUPS.map(group => (
        <section key={group.id} id={group.id} className="section-wrapper">
          <div className="content-width">
            <p className="eyebrow mb-2" style={{ color: "var(--rima-gold)" }}>REGION</p>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, marginBottom: "2.5rem" }}>
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
                const img = coverImages[d.slug] || "";
                return (
                  <Link key={d.slug} href={`/destinations/${d.slug}`}
                    style={{
                      display: "block", textDecoration: "none",
                      border: "1px solid var(--rima-cream-dark)",
                      transition: "border-color 0.25s",
                    }}
                    className="dest-card">
                    {/* Real photo — no more placeholder */}
                    <div style={{
                      aspectRatio: "16/9",
                      background: img
                        ? `url(${img}) center/cover`
                        : "var(--rima-jungle-dark)",
                    }} />
                    <div style={{ padding: "1.25rem 1rem" }}>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 300, color: "var(--rima-dark)", marginBottom: "0.35rem" }}>
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
      <style>{`.dest-card:hover { border-color: var(--rima-gold) !important; }`}</style>
      <WhatsAppFloat />
    </>
  );
}