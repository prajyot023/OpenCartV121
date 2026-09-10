import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly pageHeading: Locator;
  readonly storeInfoPanel: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly enquiryTextarea: Locator;
  readonly submitButton: Locator;
  readonly fieldErrors: Locator;
  readonly successHeading: Locator;
  readonly successContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h1');
    this.storeInfoPanel = page.locator('#content .panel-default');
    this.nameInput = page.locator('#input-name');
    this.emailInput = page.locator('#input-email');
    this.enquiryTextarea = page.locator('#input-enquiry');
    this.submitButton = page.locator('#content form input.btn-primary');
    this.fieldErrors = page.locator('.text-danger');
    this.successHeading = page.locator('//h1[normalize-space()="Contact Us"]');
    this.successContinueButton = page.locator('#content .buttons a.btn-primary');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=information/contact');
  }

  /**
   * Fill and submit the contact form
   */
  async submitContactForm(name: string, email: string, enquiry: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.enquiryTextarea.fill(enquiry);
    await this.submitButton.click();
  }

  /**
   * Check if validation errors are displayed
   */
  async getValidationErrorCount(): Promise<number> {
    return await this.fieldErrors.count();
  }

  /**
   * Check if contact form submission was successful.
   *
   * A successful submit redirects to route=information/contact/success, which renders
   * only the "Contact Us" heading and a Continue button. There is no success paragraph
   * or alert banner to match on.
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    try {
      await this.page.waitForURL(/route=information\/contact\/success/, { timeout: 15000 });
      await this.successHeading.waitFor({ state: 'visible', timeout: 10000 });
      await this.successContinueButton.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}
