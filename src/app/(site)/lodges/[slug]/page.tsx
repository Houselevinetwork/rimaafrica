export default function LodgePage({ params }: { params: { slug: string } }) {
  return (
    <div className="section-wrapper">
      <div className="content-width py-20 text-center">
        <p style={{ color: "var(--rima-gray)" }}>Lodge: {params.slug}</p>
      </div>
    </div>
  );
}