import { test, expect } from '@playwright/test';

test('EPAM - Navigate to Client Work via Services', async ({ page }) => {
  // Navigate to the EPAM homepage
  await page.goto('https://www.epam.com/');

  // Click the Services link in the header. Use role to prefer accessible link.
  const services = page.getByRole('link', { name: /Services/i });
  if (await services.count() > 1) {
    // prefer the top navigation item when multiple matches exist
    await page.locator('a.top-navigation__item-link.js-op:has-text("Services")').click();
  } else {
    await services.first().click();
  }

  // Ensure we've arrived on the Services page
  await expect(page).toHaveURL(/.*\/services.*/);

  // Click the "Explore Our Client Work" link
  const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
  if (await explore.count() === 0) {
    // fallback to text locator
    await page.getByText(/Explore Our Client Work/i).first().click();
  } else {
    await explore.first().click();
  }

  // Verify the "Client Work" text is visible on the page
  await expect(page.getByText(/Client Work/i)).toBeVisible();

  // Close the page explicitly (ensures browser is closed when run outside Playwright runner)
  await page.close();
});
