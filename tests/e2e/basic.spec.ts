import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/HOTMESS/i);
});

test('radio page plays', async ({ page }) => {
  await page.goto('http://localhost:3000/radio');
  await expect(page.locator('[data-player]')).toBeVisible();
});
