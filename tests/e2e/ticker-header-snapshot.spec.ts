import { test, expect } from '@playwright/test';

test('ticker + header visual snapshot', async ({ page }) => {
  await page.goto('/');

  // capture a screenshot of the top area (ticker + header)
  const topArea = page.locator('body');
  // crop to the top 120px to include ticker + header
  const shot = await page.screenshot({ fullPage: false });
  // Save visual snapshot (Playwright will compare on subsequent runs)
  expect(shot).toMatchSnapshot('top-ticker-header.png', { maxDiffPixelRatio: 0.01 });
});
