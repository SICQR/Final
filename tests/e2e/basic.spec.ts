import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/HOTMESS London/);
});

test('radio page plays', async ({ page }) => {
  await page.goto('/radio');
  await expect(page).toHaveTitle(/HOTMESS/);
});