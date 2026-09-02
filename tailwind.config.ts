import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 「信頼感と先進性」を表現するディープネイビー×エメラルドグリーン
        navy: {
          DEFAULT: "#0F172A", // ディープネイビー（指定色）
          light: "#1E293B",
          soft: "#334155",
        },
        emerald: {
          DEFAULT: "#10B981", // エメラルドグリーン（指定色）
          dark: "#059669",
          soft: "#D1FAE5",
        },
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        // 日本の株式相場の慣習に合わせ、上昇=赤、下落=青緑とする
        gain: "#DC2626",
        loss: "#0F766E",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "Hiragino Sans", "Meiryo", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.12)",
        "card-hover": "0 4px 8px rgba(15, 23, 42, 0.06), 0 16px 32px -12px rgba(15, 23, 42, 0.18)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
