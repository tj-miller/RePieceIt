import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5173";
const PORT = process.env.VITE_PORT || "5173";

const isLocal =
  BASE_URL.includes("localhost") || BASE_URL.includes("127.0.0.1");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  webServer: isLocal
    ? {
        command: `vite preview --port ${PORT} --strictPort`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      }
    : undefined, // don’t start local server if testing remote host
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
