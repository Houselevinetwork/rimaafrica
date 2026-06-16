import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{
        paddingTop: "var(--nav-h, 64px)",
        /* Sections scroll naturally over the hero —
           no isolation needed here, each section has its own background */
      }}>
        {children}
      </main>
      <Footer />
    </>
  );
}