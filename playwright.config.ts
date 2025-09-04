import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Build and start the app for CI; when running locally reuseExistingServer=true lets
    // Playwright skip starting if you already have a server running.
    command: 'npm run build && npm run start',
    port: 3000,
    timeout: 120_000,
    reuseExistingServer: true,
    env: {
      // keep the stream URL from the working session so radio player is available during tests
      NEXT_PUBLIC_STREAM_URL: 'https://listen.radioking.com/radio/736103/stream/802454',
    },
  },
});
