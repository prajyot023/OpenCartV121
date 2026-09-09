import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
  readonly pageHeading: Locator;
  readonly logoutLink: Locator;
  readonly rightMenuLinks: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('//h2[normalize-space()="My Account"]');
    this.logoutLink = page.locator('//a[@class="list-group-item"][normalize-space()="Logout"]');
    this.rightMenuLinks = page.locator('#column-right .list-group a');
    this.continueButton = page.locator('//a[normalize-space()="Continue"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/account');
  }

  /**
   * Checks if My Account heading is visible
   */
  async isMyAccountPageExists(timeout: number = 7000): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout });
      return await this.pageHeading.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Click the Logout link in the right column navigation
   */
  async clickLogout(): Promise<void> {
    // If logout link is available in right menu or dropdown
    if (await this.logoutLink.isVisible()) {
      await this.logoutLink.click();
    } else {
      const altLogout = this.page.locator('//ul[contains(@class,"dropdown-menu")]//a[normalize-space()="Logout"]');
      const myAccountBtn = this.page.locator('//span[normalize-space()="My Account"]');
      await myAccountBtn.click();
      await altLogout.click();
    }
  }
}
