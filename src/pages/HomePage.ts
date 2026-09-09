import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly myAccountDropdown: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.myAccountDropdown = page.locator('//span[normalize-space()="My Account"]');
    this.registerLink = page.locator('//a[normalize-space()="Register"]');
    this.loginLink = page.locator('//ul[contains(@class,"dropdown-menu")]//a[normalize-space()="Login"]');
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('#search button');
    this.cartButton = page.locator('#cart > button');
    this.logo = page.locator('#logo a');
  }

  /**
   * Open the OpenCart home page
   */
  async open(): Promise<void> {
    await this.navigateTo('index.php?route=common/home');
  }

  /**
   * Click on the "My Account" dropdown menu
   */
  async clickMyAccount(): Promise<void> {
    await this.myAccountDropdown.click();
  }

  /**
   * Click on "Register" option under My Account
   */
  async clickRegister(): Promise<void> {
    await this.clickMyAccount();
    await this.registerLink.click();
  }

  /**
   * Click on "Login" option under My Account
   */
  async clickLogin(): Promise<void> {
    await this.clickMyAccount();
    await this.loginLink.click();
  }

  /**
   * Search for a product by name
   */
  async searchForProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
