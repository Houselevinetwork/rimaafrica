export const runtime = 'edge';

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { heroMedia } from "@/lib/media";

// ── Static blog posts ─────────────────────────────────────────
const POSTS: Record<string, {
  slug: string;
  title: string;
  date: string;
  datePublished: string;
  category: string;
  body: string;
}> = {
  "great-migration": {
    slug: "great-migration",
    title: "The Great Migration: When to Go and Where to Be",
    date: "May 2026",
    datePublished: "2026-05-01",
    category: "Kenya · Tanzania",
    body: "The Great Migration is the largest overland movement of animals on earth — 1.5 million wildebeest, 200,000 zebra and 300,000 Thomson's gazelle moving in a continuous loop between Tanzania's Serengeti and Kenya's Maasai Mara. Here is what nobody tells you: it is never guaranteed. The crossing dates shift by weeks depending on rainfall. The herds do not read calendars. What we can tell you is where to be, and when to be patient.",
  },
  "gorilla-trekking-guide": {
    slug: "gorilla-trekking-guide",
    title: "Everything You Need to Know Before Your Gorilla Trek",
    date: "April 2026",
    datePublished: "2026-04-01",
    category: "Rwanda · Uganda",
    body: "There are fewer than 1,000 mountain gorillas left on earth. They live in three countries — Rwanda, Uganda and the Democratic Republic of Congo — in a small cluster of forested volcanoes. Spending one hour with a habituated gorilla family is one of the most moving wildlife experiences available anywhere. Here is how to prepare.",
  },
  "seychelles-inner-islands": {
    slug: "seychelles-inner-islands",
    title: "The Inner Islands of Seychelles: Beyond Mahé",
    date: "March 2026",
    datePublished: "2026-03-01",
    category: "Seychelles",
    body: "Most visitors to the Seychelles land in Mahé, spend a few days, and return home. The ones who go further — to Praslin, La Digue, Silhouette, Cousine — come back changed. The inner islands have no cars, no crowds, and in some cases no other guests at all. This is what the Seychelles was always supposed to feel like.",
  },
  "kenya-best-seasons": {
    slug: "kenya-best-seasons",
    title: "Kenya by Season: What the Guidebooks Miss",
    date: "February 2026",
    datePublished: "2026-02-01",
    category: "Kenya",
    body: "Kenya has two dry seasons and two wet seasons. The guidebooks will tell you to go between July and October for the Great Migration. What they do not tell you is that January through March — the calving season on the short grass plains of Amboseli — is arguably even more dramatic. Predator action is at its peak. The light is extraordinary. And you will not share it with anyone.",
  },
  "mara-vs-serengeti": {
    slug: "mara-vs-serengeti",
    title: "Maasai Mara or Serengeti? How to Choose",
    date: "January 2026",
    datePublished: "2026-01-01",
    category: "Kenya · Tanzania",
    body: "They share the same ecosystem, the same animals, the same migration. But the Maasai Mara and the Serengeti feel completely different on the ground. The Mara is smaller, more intimate, more accessible from Nairobi. The Serengeti is vast — at 14,750 square kilometres, you can drive for hours without seeing another vehicle. Both are extraordinary. Which one is right for you depends on what you are looking for.",
  },
  "safari-packing": {
    slug: "safari-packing",
    title: "The Field-Tested Safari Packing List",
    date: "December 2025",
    datePublished: "2025-12-01",
    category: "Travel Tips",
    body: "After years of packing for safaris — and watching clients overpack, underpack, and occasionally arrive in Nairobi wearing the wrong shoes entirely — we have distilled everything into one list. Nothing on it is optional. Nothing is excessive. This is what you actually need.",
  },
};

// ── Next.js 15 — params must be awaited ──────────────────────
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.body.slice(0, 155),
    alternates: { canonical: `https://rimaafrica.com/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.body.slice(0, 155),
      publishedTime: post.datePublished,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.body.slice(0, 155)}
        url={`https://rimaafrica.com/blog/${slug}`}
        datePublished={post.datePublished}
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Journal", url: "https://rimaafrica.com/blog" },
        { name: post.title, url: `https://rimaafrica.com/blog/${slug}` },
      ]} />

      <PageHero
        title={post.title}
        bgVideo=""
        bgImage={heroMedia.blog.image}
        overlayOpacity={0.52}
        badge={post.category}
        meta={post.date}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Journal", href: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontSize: "0.58rem", letterSpacing: "0.2em",
            color: "var(--rima-gold)", marginBottom: "2rem",
            textTransform: "uppercase",
          }}>
            {post.category} · {post.date}
          </p>
          <div style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "1.05rem", lineHeight: 1.9,
            color: "var(--rima-gray)", fontWeight: 300,
          }}>
            {post.body.split("\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.5rem" }}>{para}</p>
            ))}
          </div>
          <div style={{
            marginTop: "3rem", paddingTop: "2rem",
            borderTop: "1px solid var(--rima-cream-dark)",
            display: "flex", gap: "1rem", flexWrap: "wrap",
          }}>
            <a href="/plan" style={{
              background: "var(--rima-gold)", color: "white",
              padding: "0.75rem 1.5rem", textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em",
            }}>
              PLAN A SAFARI →
            </a>
            <a href="/blog" style={{
              border: "1px solid var(--rima-cream-dark)",
              color: "var(--rima-gray)", padding: "0.75rem 1.5rem",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.65rem", fontWeight: 300, letterSpacing: "0.08em",
            }}>
              ← Back to Journal
            </a>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}