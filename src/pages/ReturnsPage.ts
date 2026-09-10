import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReturnsPage extends BasePage {
  readonly pageHeading: Locator;

  // Order Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly orderIdInput: Locator;
  readonly orderDateInput: Locator;

  // Product Information
  readonly productNameInput: Locator;
  readonly productModelInput: Locator;
  readonly quantityInput: Locator;
  readonly returnReasonRadios: Locator;
  readonly productOpenedYesRadio: Locator;
  readonly productOpenedNoRadio: Locator;
  readonly commentTextarea: Locator;

  // Action Buttons
  readonly backButton: Locator;
  readonly submitButton: Locator;

  // Feedback
  readonly fieldErrors: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#content h1');

    // Order Information
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.orderIdInput = page.locator('#input-order-id');
    this.orderDateInput = page.locator('#input-date-ordered');

    // Product Information
    this.productNameInput = page.locator('#input-product');
    this.productModelInput = page.locator('#input-model');
    this.quantityInput = page.locator('#input-quantity');
    this.returnReasonRadios = page.locator('input[type="radio"][name="return_reason_id"]');
    this.productOpenedYesRadio = page.locator('input[name="opened"][value="1"]');
    this.productOpenedNoRadio = page.locator('input[name="opened"][value="0"]');
    this.commentTextarea = page.locator('#input-comment');

    // Action Buttons
    this.backButton = page.locator('#content .buttons a.btn-default');
    this.submitButton = page.locator('#content form input.btn-primary');

    // Feedback
    this.fieldErrors = page.locator('.text-danger');
    this.successHeading = page.locator('//h1[contains(text(),"Product Returns")]');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=account/return/add');
  }

  /**
   * Fill and submit a product return form
   */
  async submitReturnForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    orderId: string;
    orderDate?: string;
    productName: string;
    productModel: string;
    quantity?: string;
    returnReasonIndex?: number; // 0-based index for return reason radio
    productOpened?: boolean;
    comment?: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.telephoneInput.fill(data.telephone);
    await this.orderIdInput.fill(data.orderId);

    if (data.orderDate) {
      await this.orderDateInput.fill(data.orderDate);
    }

    await this.productNameInput.fill(data.productName);
    await this.productModelInput.fill(data.productModel);

    if (data.quantity) {
      await this.quantityInput.fill(data.quantity);
    }

    if (data.returnReasonIndex !== undefined) {
      await this.returnReasonRadios.nth(data.returnReasonIndex).check();
    }

    if (data.productOpened !== undefined) {
      if (data.productOpened) {
        await this.productOpenedYesRadio.check();
      } else {
        await this.productOpenedNoRadio.check();
      }
    }

    if (data.comment) {
      await this.commentTextarea.fill(data.comment);
    }

    await this.submitButton.click();
  }

  /**
   * Get count of validation errors displayed
   */
  async getValidationErrorCount(): Promise<number> {
    return await this.fieldErrors.count();
  }

  /**
   * Check if return request was submitted successfully
   */
  async isReturnSuccessful(): Promise<boolean> {
    try {
      const successContent = this.page.locator('//p[contains(text(),"Thank you for submitting your return request")]');
      await successContent.waitFor({ state: 'visible', timeout: 5000 });
      return await successContent.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get count of return reason radio buttons
   */
  async getReturnReasonCount(): Promise<number> {
    return await this.returnReasonRadios.count();
  }
}
