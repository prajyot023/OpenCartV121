import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly successAlert: Locator;

  readonly quantityInputs: Locator;
  readonly updateButtons: Locator;
  readonly removeButtons: Locator;
  readonly couponAccordion: Locator;
  readonly voucherAccordion: Locator;
  readonly shippingAccordion: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('.table-responsive table');
    this.cartItems = page.locator('.table-responsive table tbody tr');
    this.checkoutButton = page.locator('#content a:has-text("Checkout")');
    this.emptyCartMessage = page.locator('//div[@id="content"]//p[contains(text(),"Your shopping cart is empty!")]');
    this.successAlert = page.locator('.alert.alert-success');

    this.quantityInputs = page.locator('.table-responsive input[name*="quantity"]');
    this.updateButtons = page.locator('.table-responsive button[data-original-title="Update"], .table-responsive button:has(.fa-refresh)');
    this.removeButtons = page.locator('.table-responsive button[data-original-title="Remove"], .table-responsive button:has(.fa-times-circle)');
    this.couponAccordion = page.locator('//a[contains(text(),"Use Coupon Code")]');
    this.voucherAccordion = page.locator('//a[contains(text(),"Use Gift Certificate")]');
    this.shippingAccordion = page.locator('//a[contains(text(),"Estimate Shipping & Taxes")]');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=checkout/cart');
  }

  /**
   * Update quantity of first item in cart
   */
  async updateFirstItemQuantity(quantity: number): Promise<void> {
    await this.quantityInputs.first().fill(quantity.toString());
    await this.updateButtons.first().click();
  }

  /**
   * Remove first item from cart
   */
  async removeFirstItem(): Promise<void> {
    await this.removeButtons.first().click();
  }

  /**
   * Remove all items from cart.
   *
   * Removing a row from the cart page triggers a full reload, so wait for the row count
   * to drop rather than sleeping: a fixed pause races the reload and the next click can
   * land on a page that is navigating away.
   */
  async clearCart(): Promise<void> {
    let remaining = await this.removeButtons.count();
    while (remaining > 0) {
      await this.removeButtons.first().click();
      await expect(this.removeButtons).toHaveCount(remaining - 1, { timeout: 20000 });
      remaining -= 1;
    }
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
