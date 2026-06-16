"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { r2Url } from "@/lib/utils";

const GROUP_CARDS = CONTINENT_GROUPS.map(group => ({
  slug: group.id,
  label: group.label,
  image: group.image,
  href: `/destinations#${group.id}`,
}));

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const TOTAL = GROUP_CARDS.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/destinations?q=${encodeURIComponent(query.trim())}`);
  };

  // Filter regions by query (just 3 region names)
  const filteredRegions = GROUP_CARDS.filter(card =>
    query.length === 0 ||
    card.label.toLowerCase().includes(query.toLowerCase())
  );

  const prev = () => setActiveIndex(i => (i - 1 + TOTAL) % TOTAL);
  const next = () => setActiveIndex(i => (i + 1) % TOTAL);

  // 3 visible cards
  const visibleCards = Array.from({ length: Math.min(3, TOTAL) }, (_, i) =>
    GROUP_CARDS[(activeIndex + i) % TOTAL]
  );

  const R2_URL = process.env.NEXT_PUBLIC_R2_URL || "";
  const heroVideo = R2_URL ? `${R2_URL}/videos/hero/main-hero.mp4` : "";
  const heroBg = "https://placehold.co/1440x900/1E3326/F6F4F0?text=+";

  // Total width of 3 cards: 3 × 146.33 + 2 × 30 (gaps between) = 498.99px
  // Plus arrows 30px + 7.5gap + 30px = 67.5px each side
  // Cards centred: use flexbox justify-center on the bottom bar

  return (
    <>
      <style>{`
        .rima-hero {
          position: relative;
          min-height: 55dvh;
          display: flex; flex-direction: column;
          background: var(--rima-jungle-dark);
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .rima-hero { min-height: calc(100dvh - var(--nav-h, 64px)); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .rima-hero { min-height: 60dvh; }
        }
        @supports not (min-height: 100dvh) {
          .rima-hero { min-height: 55vh; }
          @media (min-width: 1024px) {
            .rima-hero { min-height: calc(100vh - var(--nav-h, 64px)); }
          }
        }

        /* Search bar */
        .hsearch-form {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.25);
          border-radius: 3px;
          padding: 6px 15px; gap: 10px;
          width: 349px; max-width: 90vw;
        }
        .hsearch-form input {
          flex: 1; background: transparent; border: none; outline: none;
          color: white;
          font-family: var(--font-inter), sans-serif;
          font-size: 10.8px; font-weight: 400; letter-spacing: 2px;
        }
        .hsearch-form input::placeholder { color: rgba(255,255,255,0.9); }

        /* Dropdown — regions only */
        .hdrop {
          position: absolute; top: 100%; left: 0; right: 0;
          background: white;
          border-top: 2px solid var(--rima-gold);
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          z-index: 20;
          border-radius: 0 0 3px 3px;
          overflow: hidden;
        }
        .hdrop-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--rima-cream-dark);
          text-decoration: none; transition: background 0.15s;
          cursor: pointer;
        }
        .hdrop-item:last-child { border-bottom: none; }
        .hdrop-item:hover { background: var(--rima-cream); }
        .hdrop-region-name {
          fontFamily: var(--font-cormorant), Georgia, serif;
          font-size: 1.05rem; font-weight: 300; color: #151515;
        }
        .hdrop-region-count {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.58rem; color: var(--rima-gold);
          letter-spacing: 0.1em;
        }

        /* Card hover */
        .hcard { position: relative; overflow: hidden; text-decoration: none; display: block; }
        .hcard img { transition: transform 0.5s ease; width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
        .hcard:hover img { transform: scale(1.06); }
        .hcard-tint { position: absolute; inset: 0; background: rgba(201,168,76,0.12); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .hcard:hover .hcard-tint { opacity: 1; }

        /* Arrow + social circles */
        .hcircle {
          width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid white;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; text-decoration: none;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
      `}</style>

      <section className="rima-hero">

        {/* Background */}
        {heroVideo ? (
          <video autoPlay loop muted playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src={heroVideo} type="video/mp4" />
            <img src={heroBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </video>
        ) : (
          <img src={heroBg} alt="Rima Africa Safaris"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        )}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(21,21,21,0.25)" }} />

        {/* Centre content */}
        <div style={{
          position: "relative", zIndex: 2, flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: isMobile ? "2rem 1.25rem 2.5rem" : "2rem 10% calc(146.33px + 2.5rem)",
        }}>
          {/* Headline */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            flexWrap: "wrap", gap: "0.3rem", marginBottom: "37px",
          }}>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              color: "white", lineHeight: 1.36,
            }}>
              Safaris that speak
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300, fontStyle: "italic",
                fontSize: "clamp(2.6rem, 8.2vw, 5.7rem)",
                color: "var(--rima-gold)", lineHeight: 1.31,
              }}>
                Africa
              </span>
              <span style={{
                position: "absolute", bottom: "-5px", left: 0,
                width: "100%", height: "2px",
                background: "var(--rima-gold)", opacity: 0.7, display: "block",
              }} />
            </span>
          </div>

          {/* Search */}
          <div ref={searchRef} style={{ position: "relative" }}>
            <form onSubmit={handleSearch} className="hsearch-form">
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                placeholder="WHERE WOULD YOU LIKE TO TRAVEL?"
              />
              <button type="submit" style={{
                background: "none", border: "none", lineHeight: 0,
                cursor: "pointer", color: "white", padding: 0, flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>

            {/* Dropdown — 3 REGIONS ONLY */}
            {showDropdown && (
              <div className="hdrop">
                {filteredRegions.map(card => (
                  <Link
                    key={card.slug}
                    href={card.href}
                    className="hdrop-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontWeight: 300, fontSize: "1.1rem", color: "#151515",
                    }}>
                      {card.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.58rem", color: "var(--rima-gold)", letterSpacing: "0.1em",
                    }}>
                      EXPLORE →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop bottom bar: [arrows] [CENTRED CARDS] [socials] ── */}
        {!isMobile && (
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            zIndex: 3,
            height: "146.33px",
            display: "flex",
            alignItems: "flex-start",  /* cards sit at top of this bar */
            justifyContent: "center",  /* CENTRE everything */
            padding: "0 2rem",
          }}>

            {/* Left arrows — vertically centred in card height */}
            <div style={{
              display: "flex", gap: "7.5px", alignItems: "center",
              alignSelf: "center",
              marginRight: "1.5rem",
            }}>
              {/* ← dim */}
              <button onClick={prev} aria-label="Previous"
                className="hcircle" style={{ opacity: 0.35 }}>
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M17 7.5H3M10 1L3 7.5L10 14"/>
                </svg>
              </button>
              {/* → bright */}
              <button onClick={next} aria-label="Next"
                className="hcircle" style={{ opacity: 1 }}>
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 7.5h14M10 1l7 6.5L10 14"/>
                </svg>
              </button>
            </div>

            {/* 3 CARDS — centred */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {visibleCards.map((card, i) => (
                <Link
                  key={`${card.slug}-${i}`}
                  href={card.href}
                  className="hcard"
                  style={{
                    width: "146.33px",
                    height: "146.33px",
                    marginRight: i < visibleCards.length - 1 ? "30px" : "0",
                  }}
                >
                  <img
                    src={r2Url(card.image)}
                    alt={card.label}
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/146x146/2D4A35/F6F4F0?text=${encodeURIComponent(card.label.split(" ")[0])}`;
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
                  }} />
                  <div className="hcard-tint" />
                  {/* Label: Flutter left:7.31 top:121.08 width:131.69 */}
                  <div style={{
                    position: "absolute",
                    left: "7.31px", top: "121.08px",
                    width: "131.69px",
                    textAlign: "center",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 700, fontSize: "9.9px",
                      color: "white", lineHeight: 1.34,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase", margin: 0,
                    }}>
                      {card.label.toUpperCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right socials — vertically centred */}
            <div style={{
              display: "flex", gap: "7.5px", alignItems: "center",
              alignSelf: "center",
              marginLeft: "1.5rem",
            }}>
              <a href="https://web.facebook.com/rimaafricasafaris"
                target="_blank" rel="noopener noreferrer"
                className="hcircle" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/rima_africa_safaris/"
                target="_blank" rel="noopener noreferrer"
                className="hcircle" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}