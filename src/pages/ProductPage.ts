import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productQuantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly successAlert: Locator;
  readonly deliveryDateInput: Locator;
  readonly reviewsTab: Locator;
  readonly descriptionTab: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('#content h1');
    this.productPrice = page.locator('#content .list-unstyled h2');
    this.productQuantityInput = page.locator('#input-quantity');
    this.addToCartButton = page.locator('#button-cart');
    this.successAlert = page.locator('.alert.alert-success');
    this.deliveryDateInput = page.locator('input[data-date-format="YYYY-MM-DD"], #input-option225');
    this.reviewsTab = page.locator('//a[contains(text(),"Reviews")]');
    this.descriptionTab = page.locator('//a[contains(text(),"Description")]');
  }

  async open(productId: number): Promise<void> {
    await this.navigateTo(`index.php?route=product/product&product_id=${productId}`);
  }

  /**
   * Set the product quantity.
   *
   * This field's change handler fires OpenCart's getRecurringDescription request, whose
   * success callback removes every `.alert-dismissible` on the page. The handler only
   * runs once the field loses focus, so without an explicit blur it fires on the click
   * that adds to cart and races the add-to-cart response, intermittently wiping the
   * success banner. Blur here and let the request settle first.
   */
  async setQuantity(qty: number): Promise<void> {
    const recurringLookup = this.page
      .waitForResponse(res => res.url().includes('route=product/product/getRecurringDescription'), { timeout: 10000 })
      .catch(() => null);
    await this.productQuantityInput.fill(qty.toString());
    await this.productQuantityInput.blur();
    await recurringLookup;
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getSuccessAlertMessage(): Promise<string> {
    await this.successAlert.waitFor({ state: 'visible', timeout: 15000 });
    return (await this.successAlert.textContent())?.trim() || '';
  }
}
