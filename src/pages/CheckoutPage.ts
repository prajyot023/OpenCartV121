import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutBillingAddress {
  firstName: string;
  lastName: string;
  email?: string;
  telephone?: string;
  address1: string;
  city: string;
  postcode: string;
  country: string;
  zone: string;
}

export class CheckoutPage extends BasePage {
  // Step 1: Checkout Options
  readonly registerAccountRadio: Locator;
  readonly guestCheckoutRadio: Locator;
  readonly accountContinueBtn: Locator;
  readonly returningEmailInput: Locator;
  readonly returningPasswordInput: Locator;
  readonly returningLoginBtn: Locator;

  // Step 2: Billing Details
  readonly existingPaymentRadio: Locator;
  readonly newPaymentRadio: Locator;
  readonly paymentFirstName: Locator;
  readonly paymentLastName: Locator;
  readonly paymentEmail: Locator;
  readonly paymentTelephone: Locator;
  readonly paymentAddress1: Locator;
  readonly paymentCity: Locator;
  readonly paymentPostcode: Locator;
  readonly paymentCountry: Locator;
  readonly paymentZone: Locator;
  readonly sameDeliveryCheckbox: Locator;
  readonly guestContinueBtn: Locator;
  readonly registeredBillingContinueBtn: Locator;

  // Step 3: Delivery Details
  readonly deliveryContinueBtn: Locator;

  // Step 4: Delivery Method
  readonly flatShippingRadio: Locator;
  readonly shippingCommentTextarea: Locator;
  readonly shippingMethodContinueBtn: Locator;

  // Step 5: Payment Method
  readonly codPaymentRadio: Locator;
  readonly termsCheckbox: Locator;
  readonly paymentMethodContinueBtn: Locator;
  readonly paymentWarningAlert: Locator;

  // Step 6: Confirm Order
  readonly confirmOrderBtn: Locator;
  readonly orderSuccessHeader: Locator;

  constructor(page: Page) {
    super(page);

    // Step 1
    this.registerAccountRadio = page.locator('input[type="radio"][name="account"][value="register"]');
    this.guestCheckoutRadio = page.locator('input[type="radio"][name="account"][value="guest"]');
    this.accountContinueBtn = page.locator('#button-account');
    this.returningEmailInput = page.locator('#collapse-checkout-option #input-email');
    this.returningPasswordInput = page.locator('#collapse-checkout-option #input-password');
    this.returningLoginBtn = page.locator('#button-login');

    // Step 2
    this.existingPaymentRadio = page.locator('input[name="payment_address"][value="existing"]');
    this.newPaymentRadio = page.locator('input[name="payment_address"][value="new"]');
    this.paymentFirstName = page.locator('#input-payment-firstname');
    this.paymentLastName = page.locator('#input-payment-lastname');
    this.paymentEmail = page.locator('#input-payment-email');
    this.paymentTelephone = page.locator('#input-payment-telephone');
    this.paymentAddress1 = page.locator('#input-payment-address-1');
    this.paymentCity = page.locator('#input-payment-city');
    this.paymentPostcode = page.locator('#input-payment-postcode');
    this.paymentCountry = page.locator('#input-payment-country');
    this.paymentZone = page.locator('#input-payment-zone');
    this.sameDeliveryCheckbox = page.locator('input[name="shipping"]');
    this.guestContinueBtn = page.locator('#button-guest');
    this.registeredBillingContinueBtn = page.locator('#button-payment-address');

    // Step 3
    this.deliveryContinueBtn = page.locator('#button-shipping-address');

    // Step 4
    this.flatShippingRadio = page.locator('input[type="radio"][name="shipping_method"][value="flat.flat"]');
    this.shippingCommentTextarea = page.locator('#collapse-shipping-method textarea[name="comment"]');
    this.shippingMethodContinueBtn = page.locator('#button-shipping-method');

    // Step 5
    this.codPaymentRadio = page.locator('input[type="radio"][name="payment_method"][value="cod"]');
    this.termsCheckbox = page.locator('#collapse-payment-method input[name="agree"]');
    this.paymentMethodContinueBtn = page.locator('#button-payment-method');
    this.paymentWarningAlert = page.locator('#collapse-payment-method .alert-danger, #collapse-payment-method .alert-warning');

    // Step 6
    this.confirmOrderBtn = page.locator('#button-confirm');
    this.orderSuccessHeader = page.locator('//h1[normalize-space()="Your order has been placed!"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('index.php?route=checkout/checkout');
  }

  /**
   * Step 2: Fill billing information for a registered customer
   */
  async fillRegisteredBillingDetails(address: CheckoutBillingAddress): Promise<void> {
    await this.page.waitForSelector('#collapse-payment-address.in, #input-payment-firstname:visible, input[name="payment_address"]:visible', { timeout: 10000 });

    if (await this.newPaymentRadio.isVisible()) {
      await this.newPaymentRadio.check();
    }

    if (await this.paymentFirstName.isVisible()) {
      await this.paymentFirstName.fill(address.firstName);
      await this.paymentLastName.fill(address.lastName);
      await this.paymentAddress1.fill(address.address1);
      await this.paymentCity.fill(address.city);
      await this.paymentPostcode.fill(address.postcode);
      await this.paymentCountry.selectOption({ label: address.country });
      await this.page.waitForTimeout(600);
      await this.paymentZone.selectOption({ label: address.zone });
    }

    await this.registeredBillingContinueBtn.click();
  }

  /**
   * Step 3: Confirm Delivery Address if shown
   */
  async confirmDeliveryAddress(): Promise<void> {
    await this.page.waitForSelector('#button-shipping-address:visible, #button-shipping-method:visible', { timeout: 10000 });
    if (await this.deliveryContinueBtn.isVisible()) {
      await this.deliveryContinueBtn.click();
    }
  }

  /**
   * Step 4: Confirm Delivery Method
   */
  async confirmDeliveryMethod(): Promise<void> {
    await this.shippingMethodContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingMethodContinueBtn.click();
  }

  /**
   * Step 5: Confirm Payment Method (with or without terms)
   */
  async confirmPaymentMethod(agreeTerms: boolean = true): Promise<void> {
    await this.termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    if (agreeTerms) {
      if (!(await this.termsCheckbox.isChecked())) {
        await this.termsCheckbox.check();
      }
    } else {
      if (await this.termsCheckbox.isChecked()) {
        await this.termsCheckbox.uncheck();
      }
    }
    await this.paymentMethodContinueBtn.click();
  }

  /**
   * Step 6: Place order
   */
  async placeOrder(): Promise<void> {
    await this.confirmOrderBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmOrderBtn.click();
  }

  /**
   * Check if order success confirmation is displayed
   */
  async isOrderPlacedSuccessfully(): Promise<boolean> {
    try {
      await this.page.waitForURL(/route=checkout\/success/, { timeout: 15000 });
      await this.orderSuccessHeader.waitFor({ state: 'visible', timeout: 10000 });
      return await this.orderSuccessHeader.isVisible();
    } catch {
      return false;
    }
  }
}
