import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CustomerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  subscribeNewsletter?: boolean;
  agreePolicy?: boolean;
}

export class AccountRegistrationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly newsletterYesRadio: Locator;
  readonly newsletterNoRadio: Locator;
  readonly privacyPolicyCheckbox: Locator;
  readonly continueButton: Locator;
  readonly confirmationHeading: Locator;
  readonly warningAlert: Locator;
  readonly fieldErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');
    this.newsletterYesRadio = page.locator('input[name="newsletter"][value="1"]');
    this.newsletterNoRadio = page.locator('input[name="newsletter"][value="0"]');
    this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.locator('input[value="Continue"]');
    this.confirmationHeading = page.locator('//h1[normalize-space()="Your Account Has Been Created!"]');
    this.warningAlert = page.locator('.alert.alert-danger');
    this.fieldErrors = page.locator('.text-danger');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/register');
  }

  async setFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async setTelephone(telephone: string): Promise<void> {
    await this.telephoneInput.fill(telephone);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async setConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async checkPrivacyPolicy(): Promise<void> {
    if (!(await this.privacyPolicyCheckbox.isChecked())) {
      await this.privacyPolicyCheckbox.check();
    }
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Fill entire registration form and submit
   */
  async register(data: CustomerRegistrationData): Promise<void> {
    if (data.firstName) await this.setFirstName(data.firstName);
    if (data.lastName) await this.setLastName(data.lastName);
    if (data.email) await this.setEmail(data.email);
    if (data.telephone) await this.setTelephone(data.telephone);
    if (data.password) await this.setPassword(data.password);
    if (data.confirmPassword) await this.setConfirmPassword(data.confirmPassword);

    if (data.subscribeNewsletter) {
      await this.newsletterYesRadio.check();
    }

    if (data.agreePolicy !== false) {
      await this.checkPrivacyPolicy();
    }

    await this.clickContinue();
  }

  /**
   * Get the registration confirmation message text
   */
  async getConfirmationMsg(): Promise<string> {
    try {
      await this.confirmationHeading.waitFor({ state: 'visible', timeout: 10000 });
      return (await this.confirmationHeading.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Get main error banner text if present
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
