import { test, expect } from '@playwright/test';

test('ticker is fixed above the header', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Wait for ticker element to be visible
  await page.waitForSelector('.ticker', { state: 'visible', timeout: 10000 });
  
  const ticker = page.locator('.ticker');
  const headers = page.locator('header');

  await expect(ticker).toBeVisible();

  const tBox = await ticker.boundingBox();
  expect(tBox).not.toBeNull();

  const hBox = await headers.boundingBox();
  expect(hBox).not.toBeNull();

  // Ticker should be above header (smaller Y coordinate)
  expect(tBox!.y).toBeLessThan(hBox!.y);
});