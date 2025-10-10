import { test, expect } from "@playwright/test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const enTranslations = require("../../src/locales/en.json");
const koTranslations = require("../../src/locales/ko.json");

const translations = {
  en: enTranslations,
  ko: koTranslations,
} as const;

test.describe("omin.blog E2E", () => {
  test("redirects root to default locale home", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page).toHaveURL(/\/en$/);
    await expect(
      page.getByRole("heading", { name: translations.en.home.latest.title })
    ).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("switches locales from the posts listing", async ({ page }) => {
    await page.goto("/en/posts", { waitUntil: "networkidle" });

    await page.getByRole("link", { name: "한국어" }).click();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/ko\/posts$/);
    await expect(page.getByRole("heading", { name: translations.ko.posts.heading })).toBeVisible();
  });

  test("navigates to tag detail pages", async ({ page }) => {
    await page.goto("/en/tags", { waitUntil: "networkidle" });

    const firstTagLink = page.locator('a[href^="/en/tags/"]').first();
    await expect(firstTagLink).toBeVisible();

    await firstTagLink.click();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/en\/tags\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("#");
  });

  test("top navigation respects the active locale", async ({ page }) => {
    for (const locale of ["en", "ko"] as const) {
      await page.goto(`/${locale}/posts`, { waitUntil: "networkidle" });

      await page.getByRole("link", { name: translations[locale].layout.nav.home }).click();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(new RegExp(`/${locale}/?(?:$|[?#])`));

      await page.getByRole("link", { name: translations[locale].layout.nav.posts }).click();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(new RegExp(`/${locale}/posts/?(?:$|[?#])`));

      await page.getByRole("link", { name: translations[locale].layout.nav.tags }).click();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(new RegExp(`/${locale}/tags/?(?:$|[?#])`));
    }
  });

  test("persists theme preference through the toggle", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" });

    const darkToggle = page.getByRole("button", { name: translations.en.themeToggle.dark });
    await darkToggle.click();

    await expect(darkToggle).toHaveAttribute("aria-pressed", "true");

    const theme = await page.evaluate(() => ({
      stored: localStorage.getItem("astro-blog-theme"),
      dataset: document.documentElement.dataset.theme,
      classHasDark: document.documentElement.classList.contains("dark"),
    }));

    expect(theme.stored).toBe("dark");
    expect(theme.dataset).toBe("dark");
    expect(theme.classHasDark).toBe(true);
  });
});
