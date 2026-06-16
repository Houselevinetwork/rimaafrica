"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { heroMedia, continentImages } from "@/lib/media";

const GROUP_CARDS = CONTINENT_GROUPS.map(group => ({
  slug: group.id,
  label: group.label,
  image: continentImages[group.id as keyof typeof continentImages] || "",
  href: `/destinations#${group.id}`,
}));

export default function HeroSection() {
  const [query, setQuery]             = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropStyle, setDropStyle]     = useState<React.CSSProperties>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile]       = useState(true);
  const router    = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);
  const TOTAL = GROUP_CARDS.length;

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── KEY FIX: Close dropdown when user scrolls ──────────────
  useEffect(() => {
    const onScroll = () => {
      if (showDropdown) setShowDropdown(false);
    };
    // Passive listener — no performance hit
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showDropdown]);

  // Calculate fixed position from form rect
  const openDropdown = useCallback(() => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setDropStyle({
        position: "fixed",
        top:   rect.bottom + 2,
        left:  rect.left,
        width: rect.width,
      });
    }
    setShowDropdown(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.push(
      query.trim()
        ? `/destinations?q=${encodeURIComponent(query.trim())}`
        : "/destinations"
    );
  };

  const filteredRegions = GROUP_CARDS.filter(card =>
    query.length === 0 ||
    card.label.toLowerCase().includes(query.toLowerCase())
  );

  const prev = () => setActiveIndex(i => (i - 1 + TOTAL) % TOTAL);
  const next = () => setActiveIndex(i => (i + 1) % TOTAL);
  const visibleCards = Array.from({ length: Math.min(3, TOTAL) }, (_, i) =>
    GROUP_CARDS[(activeIndex + i) % TOTAL]
  );

  const heroVideo = heroMedia.home.video;
  const heroBg    = heroMedia.home.image;

  return (
    <>
      <style>{`
        /* ── Hero sizing ── */
        .rima-hero {
          position: relative;
          min-height: 55dvh;
          display: flex;
          flex-direction: column;
          background: var(--rima-jungle-dark);
          overflow: hidden;
          /* Hero sits in normal flow — sections below stack normally */
          z-index: 0;
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

        /* ── Search form ── */
        .hsearch-form {
          display: flex;
          align-items: stretch;
          background: rgba(255,255,255,0.25);
          border-radius: 3px;
          width: 349px;
          max-width: 90vw;
          overflow: hidden;
        }
        .hsearch-input-area {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
        }
        .hsearch-form input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-family: var(--font-inter), sans-serif;
          font-size: 10.8px;
          font-weight: 400;
          letter-spacing: 2px;
          padding: 10px 0;
          min-width: 0;
        }
        .hsearch-form input::placeholder { color: rgba(255,255,255,0.85); }
        .hsearch-btn {
          background: var(--rima-gold);
          border: none;
          outline: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          flex-shrink: 0;
          transition: background 0.2s;
          min-height: 42px;
        }
        .hsearch-btn:hover { background: #b8954a; }

        /* ── Dropdown — position:fixed, z-index wins over everything ── */
        .hdrop {
          position: fixed;
          z-index: 99999;
          background: white;
          border-top: 3px solid var(--rima-gold);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.04);
          overflow: hidden;
          max-height: 55vh;
          overflow-y: auto;
          /* Smooth appear */
          animation: dropIn 0.18s ease forwards;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdrop::-webkit-scrollbar { width: 3px; }
        .hdrop::-webkit-scrollbar-thumb { background: var(--rima-gold); }

        .hdrop-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid var(--rima-cream-dark);
          text-decoration: none;
          transition: background 0.15s;
          cursor: pointer;
        }
        .hdrop-item:last-child { border-bottom: none; }
        .hdrop-item:hover { background: var(--rima-cream); }
        .hdrop-item:hover .hdrop-region-name { color: var(--rima-gold) !important; }

        /* ── Hero cards ── */
        .hcard {
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
          flex-shrink: 0;
        }
        .hcard img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .hcard:hover img { transform: scale(1.06); }
        .hcard-tint {
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0.12);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .hcard:hover .hcard-tint { opacity: 1; }

        /* ── Arrow / social circles ── */
        .hcircle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid white;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          text-decoration: none;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .hcircle:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      <section className="rima-hero">
        {/* Background video / image */}
        {heroVideo ? (
          <video
            autoPlay loop muted playsInline
            poster={heroBg}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          >
            <source src={heroVideo} type="video/mp4" />
            {heroBg && (
              <img src={heroBg} alt="Rima Africa Safaris — Kenya wildlife safari"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </video>
        ) : heroBg ? (
          <img
            src={heroBg}
            alt="Rima Africa Safaris — Kenya wildlife safari"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
        ) : null}

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(21,21,21,0.30)" }} />

        {/* Centre content */}
        <div style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: isMobile
            ? "2rem 1.25rem 2.5rem"
            : "2rem 10% calc(146.33px + 2.5rem)",
        }}>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
            color: "white",
            lineHeight: 1.36,
            margin: "0 0 37px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.3rem",
          }}>
            <span>Safaris that speak</span>
            <span style={{ position: "relative", display: "inline-block", marginLeft: "0.3rem" }}>
              <em style={{
                fontStyle: "italic",
                fontSize: "clamp(2.6rem, 8.2vw, 5.7rem)",
                color: "var(--rima-gold)",
                lineHeight: 1.31,
              }}>
                Africa
              </em>
              <span style={{
                position: "absolute",
                bottom: "-5px", left: 0,
                width: "100%", height: "2px",
                background: "var(--rima-gold)",
                opacity: 0.7,
                display: "block",
              }} />
            </span>
          </h1>

          {/* Search */}
          <div ref={searchRef} style={{ position: "relative" }}>
            <form ref={formRef} onSubmit={handleSearch} className="hsearch-form">
              <div className="hsearch-input-area">
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); openDropdown(); }}
                  onFocus={openDropdown}
                  placeholder="WHERE WOULD YOU LIKE TO TRAVEL?"
                  aria-label="Search destinations"
                  aria-expanded={showDropdown}
                  aria-haspopup="listbox"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="hsearch-btn" aria-label="Search destinations">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            {/* ── FIXED DROPDOWN — closes on scroll ── */}
            {showDropdown && filteredRegions.length > 0 && (
              <div
                className="hdrop"
                role="listbox"
                aria-label="Destination regions"
                style={dropStyle}
              >
                {filteredRegions.map(card => (
                  <Link
                    key={card.slug}
                    href={card.href}
                    className="hdrop-item"
                    role="option"
                    onClick={() => { setShowDropdown(false); setQuery(""); }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {card.image && (
                        <div style={{
                          width: 38, height: 38,
                          borderRadius: 2, overflow: "hidden",
                          flexShrink: 0, background: "var(--rima-jungle)",
                        }}>
                          <img
                            src={card.image}
                            alt={card.label}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <span
                        className="hdrop-region-name"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontWeight: 300,
                          fontSize: "1.1rem",
                          color: "#151515",
                          transition: "color 0.15s",
                        }}
                      >
                        {card.label}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.58rem",
                      color: "var(--rima-gold)",
                      letterSpacing: "0.1em",
                      flexShrink: 0,
                    }}>
                      EXPLORE →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop bottom cards bar ── */}
        {!isMobile && (
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            zIndex: 3,
            height: "146.33px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0 2rem",
          }}>
            {/* Left arrows */}
            <div style={{
              display: "flex", gap: "7.5px",
              alignItems: "center", alignSelf: "center",
              marginRight: "1.5rem",
            }}>
              <button onClick={prev} aria-label="Previous region" className="hcircle" style={{ opacity: 0.35 }}>
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M17 7.5H3M10 1L3 7.5L10 14"/>
                </svg>
              </button>
              <button onClick={next} aria-label="Next region" className="hcircle" style={{ opacity: 1 }}>
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 7.5h14M10 1l7 6.5L10 14"/>
                </svg>
              </button>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {visibleCards.map((card, i) => (
                <Link
                  key={`${card.slug}-${i}`}
                  href={card.href}
                  className="hcard"
                  aria-label={`Explore ${card.label}`}
                  style={{
                    width: "146.33px",
                    height: "146.33px",
                    marginRight: i < visibleCards.length - 1 ? "30px" : "0",
                  }}
                >
                  {card.image
                    ? <img src={card.image} alt={`${card.label} safari destination`} />
                    : <div style={{ position: "absolute", inset: 0, background: "var(--rima-jungle)" }} />
                  }
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
                  }} />
                  <div className="hcard-tint" />
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

            {/* Social icons */}
            <div style={{
              display: "flex", gap: "7.5px",
              alignItems: "center", alignSelf: "center",
              marginLeft: "1.5rem",
            }}>
              <a
                href="https://web.facebook.com/rimaafricasafaris"
                target="_blank" rel="noopener noreferrer"
                className="hcircle"
                aria-label="Follow Rima Africa Safaris on Facebook"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rima_africa_safaris/"
                target="_blank" rel="noopener noreferrer"
                className="hcircle"
                aria-label="Follow Rima Africa Safaris on Instagram"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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