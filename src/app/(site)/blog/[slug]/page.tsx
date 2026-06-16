export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="section-wrapper">
      <div className="content-width py-20 text-center">
        <p style={{ color: "var(--rima-gray)" }}>Blog post: {params.slug}</p>
      </div>
    </div>
  );
}