import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-black","text-white","bg-neutral-900","text-neutral-50","border-neutral-800"],
  theme: {
    extend: {
      colors: {
        base: { bg: 'var(--bg)', fg: 'var(--fg)', sub: 'var(--sub)', card: 'var(--card)', line: 'var(--line)' },
        brand: { hot: 'var(--brand-hot)', acid: 'var(--brand-acid)' },
      },
      fontFamily: {
        sans: ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica","Arial","sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
