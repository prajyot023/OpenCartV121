import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('.table-responsive table');
    this.cartItems = page.locator('.table-responsive table tbody tr');
    this.checkoutButton = page.locator('//a[normalize-space()="Checkout"]');
    this.emptyCartMessage = page.locator('//div[@id="content"]//p[contains(text(),"Your shopping cart is empty!")]');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=checkout/cart');
  }

  /**
   * Get list of product names in the cart
   */
  async getCartProductNames(): Promise<string[]> {
    const itemLinks = this.page.locator('.table-responsive table tbody tr td.text-left a');
    const texts = await itemLinks.allTextContents();
    return texts.map(t => t.trim()).filter(t => t.length > 0 && !t.includes('***'));
  }

  /**
   * Check if a specific product is in the cart
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const item = this.page.locator(`.table-responsive table tbody tr td.text-left a:has-text("${productName}")`);
    try {
      await item.waitFor({ state: 'visible', timeout: 5000 });
      return await item.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Click the Checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
