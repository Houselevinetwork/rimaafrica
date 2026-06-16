import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "About Rima Africa Safaris | Born in Nairobi",
  description: "Rima Africa Safaris was founded in Narok by specialists who live, breathe and return from these landscapes. Our team has been there. Every recommendation is personal.",
  alternates: { canonical: "https://rimaafrica.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Born in Africa."
        titleEm="Built on trust."
        bgVideo={heroMedia.about.video}
        bgImage={heroMedia.about.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "About" },
        ]}
      />
      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>OUR STORY</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
            Not an agency. <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>A team.</em>
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--rima-gray)", marginBottom: "1.5rem" }}>
            Rima Africa Safaris was founded in Nairobi by a group of specialists who were tired of watching Africa be sold by people who had never been there. We have tracked elephants in Chobe, sat with gorillas in Bwindi, and watched the Serengeti go silent at dusk. Our recommendations are not assembled from brochures — they come from notes taken in the field.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--rima-gray)", marginBottom: "2.5rem" }}>
            We operate on a simple principle: a small team who knows a great deal is worth more than a large team who knows a little. Every client speaks to the person who designed their journey. Every camp we suggest is one we have slept in. Every guide recommendation is a relationship, not a referral fee.
          </p>
          <Link href="/plan" className="btn-primary">BEGIN YOUR JOURNEY →</Link>
        </div>
      </section>
      <WhatsAppFloat />
    </>
  );
}