import { test, expect } from '@playwright/test';

test('ticker + header visual snapshot', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load and ticker to be visible
  await page.waitForSelector('.ticker', { state: 'visible' });
  
  // Take screenshot of the top section (ticker + header)
  const shot = await page.screenshot({ fullPage: false });
  // Save visual snapshot (Playwright will compare on subsequent runs)
  expect(shot).toMatchSnapshot('top-ticker-header.png', { maxDiffPixelRatio: 0.01 });
});