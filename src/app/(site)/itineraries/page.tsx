import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { heroMedia } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { DESTINATIONS } from "@/data/destinations";
import { getItinerariesByCountry } from "@/data/itineraries";

export const metadata: Metadata = {
  title: "Safari Itineraries | 40 Sample Journeys by Rima Africa Safaris",
  description: "Browse 40 sample safari itineraries across Kenya, Uganda, Tanzania and Rwanda — Maasai Mara game drives, gorilla and chimpanzee trekking, the Great Migration and more. All journeys are fully bespoke.",
  alternates: { canonical: "https://rimaafrica.com/itineraries" },
};

export default function ItinerariesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Itineraries", url: "https://rimaafrica.com/itineraries" },
      ]} />

      <PageHero
        title="Sample Journeys"
        subtitle="Where would you like to go?"
        bgVideo={heroMedia.itineraries.video}
        bgImage={heroMedia.itineraries.image}
        overlayOpacity={0.48}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries" },
        ]}
      />

      <section className="section-wrapper" style={{ background: "white" }}>
        <div className="content-width">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="eyebrow" style={{ color: "var(--rima-gray)", marginBottom: "1rem", display: "block" }}>
              SAMPLE JOURNEYS
            </span>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: "var(--rima-dark)", lineHeight: 1.2,
            }}>
              Where would you like{" "}
              <em style={{ color: "var(--rima-gold)", fontStyle: "italic" }}>to go?</em>
            </h2>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--rima-gray)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              maxWidth: "480px", margin: "0.85rem auto 0", lineHeight: 1.8,
            }}>
              Every itinerary is a starting point. We will tailor it entirely to you.
            </p>

            {/* Country jump links */}
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
              {DESTINATIONS.map(d => (
                <a key={d.slug} href={`#${d.slug}`} style={{
                  border: "1px solid var(--rima-cream-dark)", color: "var(--rima-gray)",
                  padding: "0.4rem 1.1rem", textDecoration: "none",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em",
                }}>
                  {d.name.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {DESTINATIONS.map(dest => {
            const itineraries = getItinerariesByCountry(dest.name);
            return (
              <div key={dest.slug} id={dest.slug} style={{ marginBottom: "4.5rem", scrollMarginTop: "5rem" }}>
                <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>{dest.name.toUpperCase()}</p>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 300, fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                  color: "var(--rima-dark)", marginBottom: "2rem",
                }}>
                  {dest.tagline}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {itineraries.map(it => (
                    <Link
                      key={it.slug}
                      href={`/itineraries/${it.slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <style>{`
                        .itin-card-${it.slug} { transition: background 0.2s; }
                        .itin-card-${it.slug}:hover { background: var(--rima-cream) !important; }
                        .itin-card-${it.slug}:hover .itin-img-${it.slug} { transform: scale(1.05); }
                        .itin-card-${it.slug}:hover .itin-arrow { opacity: 1 !important; transform: translateX(4px); }
                        .itin-img-${it.slug} { transition: transform 0.55s ease; }
                        .itin-arrow { transition: opacity 0.2s, transform 0.2s; }
                      `}</style>
                      <div
                        className={`itin-card-${it.slug}`}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "280px 1fr",
                          borderBottom: "1px solid var(--rima-cream-dark)",
                          padding: "0",
                          background: "white",
                        }}
                      >
                        {/* Image */}
                        <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "var(--rima-jungle-dark)" }}>
                          <img
                            className={`itin-img-${it.slug}`}
                            src={it.image}
                            alt={it.title}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)" }} />
                        </div>

                        {/* Text */}
                        <div style={{
                          padding: "2rem 2.5rem",
                          display: "flex", flexDirection: "column", justifyContent: "center",
                        }}>
                          <p style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.58rem", fontWeight: 700,
                            letterSpacing: "0.18em", color: "var(--rima-gold)",
                            marginBottom: "0.5rem",
                          }}>
                            {it.days} DAYS · {it.destination.toUpperCase()}
                          </p>
                          <h3 style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontWeight: 300, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                            color: "var(--rima-dark)", lineHeight: 1.2,
                            marginBottom: "0.75rem",
                          }}>
                            {it.title}
                          </h3>
                          <p style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.85rem", color: "var(--rima-gray)",
                            lineHeight: 1.75, fontWeight: 300,
                            maxWidth: "520px", marginBottom: "1.25rem",
                          }}>
                            {it.summary}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p style={{
                              fontFamily: "var(--font-inter), sans-serif",
                              fontSize: "0.85rem", fontWeight: 500,
                              color: "var(--rima-dark)",
                            }}>
                              From USD {it.fromPrice.toLocaleString()}
                            </p>
                            <span className="itin-arrow" style={{
                              fontFamily: "var(--font-inter), sans-serif",
                              fontSize: "0.62rem", color: "var(--rima-gold)",
                              letterSpacing: "0.1em", opacity: 0.5,
                            }}>
                              VIEW JOURNEY →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "1rem", padding: "3rem", background: "var(--rima-cream)" }}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300, fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "var(--rima-dark)", marginBottom: "0.5rem",
            }}>
              Don't see your dream journey?
            </p>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, fontSize: "0.88rem",
              color: "var(--rima-gray)", marginBottom: "1.5rem", lineHeight: 1.75,
            }}>
              Every journey we design is bespoke. Tell us where you want to go.
            </p>
            <Link href="/plan" style={{
              background: "var(--rima-gold)", color: "white",
              padding: "0.85rem 2rem", textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em",
            }}>
              PLAN YOUR JOURNEY →
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}
