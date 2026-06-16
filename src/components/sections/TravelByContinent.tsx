"use client";

import Link from "next/link";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { r2Url } from "@/lib/utils";

/*
  FLUTTER SPEC (exact):
  - Card: 231.38 × 295.88px (portrait ~3:4 ratio)
  - Background image fills 100%
  - Gradient: LinearGradient(bottom→top, black 75% → transparent 0%)
  - Label: positioned left:11.57 top:~211px
    → Cormorant Garamond, fontWeight w300, ~25px, white, centred
  - Desktop: 4 cards per row (grid), gap ~24px
  - Mobile: single column, full width, 460px tall (from previous spec)

  RIMA LAYOUT:
  Row 1: East Africa — 5 country cards (Kenya, Uganda, Tanzania, Rwanda, Ethiopia)
  Row 2: Indian Ocean Islands — 5 cards
  Row 3: Central & Southern Africa — 5 cards
  Each row has a region label above it
*/

const CARD_ASPECT = 295.88 / 231.38; // ~1.279 (portrait)

export default function TravelByContinent() {
  return (
    <section style={{ background: "white", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section heading — exact Tatis typography */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#666666",
            textTransform: "uppercase",
            marginBottom: "1.4rem",
          }}>
            WHERE DO YOU WANT TO GO
          </p>

          {/* "Fourteen landscapes." + italic gold "One conversation." */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", flexWrap: "wrap", gap: "0.4rem" }}>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 300,
              color: "#151515",
              lineHeight: 1.4,
            }}>
              Fourteen landscapes.
            </span>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--rima-gold)",
              lineHeight: 1.41,
              textDecoration: "underline",
              textDecorationColor: "var(--rima-gold)",
              textUnderlineOffset: "4px",
            }}>
              One conversation.
            </span>
          </div>

          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(0.82rem, 1.5vw, 0.92rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "660px",
            margin: "1.4rem auto 0",
            lineHeight: 1.78,
            textAlign: "center",
          }}>
            Every destination we offer is one our team has visited, slept in, and returned from —
            often more than once. Choose where you want to go. We will handle everything else.
          </p>
        </div>

        {/* ── THREE REGION ROWS ── */}
        {CONTINENT_GROUPS.map(group => (
          <div key={group.id} style={{ marginBottom: "4rem" }}>

            {/* Region label row */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}>
              <h3 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                fontWeight: 300,
                color: "#151515",
                margin: 0,
              }}>
                {group.label}
              </h3>
              <Link href={`/destinations#${group.id}`}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--rima-gold)",
                  textDecoration: "none",
                  border: "1px solid var(--rima-gold)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "999px",
                  transition: "background 0.2s, color 0.2s",
                }}
                className="explore-pill"
              >
                EXPLORE NOW
              </Link>
            </div>

            {/*
              FLUTTER CARD GRID:
              Desktop: 4 columns, card width ~231px, height ~296px
              The 5 country cards scroll horizontally — same as Tatis
              On desktop we show them in a scrollable row (overflow-x auto)
              so all 5 are accessible, matching the Flutter horizontal layout
            */}
            <div style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              /* Hide scrollbar */
              scrollbarWidth: "none",
            }}
              className="region-card-row"
            >
              {group.destinations.map(dest => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  style={{
                    /* Flutter: 231.38 × 295.88px */
                    position: "relative",
                    display: "block",
                    flexShrink: 0,
                    width: "clamp(180px, 20vw, 231px)",
                    height: "clamp(230px, 25.6vw, 296px)",
                    overflow: "hidden",
                    textDecoration: "none",
                  }}
                  className="region-card"
                >
                  {/* Background image */}
                  <img
                    src={r2Url(`destinations/${dest.slug}/cover.jpg`)}
                    alt={dest.name}
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/231x296/2D4A35/F6F4F0?text=${encodeURIComponent(dest.name)}`;
                    }}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.55s ease",
                    }}
                  />

                  {/* Gradient — Flutter exact: bottom 75% black → top transparent */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
                  }} />

                  {/*
                    Label — Flutter: left:11.57 top:211.78 (in 295px card = ~72% from top)
                    fontFamily Inter, fontWeight w300, fontSize 25px, white, centred
                    NOTE: Flutter uses Inter but our brand is Cormorant for labels
                    — we use Cormorant to maintain Rima identity
                  */}
                  <div style={{
                    position: "absolute",
                    /* Matches Flutter: top ~211px in 296px card */
                    top: "71%",
                    left: "5%", right: "5%",
                    textAlign: "center",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontWeight: 300,
                      fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                      color: "white",
                      lineHeight: 1.4,
                      margin: 0,
                    }}>
                      {dest.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Hover + scrollbar styles */}
        <style>{`
          .region-card-row::-webkit-scrollbar { display: none; }
          .region-card img { transition: transform 0.55s ease; }
          .region-card:hover img { transform: scale(1.04); }
          .explore-pill:hover {
            background: var(--rima-gold) !important;
            color: white !important;
          }
        `}</style>

        {/* Quote — Tolkien, matches Flutter quote block */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1.5rem", flexWrap: "wrap", marginTop: "2rem",
        }}>
          <div style={{ width: "47px", height: "1px", background: "var(--rima-gold)", flexShrink: 0 }} />
          <div style={{ maxWidth: "360px", textAlign: "center" }}>
            {/* Flutter: quote icon above, then text, then attribution */}
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "#151515",
              lineHeight: 1.83,
              margin: "0 0 0.75rem",
            }}>
              &ldquo;Not all those who wander are lost.&rdquo;
            </p>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10.3px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#666666",
              margin: 0,
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