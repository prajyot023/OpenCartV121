import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly warningAlert: Locator;
  readonly forgottenPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#input-email');
    this.passwordInput = page.locator('#input-password');
    this.loginButton = page.locator('input[value="Login"]');
    this.warningAlert = page.locator('.alert.alert-danger');
    this.forgottenPasswordLink = page.locator('//div[contains(@class,"form-group")]//a[text()="Forgotten Password"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/login');
  }

  async setEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if error warning banner is displayed
   */
  async isWarningDisplayed(): Promise<boolean> {
    try {
      await this.warningAlert.waitFor({ state: 'visible', timeout: 5000 });
      return await this.warningAlert.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get the error warning banner text
   */
  async getWarningMessage(): Promise<string> {
    try {
      await this.warningAlert.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.warningAlert.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }
}
