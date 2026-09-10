import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ComparePage extends BasePage {
  readonly pageHeading: Locator;
  readonly compareTable: Locator;
  readonly productTitleLinks: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;
  readonly continueButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h1');
    this.compareTable = page.locator('#content table.table-bordered');
    this.productTitleLinks = page.locator('#content table tbody tr:first-child td a');
    this.addToCartButtons = page.locator('#content table input[value="Add to Cart"]');
    this.removeButtons = page.locator('a[href*="route=product/compare&remove="]');
    this.emptyMessage = page.locator('#content p');
    this.continueButton = page.locator('#content .buttons a.btn-primary');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=product/compare');
  }

  /**
   * Get the count of products being compared
   */
  async getComparedProductCount(): Promise<number> {
    try {
      await this.compareTable.waitFor({ state: 'visible', timeout: 5000 });
      // The first row contains product names — count the td elements (minus the header td)
      const firstRowCells = this.page.locator('#content table tbody tr:first-child td');
      const count = await firstRowCells.count();
      // Usually the first column is empty (header label), so product count = count - 1
      return Math.max(0, count - 1);
    } catch {
      return 0;
    }
  }

  /**
   * Get product names displayed in compare table
   */
  async getComparedProductNames(): Promise<string[]> {
    try {
      await this.compareTable.waitFor({ state: 'visible', timeout: 5000 });
      return await this.productTitleLinks.allTextContents();
    } catch {
      return [];
    }
  }

  /**
   * Check if empty compare message is shown
   */
  async hasEmptyMessage(): Promise<boolean> {
    try {
      const msg = this.page.locator('//p[contains(text(),"You have not chosen any products to compare")]');
      await msg.waitFor({ state: 'visible', timeout: 5000 });
      return await msg.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Remove a product by index (0-based)
   */
  async removeProductByIndex(index: number): Promise<void> {
    await this.removeButtons.nth(index).click();
  }

  /**
   * Add a product to cart from compare table by index (0-based)
   */
  async addToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }
}
