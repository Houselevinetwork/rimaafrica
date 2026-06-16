"use client";

export default function NewsletterForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      form.reset();
      alert("Subscribed! Thank you.");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="flex-1 bg-transparent border border-white border-opacity-25 text-white text-xs px-3 py-2 outline-none focus:border-rima-gold placeholder-white placeholder-opacity-30 transition-colors"
      />
      <button
        type="submit"
        className="btn-primary text-[0.65rem] py-2 px-3 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}