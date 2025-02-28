/** @type {import("prettier").Config} */

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
};

export default config;
