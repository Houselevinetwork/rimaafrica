"use client";
import { useState } from "react";
import { CONTINENT_GROUPS, EXPERIENCE_TYPES } from "@/data/destinations";
import type { InquiryPayload, BudgetTier } from "@/types";
import { cn } from "@/lib/utils";

const STEPS = ["When","Where","Who","Experience","Contact"];

const BUDGETS: { value: BudgetTier; label: string; note: string }[] = [
  { value:"essential",    label:"Essential",       note:"Comfortable and value-focused" },
  { value:"mid-range",    label:"Mid-Range",        note:"Quality lodges with excellent service" },
  { value:"luxury",       label:"Luxury",           note:"Award-winning properties, ~$1,000+/pp/night" },
  { value:"ultra-luxury", label:"Ultra-Luxury",     note:"Exclusive-use flagship properties, $2,500+/pp/night" },
  { value:"open",         label:"Not sure yet",     note:"Our specialist will guide you" }
];

export default function PlanWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<InquiryPayload>>({
    destinations:[], preferredContact:["whatsapp"],
    datesApproximate:false, firstTimeSafari:true, adults:2, children:0
  });
  const [submitted, setSubmitted] = useState(false);

  const upd = (k: keyof InquiryPayload, v: unknown) =>
    setForm(f => ({ ...f, [k]: v }));

  const toggleDest = (slug: string) => {
    const c = form.destinations || [];
    upd("destinations", c.includes(slug) ? c.filter((d: string) => d !== slug) : [...c, slug]);
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/inquiries", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
    } catch {}
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-full bg-rima-jungle mx-auto flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h2 className="font-serif font-light text-3xl mb-4" style={{ color:"var(--rima-dark)" }}>
        Thank you, {form.firstName || "Explorer"}!
      </h2>
      <p style={{ color:"var(--rima-gray)" }}>
        Your enquiry has been received. A Rima Africa specialist will be in touch within 4 hours.
      </p>
      <a href="https://wa.me/254714728554" target="_blank" rel="noopener noreferrer"
        className="btn-primary inline-block mt-6">Chat on WhatsApp</a>
    </div>
  );

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s,i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans shrink-0 transition-colors",
              i < step ? "bg-rima-jungle text-white" :
              i === step ? "bg-rima-gold text-rima-dark" : "bg-rima-cream text-rima-gray")}>
              {i < step ? "?" : i+1}
            </div>
            {i < STEPS.length-1 && (
              <div className={cn("flex-1 h-px", i < step ? "bg-rima-jungle" : "bg-rima-cream-dark")} />
            )}
          </div>
        ))}
      </div>

      <p className="eyebrow text-left mb-2" style={{ color:"var(--rima-earth)" }}>
        Step {step+1} of {STEPS.length}
      </p>
      <h2 className="font-serif font-light mb-8" style={{ fontSize:"1.75rem", color:"var(--rima-dark)" }}>
        {step===0 && <>When would you like to <em style={{ color:"var(--rima-gold)" }}>travel?</em></>}
        {step===1 && <>Where would you like to <em style={{ color:"var(--rima-gold)" }}>go?</em></>}
        {step===2 && <>Who is <em style={{ color:"var(--rima-gold)" }}>joining?</em></>}
        {step===3 && <>What kind of <em style={{ color:"var(--rima-gold)" }}>experience?</em></>}
        {step===4 && <>Your <em style={{ color:"var(--rima-gold)" }}>contact details</em></>}
      </h2>

      {/* Step 1 � When */}
      {step===0 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-sans mb-2" style={{ color:"var(--rima-earth)" }}>Preferred arrival date</label>
            <input type="date" onChange={e => upd("arrivalDate",e.target.value)}
              className="w-full border px-4 py-3 text-sm outline-none focus:border-rima-jungle"
              style={{ borderColor:"var(--rima-cream-dark)" }} />
          </div>
          <div>
            <label className="block text-xs font-sans mb-2" style={{ color:"var(--rima-earth)" }}>Length of stay</label>
            <select onChange={e => upd("durationNights",parseInt(e.target.value))}
              className="w-full border px-4 py-3 text-sm bg-white outline-none"
              style={{ borderColor:"var(--rima-cream-dark)" }}>
              {[3,4,5,6,7,8,9,10,12,14,21].map(n => (
                <option key={n} value={n}>{n} nights</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!form.datesApproximate}
              onChange={e => upd("datesApproximate",e.target.checked)} className="accent-rima-jungle" />
            <span className="text-sm" style={{ color:"var(--rima-gray)" }}>My dates are approximate</span>
          </label>
          <div>
            <p className="text-xs mb-3" style={{ color:"var(--rima-earth)" }}>Safari experience</p>
            <div className="flex gap-3">
              {[{v:true,l:"First safari"},{v:false,l:"Experienced traveller"}].map(opt => (
                <button key={String(opt.v)} type="button"
                  onClick={() => upd("firstTimeSafari",opt.v)}
                  className={cn("flex-1 py-3 px-4 text-sm border transition-colors",
                    form.firstTimeSafari===opt.v ? "border-rima-jungle bg-rima-jungle text-white" : "border-rima-cream-dark")}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 � Where */}
      {step===1 && (
        <div className="space-y-8">
          {CONTINENT_GROUPS.map(group => (
            <div key={group.id}>
              <p className="eyebrow text-left mb-3"
                style={{ color: group.id==="indian-ocean-islands" ? "var(--rima-teal)" : "var(--rima-jungle)" }}>
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.destinations.map(d => {
                  const sel = form.destinations?.includes(d.slug);
                  return (
                    <button key={d.slug} type="button" onClick={() => toggleDest(d.slug)}
                      className={cn("px-4 py-2 text-sm border transition-colors",
                        sel ? "border-rima-jungle bg-rima-jungle text-white" : "border-rima-cream-dark hover:border-rima-jungle")}>
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="text-xs" style={{ color:"var(--rima-gray)" }}>
            Select all that interest you � or leave blank if undecided and we will guide you.
          </p>
        </div>
      )}

      {/* Step 3 � Who */}
      {step===2 && (
        <div className="space-y-6">
          {[{l:"Adults",k:"adults" as keyof InquiryPayload},{l:"Children",k:"children" as keyof InquiryPayload}].map(({l,k}) => (
            <div key={l} className="flex items-center justify-between">
              <span className="font-sans text-sm" style={{ color:"var(--rima-dark)" }}>{l}</span>
              <div className="flex items-center gap-4">
                <button type="button"
                  onClick={() => upd(k, Math.max(0,(form[k] as number||0)-1))}
                  className="w-8 h-8 border flex items-center justify-center text-lg"
                  style={{ borderColor:"var(--rima-cream-dark)" }}>-</button>
                <span className="w-6 text-center text-sm">{form[k] as number||0}</span>
                <button type="button"
                  onClick={() => upd(k, (form[k] as number||0)+1)}
                  className="w-8 h-8 border flex items-center justify-center text-lg"
                  style={{ borderColor:"var(--rima-cream-dark)" }}>+</button>
              </div>
            </div>
          ))}
          <div>
            <p className="text-xs mb-3" style={{ color:"var(--rima-earth)" }}>Trip type</p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_TYPES.map(t => (
                <button key={t.slug} type="button" onClick={() => upd("tripType",t.slug)}
                  className={cn("px-4 py-2 text-sm border transition-colors",
                    form.tripType===t.slug ? "border-rima-jungle bg-rima-jungle text-white" : "border-rima-cream-dark hover:border-rima-jungle")}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4 � Experience */}
      {step===3 && (
        <div className="space-y-6">
          <div>
            <p className="text-xs mb-3" style={{ color:"var(--rima-earth)" }}>Budget tier</p>
            <div className="space-y-2">
              {BUDGETS.map(opt => (
                <button key={opt.value} type="button" onClick={() => upd("budgetTier",opt.value)}
                  className={cn("w-full text-left px-4 py-3 border transition-colors",
                    form.budgetTier===opt.value ? "border-rima-jungle bg-rima-cream" : "border-rima-cream-dark hover:border-rima-jungle")}>
                  <p className="font-sans font-medium text-sm" style={{ color:"var(--rima-dark)" }}>{opt.label}</p>
                  <p className="font-sans text-xs mt-0.5" style={{ color:"var(--rima-gray)" }}>{opt.note}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs mb-2" style={{ color:"var(--rima-earth)" }}>Additional notes or interests</label>
            <textarea rows={4} onChange={e => upd("otherNotes",e.target.value)}
              className="w-full border px-4 py-3 text-sm outline-none resize-none"
              style={{ borderColor:"var(--rima-cream-dark)" }} />
          </div>
        </div>
      )}

      {/* Step 5 � Contact */}
      {step===4 && (
        <div className="space-y-4">
          {[
            {k:"firstName" as keyof InquiryPayload, l:"First name *",                          t:"text"},
            {k:"email"     as keyof InquiryPayload, l:"Email address *",                       t:"email"},
            {k:"phone"     as keyof InquiryPayload, l:"Phone / WhatsApp (with country code)", t:"tel"}
          ].map(field => (
            <div key={field.k}>
              <label className="block text-xs mb-1.5" style={{ color:"var(--rima-earth)" }}>{field.l}</label>
              <input type={field.t} onChange={e => upd(field.k,e.target.value)}
                className="w-full border px-4 py-3 text-sm outline-none focus:border-rima-jungle"
                style={{ borderColor:"var(--rima-cream-dark)" }} />
            </div>
          ))}
          <div>
            <p className="text-xs mb-2" style={{ color:"var(--rima-earth)" }}>Preferred contact method</p>
            <div className="flex gap-2 flex-wrap">
              {["email","whatsapp","phone"].map(m => {
                const sel = form.preferredContact?.includes(m);
                return (
                  <button key={m} type="button"
                    onClick={() => {
                      const c = (form.preferredContact || []) as string[];
                      upd("preferredContact", sel ? c.filter((x: string) => x!==m) : [...c,m]);
                    }}
                    className={cn("px-4 py-2 capitalize text-sm border transition-colors",
                      sel ? "border-rima-jungle bg-rima-jungle text-white" : "border-rima-cream-dark hover:border-rima-jungle")}>
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t" style={{ borderColor:"var(--rima-cream-dark)" }}>
        {step > 0
          ? <button type="button" onClick={() => setStep(s => s-1)} className="btn-jungle text-sm">? Previous</button>
          : <div />}
        {step < STEPS.length-1
          ? <button type="button" onClick={() => setStep(s => s+1)} className="btn-primary text-sm">Next ?</button>
          : <button type="button" onClick={handleSubmit} className="btn-primary text-sm">Submit Enquiry</button>}
      </div>
    </div>
  );
}
