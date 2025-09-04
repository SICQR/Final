import { test, expect } from '@playwright/test';

test('ticker is fixed above the header', async ({ page }) => {
  await page.goto('/');

  const ticker = page.locator('.ticker');
  const headers = page.locator('header');

  await expect(ticker).toBeVisible();

  const tBox = await ticker.boundingBox();
  expect(tBox).not.toBeNull();

  // find a header element whose top is below the ticker
  const count = await headers.count();
  let found = false;
  for (let i = 0; i < count; i++) {
    const h = headers.nth(i);
    const hBox = await h.boundingBox();
    if (!hBox) continue;
    if (tBox!.y < hBox.y) {
      // this header sits below the ticker
      await expect(h).toBeVisible();
      found = true;
      break;
    }
  }

  expect(found).toBe(true);
});
