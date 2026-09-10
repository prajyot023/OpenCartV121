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
   * Check if contact form submission was successful
   * (redirects to success page with "Your enquiry has been successfully sent" heading)
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    try {
      const successMsg = this.page.locator('//h1[contains(text(),"Contact Us")]');
      await successMsg.waitFor({ state: 'visible', timeout: 5000 });
      // Check for the success content text
      const content = this.page.locator('#content p');
      const text = await content.first().textContent();
      return text?.includes('Your enquiry has been successfully sent') || false;
    } catch {
      return false;
    }
  }
}
