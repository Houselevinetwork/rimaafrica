"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", destination: "", dates: "", travellers: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Safari Enquiry — ${form.name}`);
    const body = encodeURIComponent(
`Hello Rima Africa Safaris,

I would like to enquire about a bespoke safari.

Name: ${form.name}
Email: ${form.email}
Destination: ${form.destination}
Travel dates: ${form.dates}
Travellers: ${form.travellers}

${form.message}

Thank you.`
    );
    window.open(`mailto:safaris@rimaafrica.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
`Hello Rima Africa Safaris! 🌍

I would like to plan a safari.

Name: ${form.name || "(not provided)"}
Destination: ${form.destination || "(open to suggestions)"}
Dates: ${form.dates || "(flexible)"}
Travellers: ${form.travellers || "(TBD)"}

${form.message || "Please get in touch to discuss further."}`
    );
    window.open(`https://wa.me/254714728554?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const fields = [
    { key: "name",        label: "FULL NAME",             placeholder: "Your name",                       type: "text" },
    { key: "email",       label: "EMAIL ADDRESS",         placeholder: "you@example.com",                 type: "email" },
    { key: "destination", label: "DESTINATION IN MIND",   placeholder: "Kenya, Seychelles, Open...",      type: "text" },
    { key: "dates",       label: "TRAVEL DATES",          placeholder: "Month/year or season",            type: "text" },
    { key: "travellers",  label: "NUMBER OF TRAVELLERS",  placeholder: "2 adults, 1 child...",            type: "text" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    border: "1px solid var(--rima-cream-dark)",
    background: "var(--rima-cream)",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.85rem", color: "var(--rima-dark)",
    outline: "none", boxSizing: "border-box",
    fontWeight: 300,
  };

  return (
    <section className="section-wrapper">
      <div className="content-width" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
          {/* Left — contact details */}
          <div>
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>GET IN TOUCH</p>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, marginBottom: "1rem" }}>
              A real person <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>answers.</em>
            </h2>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "var(--rima-gray)", marginBottom: "2rem" }}>
              No automated replies. No ticket numbers.
              When you reach out, a specialist responds — usually within the hour.
            </p>
            {[
              { label: "EMAIL", value: "safaris@rimaafrica.com", href: "mailto:safaris@rimaafrica.com" },
              { label: "WHATSAPP", value: "+254 714 728 554", href: "https://wa.me/254714728554" },
              { label: "LOCATION", value: "Narok Road, Nairobi, Kenya", href: null },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                  {c.label}
                </p>
                {c.href ? (
                  <a href={c.href} style={{ fontSize: "0.88rem", color: "var(--rima-dark)", textDecoration: "none", fontWeight: 300 }}>
                    {c.value}
                  </a>
                ) : (
                  <p style={{ fontSize: "0.88rem", color: "var(--rima-dark)", fontWeight: 300, margin: 0 }}>{c.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div>
            <p className="eyebrow mb-4" style={{ color: "var(--rima-gold)" }}>ENQUIRY FORM</p>
            {submitted ? (
              <div style={{ padding: "2rem", background: "var(--rima-cream)", textAlign: "center" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "var(--rima-dark)", marginBottom: "0.5rem" }}>
                  Thank you ✓
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--rima-gray)", lineHeight: 1.7 }}>
                  Your message is on its way. We will be in touch shortly.
                </p>
                <button onClick={() => setSubmitted(false)}
                  style={{ marginTop: "1rem", background: "none", border: "1px solid var(--rima-gold)", color: "var(--rima-gold)", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {fields.map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: "0.52rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "0.52rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.3rem" }}>
                    YOUR MESSAGE
                  </label>
                  <textarea rows={4} placeholder="Tell us about your dream journey..."
                    value={form.message} onChange={e => set("message", e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                {/* Two submit options */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button type="submit" style={{
                    background: "var(--rima-gold)", color: "white", border: "none",
                    padding: "0.85rem", cursor: "pointer",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em",
                  }}>
                    SEND BY EMAIL
                  </button>
                  <button type="button" onClick={handleWhatsApp} style={{
                    background: "var(--rima-jungle-dark)", color: "white",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    padding: "0.85rem", cursor: "pointer",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                  }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.554 4.103 1.524 5.832L0 24l6.335-1.499A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.374l-.36-.214-3.733.883.934-3.617-.235-.372A9.818 9.818 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/>
                    </svg>
                    WHATSAPP
                  </button>
                </div>
                <p style={{ fontSize: "0.65rem", color: "var(--rima-gray)", lineHeight: 1.6, marginTop: "0.25rem" }}>
                  "Send by Email" opens your email app with the form pre-filled.
                  "WhatsApp" sends your details directly to our team in Nairobi.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}