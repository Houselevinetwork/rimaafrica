"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  title: string;
  titleEm?: string;
  /* subtitle deliberately kept optional — only some pages use it */
  subtitle?: string;
  bgImage?: string;
  bgVideo?: string;
  breadcrumbs?: Crumb[];
  overlayOpacity?: number;
  badge?: string;
  meta?: string;
  align?: "center" | "left";
}

export default function PageHero({
  title, titleEm, subtitle,
  bgImage, bgVideo,
  breadcrumbs, overlayOpacity = 0.52,
  badge, meta, align = "center",
}: PageHeroProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  /* Gradient background used when no real image yet */
  const fallbackBg = "linear-gradient(160deg, var(--rima-jungle-dark) 0%, var(--rima-jungle) 100%)";

  return (
    <>
      <style>{`
        .page-hero-section {
          position: relative;
          min-height: 55dvh;
          display: flex; flex-direction: column;
          align-items: ${align === "center" ? "center" : "flex-start"};
          justify-content: center;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .page-hero-section { min-height: calc(100dvh - var(--nav-h, 64px)); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .page-hero-section { min-height: 60dvh; }
        }
        @supports not (min-height: 100dvh) {
          .page-hero-section { min-height: 55vh; }
          @media (min-width: 1024px) {
            .page-hero-section { min-height: calc(100vh - var(--nav-h, 64px)); }
          }
        }
        .phc a:hover { color: white !important; }
      `}</style>

      <section
        className="page-hero-section"
        style={{ background: bgImage || bgVideo ? "var(--rima-jungle-dark)" : fallbackBg }}
      >
        {bgVideo && (
          <video autoPlay loop muted playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src={bgVideo} type="video/mp4" />
          </video>
        )}
        {!bgVideo && bgImage && (
          <img src={bgImage} alt="" aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        )}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `rgba(0,0,0,${overlayOpacity})` }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align,
          padding: "2rem 1.5rem 3rem",
          width: "100%",
        }}>
          {badge && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.58rem", fontWeight: 500,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)",
              marginBottom: "1rem", textTransform: "uppercase",
            }}>{badge}</p>
          )}

          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300, color: "white",
            fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
            lineHeight: 1.08,
            marginBottom: titleEm ? "0" : subtitle ? "0.75rem" : "0",
          }}>{title}</h1>

          {titleEm && (
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--rima-gold)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.08,
              marginBottom: subtitle ? "1rem" : "0",
            }}>{titleEm}</p>
          )}

          {subtitle && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, color: "rgba(255,255,255,0.62)",
              fontSize: "clamp(0.82rem, 1.8vw, 1rem)",
              maxWidth: "480px", lineHeight: 1.8, marginTop: "0.5rem",
            }}>{subtitle}</p>
          )}

          {meta && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem", fontWeight: 500,
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)",
              }}>{meta}</span>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="phc" style={{
            position: "absolute", bottom: "1.25rem", left: 0, right: 0, zIndex: 3,
            display: "flex", justifyContent: align === "center" ? "center" : "flex-start",
            alignItems: "center", gap: "0.4rem",
            flexWrap: "wrap", padding: "0 1.5rem",
          }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {crumb.href ? (
                  <Link href={crumb.href}
                    style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.8)" }}>
                    {crumb.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem" }}>/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
}