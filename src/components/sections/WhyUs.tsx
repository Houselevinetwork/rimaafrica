"use client";

import { useState } from "react";

const WHY_US = [
  {
    number: "01",
    title: "Born at the source",
    description: "Our team is Nairobi-raised and field-tested. We know which guides hold your attention at 5am, which camps earn their rates, and which seasons reward patience.",
    image: "",
  },
  {
    number: "02",
    title: "No templates. Ever.",
    description: "We have never sent two clients the same itinerary. Every journey opens with a conversation about who you are, what moves you, and what you have already seen.",
    image: "",
  },
  {
    number: "03",
    title: "Private access, always",
    description: "We work exclusively with owner-run camps and independent guides. The concessions we use are not listed on booking sites. They are introductions — and they are ours to make.",
    image: "",
  },
  {
    number: "04",
    title: "Conservation is the journey",
    description: "Every camp we recommend operates a conservation model. Your fees fund anti-poaching patrols, school roofs, and wildlife corridors.",
    image: "",
  },
  {
    number: "05",
    title: "A human answers",
    description: "No chatbots. No ticket numbers. You will have a direct line to the specialist who designed your trip — before departure, during it, and if you need us at 3am.",
    image: "",
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "var(--rima-cream)", padding: "5rem 0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "3px", color: "#666666",
            textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
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
        </div>

        <div style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          scrollbarWidth: "none",
        }}>
          {WHY_US.map((item, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "clamp(260px, 72vw, 300px)",
                background: "white",
                padding: "1.5rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                flexShrink: 0,
                cursor: "pointer",
                borderTop: active === i ? "2px solid var(--rima-gold)" : "2px solid transparent",
                transition: "border-color 0.2s",
              }}
            >
              <p style={{
                fontSize: "0.58rem",
                fontWeight: 300,
                color: "var(--rima-gray)",
                marginBottom: "0.6rem",
              }}>
                N<sup>o</sup> {item.number} / 05
              </p>
              <h3 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "1.2rem",
                color: "var(--rima-dark)",
                marginBottom: "0.6rem",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.78rem",
                color: "var(--rima-gray)",
                lineHeight: 1.72,
                fontWeight: 300,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          div[style*="overflowX"]::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
          {WHY_US.map((_, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: i === active ? "var(--rima-gold)" : "rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}