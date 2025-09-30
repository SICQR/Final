import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        hotpink: "#ff1981",
        hung: "#ffba00",
        brand: {
          DEFAULT: "#FF5300",
          50: "#FFF4ED",
          100: "#FFEAD5",
          200: "#FECFAA",
          300: "#FDAD74",
          400: "#FB7C3C",
          500: "#FF5300",
          600: "#EA4E0A",
          700: "#C2370A",
          800: "#9A2C10",
          900: "#7C2610",
        },
        neon: {
          pink: "#ff0080",
          blue: "#00d4ff",
          green: "#00ff88",
          purple: "#8b5cf6",
        },
        luxury: {
          gold: "#d4af37",
          silver: "#c0c0c0",
          bronze: "#cd7f32",
          platinum: "#e5e4e2",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "from": { boxShadow: "0 0 20px #ff1981" },
          "to": { boxShadow: "0 0 30px #ff1981, 0 0 40px #ff1981" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(45deg, #ff1981, #ffba00)",
        "luxury-gradient": "linear-gradient(135deg, #d4af37, #ffd700, #ffed4e)",
        "neon-gradient": "linear-gradient(45deg, #ff0080, #00d4ff, #00ff88)",
      },
      dropShadow: {
        xl: "0 6px 24px rgba(0,0,0,0.4)",
        neon: "0 0 15px currentColor",
        luxury: "0 8px 32px rgba(212, 175, 55, 0.3)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;