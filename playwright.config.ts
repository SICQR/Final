import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['line']] : 'list',
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
         viewport: { width: 1280, height: 800 } },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm start -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
