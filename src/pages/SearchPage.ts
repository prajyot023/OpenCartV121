import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchHeader: Locator;
  readonly searchCriteriaInput: Locator;
  readonly searchCriteriaButton: Locator;
  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly noProductsMessage: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.searchHeader = page.locator('#content h1');
    this.searchCriteriaInput = page.locator('#input-search');
    this.searchCriteriaButton = page.locator('#button-search');
    this.productCards = page.locator('.product-thumb');
    this.productTitles = page.locator('.product-thumb h4 a');
    this.noProductsMessage = page.locator('//p[contains(text(),"There is no product that matches the search criteria.")]');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(searchQuery?: string): Promise<void> {
    if (searchQuery) {
      await this.navigateTo(`index.php?route=product/search&search=${encodeURIComponent(searchQuery)}`);
    } else {
      await this.navigateTo('index.php?route=product/search');
    }
  }

  /**
   * Get the count of products displayed in the search results
   */
  async getProductsCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Returns list of product names in search results
   */
  async getProductNames(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  /**
   * Checks if a product with the specified name exists in search results
   */
  async isProductDisplayed(productName: string): Promise<boolean> {
    const product = this.page.locator(`.product-thumb h4 a:has-text("${productName}")`);
    try {
      await product.waitFor({ state: 'visible', timeout: 5000 });
      return await product.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Click on a product by name to open its details
   */
  async clickProduct(productName: string): Promise<void> {
    await this.page.locator(`.product-thumb h4 a:has-text("${productName}")`).click();
  }

  /**
   * Add a product to cart directly from search listing
   */
  async addProductToCart(productName: string): Promise<void> {
    const card = this.page.locator('.product-thumb').filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    }).first();
    await card.locator('button:has(.fa-shopping-cart)').click();
  }

  /**
   * Check if 'no product found' message is visible
   */
  async hasNoProductsMessage(): Promise<boolean> {
    try {
      await this.noProductsMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.noProductsMessage.isVisible();
    } catch {
      return false;
    }
  }
}
