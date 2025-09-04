import { test, expect } from '@playwright/test';

test('home shows header + nav', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: `*{animation:none!important;transition:none!important}` });

  const header = page.getByRole('banner');
  await expect(header).toBeVisible();

  // Scope to the nav inside the header to avoid strict-mode collisions
  const mainNav = header.getByRole('navigation').first();
  await expect(mainNav).toBeVisible();
});
