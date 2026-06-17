// TEMPORARY DIAGNOSTIC PAGE — delete after confirming R2 works
// Visit /r2-test on your live site to see what is loading

const R2_BASE = process.env.NEXT_PUBLIC_R2_URL || "";

const TEST_FILES = [
  "kenyaphoto.jpg",
  "kenyavideo.mp4",
  "ngorongorocrater.jpg",
  "goldenmonkey.jpg",
  "zambiasafari.jpg",
  "gorillaphoto.jpg",
  "zanzibarherophoto.jpg",
  "botswanaphoto.jpg",
  "Namibiaphoto.jpg",
];

export default function R2TestPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1 style={{ marginBottom: "1rem" }}>R2 Media Diagnostic</h1>

      <div style={{ marginBottom: "2rem", padding: "1rem", background: "#f5f5f5" }}>
        <strong>NEXT_PUBLIC_R2_URL:</strong>{" "}
        <span style={{ color: R2_BASE ? "green" : "red" }}>
          {R2_BASE || "⚠ NOT SET — env var missing in Cloudflare Pages"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
        {TEST_FILES.map(file => {
          const url = R2_BASE ? `${R2_BASE}/${file}` : "";
          return (
            <div key={file} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
              <p style={{ fontSize: "0.7rem", marginBottom: "0.5rem", wordBreak: "break-all" }}>
                {file}
              </p>
              {url ? (
                file.endsWith(".mp4") ? (
                  <video
                    src={url} muted playsInline
                    style={{ width: "100%", height: 100, objectFit: "cover", background: "#000" }}
                    onError={(e) => {
                      (e.target as HTMLVideoElement).style.outline = "3px solid red";
                    }}
                  />
                ) : (
                  <img
                    src={url} alt={file}
                    style={{ width: "100%", height: 100, objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.outline = "3px solid red";
                      (e.target as HTMLImageElement).alt = "❌ 404 or 403";
                    }}
                  />
                )
              ) : (
                <div style={{ height: 100, background: "#ffe0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "red" }}>
                  No URL — env var not set
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#f5f5f5", fontSize: "0.8rem" }}>
        <strong>If images show red border → 404 or 403</strong><br/>
        404 = file not uploaded to R2 with that exact filename<br/>
        403 = R2 bucket not set to public<br/>
        No URL box = NEXT_PUBLIC_R2_URL missing in Cloudflare Pages env vars
      </div>
    </div>
  );
}