import { test, expect } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173'

test('home loads and shows title', async ({ page }) => {
  await page.goto(`${baseURL}/`)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Vite \+ React/i)
})
