import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title:"Our Guides", description:"Meet the Rima Africa safari guide team." };
export default function TeamPage() {
  return (<>
    <section className="bg-rima-jungle py-20 px-[var(--section-px)]">
      <div className="max-w-[var(--content-max)] mx-auto text-center">
        <p className="eyebrow text-rima-gold mb-4">THE TEAM</p>
        <h1 className="font-serif text-white font-light" style={{ fontSize:"clamp(2rem,5vw,3.5rem)" }}>
          Our <em style={{ color:"var(--rima-gold)" }}>Guides</em>
        </h1>
      </div>
    </section>
    <section className="section-wrapper">
      <div className="content-width">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4" style={{ color:"var(--rima-gray)", lineHeight:1.8 }}>
            Our guides are not employees assigned to your trip. They are specialists who have spent years � in many cases, entire careers � in the ecosystems they take you into. Each one is selected for a combination of field expertise, language capability, cultural knowledge, and the rare ability to make a landscape come alive for someone seeing it for the first time.
          </p>
          <p style={{ color:"var(--rima-gray)", lineHeight:1.8 }}>
            Guide profiles are being added individually. Contact us to be matched with the specialist best suited to your itinerary and interests.
          </p>
          <Link href="/plan" className="btn-primary inline-block mt-8">Plan a Safari</Link>
        </div>
      </div>
    </section>
  </>);
}
