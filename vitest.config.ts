import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      "tests/e2e/**",
      "node_modules/**",
      "dist/**",
      ".next/**",
      "out/**",
      "cypress/**",
      "build/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
    passWithNoTests: true,
  },
});
