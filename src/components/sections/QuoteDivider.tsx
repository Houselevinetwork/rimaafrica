export default function QuoteDivider({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="bg-white" style={{ padding:"0 var(--section-px)" }}>
      <div className="max-w-[var(--site-max)] mx-auto">
        <div className="content-width py-16">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex-1 h-px" style={{ background:"var(--rima-gold)", minWidth:"60px" }} />
            <div className="max-w-[20rem] text-center space-y-5">
              <div className="flex justify-center opacity-10">
                <svg width="32" height="27" viewBox="0 0 32 27">
                  <path d="M0 27V16.2C0 11.88 1.2 8.16 3.6 5.04 6 1.92 9.36 0 13.68 0L15.36 2.88C12.72 3.6 10.68 5.04 9.24 7.2 7.8 9.36 7.2 11.76 7.44 14.4H13.44V27H0ZM18.24 27V16.2C18.24 11.88 19.44 8.16 21.84 5.04 24.24 1.92 27.6 0 31.92 0L33.6 2.88C30.96 3.6 28.92 5.04 27.48 7.2 26.04 9.36 25.44 11.76 25.68 14.4H31.68V27H18.24Z"
                    fill="var(--rima-dark)" />
                </svg>
              </div>
              <p className="font-sans font-light italic leading-[1.83] text-center"
                style={{ fontSize:"0.84rem", color:"var(--rima-dark)" }}>{quote}</p>
              <p className="eyebrow" style={{ color:"var(--rima-gray)" }}>{attribution}</p>
            </div>
            <div className="flex-1 h-px" style={{ background:"var(--rima-gold)", minWidth:"60px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
