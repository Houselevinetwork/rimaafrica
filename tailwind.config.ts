import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "rima-dark":         "#1A1A1A",
        "rima-jungle":       "#2D4A35",
        "rima-jungle-light": "#3D6147",
        "rima-jungle-dark":  "#1E3326",
        "rima-gold":         "#C9A84C",
        "rima-gold-light":   "#D9BC76",
        "rima-gold-dark":    "#A8882E",
        "rima-cream":        "#F5F0E8",
        "rima-cream-dark":   "#EDE8DE",
        "rima-earth":        "#8B7355",
        "rima-teal":         "#2A7B8C",
        "rima-teal-light":   "#3A9BAC",
        "rima-gray":         "#666666",
        "rima-gray-light":   "#999999"
      },
      fontFamily: {
        serif: ["var(--font-cormorant)","Georgia","serif"],
        sans:  ["var(--font-inter)","system-ui","sans-serif"]
      },
      maxWidth: {
        "site":    "1440px",
        "content": "1020px",
        "narrow":  "768px"
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards"
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity:"0", transform:"translateY(24px)" },
          "100%": { opacity:"1", transform:"translateY(0)" }
        },
        fadeIn: {
          "0%":   { opacity:"0" },
          "100%": { opacity:"1" }
        }
      }
    }
  },
  plugins: []
};
export default config;
