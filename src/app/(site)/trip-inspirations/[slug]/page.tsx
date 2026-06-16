export default function TripDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="section-wrapper">
      <div className="content-width py-20 text-center">
        <p style={{ color: "var(--rima-gray)" }}>Trip Inspiration: {params.slug}</p>
      </div>
    </div>
  );
}