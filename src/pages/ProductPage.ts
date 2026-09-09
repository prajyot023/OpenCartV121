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

  async setQuantity(qty: number): Promise<void> {
    await this.productQuantityInput.fill(qty.toString());
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getSuccessAlertMessage(): Promise<string> {
    await this.successAlert.waitFor({ state: 'visible', timeout: 8000 });
    return (await this.successAlert.textContent())?.trim() || '';
  }
}
