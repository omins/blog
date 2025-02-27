/** @type {import("prettier").Config} */

module.exports = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
};
