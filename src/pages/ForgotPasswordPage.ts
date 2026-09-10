import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly pageHeading: Locator;
  readonly emailInput: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  readonly successAlert: Locator;
  readonly warningAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h1');
    this.emailInput = page.locator('#input-email');
    this.backButton = page.locator('#content .buttons a.btn-default');
    this.continueButton = page.locator('#content form input.btn-primary');
    this.successAlert = page.locator('.alert.alert-success');
    this.warningAlert = page.locator('.alert.alert-danger');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/forgotten');
  }

  /**
   * Submit the forgot password form with an email
   */
  async submitEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  /**
   * Check if success alert is displayed (email confirmation sent)
   */
  async isSuccessAlertDisplayed(): Promise<boolean> {
    try {
      await this.successAlert.waitFor({ state: 'visible', timeout: 5000 });
      return await this.successAlert.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get warning alert text
   */
  async getWarningMessage(): Promise<string> {
    try {
      await this.warningAlert.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.warningAlert.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if warning alert is displayed
   */
  async isWarningAlertDisplayed(): Promise<boolean> {
    try {
      await this.warningAlert.waitFor({ state: 'visible', timeout: 5000 });
      return await this.warningAlert.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Click the Back button to return to login page
   */
  async clickBack(): Promise<void> {
    await this.backButton.click();
  }
}
