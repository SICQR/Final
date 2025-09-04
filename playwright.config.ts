import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  // webServer: start a prod build in CI, but use/reuse the dev server locally.
  // - In CI (process.env.CI set), build and start the production server so tests run in a stable environment.
  // - Locally, run `npm run dev` if no server exists, otherwise reuse existing server.
  // In CI we expect the workflow to build; Playwright will start the production server.
  webServer: process.env.CI ? {
    command: 'NEXT_PUBLIC_STREAM_URL=$NEXT_PUBLIC_STREAM_URL npm run start',
    url: 'http://localhost:3000',
    timeout: 120_000,
    reuseExistingServer: false,
  } : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120_000,
    reuseExistingServer: true,
  },
  snapshotDir: './tests/e2e/__snapshots__',
});
