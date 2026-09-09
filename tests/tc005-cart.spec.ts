import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC005: Shopping Cart Management Suite', () => {
  test('should add a product to cart and verify cart contents', async ({
    homePage,
    searchPage,
    cartPage,
  }) => {
    const productName = 'MacBook';
    await homePage.open();
    await homePage.searchForProduct(productName);

    await searchPage.addProductToCart(productName);
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });
    const successMsg = await searchPage.successAlert.textContent();
    expect(successMsg).toContain('Success: You have added');

    await cartPage.open();
    const isPresent = await cartPage.isProductInCart(productName);
    expect(isPresent).toBe(true);
  });

  test('should update item quantity in cart', async ({
    homePage,
    searchPage,
    cartPage,
  }) => {
    const productName = 'MacBook';
    await homePage.open();
    await homePage.searchForProduct(productName);
    await searchPage.addProductToCart(productName);
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    await cartPage.open();
    await cartPage.updateFirstItemQuantity(2);

    await expect(cartPage.successAlert).toBeVisible({ timeout: 10000 });
    const alertText = await cartPage.successAlert.textContent();
    expect(alertText).toContain('Success: You have modified your shopping cart!');
  });

  test('should verify cart discount and estimate accordions are interactive', async ({
    homePage,
    searchPage,
    cartPage,
  }) => {
    const productName = 'MacBook';
    await homePage.open();
    await homePage.searchForProduct(productName);
    await searchPage.addProductToCart(productName);
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    await cartPage.open();

    // Verify Use Coupon Code accordion is present
    await expect(cartPage.couponAccordion).toBeVisible({ timeout: 10000 });
    await cartPage.couponAccordion.click();

    // Verify Use Gift Certificate accordion is present
    await expect(cartPage.voucherAccordion).toBeVisible({ timeout: 10000 });
    await cartPage.voucherAccordion.click();
  });

  test('should remove item from cart and verify empty cart state', async ({
    homePage,
    searchPage,
    cartPage,
  }) => {
    const productName = 'MacBook';
    await homePage.open();
    await homePage.searchForProduct(productName);
    await searchPage.addProductToCart(productName);
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    await cartPage.open();
    await cartPage.clearCart();

    await expect(cartPage.emptyCartMessage).toBeVisible({ timeout: 10000 });
    const emptyText = await cartPage.emptyCartMessage.textContent();
    expect(emptyText).toContain('Your shopping cart is empty!');
  });
});
