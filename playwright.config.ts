import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PLAYWRIGHT_PORT || "4321";
const HOST = process.env.PLAYWRIGHT_HOST || "127.0.0.1";
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  timeout: 30000,
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    actionTimeout: 10000,
    navigationTimeout: 15000,
    launchOptions: {
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    },
  },
  webServer: {
    command: "pnpm run preview",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
