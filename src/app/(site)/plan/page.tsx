"use client";

import { useState } from "react";
import Link from "next/link";
import { DESTINATIONS, EXPERIENCE_TYPES } from "@/data/destinations";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const STEPS = ["Destination", "Travel Style", "Dates & Group", "Your Details", "Submit"];

const BUDGETS = [
  { label: "USD 2,000 – 5,000", value: "2000-5000" },
  { label: "USD 5,000 – 10,000", value: "5000-10000" },
  { label: "USD 10,000 – 20,000", value: "10000-20000" },
  { label: "USD 20,000+", value: "20000+" },
  { label: "Flexible / advise me", value: "flexible" },
];

export default function PlanPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    destinations: [] as string[],
    travelStyle: "",
    travelMonth: "",
    travelYear: "",
    duration: "",
    adults: "2",
    children: "0",
    budget: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    hearAbout: "",
  });

  const update = (k: string, v: string | string[]) => setForm(p => ({ ...p, [k]: v }));

  const toggleDest = (slug: string) => {
    const cur = form.destinations;
    if (cur.includes(slug)) update("destinations", cur.filter(d => d !== slug));
    else update("destinations", [...cur, slug]);
  };

  const canNext = () => {
    if (step === 0) return form.destinations.length > 0;
    if (step === 1) return !!form.travelStyle;
    if (step === 2) return !!form.travelMonth && !!form.adults;
    if (step === 3) return !!form.firstName && !!form.email;
    return true;
  };

  const handleSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-rima-jungle flex items-center justify-center section-wrapper">
        <div className="content-width text-center max-w-lg mx-auto py-20">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: "var(--rima-gold)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-serif text-white font-light mb-4" style={{ fontSize: "2rem" }}>
            Your journey begins here
          </h1>
          <p className="text-white opacity-70 font-sans text-sm mb-8 leading-relaxed">
            Thank you, {form.firstName}. We have received your enquiry and one of our safari specialists will be in touch within 4 hours.
          </p>
          <p className="text-white opacity-50 text-xs mb-8">
            A confirmation has been sent to {form.email}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/" className="btn-primary">Return Home</Link>
            <a href="https://wa.me/254714728554" target="_blank" rel="noopener noreferrer"
              className="btn-outline">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-rima-jungle py-16 section-wrapper">
        <div className="content-width text-center">
          <p className="eyebrow mb-3" style={{ color: "var(--rima-gold)" }}>BEGIN YOUR JOURNEY</p>
          <h1 className="font-serif text-white font-light" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            Plan your <em>safari</em>
          </h1>
          <p className="text-white opacity-60 font-sans font-light text-sm mt-3 max-w-lg mx-auto">
            Tell us who you are and where you want to go. We will design the rest.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="sticky top-16 md:top-20 z-20 bg-white border-b" style={{ borderColor: "var(--rima-cream-dark)" }}>
        <div className="section-wrapper py-4">
          <div className="flex items-center gap-0 max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 text-xs font-medium transition-colors ${i <= step ? "cursor-pointer" : "cursor-default"}`}
                  style={{ color: i === step ? "var(--rima-gold)" : i < step ? "var(--rima-jungle)" : "var(--rima-gray)" }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-bold shrink-0"
                    style={{
                      background: i === step ? "var(--rima-gold)" : i < step ? "var(--rima-jungle)" : "var(--rima-cream-dark)",
                      color: i <= step ? "white" : "var(--rima-gray)",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  <span className="hidden md:block">{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2" style={{ background: i < step ? "var(--rima-jungle)" : "var(--rima-cream-dark)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard body */}
      <section className="section-wrapper">
        <div className="content-width max-w-3xl mx-auto">

          {/* STEP 0: Destination */}
          {step === 0 && (
            <div className="wizard-step active">
              <h2 className="font-serif font-light mb-2" style={{ fontSize: "1.8rem" }}>
                Where would you like to <em>travel?</em>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--rima-gray)" }}>
                Select one or more destinations. Not sure? Choose what inspires you most and we will advise.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DESTINATIONS.map(d => (
                  <button
                    key={d.slug}
                    onClick={() => toggleDest(d.slug)}
                    className="text-left border transition-all p-4 relative"
                    style={{
                      borderColor: form.destinations.includes(d.slug) ? "var(--rima-gold)" : "var(--rima-cream-dark)",
                      background: form.destinations.includes(d.slug) ? "rgba(201,168,76,0.06)" : "white",
                    }}
                  >
                    {form.destinations.includes(d.slug) && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.6rem]"
                        style={{ background: "var(--rima-gold)" }}>✓</span>
                    )}
                    <p className="font-serif font-light mb-1" style={{ fontSize: "1rem", color: "var(--rima-dark)" }}>
                      {d.name}
                    </p>
                    <p className="text-[0.7rem]" style={{ color: "var(--rima-gray)" }}>
                      {d.continentGroup.replace(/-/g, " ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Travel Style */}
          {step === 1 && (
            <div className="wizard-step active">
              <h2 className="font-serif font-light mb-2" style={{ fontSize: "1.8rem" }}>
                What kind of <em>traveller</em> are you?
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--rima-gray)" }}>
                Select the travel style that best describes this journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPERIENCE_TYPES.map(t => (
                  <button
                    key={t.slug}
                    onClick={() => update("travelStyle", t.slug)}
                    className="text-left border transition-all p-5"
                    style={{
                      borderColor: form.travelStyle === t.slug ? "var(--rima-gold)" : "var(--rima-cream-dark)",
                      background: form.travelStyle === t.slug ? "rgba(201,168,76,0.06)" : "white",
                    }}
                  >
                    <p className="font-serif font-light mb-1" style={{ fontSize: "1.1rem", color: "var(--rima-dark)" }}>
                      {t.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--rima-gray)", lineHeight: 1.6 }}>{t.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Dates & Group */}
          {step === 2 && (
            <div className="wizard-step active">
              <h2 className="font-serif font-light mb-2" style={{ fontSize: "1.8rem" }}>
                When are you <em>travelling?</em>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--rima-gray)" }}>
                Approximate dates help us match you to the best conditions and availability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    PREFERRED MONTH
                  </label>
                  <select className="w-full border px-4 py-3 text-sm bg-white outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.travelMonth} onChange={e => update("travelMonth", e.target.value)}>
                    <option value="">Select month</option>
                    {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                      <option key={m}>{m}</option>
                    ))}
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    YEAR
                  </label>
                  <select className="w-full border px-4 py-3 text-sm bg-white outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.travelYear} onChange={e => update("travelYear", e.target.value)}>
                    <option value="">Select year</option>
                    <option>2025</option><option>2026</option><option>2027</option><option>2028</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    TRIP DURATION
                  </label>
                  <select className="w-full border px-4 py-3 text-sm bg-white outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.duration} onChange={e => update("duration", e.target.value)}>
                    <option value="">How many nights?</option>
                    {["3–5 nights","6–8 nights","9–12 nights","13–18 nights","19+ nights","Not sure yet"].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    BUDGET PER PERSON (USD)
                  </label>
                  <select className="w-full border px-4 py-3 text-sm bg-white outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.budget} onChange={e => update("budget", e.target.value)}>
                    <option value="">Select budget range</option>
                    {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    NUMBER OF ADULTS
                  </label>
                  <input type="number" min="1" max="50" className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.adults} onChange={e => update("adults", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>
                    NUMBER OF CHILDREN (UNDER 18)
                  </label>
                  <input type="number" min="0" max="20" className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.children} onChange={e => update("children", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Your Details */}
          {step === 3 && (
            <div className="wizard-step active">
              <h2 className="font-serif font-light mb-2" style={{ fontSize: "1.8rem" }}>
                Tell us about <em>yourself</em>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--rima-gray)" }}>
                We keep your details private and never share them with third parties.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>FIRST NAME *</label>
                  <input type="text" required className="w-full border px-4 py-3 text-sm outline-none focus:border-rima-jungle transition-colors"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>LAST NAME</label>
                  <input type="text" className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>EMAIL ADDRESS *</label>
                  <input type="email" required className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>PHONE / WHATSAPP</label>
                  <input type="tel" className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.phone} onChange={e => update("phone", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>COUNTRY OF RESIDENCE</label>
                  <input type="text" className="w-full border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.country} onChange={e => update("country", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>HOW DID YOU HEAR ABOUT US?</label>
                  <select className="w-full border px-4 py-3 text-sm bg-white outline-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    value={form.hearAbout} onChange={e => update("hearAbout", e.target.value)}>
                    <option value="">Select one</option>
                    {["Google search","Instagram","Facebook","Friend or family referral","Travel agent","TripAdvisor","Press article","Repeat client","Other"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.1em" }}>ANYTHING ELSE WE SHOULD KNOW?</label>
                  <textarea rows={4} className="w-full border px-4 py-3 text-sm outline-none resize-none"
                    style={{ borderColor: "var(--rima-cream-dark)" }}
                    placeholder="Special occasions, dietary requirements, mobility considerations, dream experiences..."
                    value={form.message} onChange={e => update("message", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary */}
          {step === 4 && (
            <div className="wizard-step active">
              <h2 className="font-serif font-light mb-2" style={{ fontSize: "1.8rem" }}>
                Review your <em>enquiry</em>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--rima-gray)" }}>
                Everything looks right? Hit submit and we will be in touch within 4 hours.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Destinations", value: form.destinations.join(", ") || "—" },
                  { label: "Travel style", value: form.travelStyle || "—" },
                  { label: "When", value: [form.travelMonth, form.travelYear].filter(Boolean).join(" ") || "Flexible" },
                  { label: "Duration", value: form.duration || "Not specified" },
                  { label: "Group", value: `${form.adults} adult${parseInt(form.adults) > 1 ? "s" : ""}${parseInt(form.children) > 0 ? `, ${form.children} child${parseInt(form.children) > 1 ? "ren" : ""}` : ""}` },
                  { label: "Budget per person", value: form.budget || "Flexible" },
                  { label: "Name", value: [form.firstName, form.lastName].join(" ") || "—" },
                  { label: "Email", value: form.email || "—" },
                  { label: "Phone", value: form.phone || "—" },
                  { label: "Country", value: form.country || "—" },
                ].map(row => (
                  <div key={row.label} className="flex gap-4 py-3 border-b" style={{ borderColor: "var(--rima-cream-dark)" }}>
                    <p className="text-xs font-medium w-32 shrink-0" style={{ color: "var(--rima-earth)", letterSpacing: "0.08em" }}>
                      {row.label.toUpperCase()}
                    </p>
                    <p className="text-sm" style={{ color: "var(--rima-dark)" }}>{row.value}</p>
                  </div>
                ))}
                {form.message && (
                  <div className="py-3 border-b" style={{ borderColor: "var(--rima-cream-dark)" }}>
                    <p className="text-xs font-medium mb-2" style={{ color: "var(--rima-earth)", letterSpacing: "0.08em" }}>NOTES</p>
                    <p className="text-sm" style={{ color: "var(--rima-dark)" }}>{form.message}</p>
                  </div>
                )}
              </div>
              <p className="text-xs mb-6" style={{ color: "var(--rima-gray)", lineHeight: 1.7 }}>
                By submitting this form you agree to be contacted by Rima Africa Safaris regarding your safari enquiry. We will never share your details with third parties.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t" style={{ borderColor: "var(--rima-cream-dark)" }}>
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="text-sm font-medium transition-opacity disabled:opacity-30"
              style={{ color: "var(--rima-gray)" }}
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              {STEPS.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === step ? "var(--rima-gold)" : "var(--rima-cream-dark)" }} />
              ))}
            </div>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext() && setStep(s => s + 1)}
                disabled={!canNext()}
                className="btn-primary disabled:opacity-40"
              >
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary">
                Submit Enquiry →
              </button>
            )}
          </div>
        </div>
      </section>
      <WhatsAppFloat />
    </>
  );
}