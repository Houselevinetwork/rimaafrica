"use client";

import { useState } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import FAQSchema from "@/components/seo/FAQSchema";

const R2 = process.env.NEXT_PUBLIC_R2_URL || "";

const FAQS = [
  { question: "How far in advance should I book my safari?", answer: "We recommend booking 6–12 months in advance for peak season (July–October). However we can arrange exceptional experiences with shorter notice depending on availability." },
  { question: "Do you handle all travel logistics?", answer: "Yes — we arrange everything from international flights and visas to transfers, accommodation, guides, and conservation fees. You simply arrive." },
  { question: "What is the minimum budget for a Rima Africa safari?", answer: "Our bespoke journeys typically start from USD 3,000 per person for a 5-night itinerary. Rates vary by destination, season and lodge preference." },
  { question: "Can you accommodate dietary requirements?", answer: "Absolutely. All dietary requirements, allergies and medical considerations are communicated to every lodge and camp before your arrival." },
  { question: "Do you travel with children?", answer: "Many of our destinations are wonderful for families. We advise on age restrictions for specific activities and design itineraries that keep every family member engaged." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <FAQSchema items={FAQS} />

      <PageHero
        title="Contact"
        subtitle="We are eager to hear from you."
        bgImage={R2 ? `${R2}/ui/contact-hero.jpg` : ""}
        overlayOpacity={0.48}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Contact body */}
      <section className="section-wrapper">
        <div className="content-width">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem" }}
            className="flex-col-on-mobile">

            {/* Left — info */}
            <div>
              <h2 className="font-serif font-light mb-8" style={{ fontSize: "2rem" }}>
                Get in <em>touch</em>
              </h2>
              {[
                { label: "EMAIL", value: "safaris@rimaafrica.com", href: "mailto:safaris@rimaafrica.com" },
                { label: "WHATSAPP", value: "+254 714 728 554", href: "https://wa.me/254714728554" },
                { label: "LOCATION", value: "Narok Road, Nairobi, Kenya", href: null },
              ].map(item => (
                <div key={item.label} className="mb-7">
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.35rem" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)", textDecoration: "none" }}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)" }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}

              {/* Response promise */}
              <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--rima-cream)", borderLeft: "2px solid var(--rima-gold)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--rima-earth)", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                  OUR PROMISE
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--rima-dark)", lineHeight: 1.7 }}>
                  Every enquiry is answered by a human safari specialist within 4 hours. No bots. No scripts.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 className="font-serif font-light mb-8" style={{ fontSize: "2rem" }}>
                Send us a <em>message</em>
              </h2>

              {sent ? (
                <div style={{ padding: "2rem", background: "var(--rima-cream)", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--rima-gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <p className="font-serif font-light" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>Message received</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--rima-gray)" }}>We will be in touch within 4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[["firstName","First Name","text",true],["lastName","Last Name","text",false]].map(([k,l,t,r]) => (
                      <div key={k as string}>
                        <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--rima-earth)", marginBottom: "0.4rem" }}>
                          {l as string} {r && "*"}
                        </label>
                        <input type={t as string} required={r as boolean}
                          style={{ width: "100%", border: "1px solid var(--rima-cream-dark)", padding: "0.7rem 0.9rem", fontSize: "0.85rem", outline: "none", background: "white" }}
                          value={form[k as keyof typeof form]} onChange={e => u(k as string, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  {[["email","Email Address *","email"],["phone","Phone / WhatsApp","tel"]].map(([k,l,t]) => (
                    <div key={k}>
                      <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--rima-earth)", marginBottom: "0.4rem" }}>{l}</label>
                      <input type={t} required={k === "email"}
                        style={{ width: "100%", border: "1px solid var(--rima-cream-dark)", padding: "0.7rem 0.9rem", fontSize: "0.85rem", outline: "none", background: "white" }}
                        value={form[k as keyof typeof form]} onChange={e => u(k, e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--rima-earth)", marginBottom: "0.4rem" }}>YOUR MESSAGE</label>
                    <textarea rows={5} style={{ width: "100%", border: "1px solid var(--rima-cream-dark)", padding: "0.7rem 0.9rem", fontSize: "0.85rem", outline: "none", resize: "none", background: "white" }}
                      placeholder="Tell us where you want to go, when, and who you are travelling with..."
                      value={form.message} onChange={e => u("message", e.target.value)} />
                  </div>
                  <button type="submit" disabled={sending}
                    style={{ background: "var(--rima-gold)", color: "white", border: "none", padding: "0.9rem 2rem", fontSize: "0.72rem", letterSpacing: "0.14em", fontWeight: 500, cursor: "pointer", width: "100%", opacity: sending ? 0.7 : 1 }}>
                    {sending ? "SENDING..." : "SEND MESSAGE →"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: "6rem", borderTop: "1px solid var(--rima-cream-dark)", paddingTop: "4rem" }}>
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>FAQ</p>
            <h2 className="font-serif font-light mb-10" style={{ fontSize: "2rem" }}>
              Common <em>questions</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {FAQS.map((faq, i) => (
                <FaqItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <WhatsAppFloat />
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--rima-cream-dark)" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 300, color: "var(--rima-dark)" }}>{question}</span>
        <span style={{ color: "var(--rima-gold)", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: "0.85rem", color: "var(--rima-gray)", lineHeight: 1.75, paddingBottom: "1.25rem", maxWidth: "640px" }}>{answer}</p>
      )}
    </div>
  );
}