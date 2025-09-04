import { test, expect } from '@playwright/test';

test('ticker + header visual snapshot', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: `
    *{animation:none!important;transition:none!important}
    [data-test="ticker"]{animation:none!important}
  `});

  const banner = page.getByRole('banner');
  const ticker = page.locator('[data-test="ticker"]');

  await expect(banner).toBeVisible();
  await expect(ticker).toBeVisible();

  const vp = page.viewportSize()!;
  const b1 = await banner.boundingBox();
  const b2 = await ticker.boundingBox();

  const top = Math.floor(Math.min(b1?.y ?? 0, b2?.y ?? 0));
  const bottom = Math.ceil(Math.max(
    (b1 ? b1.y + b1.height : 0),
    (b2 ? b2.y + b2.height : 0)
  ));
  const height = Math.min(vp.height, Math.max(80, bottom - top));
  const width = vp.width;

  const shot = await page.screenshot({ clip: { x: 0, y: top, width, height } });
  expect(shot).toMatchSnapshot('top-ticker-header.png', { maxDiffPixelRatio: 0.02 });
});
