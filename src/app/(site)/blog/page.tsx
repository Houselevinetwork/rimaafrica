import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { heroMedia } from "@/lib/media";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Safari Journal | Stories Worth Reading | Rima Africa Safaris",
  description: "Expert guides to African travel. When to go, where to stay, what to expect — written by people who have been there.",
  alternates: { canonical: "https://rimaafrica.com/blog" },
};

const R2 = "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

const POSTS = [
  {
    slug:      "great-migration",
    title:     "The Great Migration: When to Go and Where to Be",
    date:      "May 2026",
    category:  "KENYA · TANZANIA",
    excerpt:   "The Great Migration is the largest overland movement of animals on earth — 1.5 million wildebeest, 200,000 zebra and 300,000 Thomson's gazelle. Here is what nobody tells you.",
    image:     `${R2}/kenyaphoto.jpg`,
  },
  {
    slug:      "gorilla-trekking-guide",
    title:     "Everything You Need to Know Before Your Gorilla Trek",
    date:      "April 2026",
    category:  "RWANDA · UGANDA",
    excerpt:   "There are fewer than 1,000 mountain gorillas left on earth. Spending one hour with a habituated family is one of the most moving wildlife experiences available anywhere.",
    image:     `${R2}/goldenmonkey.jpg`,
  },
  {
    slug:      "seychelles-inner-islands",
    title:     "The Inner Islands of Seychelles: Beyond Mahé",
    date:      "March 2026",
    category:  "SEYCHELLES",
    excerpt:   "Most visitors land in Mahé, spend a few days, and return home. The ones who go further — to Praslin, La Digue, Silhouette — come back changed.",
    image:     `${R2}/seychelesherophoto.jpg`,
  },
  {
    slug:      "kenya-best-seasons",
    title:     "Kenya by Season: What the Guidebooks Miss",
    date:      "February 2026",
    category:  "KENYA",
    excerpt:   "The guidebooks will tell you to go between July and October. What they do not tell you is that January through March — the calving season — is arguably even more dramatic.",
    image:     `${R2}/kenyaphoto.jpg`,
  },
  {
    slug:      "mara-vs-serengeti",
    title:     "Maasai Mara or Serengeti? How to Choose",
    date:      "January 2026",
    category:  "KENYA · TANZANIA",
    excerpt:   "They share the same ecosystem, the same animals, the same migration. But the Maasai Mara and the Serengeti feel completely different on the ground.",
    image:     `${R2}/ngorongorocrater.jpg`,
  },
  {
    slug:      "safari-packing",
    title:     "The Field-Tested Safari Packing List",
    date:      "December 2025",
    category:  "TRAVEL TIPS",
    excerpt:   "After years of watching clients overpack, underpack, and occasionally arrive in Nairobi wearing the wrong shoes entirely — we have distilled everything into one list.",
    image:     `${R2}/botswanaphoto.jpg`,
  },
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Journal", url: "https://rimaafrica.com/blog" },
      ]} />

      <PageHero
        title="Safari Journal"
        titleEm="Stories worth reading."
        bgImage={heroMedia.blog.image}
        bgVideo={heroMedia.blog.video}
        overlayOpacity={0.52}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journal" },
        ]}
      />

      <section className="section-wrapper" style={{ background: "white" }}>
        <div className="content-width">

          {/* Featured post — large */}
          <Link href={`/blog/${POSTS[0].slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "3rem" }}>
            <style>{`
              .blog-featured:hover .blog-featured-img { transform: scale(1.03); }
              .blog-featured-img { transition: transform 0.6s ease; }
              .blog-featured:hover .blog-read { color: var(--rima-gold) !important; }
            `}</style>
            <div className="blog-featured" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", minHeight: "400px" }}>
              <div style={{ position: "relative", overflow: "hidden", background: "var(--rima-jungle-dark)" }}>
                <img
                  className="blog-featured-img"
                  src={POSTS[0].image}
                  alt={POSTS[0].title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "3rem", background: "var(--rima-cream)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--rima-gold)", marginBottom: "1rem" }}>
                  {POSTS[0].category} · {POSTS[0].date}
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "var(--rima-dark)", lineHeight: 1.25, marginBottom: "1rem" }}>
                  {POSTS[0].title}
                </h2>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.88rem", color: "var(--rima-gray)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.5rem" }}>
                  {POSTS[0].excerpt}
                </p>
                <span className="blog-read" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--rima-dark)", transition: "color 0.2s" }}>
                  READ MORE →
                </span>
              </div>
            </div>
          </Link>

          {/* Grid — remaining posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {POSTS.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <style>{`
                  .blog-card-${post.slug}:hover .blog-card-img-${post.slug} { transform: scale(1.04); }
                  .blog-card-img-${post.slug} { transition: transform 0.55s ease; }
                  .blog-card-${post.slug}:hover .blog-card-arrow-${post.slug} { color: var(--rima-gold) !important; }
                `}</style>
                <div className={`blog-card-${post.slug}`}>
                  {/* Image */}
                  <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "var(--rima-jungle-dark)", marginBottom: "1.25rem" }}>
                    <img
                      className={`blog-card-img-${post.slug}`}
                      src={post.image}
                      alt={post.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Category pill on image */}
                    <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                      <span style={{
                        background: "rgba(0,0,0,0.55)", color: "white",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "0.52rem", fontWeight: 700,
                        letterSpacing: "0.15em", padding: "0.3rem 0.6rem",
                      }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  {/* Text */}
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>
                    {post.date}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "var(--rima-dark)", lineHeight: 1.25, marginBottom: "0.6rem" }}>
                    {post.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.82rem", color: "var(--rima-gray)", lineHeight: 1.75, fontWeight: 300, marginBottom: "0.75rem" }}>
                    {post.excerpt.slice(0, 120)}...
                  </p>
                  <span className={`blog-card-arrow-${post.slug}`} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--rima-gray)", transition: "color 0.2s" }}>
                    READ MORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}