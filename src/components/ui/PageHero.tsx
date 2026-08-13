"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  title: string;
  titleEm?: string;
  subtitle?: string;
  bgImage?: string;        // Photo — loads instantly as base layer
  bgVideo?: string;        // Video — fades in on top when ready
  breadcrumbs?: Crumb[];
  overlayOpacity?: number;
  badge?: string;
  meta?: string;
  align?: "center" | "left";
}

export default function PageHero({
  title, titleEm, subtitle,
  bgImage, bgVideo,
  breadcrumbs, overlayOpacity = 0.48,
  badge, meta, align = "center",
}: PageHeroProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        .page-hero {
          position: relative;
          min-height: 55dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: var(--rima-jungle-dark);
        }
        @media (min-width: 1024px) {
          .page-hero { min-height: calc(100dvh - var(--nav-h, 64px)); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .page-hero { min-height: 60dvh; }
        }
        @supports not (min-height: 100dvh) {
          .page-hero { min-height: 55vh; }
          @media (min-width: 1024px) { .page-hero { min-height: calc(100vh - 64px); } }
        }

        /* Photo base — always visible instantly */
        .ph-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
        }
        /* Mobile: subtle zoom on photo */
        @media (max-width: 767px) {
          .ph-photo { animation: phZoom 10s ease-in-out infinite alternate; }
        }
        @keyframes phZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.03); }
        }

        /* Video — fades in on top when canPlay fires */
        .ph-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; z-index: 1;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ph-video.ready { opacity: 1; }

        /* Overlay */
        .ph-overlay {
          position: absolute; inset: 0; z-index: 2;
        }

        /* Content entrance */
        @keyframes ph-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ph-content {
          opacity: 0;
          animation: ph-rise 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .ph-content { animation: none; opacity: 1; }
          .ph-photo   { animation: none; }
        }

        .ph-crumb-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem;
        }
        .ph-crumb-link:hover { color: white; }
      `}</style>

      <section className="page-hero">

        {/* Layer 0: Photo — immediate, no waiting */}
        {bgImage && (
          <img
            className="ph-photo"
            src={bgImage}
            alt={title}
          />
        )}

        {/* Layer 1: Video — fades in smoothly on top of photo */}
        {bgVideo && (
          <video
            className={`ph-video${videoReady ? " ready" : ""}`}
            autoPlay loop muted playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        )}

        {/* Layer 2: Overlay */}
        <div className="ph-overlay" style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />

        {/* Layer 3: Content */}
        <div className={mounted ? "ph-content" : ""} style={{
          position: "relative", zIndex: 3,
          display: "flex", flexDirection: "column",
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align,
          padding: "2rem 1.5rem 3.5rem",
          width: "100%",
        }}>
          {badge && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem", fontWeight: 500,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.55)",
              marginBottom: "1rem", textTransform: "uppercase",
            }}>
              {badge}
            </p>
          )}

          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300, color: "white",
            fontSize: "clamp(2.2rem, 8vw, 5.5rem)",
            lineHeight: 1.1,
            marginBottom: titleEm ? "0.1rem" : subtitle ? "0.75rem" : "0",
          }}>
            {title}
          </h1>

          {titleEm && (
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--rima-gold)",
              fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              marginBottom: subtitle ? "1rem" : "0",
            }}>
              {titleEm}
            </p>
          )}

          {subtitle && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(0.82rem, 2vw, 1rem)",
              maxWidth: "500px", lineHeight: 1.75, marginTop: "0.5rem",
            }}>
              {subtitle}
            </p>
          )}

          {meta && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)" }}>
                {meta}
              </span>
            </div>
          )}
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div style={{
            position: "absolute", bottom: "1rem", left: 0, right: 0, zIndex: 4,
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: "0.4rem", flexWrap: "wrap", padding: "0 1.5rem",
          }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {crumb.href ? (
                  <Link href={crumb.href} className="ph-crumb-link">{crumb.label}</Link>
                ) : (
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.75)" }}>
                    {crumb.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.55rem" }}>/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
}