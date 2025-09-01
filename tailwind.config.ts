import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        hotpink: "#ff1981",
        hung: "#ffba00",
        brand: {
          DEFAULT: "#FF5300",
        },
      },
      dropShadow: {
        xl: "0 6px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;