import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const R2 = "https://pub-2560100921b74ce5abdb317f63f7ede4.r2.dev";

// All itineraries with photo + video for hero
const ITINERARIES: Record<string, {
  title: string; days: number; destination: string;
  fromPrice: number; summary: string; bestFor: string;
  highlights: string[]; dayByDay: { day: number; title: string; description: string }[];
  image: string; video: string;
}> = {
  "maasai-mara-classic-7": {
    title: "Classic Maasai Mara Safari", days: 7, destination: "Kenya",
    fromPrice: 5200,
    image: `${R2}/kenyaphoto.jpg`,
    video: `${R2}/kenyavideo.mp4`,
    summary: "Seven days in the Maasai Mara — the world's greatest wildlife reserve — with game drives at dawn and dusk, night drives, and a private tented camp on the river.",
    bestFor: "First-time safari travellers, couples, wildlife photography",
    highlights: [
      "Dawn game drives in the heart of the Maasai Mara",
      "Sundowner cocktails on the open plains",
      "Night drives with spotlight — leopard and aardvark territory",
      "Guided bush walk with Maasai warriors",
      "Fly-camp under the stars on the Mara River",
    ],
    dayByDay: [
      { day: 1, title: "Nairobi → Mara", description: "Morning flight from Wilson Airport to the Mara. Afternoon game drive. Welcome dinner in camp." },
      { day: 2, title: "Full day on the plains", description: "Dawn drive, breakfast in the bush, midday at camp, sunset drive. Night drive optional." },
      { day: 3, title: "Mara River crossing", description: "Full day focused on the Mara River — wildebeest crossings when in season, crocodile and hippo always." },
      { day: 4, title: "Northern conservancy", description: "Transfer to a private conservancy north of the Mara. Fewer vehicles, greater intimacy." },
      { day: 5, title: "Walking safari", description: "Guided bush walk at dawn with armed Maasai ranger. Full game drive in the afternoon." },
      { day: 6, title: "Fly-camp night", description: "Remote fly-camp on the Mara River. Dinner under the stars, sounds of the bush all night." },
      { day: 7, title: "Departure", description: "Final dawn drive before transferring to the airstrip. Midday flight back to Nairobi." },
    ],
  },
  "gorilla-trek-rwanda-5": {
    title: "Rwanda Gorilla Trek", days: 5, destination: "Rwanda",
    fromPrice: 6800,
    image: `${R2}/goldenmonkey.jpg`,
    video: "",
    summary: "Five extraordinary days in Rwanda — gorilla trekking in Volcanoes National Park, golden monkey tracking and the shores of Lake Kivu.",
    bestFor: "Wildlife enthusiasts, photographers, bucket-list travellers",
    highlights: [
      "Mountain gorilla trekking in Volcanoes National Park",
      "Golden monkey tracking in the bamboo forests",
      "Sunset on Lake Kivu with boat excursion",
      "Visit to the Dian Fossey Gorilla Fund",
      "Kigali city tour and Genocide Memorial",
    ],
    dayByDay: [
      { day: 1, title: "Kigali → Volcanoes", description: "Arrive Kigali. Transfer to Volcanoes National Park. Briefing on gorilla trekking etiquette." },
      { day: 2, title: "Gorilla trek", description: "Early morning trek into the park. One hour with a habituated gorilla family. Afternoon at leisure." },
      { day: 3, title: "Golden monkeys", description: "Dawn golden monkey tracking in the bamboo zone. Afternoon transfer to Lake Kivu." },
      { day: 4, title: "Lake Kivu", description: "Boat excursion on Lake Kivu. Visit to island community. Sundowner on the lake shore." },
      { day: 5, title: "Kigali departure", description: "Return to Kigali. Optional city tour before international flight." },
    ],
  },
  "okavango-fly-in-8": {
    title: "Okavango Delta Fly-In Safari", days: 8, destination: "Botswana",
    fromPrice: 9500,
    image: `${R2}/botswanaphoto.jpg`,
    video: `${R2}/botswanaherovideo.mp4`,
    summary: "Eight days of pure Botswana — mokoro canoes through papyrus channels, game drives across the Moremi, wild dogs and elephant herds.",
    bestFor: "Serious wildlife travellers, couples, photographers",
    highlights: [
      "Mokoro canoe through the Okavango papyrus channels",
      "Wild dog tracking in the Moremi Game Reserve",
      "Elephant herds at Chief's Island",
      "Night drives for pangolin and aardvark",
      "Fly-in access — no roads, no dust",
    ],
    dayByDay: [
      { day: 1, title: "Maun → Delta", description: "Fly from Maun into the heart of the delta. Afternoon mokoro canoe excursion." },
      { day: 2, title: "Okavango channels", description: "Full day by mokoro and on foot. Birdlife, hippos, sitatunga in the reeds." },
      { day: 3, title: "Chief's Island", description: "Transfer to Chief's Island — the largest island in the delta. Elephant herds, lion prides." },
      { day: 4, title: "Moremi Game Reserve", description: "Full day game drive in Moremi. Wild dog pack territory." },
      { day: 5, title: "Xigera or Pelo", description: "Transfer to a remote camp deeper in the delta. Walking safari at dawn." },
      { day: 6, title: "Night drives", description: "Specialist night drive guide. Pangolin, brown hyena, aardwolf if lucky." },
      { day: 7, title: "Savuti plains", description: "Transfer north to Savuti — lion and cheetah open plains country." },
      { day: 8, title: "Departure", description: "Final game drive before flight to Maun and connecting to Johannesburg or Nairobi." },
    ],
  },
  "seychelles-island-hopping-10": {
    title: "Seychelles Island Hopping", days: 10, destination: "Seychelles",
    fromPrice: 8500,
    image: `${R2}/seychelesherophoto.jpg`,
    video: `${R2}/seychelesherovideo.mp4`,
    summary: "Ten days across Mahé, Praslin and La Digue — granite beaches, the Valle de Mai, giant tortoises and the clearest water on earth.",
    bestFor: "Honeymoons, beach lovers, couples",
    highlights: [
      "Anse Lazio — one of the world's great beaches",
      "Valle de Mai UNESCO site — home of the coco de mer",
      "Snorkelling with whale sharks and manta rays",
      "Giant Aldabra tortoises on La Digue",
      "Private catamaran between islands",
    ],
    dayByDay: [
      { day: 1, title: "Arrival Mahé", description: "Arrive Seychelles International Airport. Transfer to luxury resort on Mahé." },
      { day: 2, title: "Mahé exploration", description: "Morne Seychellois National Park hike. Victoria market. Beau Vallon beach." },
      { day: 3, title: "Mahé → Praslin", description: "Ferry or chartered aircraft to Praslin. Anse Lazio beach afternoon." },
      { day: 4, title: "Valle de Mai", description: "Morning visit to the UNESCO Valle de Mai — coco de mer palms and black parrots." },
      { day: 5, title: "Praslin beaches", description: "Full free day. Anse Georgette, snorkelling at St Pierre island." },
      { day: 6, title: "Praslin → La Digue", description: "Ferry to La Digue. Bicycle to Anse Source d'Argent — most photographed beach in the world." },
      { day: 7, title: "La Digue", description: "Full day on La Digue. Giant tortoises at L'Union Estate. Snorkelling." },
      { day: 8, title: "Private island day trip", description: "Private catamaran charter to Cousin or Cousine island." },
      { day: 9, title: "Return Mahé", description: "Final morning on La Digue. Ferry to Mahé. Last beach afternoon." },
      { day: 10, title: "Departure", description: "Transfer to airport. International departure." },
    ],
  },
  "south-africa-classic-9": {
    title: "South Africa Classic", days: 9, destination: "South Africa",
    fromPrice: 5800,
    image: `${R2}/krugerherophoto.jpg`,
    video: `${R2}/southafricaherovideo.mp4`,
    summary: "Nine days combining a private game reserve Big Five safari with Cape Town — one of the world's great cities — and the Winelands.",
    bestFor: "First-time Africa visitors, families, diverse interests",
    highlights: [
      "Big Five game drives in a private Sabi Sand reserve",
      "Leopard sightings — Sabi Sand has the highest density in Africa",
      "Cape Town — Table Mountain, V&A Waterfront",
      "Stellenbosch and Franschhoek Winelands",
      "Cape Point and the Peninsula",
    ],
    dayByDay: [
      { day: 1, title: "Johannesburg → Sabi Sand", description: "Fly to Hoedspruit or Skukuza. Transfer to private game reserve. Evening drive." },
      { day: 2, title: "Sabi Sand full day", description: "Dawn drive, bush walk, afternoon drive. Excellent leopard territory." },
      { day: 3, title: "Big Five focus", description: "Full day in the reserve. Lion, leopard, elephant, buffalo, rhino — often all in one day." },
      { day: 4, title: "Final Sabi Sand", description: "Last morning drive before transfer to Johannesburg for connection to Cape Town." },
      { day: 5, title: "Cape Town arrival", description: "Table Mountain cable car if clear. V&A Waterfront dinner." },
      { day: 6, title: "Cape Peninsula", description: "Cape Point, Boulder's penguins, Hout Bay fishing village." },
      { day: 7, title: "Winelands", description: "Stellenbosch and Franschhoek — tasting menus at world-class restaurants." },
      { day: 8, title: "Cape Town at leisure", description: "Robben Island or Company's Garden. Bo-Kaap neighbourhood walk." },
      { day: 9, title: "Departure", description: "Final morning before international departure from Cape Town." },
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(ITINERARIES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const it = ITINERARIES[slug];
  if (!it) return {};
  return {
    title: `${it.title} | ${it.days}-Day ${it.destination} Safari`,
    description: it.summary.slice(0, 155),
    alternates: { canonical: `https://rimaafrica.com/itineraries/${slug}` },
  };
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params;
  const it = ITINERARIES[slug];
  if (!it) notFound();

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://rimaafrica.com" },
        { name: "Itineraries", url: "https://rimaafrica.com/itineraries" },
        { name: it.title, url: `https://rimaafrica.com/itineraries/${slug}` },
      ]} />

      {/* Hero — photo loads instantly, video fades in on top */}
      <PageHero
        title={it.title}
        badge={`${it.days} days · ${it.destination}`}
        bgImage={it.image}
        bgVideo={it.video}
        overlayOpacity={0.48}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Itineraries", href: "/itineraries" },
          { label: it.title },
        ]}
      />

      {/* Overview */}
      <section className="section-wrapper">
        <div className="content-width" style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { label: "DURATION",    value: `${it.days} days` },
              { label: "DESTINATION", value: it.destination },
              { label: "FROM",        value: `USD ${it.fromPrice.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{ padding: "1.25rem", background: "var(--rima-cream)", borderLeft: "2px solid var(--rima-gold)" }}>
                <p style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--rima-gold)", marginBottom: "0.4rem" }}>{s.label}</p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--rima-dark)" }}>{s.value}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "var(--rima-gray)", marginBottom: "1.5rem", fontWeight: 300 }}>
            {it.summary}
          </p>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--rima-gold)", marginBottom: "0.5rem" }}>BEST FOR</p>
          <p style={{ fontSize: "0.85rem", color: "var(--rima-gray)", marginBottom: "3rem", fontWeight: 300 }}>{it.bestFor}</p>

          {/* Highlights */}
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 300, marginBottom: "1.25rem" }}>
            Journey <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>highlights</em>
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {it.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.88rem", color: "var(--rima-gray)", lineHeight: 1.7, fontWeight: 300 }}>
                <span style={{ color: "var(--rima-gold)", flexShrink: 0, marginTop: "2px" }}>—</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Day by day */}
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
            Day by <em style={{ fontStyle: "italic", color: "var(--rima-gold)" }}>day</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            {it.dayByDay.map(d => (
              <div key={d.day} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, background: "var(--rima-jungle-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "var(--rima-gold)", letterSpacing: "0.05em" }}>
                    {String(d.day).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--rima-dark)", marginBottom: "0.25rem" }}>{d.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--rima-gray)", lineHeight: 1.7, fontWeight: 300 }}>{d.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/plan" style={{
              background: "var(--rima-gold)", color: "white", padding: "0.9rem 2rem",
              textDecoration: "none", fontFamily: "var(--font-inter),sans-serif",
              fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.1em",
            }}>
              ENQUIRE ABOUT THIS JOURNEY →
            </Link>
            <Link href="/itineraries" style={{
              border: "1px solid var(--rima-cream-dark)", color: "var(--rima-gray)",
              padding: "0.9rem 2rem", textDecoration: "none",
              fontFamily: "var(--font-inter),sans-serif",
              fontSize: "0.72rem", fontWeight: 300, letterSpacing: "0.06em",
            }}>
              ← All Itineraries
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}