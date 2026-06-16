import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export const metadata: Metadata = {
  title: "The Rima Africa Journal | Safari Stories & Travel Guides",
  description: "Safari stories, wildlife guides, packing lists, destination insights and conservation news from the Rima Africa team.",
  alternates: { canonical: "https://rimaafrica.com/blog" },
};

const POSTS = [
  { slug: "great-migration-guide", title: "The Complete Guide to the Great Migration", date: "April 2025", category: "Kenya", excerpt: "Understanding the wildebeest migration — when to go, where to be, and what no one tells you.", image: "blog/great-migration.jpg" },
  { slug: "gorilla-trekking-rwanda", title: "Gorilla Trekking in Rwanda: Everything You Need to Know", date: "March 2025", category: "Rwanda", excerpt: "The permit, the trek, the encounter. A first-hand account of mountain gorilla trekking in Volcanoes National Park.", image: "blog/gorilla-trekking.jpg" },
  { slug: "seychelles-beyond-beach", title: "Seychelles Beyond the Beach", date: "February 2025", category: "Seychelles", excerpt: "Why the Seychelles is more than white sand — the endemic wildlife, Creole culture and inner islands most visitors never see.", image: "blog/seychelles.jpg" },
  { slug: "kenya-best-time-to-visit", title: "The Best Time to Visit Kenya for a Safari", date: "January 2025", category: "Kenya", excerpt: "A month-by-month breakdown of Kenya's seasons, parks and wildlife events to help you plan the perfect visit.", image: "blog/kenya-seasons.jpg" },
  { slug: "maasai-mara-vs-serengeti", title: "Maasai Mara vs Serengeti: Which is Right for You?", date: "December 2024", category: "Kenya / Tanzania", excerpt: "Two iconic parks, one river, thousands of wildebeest. We break down the key differences to help you choose.", image: "blog/mara-vs-serengeti.jpg" },
  { slug: "packing-list-safari", title: "The Definitive Safari Packing List", date: "November 2024", category: "Travel Tips", excerpt: "What to pack, what to leave behind, and what every camp will provide. Curated by our specialists.", image: "blog/packing.jpg" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="The Rima Africa"
        titleEm="Journal"
        subtitle="Stories, guides and insights from the landscapes we love."
        bgImage={R2 ? `${R2}/ui/blog-hero.jpg` : ""}
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journal" },
        ]}
        badge="FROM THE FIELD"
      />

      <section className="section-wrapper">
        <div className="content-width">
          {/* Featured post */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem", marginBottom: "4rem", alignItems: "center" }}
            className="flex-col-on-mobile">
            <div style={{
              aspectRatio: "16/9", overflow: "hidden",
              backgroundImage: `url(https://placehold.co/800x450/2D4A35/F6F4F0?text=Featured)`,
              backgroundSize: "cover", background: "var(--rima-jungle-dark)",
            }} />
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>
                {POSTS[0].category.toUpperCase()} · {POSTS[0].date.toUpperCase()}
              </p>
              <h2 className="font-serif font-light mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--rima-dark)" }}>
                {POSTS[0].title}
              </h2>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "var(--rima-gray)", marginBottom: "1.5rem" }}>
                {POSTS[0].excerpt}
              </p>
              <Link href={`/blog/${POSTS[0].slug}`}
                style={{ fontSize: "0.7rem", letterSpacing: "0.14em", fontWeight: 500, color: "var(--rima-gold)", textDecoration: "none" }}>
                READ MORE →
              </Link>
            </div>
          </div>

          {/* Grid of remaining posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "2.5rem" }}>
            {POSTS.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  aspectRatio: "16/9", overflow: "hidden",
                  backgroundImage: `url(https://placehold.co/600x340/2D4A35/F6F4F0?text=${encodeURIComponent(post.category)})`,
                  backgroundSize: "cover", background: "var(--rima-jungle-dark)",
                  marginBottom: "1rem",
                }} />
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.35rem" }}>
                  {post.category.toUpperCase()} · {post.date.toUpperCase()}
                </p>
                <h3 className="font-serif font-light mb-2" style={{ fontSize: "1.15rem", color: "var(--rima-dark)" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--rima-gray)", lineHeight: 1.65 }}>
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}