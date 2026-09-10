import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class WishlistPage extends BasePage {
  readonly pageHeading: Locator;
  readonly wishlistTable: Locator;
  readonly productNameLinks: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;
  readonly continueButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h2');
    this.wishlistTable = page.locator('#content .table-responsive table');
    this.productNameLinks = page.locator('#content .table-responsive table tbody td.text-left a');
    this.addToCartButtons = page.locator('#content .table-responsive table tbody button.btn-primary');
    this.removeButtons = page.locator('#content .table-responsive table tbody a.btn-danger');
    this.emptyMessage = page.locator('//p[contains(text(),"Your wish list is empty")]');
    this.continueButton = page.locator('#content .buttons a.btn-primary');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/wishlist');
  }

  /**
   * Get list of product names in the wishlist
   */
  async getWishlistProductNames(): Promise<string[]> {
    try {
      await this.wishlistTable.waitFor({ state: 'visible', timeout: 5000 });
      const texts = await this.productNameLinks.allTextContents();
      return texts.map(t => t.trim()).filter(t => t.length > 0);
    } catch {
      return [];
    }
  }

  /**
   * Check if wishlist is empty
   */
  async isWishlistEmpty(): Promise<boolean> {
    try {
      await this.emptyMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.emptyMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Remove first product from wishlist
   */
  async removeFirstItem(): Promise<void> {
    await this.removeButtons.first().click();
  }

  /**
   * Add first product to cart from wishlist
   */
  async addFirstToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  /**
   * Get count of items in the wishlist table
   */
  async getWishlistItemCount(): Promise<number> {
    try {
      await this.wishlistTable.waitFor({ state: 'visible', timeout: 5000 });
      return await this.page.locator('#content .table-responsive table tbody tr').count();
    } catch {
      return 0;
    }
  }
}
