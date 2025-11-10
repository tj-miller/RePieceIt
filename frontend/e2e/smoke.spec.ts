import { test, expect } from "@playwright/test";

// grab from environment, fallback to localhost
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5173";

test("home loads and shows title", async ({ page }) => {
  await page.goto(`${baseURL}/`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Vite \+ React/i,
  );
});

test("counter increments", async ({ page }) => {
  await page.goto(`${baseURL}/`);
  const btn = page.getByRole("button", { name: /count is/i });
  const before = await btn.textContent();
  await btn.click();
  await expect(btn).not.toHaveText(before!);
});
