import Link from "next/link";
import { CONTINENT_GROUPS } from "@/data/destinations";
import { coverImages } from "@/lib/media";

export default function TravelByCountry() {
  return (
    <section className="bg-white" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="max-w-[var(--site-max)] mx-auto">
        <div className="content-width">
          {/* Heading */}
          <div className="text-center mb-24">
            <p className="eyebrow mb-4">TRAVEL BY COUNTRY</p>
            <h2 className="font-serif font-light" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", color:"var(--rima-dark)" }}>
              Unforgettable safaris tailored{" "}
              <em style={{ color:"var(--rima-gold)" }}>to you</em>
            </h2>
            <p className="font-sans font-light italic mt-6 max-w-[41rem] mx-auto leading-[1.78]"
              style={{ fontSize:"0.87rem", color:"var(--rima-gray)" }}>
              Discover a world of boundless possibilities and embark on your dream adventure with our
              exceptional safari services. From the Maasai Mara to the Volcanoes of Rwanda, we curate
              every detail of your bespoke trip to perfection.
            </p>
          </div>

          {/* East Africa */}
          <div>
            <p className="eyebrow text-left mb-5" style={{ color:"var(--rima-jungle)" }}>East Africa</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CONTINENT_GROUPS[0].destinations.map(d => <CountryCard key={d.slug} slug={d.slug} name={d.name} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountryCard({ slug, name, accent = "jungle" }: { slug: string; name: string; accent?: string }) {
  return (
    <Link href={`/destinations/${slug}`} className="continent-card group block">
      <div className="relative w-full overflow-hidden bg-rima-jungle-dark" style={{ aspectRatio: "231/296" }}>
        <div className="absolute inset-0 bg-img bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage:`url(${coverImages[slug] || ""})` }} />
        <div className="absolute inset-0 img-overlay" />
        <div className="absolute bottom-0 left-0 right-0 px-2 pb-4 text-center">
          <p className="text-white font-sans font-light" style={{ fontSize:"1.5rem", lineHeight:1.4 }}>{name}</p>
        </div>
      </div>
    </Link>
  );
}
