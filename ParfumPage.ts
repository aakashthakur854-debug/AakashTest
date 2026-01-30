import { Page, expect } from '@playwright/test';

export class ParfumPage {
  constructor(private page: Page) {}

  async acceptCookies() {
    const cookieBtn = this.page.locator('button:has-text("Alle akzeptieren")');
    if (await cookieBtn.isVisible()) {
      await cookieBtn.click();
    }
  }

  async goToParfum() {
    await this.page.click('text=Parfum');
    await expect(this.page).toHaveURL(/parfum/);
  }

  async applyFilter(filterSelector: string) {
    await this.page.click(filterSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async listProducts() {
    const products = this.page.locator('[data-testid="product-tile"]');
    const count = await products.count();
    console.log(`Total products found: ${count}`);
    expect(count).toBeGreaterThan(0);
  }
}
