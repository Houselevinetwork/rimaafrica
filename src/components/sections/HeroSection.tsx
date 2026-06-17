"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { continentImages } from "@/lib/media";

const R2 = "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

// Video crossfade sequence — Kenya → Seychelles → Botswana
const SEQ = [
  { video: `${R2}/kenyavideo.mp4`,         photo: `${R2}/kenyaphoto.jpg`,         label: "Kenya" },
  { video: `${R2}/seychelesherovideo.mp4`,  photo: `${R2}/seychelesherophoto.jpg`, label: "Seychelles" },
  { video: `${R2}/botswanaherovideo.mp4`,   photo: `${R2}/botswanaphoto.jpg`,      label: "Botswana" },
];

const GROUP_CARDS = CONTINENT_GROUPS.map(g => ({
  slug:  g.id,
  label: g.label,
  image: continentImages[g.id as keyof typeof continentImages] || "",
  href:  `/destinations#${g.id}`,
}));

export default function HeroSection() {
  const [query, setQuery]               = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropStyle, setDropStyle]       = useState<React.CSSProperties>({});
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isMobile, setIsMobile]         = useState(false);
  const [videoReady, setVideoReady]     = useState(false);
  const [seqIndex, setSeqIndex]         = useState(0);
  const [fadeOut, setFadeOut]           = useState(false);
  const [mounted, setMounted]           = useState(false);

  const router    = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const TOTAL     = GROUP_CARDS.length;
  const cur       = SEQ[seqIndex];

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = () => { if (showDropdown) setShowDropdown(false); };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [showDropdown]);

  const advance = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setSeqIndex(i => (i + 1) % SEQ.length);
      setVideoReady(false);
      setFadeOut(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isMobile || !videoReady) return;
    timerRef.current = setTimeout(advance, 10000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [seqIndex, videoReady, isMobile, advance]);

  const openDropdown = useCallback(() => {
    if (formRef.current) {
      const r = formRef.current.getBoundingClientRect();
      setDropStyle({ position: "fixed", top: r.bottom + 2, left: r.left, width: r.width });
    }
    setShowDropdown(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.push(query.trim() ? `/destinations?q=${encodeURIComponent(query.trim())}` : "/destinations");
  };

  const filtered = GROUP_CARDS.filter(c => !query || c.label.toLowerCase().includes(query.toLowerCase()));
  const prev = () => setActiveIndex(i => (i - 1 + TOTAL) % TOTAL);
  const next = () => setActiveIndex(i => (i + 1) % TOTAL);
  const visibleCards = Array.from({ length: Math.min(3, TOTAL) }, (_, i) => GROUP_CARDS[(activeIndex + i) % TOTAL]);

  return (
    <>
      <style>{`
        .rima-hero {
          position: relative; min-height: 55dvh;
          display: flex; flex-direction: column;
          background: var(--rima-jungle-dark); overflow: hidden; z-index: 0;
        }
        @media (min-width: 1024px) { .rima-hero { min-height: calc(100dvh - var(--nav-h,64px)); } }
        @media (min-width: 768px) and (max-width:1023px) { .rima-hero { min-height: 60dvh; } }
        @supports not (min-height:100dvh) {
          .rima-hero { min-height: 55vh; }
          @media (min-width:1024px) { .rima-hero { min-height: calc(100vh - 64px); } }
        }

        /* ── Photo base — always instant ── */
        .h-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; z-index: 0;
        }
        @media (max-width:767px) {
          .h-photo { animation: hZoom 12s ease-in-out infinite alternate; }
        }
        @keyframes hZoom { from { transform:scale(1); } to { transform:scale(1.04); } }

        /* ── Video — fades in on top ── */
        .h-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          z-index: 1; opacity: 0; transition: opacity 1.5s ease;
        }
        .h-video.on  { opacity: 1; }
        .h-video.off { opacity: 0; }

        .h-overlay { position: absolute; inset: 0; z-index: 2; background: rgba(21,21,21,0.32); }

        /* ── Animations ── */
        @keyframes hFadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes hSlideUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes hDrawLine { from { transform:scaleX(0); } to { transform:scaleX(1); } }
        @keyframes hCardIn   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion:reduce) {
          .h-photo { animation:none !important; }
          .ha-title,.ha-em,.ha-search,.ha-c1,.ha-c2,.ha-c3,.h-underline { animation:none !important; opacity:1 !important; transform:none !important; }
        }
        .ha-title  { opacity:0; animation: hFadeUp  0.8s cubic-bezier(0.16,1,0.3,1) 0.1s  forwards; }
        .ha-em     { opacity:0; animation: hFadeUp  0.8s cubic-bezier(0.16,1,0.3,1) 0.32s forwards; }
        .h-underline {
          display:block; height:2px; background:var(--rima-gold); opacity:0.8;
          transform:scaleX(0); transform-origin:left;
          animation: hDrawLine 0.7s cubic-bezier(0.16,1,0.3,1) 0.85s forwards;
        }
        .ha-search { opacity:0; animation: hSlideUp 0.65s ease 0.5s  forwards; }
        .ha-c1     { opacity:0; animation: hCardIn  0.5s ease 0.65s forwards; }
        .ha-c2     { opacity:0; animation: hCardIn  0.5s ease 0.8s  forwards; }
        .ha-c3     { opacity:0; animation: hCardIn  0.5s ease 0.95s forwards; }

        /* ── Dropdown ── */
        .hdrop {
          position: fixed; z-index: 99999; background: white;
          border-top: 3px solid var(--rima-gold);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.28);
          overflow: hidden; max-height: 55vh; overflow-y: auto;
          animation: hSlideUp 0.18s ease forwards;
        }
        .hdrop-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid var(--rima-cream-dark);
          text-decoration: none; transition: background 0.15s;
        }
        .hdrop-item:last-child { border-bottom: none; }
        .hdrop-item:hover { background: var(--rima-cream); }
        .hdrop-region { transition: color 0.15s; }
        .hdrop-item:hover .hdrop-region { color: var(--rima-gold) !important; }

        /* ── Search ── */
        .hsearch-form {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.22); border-radius: 3px;
          width: 349px; max-width: 90vw; overflow: hidden;
        }
        .hsearch-area { flex: 1; display: flex; align-items: center; padding: 0 12px; gap: 8px; }
        .hsearch-form input {
          flex: 1; background: transparent; border: none; outline: none; color: white;
          font-family: var(--font-inter), sans-serif;
          font-size: 10.8px; font-weight: 400; letter-spacing: 2px; padding: 10px 0; min-width: 0;
        }
        .hsearch-form input::placeholder { color: rgba(255,255,255,0.85); }
        .hsearch-btn {
          background: var(--rima-gold); border: none; outline: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 0 16px; flex-shrink: 0; transition: background 0.2s; min-height: 42px;
        }
        .hsearch-btn:hover { background: #b8954a; }

        /* ── Cards ── */
        .hcard { position: relative; overflow: hidden; text-decoration: none; display: block; flex-shrink: 0; }
        .hcard img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
        .hcard:hover img { transform: scale(1.06); }
        .hcard-tint { position: absolute; inset: 0; background: rgba(201,168,76,0.12); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .hcard:hover .hcard-tint { opacity: 1; }
        .hcircle {
          width: 30px; height: 30px; border-radius: 50%; border: 1px solid white;
          background: transparent; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; text-decoration: none; transition: background 0.2s; flex-shrink: 0;
        }
        .hcircle:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      <section className="rima-hero">
        {/* Layer 0 — Photo, instant */}
        <img className="h-photo" src={cur.photo} alt={`${cur.label} — Rima Africa Safaris`} />

        {/* Layer 1 — Video, fades in (desktop only) */}
        {!isMobile && (
          <video
            key={seqIndex}
            className={`h-video ${videoReady && !fadeOut ? "on" : "off"}`}
            autoPlay loop muted playsInline preload="auto"
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={cur.video} type="video/mp4" />
          </video>
        )}

        {/* Layer 2 — Overlay */}
        <div className="h-overlay" />

        {/* Layer 3 — Content */}
        <div style={{
          position: "relative", zIndex: 3, flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: isMobile ? "2rem 1.25rem 2.5rem" : "2rem 10% calc(146.33px + 2.5rem)",
        }}>
          {/* Headline — single line on desktop via nowrap + clamp */}
          {mounted && (
            <h1 style={{ margin: "0 0 37px", whiteSpace: isMobile ? "normal" : "nowrap" }}>
              <span className="ha-title" style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                /* clamp ensures it fits in one line on all desktop sizes */
                fontSize: isMobile ? "clamp(2.4rem,10vw,3.5rem)" : "clamp(2rem,4.2vw,5rem)",
                color: "white", lineHeight: 1.15,
              }}>
                Safaris that speak{" "}
              </span>
              <span className="ha-em" style={{ position: "relative", display: "inline-block" }}>
                <em style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 300, fontStyle: "italic",
                  fontSize: isMobile ? "clamp(2.4rem,10vw,3.6rem)" : "clamp(2rem,4.3vw,5.2rem)",
                  color: "var(--rima-gold)", lineHeight: 1.1,
                }}>
                  Africa
                </em>
                <span className="h-underline" />
              </span>
            </h1>
          )}

          {/* Search */}
          <div ref={searchRef} className={mounted ? "ha-search" : ""} style={{ position: "relative" }}>
            <form ref={formRef} onSubmit={handleSearch} className="hsearch-form">
              <div className="hsearch-area">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text" value={query}
                  onChange={e => { setQuery(e.target.value); openDropdown(); }}
                  onFocus={openDropdown}
                  placeholder="WHERE WOULD YOU LIKE TO TRAVEL?"
                  aria-label="Search destinations" autoComplete="off"
                />
              </div>
              <button type="submit" className="hsearch-btn" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            {showDropdown && filtered.length > 0 && (
              <div className="hdrop" role="listbox" style={dropStyle}>
                {filtered.map(card => (
                  <Link key={card.slug} href={card.href} className="hdrop-item" role="option"
                    onClick={() => { setShowDropdown(false); setQuery(""); }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {card.image && (
                        <div style={{ width: 38, height: 38, borderRadius: 2, overflow: "hidden", flexShrink: 0, background: "var(--rima-jungle)" }}>
                          <img src={card.image} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      <span className="hdrop-region" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "1.1rem", color: "#151515" }}>
                        {card.label}
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.58rem", color: "var(--rima-gold)", letterSpacing: "0.1em", flexShrink: 0 }}>
                      EXPLORE →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop bottom cards */}
        {!isMobile && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
            height: "146.33px",
            display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "0 2rem",
          }}>
            <div style={{ display: "flex", gap: "7.5px", alignItems: "center", alignSelf: "center", marginRight: "1.5rem" }}>
              <button onClick={prev} aria-label="Previous" className="hcircle" style={{ opacity: 0.35 }}>
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M17 7.5H3M10 1L3 7.5L10 14"/></svg>
              </button>
              <button onClick={next} aria-label="Next" className="hcircle">
                <svg width="10" height="8" viewBox="0 0 20 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 7.5h14M10 1l7 6.5L10 14"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {visibleCards.map((card, i) => (
                <Link key={`${card.slug}-${i}`} href={card.href}
                  className={`hcard ha-c${i + 1}`}
                  aria-label={`Explore ${card.label}`}
                  style={{ width: "146.33px", height: "146.33px", marginRight: i < visibleCards.length - 1 ? "30px" : "0" }}>
                  {card.image
                    ? <img src={card.image} alt={`${card.label} safari`} />
                    : <div style={{ position: "absolute", inset: 0, background: "var(--rima-jungle)" }} />}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0) 100%)" }} />
                  <div className="hcard-tint" />
                  <div style={{ position: "absolute", left: "7.31px", top: "121.08px", width: "131.69px", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 700, fontSize: "9.9px", color: "white", lineHeight: 1.34, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 }}>
                      {card.label.toUpperCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", gap: "7.5px", alignItems: "center", alignSelf: "center", marginLeft: "1.5rem" }}>
              <a href="https://web.facebook.com/rimaafricasafaris" target="_blank" rel="noopener noreferrer" className="hcircle" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/rima_africa_safaris/" target="_blank" rel="noopener noreferrer" className="hcircle" aria-label="Instagram">
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