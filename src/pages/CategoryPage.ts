import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  readonly breadcrumb: Locator;
  readonly categoryHeading: Locator;
  readonly categoryDescription: Locator;
  readonly subcategoryLinks: Locator;
  readonly sidebarCategories: Locator;

  readonly listViewButton: Locator;
  readonly gridViewButton: Locator;
  readonly compareLink: Locator;
  readonly sortByDropdown: Locator;
  readonly showLimitDropdown: Locator;

  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  readonly wishlistButtons: Locator;
  readonly compareButtons: Locator;

  readonly paginationLinks: Locator;
  readonly resultsText: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.breadcrumb = page.locator('ul.breadcrumb');
    this.categoryHeading = page.locator('#content h2');
    this.categoryDescription = page.locator('#content p');
    this.subcategoryLinks = page.locator('#content .row a');
    this.sidebarCategories = page.locator('.list-group a.list-group-item');

    this.listViewButton = page.locator('#list-view');
    this.gridViewButton = page.locator('#grid-view');
    this.compareLink = page.locator('#compare-total');
    this.sortByDropdown = page.locator('#input-sort');
    this.showLimitDropdown = page.locator('#input-limit');

    this.productCards = page.locator('.product-layout .product-thumb');
    this.productTitles = page.locator('.product-thumb h4 a');
    this.productPrices = page.locator('.product-thumb .price');
    this.addToCartButtons = page.locator('.product-thumb .button-group button:first-child');
    this.wishlistButtons = page.locator('.product-thumb .button-group button[data-original-title="Add to Wish List"]');
    this.compareButtons = page.locator('.product-thumb .button-group button[data-original-title="Compare this Product"]');

    this.paginationLinks = page.locator('ul.pagination > li > a');
    this.resultsText = page.locator('.col-sm-6.text-right');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async open(categoryPath: string = '20'): Promise<void> {
    await this.navigateTo(`index.php?route=product/category&path=${categoryPath}`);
  }

  /**
   * Get breadcrumb text items
   */
  async getBreadcrumbItems(): Promise<string[]> {
    const items = this.page.locator('ul.breadcrumb li');
    const texts = await items.allTextContents();
    return texts.map(t => t.trim().replace(/\s+/g, ' '));
  }

  /**
   * Get current category heading text
   */
  async getCategoryTitle(): Promise<string> {
    return (await this.categoryHeading.textContent())?.trim() || '';
  }

  /**
   * Get count of products displayed on the page
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Get all product names on the page
   */
  async getProductNames(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  /**
   * Switch to list view
   */
  async switchToListView(): Promise<void> {
    await this.listViewButton.click();
  }

  /**
   * Switch to grid view
   */
  async switchToGridView(): Promise<void> {
    await this.gridViewButton.click();
  }

  /**
   * Change sort order via dropdown, e.g. 'Name (A - Z)'.
   *
   * Each option's value is a full URL that the page assigns to `location`, so wait for
   * that navigation rather than for a load state that can resolve against the old page.
   */
  async sortBy(label: string): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/[?&]sort=/, { timeout: 30000 }),
      this.sortByDropdown.selectOption({ label }),
    ]);
  }

  /**
   * Change items per page via dropdown, e.g. '25'
   */
  async setItemsPerPage(label: string): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/[?&]limit=/, { timeout: 30000 }),
      this.showLimitDropdown.selectOption({ label }),
    ]);
  }

  /**
   * Add product to compare by product name
   */
  async addProductToCompare(productName: string): Promise<void> {
    const card = this.page.locator('.product-thumb').filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    }).first();
    await card.locator('button[data-original-title="Compare this Product"]').click();
  }

  /**
   * Add product to wishlist by product name
   */
  async addProductToWishlist(productName: string): Promise<void> {
    const card = this.page.locator('.product-thumb').filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    }).first();
    await card.locator('button[data-original-title="Add to Wish List"]').click();
  }

  /**
   * Click on a product by name to open its details page
   */
  async clickProduct(productName: string): Promise<void> {
    await this.page.locator(`.product-thumb h4 a:has-text("${productName}")`).click();
  }

  /**
   * Get the compare link product count text
   */
  async getCompareCountText(): Promise<string> {
    return (await this.compareLink.textContent())?.trim() || '';
  }
}
