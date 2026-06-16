"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  title: string;
  titleEm?: string;
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
  breadcrumbs, overlayOpacity = 0.45,
  badge, meta, align = "center",
}: PageHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    // Attempt to play video; if it fails mark as failed so image shows
    if (videoRef.current) {
      videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [bgVideo]);

  const showVideo = bgVideo && !videoFailed;
  const showImage = bgImage && (!bgVideo || videoFailed);
  const fallbackBg = "linear-gradient(160deg, var(--rima-jungle-dark) 0%, var(--rima-jungle) 100%)";

  return (
    <>
      <style>{`
        .page-hero-root {
          position: relative;
          min-height: 55dvh;
          display: flex; flex-direction: column;
          align-items: ${align === "center" ? "center" : "flex-start"};
          justify-content: center;
          overflow: hidden;
          background: var(--rima-jungle-dark);
        }
        @media (min-width: 1024px) {
          .page-hero-root { min-height: calc(100dvh - var(--nav-h, 64px)); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .page-hero-root { min-height: 60dvh; }
        }
        @supports not (min-height: 100dvh) {
          .page-hero-root { min-height: 55vh; }
          @media (min-width: 1024px) {
            .page-hero-root { min-height: calc(100vh - var(--nav-h, 64px)); }
          }
        }
        .phero-bg-media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .phero-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        .phero-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          align-items: ${align === "center" ? "center" : "flex-start"};
          text-align: ${align};
          padding: 3rem 1.5rem 4rem;
          width: 100%;
        }
        .phero-breadcrumb {
          position: absolute; bottom: 1.5rem; left: 0; right: 0; z-index: 3;
          display: flex;
          justify-content: ${align === "center" ? "center" : "flex-start"};
          align-items: center; gap: 0.4rem;
          flex-wrap: wrap; padding: 0 1.5rem;
        }
        .phero-bc-link {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem; color: rgba(255,255,255,0.4);
          text-decoration: none; transition: color 0.2s;
        }
        .phero-bc-link:hover { color: white; }
        .phero-bc-sep { color: rgba(255,255,255,0.2); font-size: 0.55rem; }
        .phero-bc-current {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem; color: rgba(255,255,255,0.8);
        }
      `}</style>

      <section
        className="page-hero-root"
        style={{ background: (!showVideo && !showImage) ? fallbackBg : undefined }}
      >
        {/* VIDEO — autoplay, loop, muted */}
        {showVideo && (
          <video
            ref={videoRef}
            className="phero-bg-media"
            autoPlay loop muted playsInline
            poster={bgImage || ""}
            onError={() => setVideoFailed(true)}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        )}

        {/* FALLBACK IMAGE — shows while video loads or if video fails */}
        {showImage && !showVideo && (
          <img
            className="phero-bg-media"
            src={bgImage}
            alt=""
            aria-hidden
          />
        )}

        {/* When video plays, image shows as poster underneath — handled by poster attr */}

        {/* Overlay */}
        <div
          className="phero-overlay"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        />

        {/* Content */}
        <div className="phero-content">
          {badge && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.58rem", fontWeight: 500,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)",
              marginBottom: "1rem", textTransform: "uppercase",
            }}>
              {badge}
            </p>
          )}

          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300, color: "white",
            fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
            lineHeight: 1.08, margin: 0,
          }}>
            {title}
          </h1>

          {titleEm && (
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--rima-gold)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.1, margin: "0.1rem 0 0",
            }}>
              {titleEm}
            </p>
          )}

          {subtitle && (
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, color: "rgba(255,255,255,0.62)",
              fontSize: "clamp(0.82rem, 1.8vw, 1rem)",
              maxWidth: "520px", lineHeight: 1.85,
              marginTop: titleEm ? "1rem" : "0.6rem",
            }}>
              {subtitle}
            </p>
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
              }}>
                {meta}
              </span>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="phero-breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {crumb.href ? (
                  <Link href={crumb.href} className="phero-bc-link">{crumb.label}</Link>
                ) : (
                  <span className="phero-bc-current">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span className="phero-bc-sep">/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
}