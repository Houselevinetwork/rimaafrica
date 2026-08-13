import Link from "next/link";
import { r2Url } from "@/lib/utils";

export default function ExploreCircle() {
  return (
    <section className="relative overflow-hidden" style={{ padding:"6rem var(--section-px)" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage:`url(${r2Url("ui/hero-placeholder.jpg")})` }} />
      <div className="absolute inset-0 bg-rima-dark" style={{ opacity:"0.06" }} />
      {/* Main image frame */}
      <div className="relative z-10 max-w-[var(--content-max)] mx-auto">
        <div className="relative w-full overflow-hidden bg-rima-jungle-dark"
          style={{ height:"623px",
            backgroundImage:`url(${r2Url("destinations/kenya/hero.jpg")})`,
            backgroundSize:"cover", backgroundPosition:"center" }}>
          {/* Circle CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <p className="text-white font-sans font-light" style={{ fontSize:"1.24rem", lineHeight:1.81 }}>
              Are you ready
            </p>
            <Link href="/destinations" className="explore-circle">
              <span className="font-serif italic text-white font-light" style={{ fontSize:"2.04rem", lineHeight:1.72 }}>
                Explore Now
              </span>
            </Link>
            <p className="text-white font-sans font-light" style={{ fontSize:"1.23rem", lineHeight:1.83 }}>
              for your next adventure?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
