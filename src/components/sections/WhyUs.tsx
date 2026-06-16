import { WHY_US } from "@/data/destinations";
import { r2Url } from "@/lib/utils";

export default function WhyUs() {
  return (
    <section style={{ background:"#F9F8F3", padding:"var(--section-py) 0" }}>
      <div className="max-w-[var(--site-max)] mx-auto">
        {/* Heading */}
        <div className="text-center mb-24 px-[var(--section-px)]">
          <p className="eyebrow mb-4">WHY US</p>
          <h2 className="font-serif font-light" style={{ fontSize:"clamp(1.8rem,3vw,2.53rem)", color:"var(--rima-dark)" }}>
            Why travel with <em style={{ color:"var(--rima-gold)" }}>us</em>
          </h2>
          <p className="font-sans font-light italic mt-5 max-w-sm mx-auto leading-[1.78]"
            style={{ fontSize:"0.869rem", color:"var(--rima-gray)" }}>
            At Rima Africa, we believe that luxury is not just about opulence � it is about creating
            one-of-a-kind experiences that bring people together and make the world a better place.
          </p>
        </div>

        {/* Cards row � full bleed */}
        <div className="px-6">
          <div className="flex gap-0 items-start min-h-[400px]">
            {WHY_US.map((item, i) => {
              const isDown = i % 2 === 0; // cards 1,3,5 offset down
              const cardH  = isDown ? 357 : 378;
              return (
                <div key={item.number} className="flex-1 pr-[30px]"
                  style={{ marginTop: isDown ? "36px" : "0" }}>
                  <div className="why-card" style={{ width:"304.58px", height:`${cardH}px` }}>
                    {/* Image */}
                    <div className="w-full bg-cover bg-center bg-rima-jungle-dark"
                      style={{ height:"171.61px",
                        backgroundImage:`url(${r2Url(item.image)})` }} />
                    {/* Number */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-sans font-light text-sm relative" style={{ color:"var(--rima-gray)" }}>
                        N<sup style={{ fontSize:"0.625rem", textDecoration:"underline" }}>o</sup>{item.number}
                      </span>
                      <span className="font-sans font-light text-xs" style={{ color:"var(--rima-gray)" }}>
                        {item.total}
                      </span>
                    </div>
                    {/* Title */}
                    <p className="font-sans font-light text-center mt-1"
                      style={{ fontSize:"1.28rem", color:"var(--rima-dark)", lineHeight:1.46 }}>
                      {item.title}
                    </p>
                    {/* Description */}
                    <p className="font-sans font-normal text-center"
                      style={{ fontSize:"0.712rem", color:"var(--rima-gray)", lineHeight:1.84 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-12">
            <div className="w-2 h-2 rounded-full" style={{ background:"var(--rima-gold)" }} />
            <div className="w-2 h-2 rounded-full bg-black opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
