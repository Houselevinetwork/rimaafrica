import type { Metadata } from "next";
export const metadata: Metadata = { title:"Gallery" };
export default function GalleryPage() { return <section className="section-wrapper"><div className="content-width text-center py-20"><h1 className="font-serif font-light text-4xl mb-6">Safari <em style={{ color:"var(--rima-gold)" }}>Gallery</em></h1><p style={{ color:"var(--rima-gray)" }}>Our gallery of proprietary safari photographs � coming soon.</p></div></section>; }
