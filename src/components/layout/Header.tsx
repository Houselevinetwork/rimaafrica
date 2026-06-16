"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTINENT_GROUPS, EXPERIENCE_TYPES } from "@/data/destinations";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem; font-weight: 400;
          color: rgba(255,255,255,0.85); text-decoration: none;
          letter-spacing: 0.04em; transition: color 0.2s;
          cursor: pointer; background: none; border: none; padding: 0;
        }
        .nav-link:hover { color: var(--rima-gold); }
        .mega-dropdown {
          position: absolute;
          top: calc(100% + 1px);
          left: 50%; transform: translateX(-50%);
          background: white;
          border-top: 2px solid var(--rima-gold);
          min-width: 640px; z-index: 200;
          padding: 2rem 2rem 1.5rem;
          box-shadow: 0 12px 48px rgba(0,0,0,0.14);
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .dropdown-section-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.2em; color: var(--rima-gold);
          text-transform: uppercase; display: block; margin-bottom: 0.6rem;
        }
        .dropdown-dest-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 2rem;
        }
        .dropdown-link {
          display: block;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1rem; font-weight: 300;
          color: var(--rima-dark); text-decoration: none;
          padding: 0.18rem 0; transition: color 0.15s;
          border-bottom: 1px solid transparent;
        }
        .dropdown-link:hover { color: var(--rima-gold); }
        .dropdown-view-all {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.12em; color: var(--rima-earth);
          text-decoration: none; text-transform: uppercase;
          border-top: 1px solid var(--rima-cream-dark);
          padding-top: 0.75rem; display: inline-block;
          transition: color 0.2s;
        }
        .dropdown-view-all:hover { color: var(--rima-gold); }
        .mobile-menu {
          position: fixed; inset: 0;
          background: var(--rima-jungle-dark);
          z-index: 200; overflow-y: auto;
          padding: 5rem 2rem 3rem;
          display: flex; flex-direction: column; gap: 0;
        }
        .mob-item { border-bottom: 1px solid rgba(255,255,255,0.07); padding: 0.85rem 0; }
        .mob-main { font-family: var(--font-cormorant), Georgia, serif; font-size: 1.55rem; font-weight: 300; color: white; text-decoration: none; display: block; }
        .mob-sub-group { padding: 0.4rem 0 0.4rem 0; }
        .mob-region { font-family: var(--font-inter), sans-serif; font-size: 0.52rem; letter-spacing: 0.18em; color: var(--rima-gold); display: block; margin: 0.5rem 0 0.3rem; }
        .mob-dest { font-family: var(--font-inter), sans-serif; font-size: 0.78rem; font-weight: 300; color: rgba(255,255,255,0.5); text-decoration: none; display: block; padding: 0.25rem 0 0.25rem 0.75rem; transition: color 0.2s; }
        .mob-dest:hover { color: var(--rima-gold); }
        @media (max-width: 1023px) {
          .desktop-nav-items { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "var(--nav-h, 64px)",
        background: "var(--rima-jungle)",
        display: "flex", alignItems: "center",
        padding: "0 1.5rem",
      }}>
        {/* ── Logo ── */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.85rem", textDecoration: "none", flexShrink: 0 }}>
          <Image
            src="/logo.png" alt="Rima Africa Safaris"
            width={48} height={48}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            priority
          />
          <div style={{ lineHeight: 1 }}>
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.75rem", fontWeight: 600,
              letterSpacing: "0.20em", color: "white", display: "block", lineHeight: 1,
            }}>RIMA</span>
            <span style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.52rem", letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.70)", display: "block", marginTop: "2px",
            }}>AFRICA SAFARIS</span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="desktop-nav-items" style={{
          display: "flex", alignItems: "center", gap: "1.75rem",
          marginLeft: "auto", marginRight: "1.5rem",
        }}>
          {/* Destinations — links to /destinations AND has dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}>
            <Link href="/destinations" className="nav-link"
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Destinations
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </Link>
            {destOpen && (
              <div className="mega-dropdown">
                <div className="dropdown-dest-grid">
                  {CONTINENT_GROUPS.map(group => (
                    <div key={group.id}>
                      <span className="dropdown-section-title">{group.label}</span>
                      {group.destinations.map(dest => (
                        <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="dropdown-link">
                          {dest.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link href="/destinations" className="dropdown-view-all">
                  View all destinations →
                </Link>
              </div>
            )}
          </div>

          {/* Types of Travel — links to /types AND has dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setTypesOpen(true)}
            onMouseLeave={() => setTypesOpen(false)}>
            <Link href="/types" className="nav-link"
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Types of Travel
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </Link>
            {typesOpen && (
              <div className="mega-dropdown" style={{ minWidth: "380px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.1rem 2rem" }}>
                  {EXPERIENCE_TYPES.map(type => (
                    <Link key={type.slug} href={`/types/${type.slug}`} className="dropdown-link">
                      {type.label}
                    </Link>
                  ))}
                </div>
                <Link href="/types" className="dropdown-view-all">
                  All travel styles →
                </Link>
              </div>
            )}
          </div>

          {[
            { href: "/itineraries",     label: "Itineraries" },
            { href: "/about",           label: "About" },
            { href: "/blog",            label: "Journal" },
            { href: "/contact",         label: "Contact" },
          ].map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="desktop-nav-items" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <a href="https://wa.me/254714728554" target="_blank" rel="noopener noreferrer"
            style={{
              border: "1px solid rgba(255,255,255,0.3)", color: "white",
              padding: "0.42rem 0.9rem", fontSize: "0.62rem",
              fontWeight: 500, letterSpacing: "0.1em", textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif", transition: "border-color 0.2s",
            }}>
            WHATSAPP
          </a>
          <Link href="/plan" style={{
            background: "var(--rima-gold)", color: "white",
            padding: "0.42rem 0.9rem", fontSize: "0.62rem",
            fontWeight: 500, letterSpacing: "0.1em", textDecoration: "none",
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            PLAN A SAFARI
          </Link>
        </div>

        {/* Hamburger */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "white", padding: "0.5rem", marginLeft: "auto",
          }}>
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
            </svg>
          )}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "white" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <Link href="/" onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "0.85rem", textDecoration: "none", marginBottom: "2rem" }}>
            <Image src="/logo.png" alt="Rima Africa Safaris" width={50} height={50} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "0.20em", color: "white", display: "block", lineHeight: 1 }}>RIMA</span>
              <span style={{ display: "block", fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)" }}>AFRICA SAFARIS</span>
            </div>
          </Link>

          {/* Destinations */}
          <div className="mob-item">
            <Link href="/destinations" className="mob-main" onClick={() => setMenuOpen(false)}>Destinations</Link>
            <div className="mob-sub-group">
              {CONTINENT_GROUPS.map(group => (
                <div key={group.id}>
                  <span className="mob-region">{group.label.toUpperCase()}</span>
                  {group.destinations.map(dest => (
                    <Link key={dest.slug} href={`/destinations/${dest.slug}`}
                      className="mob-dest" onClick={() => setMenuOpen(false)}>
                      {dest.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Types */}
          <div className="mob-item">
            <Link href="/types" className="mob-main" onClick={() => setMenuOpen(false)}>Types of Travel</Link>
            <div className="mob-sub-group">
              {EXPERIENCE_TYPES.map(type => (
                <Link key={type.slug} href={`/types/${type.slug}`}
                  className="mob-dest" onClick={() => setMenuOpen(false)}>
                  {type.label}
                </Link>
              ))}
            </div>
          </div>

          {[
            { href: "/itineraries",     label: "Itineraries" },
            { href: "/about",           label: "About" },
            { href: "/blog",            label: "Journal" },
            { href: "/contact",         label: "Contact" },
            { href: "/plan",            label: "Begin Your Journey" },
          ].map(l => (
            <div key={l.href} className="mob-item">
              <Link href={l.href} className="mob-main" onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </div>
          ))}

          <div style={{ marginTop: "2rem" }}>
            <a href="https://wa.me/254714728554" target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", background: "var(--rima-jungle)", color: "white",
                border: "1px solid var(--rima-gold)",
                padding: "0.9rem", textAlign: "center",
                fontFamily: "var(--font-inter)", fontSize: "0.72rem",
                fontWeight: 500, letterSpacing: "0.12em", textDecoration: "none",
              }}>
              CHAT ON WHATSAPP →
            </a>
          </div>
        </div>
      )}
    </>
  );
}