import { notFound } from "next/navigation";
import { ITINERARIES, getItinerary } from "@/data/destinations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ITINERARIES.map(i => ({ slug: i.slug }));
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;
  const it = getItinerary(slug);
  if (!it) notFound();

  return (
    <div className="section-wrapper">
      <div className="content-width" style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 300 }}>{it.title}</h1>
        <p style={{ color: "var(--rima-gray)", marginTop: "1rem" }}>{it.summary}</p>
      </div>
    </div>
  );
}