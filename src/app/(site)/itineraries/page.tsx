import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { heroMedia } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Safari Itineraries | Sample Journeys by Rima Africa Safaris",
  description: "Browse our sample safari itineraries — Kenya Maasai Mara, Rwanda gorilla trekking, Botswana Okavango, Seychelles island hopping and South Africa. All journeys are fully bespoke.",
  alternates: { canonical: "https://rimaafrica.com/itineraries" },
};

const R2 = "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

const ITINERARIES = [
  {
    slug:        "maasai-mara-classic-7",
    title:       "Classic Maasai Mara Safari",
    days:        7,
    destination: "KENYA",
    fromPrice:   5200,
    summary:     "Seven days in the Maasai Mara — the world's greatest wildlife reserve — with game drives at dawn and dusk, night drives, and a private tented camp on the river.",
    image:       `${R2}/kenyaphoto.jpg`,
    video:       `${R2}/kenyavideo.mp4`,
  },
  {
    slug:        "gorilla-trek-rwanda-5",
    title:       "Rwanda Gorilla Trek",
    days:        5,
    destination: "RWANDA",
    fromPrice:   6800,
    summary:     "Five extraordinary days in Rwanda — gorilla trekking in Volcanoes National Park, golden monkey tracking and the shores of Lake Kivu.",
    image:       `${R2}/goldenmonkey.jpg`,
    video:       "",
  },
  {
    slug:        "okavango-fly-in-8",
    title:       "Okavango Delta Fly-In Safari",
    days:        8,
    destination: "BOTSWANA",
    fromPrice:   9500,
    summary:     "Eight days of pure Botswana — mokoro canoes through papyrus channels, game drives across the Moremi, wild dogs and elephant herds.",
    image:       `${R2}/botswanaphoto.jpg`,
    video:       `${R2}/botswanaherovideo.mp4`,
  },
  {
    slug:        "seychelles-island-hopping-10",
    title:       "Seychelles Island Hopping",
    days:        10,
    destination: "SEYCHELLES",
    fromPrice:   8500,
    summary:     "Ten days across Mahé, Praslin and La Digue — granite beaches, the Valle de Mai, giant tortoises and the clearest water on earth.",
    image:       `${R2}/seychelesherophoto.jpg`,
    video:       `${R2}/seychelesherovideo.mp4`,
  },
  {
    slug:        "south-africa-classic-9",
    title:       "South Africa Classic",
    days:        9,
    destination: "SOUTH AFRICA",
    fromPrice:   5800,
    summary:     "Nine days combining a private game reserve Big Five safari with Cape Town — one of the world's great cities — and the Winelands.",
    image:       `${R2}/krugerherophoto.jpg`,
    video:       `${R2}/southafricaherovideo.mp4`,
  },
];

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
          </div>

          {/* Itinerary cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {ITINERARIES.map((it, idx) => (
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
                      {it.days} DAYS · {it.destination}
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

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "4rem", padding: "3rem", background: "var(--rima-cream)" }}>
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