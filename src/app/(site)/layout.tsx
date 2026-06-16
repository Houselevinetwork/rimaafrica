import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* paddingTop = exact nav height so hero sits flush below nav */}
      <main style={{ paddingTop: "var(--nav-h, 64px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}