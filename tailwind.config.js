/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    colors: {
      black: "#121212",
      white: "#ffffff",
      "gray-100": "#f3f3f6",
      "gray-200": "#eaebef",
      "gray-300": "#dfe1e5",
      "gray-400": "#cfd4da",
      "gray-500": "#afb6bd",
      "gray-600": "#888d96",
      "gray-700": "#4b5057",
      "gray-800": "#353a40",
      "gray-900": "#222529",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
