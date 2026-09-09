import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC007: Checkout Suite', () => {
  test('should verify Step 1 checkout options and login form for unauthenticated users', async ({
    cartPage,
    productPage,
    checkoutPage,
  }) => {
    // 1. Clear cart and add product
    await cartPage.open();
    await cartPage.clearCart();

    await productPage.open(47);
    await productPage.clickAddToCart();
    await expect(productPage.successAlert).toBeVisible({ timeout: 10000 });

    // 2. Open Checkout
    await checkoutPage.open();

    // Verify Step 1 radios and login form
    await expect(checkoutPage.registerAccountRadio).toBeVisible({ timeout: 10000 });
    await expect(checkoutPage.guestCheckoutRadio).toBeVisible();
    await expect(checkoutPage.accountContinueBtn).toBeVisible();
    await expect(checkoutPage.returningEmailInput).toBeVisible();
    await expect(checkoutPage.returningPasswordInput).toBeVisible();
    await expect(checkoutPage.returningLoginBtn).toBeVisible();
  });

  test('should complete end-to-end checkout and place order successfully for registered customer', async ({
    registerPage,
    cartPage,
    productPage,
    checkoutPage,
  }) => {
    // 1. Register a new customer
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);
    expect(await registerPage.getConfirmationMsg()).toBe('Your Account Has Been Created!');

    // 2. Clear cart & add in-stock product (HP LP3065)
    await cartPage.open();
    await cartPage.clearCart();

    await productPage.open(47);
    await productPage.clickAddToCart();
    await expect(productPage.successAlert).toBeVisible({ timeout: 10000 });

    // 3. Open Checkout
    await checkoutPage.open();

    // 4. Fill Step 2 Billing Details
    await checkoutPage.fillRegisteredBillingDetails({
      firstName: customer.firstName,
      lastName: customer.lastName,
      address1: '100 Broadway, Suite 500',
      city: 'New York',
      postcode: '10001',
      country: 'United States',
      zone: 'New York',
    });

    // 5. Confirm Step 3 Delivery Address & Step 4 Delivery Method
    await checkoutPage.confirmDeliveryAddress();
    await checkoutPage.confirmDeliveryMethod();

    // 6. Confirm Step 5 Payment Method with Terms agreement
    await checkoutPage.confirmPaymentMethod(true);

    // 7. Step 6: Place order & verify confirmation
    await checkoutPage.placeOrder();
    const isSuccess = await checkoutPage.isOrderPlacedSuccessfully();
    expect(isSuccess).toBe(true);
  });

  test('should show warning alert when submitting Payment Method without agreeing to Terms', async ({
    registerPage,
    cartPage,
    productPage,
    checkoutPage,
  }) => {
    // 1. Register a new customer
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    // 2. Clear cart & add in-stock product
    await cartPage.open();
    await cartPage.clearCart();

    await productPage.open(47);
    await productPage.clickAddToCart();
    await expect(productPage.successAlert).toBeVisible({ timeout: 10000 });

    // 3. Open Checkout
    await checkoutPage.open();

    // 4. Complete billing and delivery steps
    await checkoutPage.fillRegisteredBillingDetails({
      firstName: customer.firstName,
      lastName: customer.lastName,
      address1: '200 Market Street',
      city: 'San Francisco',
      postcode: '94105',
      country: 'United States',
      zone: 'California',
    });

    await checkoutPage.confirmDeliveryAddress();
    await checkoutPage.confirmDeliveryMethod();

    // 5. Submit Payment Method WITHOUT agreeing to terms
    await checkoutPage.confirmPaymentMethod(false);

    // 6. Assert warning banner appears
    await expect(checkoutPage.paymentWarningAlert.first()).toBeVisible({ timeout: 10000 });
    const warningText = await checkoutPage.paymentWarningAlert.first().textContent();
    expect(warningText).toContain('Warning: You must agree to the Terms & Conditions!');
  });
});
