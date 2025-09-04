import { test, expect } from '@playwright/test';

test('home shows header + nav', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: `*{animation:none!important;transition:none!important}` });
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
});
