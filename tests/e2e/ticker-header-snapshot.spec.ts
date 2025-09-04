import { test, expect } from '@playwright/test';

test('ticker + header visual snapshot', async ({ page }) => {
  await page.goto('/');
  // Make visuals deterministic: disable animations/transitions and wait for layout
  await page.addStyleTag({ content: `* { transition: none !important; animation: none !important; }` });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(150);

  // capture a screenshot of the top 120px (ticker + header)
  const width = await page.evaluate(() => document.documentElement.clientWidth || window.innerWidth);
  const height = 120;
  const shot = await page.screenshot({ fullPage: false, clip: { x: 0, y: 0, width, height } });
  // Save visual snapshot (Playwright will compare on subsequent runs)
  expect(shot).toMatchSnapshot('top-ticker-header.png', { maxDiffPixelRatio: 0.02 });
});
