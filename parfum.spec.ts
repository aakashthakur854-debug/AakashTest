import { test } from '@playwright/test';
import { ParfumPage } from './pages/ParfumPage';
import { filters } from './test-data/filters';

test.describe('Douglas – Parfum Listing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.douglas.de/de');
  });

  for (const filter of filters) {
    test(`List products using filter: ${filter.name}`, async ({ page }) => {
      const parfumPage = new ParfumPage(page);

      await parfumPage.acceptCookies();
      await parfumPage.goToParfum();
      await parfumPage.applyFilter(filter.selector);
      await parfumPage.listProducts();
    });
  }
});
