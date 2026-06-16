export default function BrandStatement() {
  return (
    <section style={{ background: "var(--rima-dark)", padding: "var(--section-py) var(--section-px)" }}>
      <div className="max-w-[var(--site-max)] mx-auto">
        <div className="content-width">
          <div className="mb-16">
            <span className="font-serif text-white text-xl font-light tracking-widest opacity-70">
              RIMA AFRICA
            </span>
          </div>
          {/* Brand statement — 70% width centered as requested */}
          <div style={{ maxWidth: "70%", margin: "0 auto", textAlign: "center" }}>
            <p className="font-sans font-light text-white leading-[1.9]"
              style={{ fontSize: "clamp(0.9rem,1.8vw,1.15rem)" }}>
              We are a luxury safari company, providing bespoke private journeys across Africa and
              the Indian Ocean Islands that are tailored to each client&apos;s preferences. Our goal is to
              serve as a knowledgeable, well-travelled friend that our clients can rely on for advice
              and inspiration. By offering unique and immersive experiences beyond the guidebooks,
              we aim to help our clients truly discover the Africa we grew up in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}