import { test, expect } from '@playwright/test';

test('ticker + header visual snapshot', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Wait for ticker to be visible
  await page.waitForSelector('.ticker', { state: 'visible', timeout: 10000 });
  
  // Take screenshot of the top section (ticker + header)
  const shot = await page.screenshot({ fullPage: false });
  // Save visual snapshot (Playwright will compare on subsequent runs)
  expect(shot).toMatchSnapshot('top-ticker-header.png', { maxDiffPixelRatio: 0.01 });
});