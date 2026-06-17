import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { heroMedia } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Types of Travel | Safari, Honeymoon, Gorilla Treks & More",
  description: "Find your style of African travel. Luxury safaris, honeymoons, family adventures, gorilla trekking, beach escapes and conservation travel — all designed for you.",
  alternates: { canonical: "https://rimaafrica.com/types" },
};

const R2 = "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

const TYPES = [
  {
    slug:        "safari",
    label:       "Luxury Safari",
    description: "Private game drives, expert guides and intimate tented camps in Africa's greatest wildlife reserves.",
    image:       `${R2}/kenyaphoto.jpg`,
    video:       `${R2}/kenyavideo.mp4`,
  },
  {
    slug:        "honeymoon",
    label:       "Honeymoon",
    description: "Private island escapes, overwater villas and romantic dinners under the African sky.",
    image:       `${R2}/seychelesherophoto.jpg`,
    video:       `${R2}/seychelesherovideo.mp4`,
  },
  {
    slug:        "family",
    label:       "Family Adventures",
    description: "Safari experiences designed around children — junior ranger programmes, family-friendly camps and endless wonder.",
    image:       `${R2}/botswanaphoto.jpg`,
    video:       `${R2}/botswanaherovideo.mp4`,
  },
  {
    slug:        "beach",
    label:       "Sun & Beach",
    description: "The Indian Ocean's finest beaches — Seychelles, Maldives, Zanzibar and Mauritius — with nothing to do but breathe.",
    image:       `${R2}/maldivesherophoto.jpg`,
    video:       `${R2}/maldivesvideo.mp4`,
  },
  {
    slug:        "gorilla",
    label:       "Gorilla & Chimp Treks",
    description: "Come face to face with mountain gorillas in Rwanda and Uganda — one of the most moving wildlife encounters on earth.",
    image:       `${R2}/goldenmonkey.jpg`,
    video:       "",
  },
  {
    slug:        "conservation",
    label:       "Conservation Travel",
    description: "Camps and lodges where your visit directly funds anti-poaching, community development and habitat conservation.",
    image:       `${R2}/Namibiaphoto.jpg`,
    video:       `${R2}/Namibiaherovideo.mp4`,
  },
  {
    slug:        "corporate",
    label:       "Corporate & Groups",
    description: "Incentive travel and bespoke group experiences for teams who deserve more than a conference room.",
    image:       `${R2}/mauritiusherophoto.jpg`,
    video:       `${R2}/mauritiusherovideo.mp4`,
  },
];

export default function TypesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Types of Travel", url: "https://rimaafrica.com/types" },
      ]} />

      <PageHero
        title="How would you like"
        titleEm="to travel?"
        bgVideo={heroMedia.types.video}
        bgImage={heroMedia.types.image}
        overlayOpacity={0.45}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Types of Travel" },
        ]}
      />

      <section className="section-wrapper" style={{ background: "white" }}>
        <div className="content-width">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="eyebrow" style={{ color: "var(--rima-gray)", marginBottom: "1rem", display: "block" }}>
              FIND YOUR STYLE
            </span>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: "var(--rima-dark)", lineHeight: 1.2,
            }}>
              Every journey is{" "}
              <em style={{ color: "var(--rima-gold)", fontStyle: "italic" }}>different</em>
            </h2>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--rima-gray)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              maxWidth: "480px", margin: "0.85rem auto 0", lineHeight: 1.8,
            }}>
              Tell us what moves you — we will design a journey that feels entirely yours.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}>
            {TYPES.map(type => (
              <TypeCard key={type.slug} {...type} />
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}

// ── TypeCard — photo shows instantly, hover reveals video ─────
function TypeCard({
  slug, label, description, image, video,
}: {
  slug: string; label: string; description: string; image: string; video: string;
}) {
  return (
    <Link href={`/types/${slug}`} style={{ textDecoration: "none", display: "block" }}>
      <style>{`
        .type-card { position: relative; overflow: hidden; }
        .type-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .type-card:hover .type-card-img { transform: scale(1.05); }
        .type-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%);
          transition: background 0.4s;
        }
        .type-card:hover .type-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%);
        }
        .type-card-gold {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--rima-gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .type-card:hover .type-card-gold { transform: scaleX(1); }
      `}</style>

      {/* Card image */}
      <div
        className="type-card"
        style={{ height: "260px", background: "var(--rima-jungle-dark)" }}
      >
        <img
          className="type-card-img"
          src={image}
          alt={label}
        />
        <div className="type-card-overlay" />
        {/* Gold underline on hover */}
        <div className="type-card-gold" />
        {/* Label on card */}
        <div style={{
          position: "absolute", bottom: "1.25rem", left: "1.25rem", zIndex: 2,
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300, color: "white",
            fontSize: "1.6rem", lineHeight: 1.1,
          }}>
            {label}
          </p>
        </div>
      </div>

      {/* Description below card */}
      <div style={{ padding: "1rem 0 0.5rem" }}>
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.82rem",
          color: "var(--rima-gray)",
          lineHeight: 1.75,
          fontWeight: 300,
        }}>
          {description}
        </p>
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.62rem",
          color: "var(--rima-gold)",
          letterSpacing: "0.1em",
          marginTop: "0.5rem",
          fontWeight: 500,
        }}>
          EXPLORE →
        </p>
      </div>
    </Link>
  );
}