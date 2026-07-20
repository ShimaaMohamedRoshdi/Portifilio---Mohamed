import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(122, 28, 172, 0.35)",
        accent: "0 0 30px rgba(245, 179, 0, 0.25)",
      },
      backgroundImage: {
        "premium-radial":
          "radial-gradient(circle at top left, rgba(122, 28, 172, 0.45), transparent 42%), radial-gradient(circle at top right, rgba(245, 179, 0, 0.12), transparent 34%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
      },
      animation: {
        float: "float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
