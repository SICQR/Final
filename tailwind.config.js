/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: { extend: {
    colors: {
      hotpink: '#ff1981',
      hung: '#ffd400'
    }
  } },
  // If you want to keep your current custom CSS exactly as-is, uncomment:
  // corePlugins: { preflight: false },
  plugins: [],
};