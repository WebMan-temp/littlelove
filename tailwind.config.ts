import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff1f7",
          100: "#ffe4ef",
          200: "#ffc9df",
          300: "#ff9ec4",
          400: "#ff6aa4",
          500: "#ff4b90",
          600: "#e23378",
          700: "#bd2a63",
          800: "#9b2855",
          900: "#7f2649"
        },
        lavender: "#c3b6ff",
        sky: "#b3e5ff",
        cream: "#fff7ec"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        sparkle: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-120px) rotate(45deg)", opacity: "0" }
        }
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        fadeInUp: "fadeInUp 700ms ease forwards",
        popIn: "popIn 300ms ease forwards",
        sparkle: "sparkle 1200ms ease-out forwards"
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.1)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;


