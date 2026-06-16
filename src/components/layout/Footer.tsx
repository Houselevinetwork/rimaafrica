"use client";

import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/rima_africa_safaris/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@rimasafaris",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rima-africa-safaris-42537b32b",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/rimaafricasafaris",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <style>{`
        .footer-link:hover { color: var(--rima-gold) !important; }
        .footer-social-icon:hover { color: var(--rima-gold) !important; opacity: 1 !important; }
      `}</style>

      <footer style={{ background: "var(--rima-jungle-dark)", color: "white" }}>
        <div className="section-wrapper" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
          {/* Main row */}
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 0.8fr",
            gap: "3rem",
            alignItems: "start",
          }}>
            {/* Brand */}
            <div>
              <Link href="/" style={{ display: "inline-block", textDecoration: "none", marginBottom: "0.75rem" }}>
                <span style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.4rem", fontWeight: 300,
                  letterSpacing: "0.2em", color: "white", display: "block",
                }}>RIMA</span>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.48rem", letterSpacing: "0.24em",
                  opacity: 0.4, color: "white",
                }}>AFRICA SAFARIS</p>
              </Link>
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.78rem", fontWeight: 300,
                opacity: 0.5, lineHeight: 1.75, color: "white",
                maxWidth: "260px",
              }}>
                Bespoke private journeys across Africa and the Indian Ocean Islands.
                Born in Nairobi. Built on trust.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", alignItems: "center" }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="footer-social-icon"
                    style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s, opacity 0.2s", display: "block" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.2em",
                opacity: 0.35, marginBottom: "0.75rem", color: "white",
                textTransform: "uppercase",
              }}>
                SAFARI INSPIRATION
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300, fontSize: "1.25rem", color: "white",
                marginBottom: "1rem", lineHeight: 1.3,
              }}>
                Stories from the field, delivered quietly.
              </p>
              <NewsletterForm />
            </div>

            {/* Quick links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", alignItems: "flex-end" }}>
              {[
                { href: "/destinations",     label: "Destinations" },
                { href: "/itineraries",      label: "Itineraries" },
                { href: "/trip-inspirations",label: "Journey Ideas" },
                { href: "/about",            label: "About Rima" },
                { href: "/contact",          label: "Contact" },
                { href: "/plan",             label: "Begin Your Journey" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="footer-link"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.72rem", fontWeight: 300,
                    color: "rgba(255,255,255,0.5)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop: "2.5rem", paddingTop: "1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem",
          }}>
            <p style={{ fontSize: "0.6rem", opacity: 0.22, color: "white" }}>
              &copy; {year} Rima Africa Safaris Ltd. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              {[
                { href: "mailto:safaris@rimaafrica.com", label: "safaris@rimaafrica.com" },
                { href: "/privacy",   label: "Privacy" },
                { href: "/terms",     label: "Terms" },
              ].map(s => (
                <Link key={s.label} href={s.href}
                  style={{ fontSize: "0.6rem", opacity: 0.28, color: "white", textDecoration: "none" }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}