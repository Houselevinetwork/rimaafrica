"use client";

import Link from "next/link";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { continentImages, coverImages } from "@/lib/media";

export default function TravelByContinent() {
  return (
    <section style={{ background: "white", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "3px", color: "#666666",
            textTransform: "uppercase", marginBottom: "1.4rem",
          }}>
            WHERE DO YOU WANT TO GO
          </p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", flexWrap: "wrap", gap: "0.4rem" }}>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 300,
              color: "#151515", lineHeight: 1.4,
            }}>
              Fourteen landscapes.
            </span>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 300,
              fontStyle: "italic", color: "var(--rima-gold)", lineHeight: 1.41,
              textDecoration: "underline", textDecorationColor: "var(--rima-gold)",
              textUnderlineOffset: "4px",
            }}>
              One conversation.
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontStyle: "italic", fontWeight: 300,
            color: "#666666", fontSize: "clamp(0.82rem, 1.5vw, 0.92rem)",
            maxWidth: "600px", margin: "1.4rem auto 0", lineHeight: 1.78,
          }}>
            Every destination we offer is one our team has visited, slept in, and returned from —
            often more than once. Choose where you want to go. We will handle everything else.
          </p>
        </div>

        {/* Three region rows */}
        {CONTINENT_GROUPS.map(group => {
          const regionImg = continentImages[group.id as keyof typeof continentImages] || "";
          return (
            <div key={group.id} style={{ marginBottom: "4rem" }}>

              {/* Region header */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: "1.5rem",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 300, color: "#151515", margin: 0,
                }}>
                  {group.label}
                </h3>
                <Link href={`/destinations#${group.id}`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.14em", color: "var(--rima-gold)",
                    textDecoration: "none", border: "1px solid var(--rima-gold)",
                    padding: "0.35rem 0.9rem", borderRadius: "999px",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  className="explore-pill">
                  EXPLORE NOW
                </Link>
              </div>

              {/* Country portrait cards */}
              <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "0.5rem", scrollbarWidth: "none" }}
                className="region-card-row">
                {group.destinations.map(dest => {
                  const img = coverImages[dest.slug] || regionImg;
                  return (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      style={{
                        position: "relative",
                        display: "block",
                        flexShrink: 0,
                        width: "clamp(180px, 20vw, 231px)",
                        height: "clamp(230px, 25.6vw, 296px)",
                        overflow: "hidden",
                        textDecoration: "none",
                      }}
                      className="region-card">
                      {/* Real photo — no placeholder */}
                      <img
                        src={img}
                        alt={dest.name}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform 0.55s ease",
                        }}
                      />
                      {/* Flutter gradient */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
                      }} />
                      {/* Label at 71% from top */}
                      <div style={{
                        position: "absolute", top: "71%",
                        left: "5%", right: "5%", textAlign: "center",
                      }}>
                        <p style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontWeight: 300,
                          fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                          color: "white", lineHeight: 1.4, margin: 0,
                        }}>
                          {dest.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <style>{`
          .region-card-row::-webkit-scrollbar { display: none; }
          .region-card img { transition: transform 0.55s ease; }
          .region-card:hover img { transform: scale(1.04); }
          .explore-pill:hover { background: var(--rima-gold) !important; color: white !important; }
        `}</style>

        {/* Quote */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1.5rem", flexWrap: "wrap", marginTop: "2rem",
        }}>
          <div style={{ width: "47px", height: "1px", background: "var(--rima-gold)", flexShrink: 0 }} />
          <div style={{ maxWidth: "360px", textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "#151515", lineHeight: 1.83, margin: "0 0 0.75rem",
            }}>
              &ldquo;Not all those who wander are lost.&rdquo;
            </p>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10.3px", fontWeight: 700,
              letterSpacing: "3px", color: "#666666", margin: 0,
            }}>
              J.R.R. TOLKIEN
            </p>
          </div>
          <div style={{ width: "47px", height: "1px", background: "var(--rima-gold)", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}