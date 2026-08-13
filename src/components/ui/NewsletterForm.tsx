"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Open mailto — works without any API key
    const subject = encodeURIComponent("Newsletter Subscription — Rima Africa Safaris");
    const body = encodeURIComponent(
      `Hello Rima Africa Safaris,\n\nPlease add me to your safari inspiration newsletter.\n\nEmail: ${email}\n\nThank you.`
    );
    window.open(`mailto:safaris@rimaafrica.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white", padding: "0.6rem 0.85rem",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.78rem", outline: "none", width: "100%",
          boxSizing: "border-box",
        }}
      />
      <button type="submit" style={{
        background: "var(--rima-gold)", color: "white", border: "none",
        padding: "0.6rem 1rem", cursor: "pointer",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em",
        transition: "background 0.2s",
        width: "100%",
      }}>
        {sent ? "✓ OPENING YOUR EMAIL..." : "SUBSCRIBE"}
      </button>
      {sent && (
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          Your email client will open with a pre-filled message to safaris@rimaafrica.com
        </p>
      )}
    </form>
  );
}