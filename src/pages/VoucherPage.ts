import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class VoucherPage extends BasePage {
  readonly pageHeading: Locator;
  readonly recipientNameInput: Locator;
  readonly recipientEmailInput: Locator;
  readonly senderNameInput: Locator;
  readonly senderEmailInput: Locator;
  readonly themeRadios: Locator;
  readonly birthdayThemeRadio: Locator;
  readonly christmasThemeRadio: Locator;
  readonly generalThemeRadio: Locator;
  readonly messageTextarea: Locator;
  readonly amountInput: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly fieldErrors: Locator;
  readonly successAlert: Locator;
  readonly warningAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h1');
    this.recipientNameInput = page.locator('#input-to-name');
    this.recipientEmailInput = page.locator('#input-to-email');
    this.senderNameInput = page.locator('#input-from-name');
    this.senderEmailInput = page.locator('#input-from-email');
    this.themeRadios = page.locator('input[type="radio"][name="voucher_theme_id"]');
    this.birthdayThemeRadio = page.locator('input[name="voucher_theme_id"][value="8"]');
    this.christmasThemeRadio = page.locator('input[name="voucher_theme_id"][value="6"]');
    this.generalThemeRadio = page.locator('input[name="voucher_theme_id"][value="7"]');
    this.messageTextarea = page.locator('#input-message');
    this.amountInput = page.locator('#input-amount');
    this.agreeCheckbox = page.locator('input[type="checkbox"][name="agree"]');
    this.continueButton = page.locator('#content form input.btn-primary');
    this.fieldErrors = page.locator('.text-danger');
    this.successAlert = page.locator('.alert.alert-success');
    this.warningAlert = page.locator('.alert.alert-danger');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/voucher');
  }

  /**
   * Fill and submit the gift certificate form
   */
  async fillVoucherForm(data: {
    recipientName: string;
    recipientEmail: string;
    senderName: string;
    senderEmail: string;
    theme?: 'birthday' | 'christmas' | 'general';
    message?: string;
    amount: string;
    agreeTerms?: boolean;
  }): Promise<void> {
    await this.recipientNameInput.fill(data.recipientName);
    await this.recipientEmailInput.fill(data.recipientEmail);
    await this.senderNameInput.fill(data.senderName);
    await this.senderEmailInput.fill(data.senderEmail);

    if (data.theme === 'birthday') {
      await this.birthdayThemeRadio.check();
    } else if (data.theme === 'christmas') {
      await this.christmasThemeRadio.check();
    } else if (data.theme === 'general') {
      await this.generalThemeRadio.check();
    }

    if (data.message) {
      await this.messageTextarea.fill(data.message);
    }

    await this.amountInput.fill(data.amount);

    if (data.agreeTerms !== false) {
      if (!(await this.agreeCheckbox.isChecked())) {
        await this.agreeCheckbox.check();
      }
    }

    await this.continueButton.click();
  }

  /**
   * Get count of validation errors
   */
  async getValidationErrorCount(): Promise<number> {
    return await this.fieldErrors.count();
  }

  /**
   * Check if success message is visible after submitting voucher
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
   * Check if warning/error alert is visible
   */
  async isWarningAlertDisplayed(): Promise<boolean> {
    try {
      await this.warningAlert.waitFor({ state: 'visible', timeout: 5000 });
      return await this.warningAlert.isVisible();
    } catch {
      return false;
    }
  }
}
