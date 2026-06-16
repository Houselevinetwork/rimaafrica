import Link from "next/link";
import { r2Url } from "@/lib/utils";

const POSTS = [
  { slug:"great-wildebeest-migration-guide", title:"The Great Wildebeest Migration: Everything You Need to Know", category:"#KENYA",   tall:true  },
  { slug:"best-time-maasai-mara",            title:"Best Time to Visit the Maasai Mara",                         category:"#SAFARI",  tall:false },
  { slug:"seychelles-honeymoon-guide",       title:"Why Seychelles is Africa's Finest Honeymoon Destination",    category:"#HONEYMOON",tall:true  },
  { slug:"gorilla-trekking-rwanda-guide",    title:"Gorilla Trekking in Rwanda: A Complete Guide",               category:"#RWANDA",  tall:false }
];

export default function BlogPreview() {
  return (
    <section className="bg-white" style={{ padding:"var(--section-py) 0" }}>
      <div className="max-w-[var(--site-max)] mx-auto">
        {/* Heading */}
        <div className="text-center mb-24 px-[var(--section-px)]">
          <p className="eyebrow mb-4">LATEST FROM OUR JOURNAL</p>
          <h2 className="font-serif font-light" style={{ fontSize:"clamp(2rem,4vw,2.8rem)", color:"var(--rima-dark)" }}>
            Get <em style={{ color:"var(--rima-gold)" }}>inspired</em>
          </h2>
          <p className="font-sans font-light italic mt-5 max-w-xs mx-auto leading-[1.81]"
            style={{ fontSize:"0.856rem", color:"var(--rima-gray)" }}>
            Unleash your imagination and envision breathtaking destinations, profound experiences,
            and the unforgettable memories you will create.
          </p>
        </div>

        {/* Cards � full-bleed */}
        <div className="px-6">
          <div className="flex gap-6 items-start">
            {POSTS.map((post, i) => {
              const height  = post.tall ? 481 : 433;
              const offsetH = post.tall ? 481 : 457;
              const offset  = i % 2 !== 0;
              return (
                <div key={post.slug} className="flex-1 relative"
                  style={{ height:`${offsetH}px`, marginTop: offset ? "24px" : "0" }}>
                  <Link href={`/blog/${post.slug}`} className="block"
                    style={{ height:`${height}px` }}>
                    <div className="absolute overflow-hidden"
                      style={{ top: post.tall ? "14.82px":"13.34px",
                        left: post.tall ? "37.62px":"33.85px",
                        right: post.tall ? "37.62px":"33.85px", bottom:0 }}>
                      {/* Category vertical label */}
                      <span className="font-sans text-white absolute z-10"
                        style={{ fontSize:"0.656rem", writingMode:"vertical-lr",
                          transform:"rotate(180deg)", top:"3.78rem", left:0 }}>
                        {post.category}
                      </span>
                      {/* Image */}
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 bg-rima-jungle-dark"
                        style={{ backgroundImage:`url(${r2Url(`blog/${post.slug}/cover.jpg`)})` }} />
                      {/* Gradient */}
                      <div className="absolute inset-0"
                        style={{ background:"linear-gradient(to top, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0) 100%)" }} />
                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-center">
                        <p className="text-white font-sans font-light"
                          style={{ fontSize:"1.28rem", lineHeight:1.4 }}>
                          {post.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full" style={{ background:"var(--rima-gold)" }} />
            <div className="w-2 h-2 rounded-full bg-black opacity-20" />
            <div className="w-2 h-2 rounded-full bg-black opacity-20" />
          </div>
        </div>

        <div className="text-center mt-10 px-[var(--section-px)]">
          <Link href="/blog" className="btn-jungle text-sm">View All Journal Entries</Link>
        </div>
      </div>
    </section>
  );
}
