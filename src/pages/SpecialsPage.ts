import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SpecialsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly specialPrices: Locator;
  readonly originalPrices: Locator;

  readonly listViewButton: Locator;
  readonly gridViewButton: Locator;
  readonly sortByDropdown: Locator;
  readonly showLimitDropdown: Locator;
  readonly compareLink: Locator;

  readonly addToCartButtons: Locator;
  readonly wishlistButtons: Locator;
  readonly compareButtons: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h2');
    this.productCards = page.locator('.product-layout .product-thumb');
    this.productTitles = page.locator('.product-thumb h4 a');
    this.specialPrices = page.locator('.product-thumb .price-new');
    this.originalPrices = page.locator('.product-thumb .price-old');

    this.listViewButton = page.locator('#list-view');
    this.gridViewButton = page.locator('#grid-view');
    this.sortByDropdown = page.locator('#input-sort');
    this.showLimitDropdown = page.locator('#input-limit');
    this.compareLink = page.locator('#compare-total');

    this.addToCartButtons = page.locator('.product-thumb .button-group button:first-child');
    this.wishlistButtons = page.locator('.product-thumb .button-group button[data-original-title="Add to Wish List"]');
    this.compareButtons = page.locator('.product-thumb .button-group button[data-original-title="Compare this Product"]');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=product/special');
  }

  /**
   * Get count of special offer products
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Get all product names on specials page
   */
  async getProductNames(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  /**
   * Get count of products that have old (strikethrough) prices
   */
  async getOriginalPriceCount(): Promise<number> {
    return await this.originalPrices.count();
  }

  /**
   * Get count of products that have new (special) prices
   */
  async getSpecialPriceCount(): Promise<number> {
    return await this.specialPrices.count();
  }

  /**
   * Add a product to cart by name from specials listing
   */
  async addProductToCart(productName: string): Promise<void> {
    const card = this.page.locator('.product-thumb').filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    }).first();
    await card.locator('button:has(.fa-shopping-cart)').click();
  }

  /**
   * Change sort order via dropdown, e.g. 'Name (A - Z)'.
   *
   * The option values are full URLs assigned to `location`, so wait for that navigation.
   */
  async sortBy(label: string): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/[?&]sort=/, { timeout: 30000 }),
      this.sortByDropdown.selectOption({ label }),
    ]);
  }
}
