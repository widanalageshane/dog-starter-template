import { test, expect } from '@playwright/test';

test('Test 3: should load dog image successfully when page is opened', async ({ page }) => {
  await page.goto('/');

  const image = page.getByTestId('dog-image');
  await expect(image).toBeVisible({ timeout: 30000 });

  const src = await image.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

test('Test 4: should load dog image successfully when button is clicked', async ({ page }) => {
  await page.goto('/');

  const image = page.getByTestId('dog-image');
  await expect(image).toBeVisible({ timeout: 30000 });

  const oldSrc = await image.getAttribute('src');

  const button = page.getByTestId('load-dog-button');
  await expect(button).toBeEnabled({ timeout: 30000 });
  await button.click();

  await expect(image).toBeVisible({ timeout: 30000 });

  const newSrc = await image.getAttribute('src');
  expect(newSrc).toBeTruthy();
  expect(newSrc).toMatch(/^https:\/\//);
});

test('Test 5: should show error message when API call fails', async ({ page }) => {
  await page.route('**/api/dogs/random', async (route) => {
    await route.abort();
  });

  await page.goto('/');

  const errorMessage = page.getByTestId('error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(/error/i);
});