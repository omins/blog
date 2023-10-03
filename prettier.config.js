// prettier.config.js
/** @type {import("prettier").Config} */

module.exports = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  importOrder: [
    "^(next/(.*)$)|^(next$)",
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$|^components/(.*)$",
    "^#/lib/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
