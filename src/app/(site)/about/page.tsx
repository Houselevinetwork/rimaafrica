import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

export const metadata: Metadata = {
  title: "About Rima Africa | Born in Nairobi",
  description: "Rima Africa Safaris was born in Nairobi. We design bespoke private journeys across East Africa and the Indian Ocean Islands led by specialists who live in the landscapes they guide.",
  alternates: { canonical: "https://rimaafrica.com/about" },
};

const VALUES = [
  { title: "Born in Africa", description: "We are not outsiders selling Africa from afar. Our team lives and breathes these landscapes, seasons and cultures." },
  { title: "Radically Tailored", description: "No two journeys are the same. We begin with a conversation, not a brochure." },
  { title: "Quietly Responsible", description: "Conservation fees, community partnerships, low-impact camps. We measure our footprint seriously." },
  { title: "Human First", description: "You speak to a specialist, not a booking engine. Every detail confirmed by a person who has been there." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Born in"
        titleEm="Africa"
        subtitle="Rima Africa Safaris is a Nairobi-born specialist designing private journeys for travellers who want more than a holiday."
        bgImage={R2 ? `${R2}/ui/about-hero.jpg` : ""}
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Story */}
      <section className="section-wrapper">
        <div className="content-width" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
          className="flex-col-on-mobile content-width">
          <div>
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>OUR STORY</p>
            <h2 className="font-serif font-light mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
              A company built on <em>firsthand knowledge</em>
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "var(--rima-gray)", marginBottom: "1.25rem" }}>
              Rima Africa was founded by people who grew up watching the Great Migration from a Land Cruiser, who learned Swahili before English, and who believe a safari is not a product — it is a relationship with a landscape.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "var(--rima-gray)", marginBottom: "1.25rem" }}>
              We operate across Kenya, Tanzania, Rwanda, Uganda, Botswana, South Africa and the Indian Ocean Islands. Every destination we offer is one our team has visited, stayed in and inspected — often multiple times per year.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "var(--rima-gray)" }}>
              We are a small team on purpose. Every client speaks directly with the specialist designing their journey — not a call centre, not an algorithm.
            </p>
          </div>
          <div style={{
            aspectRatio: "4/5",
            background: R2 ? `url(${R2}/ui/about-story.jpg) center/cover` : "var(--rima-jungle)",
          }} />
        </div>
      </section>

      {/* Values */}
      <section className="section-wrapper" style={{ background: "var(--rima-dark)" }}>
        <div className="content-width">
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>WHAT WE BELIEVE</p>
          <h2 className="font-serif font-light text-white mb-12" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
            Our <em>values</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem" }}>
            {VALUES.map((v, i) => (
              <div key={i}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--rima-gold)", marginBottom: "0.75rem" }}>0{i + 1}</p>
                <h3 className="font-serif font-light text-white mb-3" style={{ fontSize: "1.4rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-wrapper text-center" style={{ background: "var(--rima-cream)" }}>
        <div className="content-width" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>READY TO BEGIN?</p>
          <h2 className="font-serif font-light mb-6" style={{ fontSize: "2rem" }}>
            Start planning your <em>journey</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/plan" style={{ background: "var(--rima-gold)", color: "white", padding: "0.85rem 2rem", fontSize: "0.72rem", letterSpacing: "0.14em", fontWeight: 500, textDecoration: "none" }}>
              PLAN A JOURNEY →
            </a>
            <a href="/contact" style={{ border: "1px solid var(--rima-dark)", color: "var(--rima-dark)", padding: "0.85rem 2rem", fontSize: "0.72rem", letterSpacing: "0.14em", textDecoration: "none" }}>
              SPEAK TO A SPECIALIST
            </a>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}