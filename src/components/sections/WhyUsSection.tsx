"use client";

import { useState } from "react";
import { r2Url } from "@/lib/utils";

const WHY_ITEMS = [
  {
    number: "01",
    title: "Born at the source",
    description: "Our team is Nairobi-raised and field-tested. We know which guides hold National Geographic attention at 5am, which camps earn their rates, and which seasons reward patience.",
    image: "ui/why-africa.jpg",
  },
  {
    number: "02",
    title: "No templates. Ever.",
    description: "We have never sent two clients the same itinerary. Every journey opens with a conversation about who you are, what moves you, and what you have already seen.",
    image: "ui/why-tailored.jpg",
  },
  {
    number: "03",
    title: "Private access, always",
    description: "We work exclusively with owner-run camps and independent guides. The concessions we use are not listed on booking sites. They are introductions — and they are ours to make.",
    image: "ui/why-concierge.jpg",
  },
  {
    number: "04",
    title: "Conservation is the journey",
    description: "Every camp we recommend operates a conservation model. Your fees fund anti-poaching patrols, school roofs, and wildlife corridors. Travel with us means something stays behind.",
    image: "ui/why-conservation.jpg",
  },
  {
    number: "05",
    title: "A human answers",
    description: "No chatbots. No ticket numbers. You will have a direct line to the specialist who designed your trip — before departure, during it, and if you ever need us at 3am.",
    image: "ui/why-human.jpg",
  },
];

export default function WhyUsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-wrapper" style={{ background: "var(--rima-cream)" }}>
      <div className="content-width">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="eyebrow" style={{ color: "var(--rima-gray)", display: "block", marginBottom: "1rem" }}>
            THE RIMA DIFFERENCE
          </span>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            color: "var(--rima-dark)",
          }}>
            Five reasons clients{" "}
            <em style={{ color: "var(--rima-gold)", fontStyle: "italic" }}>return</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontStyle: "italic", fontWeight: 300,
            color: "var(--rima-gray)",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            maxWidth: "480px", margin: "0.75rem auto 0", lineHeight: 1.85,
          }}>
            Luxury, to us, means nothing going wrong when it counts —
            and everything feeling effortless when it does not.
          </p>
        </div>

        {/* Swipe carousel — scrollbar fully hidden */}
        <div className="swipe-carousel" style={{ gap: "1.25rem", paddingBottom: "0.25rem" }}>
          {WHY_ITEMS.map((item, i) => (
            <div key={i} style={{
              width: "clamp(260px, 72vw, 300px)",
              background: "white",
              padding: "0.75rem",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              flexShrink: 0,
            }}>
              <div style={{
                width: "100%", height: "176px",
                backgroundImage: `url(${r2Url(item.image)})`,
                backgroundSize: "cover", backgroundPosition: "center",
                background: "var(--rima-jungle)", marginBottom: "0.75rem",
              }} />
              <p style={{ fontSize: "0.58rem", fontWeight: 300, color: "var(--rima-gray)", marginBottom: "0.4rem" }}>
                N<sup>o</sup> {item.number} / {String(WHY_ITEMS.length).padStart(2,"0")}
              </p>
              <h3 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300, fontSize: "1.15rem",
                color: "var(--rima-dark)", marginBottom: "0.4rem",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.76rem", color: "var(--rima-gray)", lineHeight: 1.72,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dot pagination */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
          {WHY_ITEMS.map((_, i) => (
            <div key={i} onClick={() => setActive(i)}
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: i === active ? "var(--rima-gold)" : "rgba(0,0,0,0.15)",
                cursor: "pointer", transition: "background 0.2s",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}