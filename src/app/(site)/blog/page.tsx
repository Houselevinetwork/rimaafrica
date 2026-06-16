import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Journal | Safari Stories from the Field",
  description: "Dispatches, field notes and seasonal guides from the Rima Africa team. Stories from East Africa, Southern Africa and the Indian Ocean Islands.",
  alternates: { canonical: "https://rimaafrica.com/blog" },
};

const POSTS = [
  { slug: "great-migration", title: "The Great Migration: When to Go and Where to Be", date: "May 2026", category: "Kenya · Tanzania", image: "blog/great-migration.jpg" },
  { slug: "gorilla-trekking-guide", title: "Everything You Need to Know Before Your Gorilla Trek", date: "April 2026", category: "Rwanda · Uganda", image: "blog/gorilla-trekking.jpg" },
  { slug: "seychelles-inner-islands", title: "The Inner Islands of Seychelles: Beyond Mahé", date: "March 2026", category: "Seychelles", image: "blog/seychelles.jpg" },
  { slug: "kenya-best-seasons", title: "Kenya by Season: What the Guidebooks Miss", date: "February 2026", category: "Kenya", image: "blog/kenya-seasons.jpg" },
  { slug: "mara-vs-serengeti", title: "Maasai Mara or Serengeti? How to Choose", date: "January 2026", category: "Kenya · Tanzania", image: "blog/mara-vs-serengeti.jpg" },
  { slug: "safari-packing", title: "The Field-Tested Safari Packing List", date: "December 2025", category: "Travel Tips", image: "blog/packing.jpg" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="From the field"
        bgVideo={heroMedia.blog.video}
        bgImage={heroMedia.blog.image}
        overlayOpacity={0.45}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journal" },
        ]}
      />
      <section className="section-wrapper">
        <div className="content-width">
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>SAFARI JOURNAL</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "3rem" }}>
            Stories worth <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>reading</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2.5rem" }}>
            {POSTS.map(post => (
              <article key={post.slug}>
                <div style={{ aspectRatio: "16/9", background: "var(--rima-jungle-dark)", marginBottom: "1rem" }} />
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "var(--rima-gold)", marginBottom: "0.4rem" }}>
                  {post.category.toUpperCase()} · {post.date.toUpperCase()}
                </p>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 300, color: "var(--rima-dark)", lineHeight: 1.4 }}>
                  {post.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppFloat />
    </>
  );
}