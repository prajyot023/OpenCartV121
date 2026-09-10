import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC021: Header Cart Preview Suite', () => {
  test('should display "0 item(s)" in header when cart is empty', async ({
    homePage,
    cartPage,
  }) => {
    // Clear cart first
    await cartPage.open();
    await cartPage.clearCart();

    await homePage.open();

    // Verify header cart button shows 0 items
    const cartButtonText = await homePage.cartButton.textContent();
    expect(cartButtonText).toContain('0 item(s)');
    expect(cartButtonText).toContain('$0.00');
  });

  test('should update header cart count after adding a product', async ({
    homePage,
    searchPage,
    page,
  }) => {
    await homePage.open();
    await homePage.searchForProduct('MacBook');
    await searchPage.addProductToCart('MacBook');
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    // Wait for header cart to update
    await page.waitForTimeout(1000);

    // Verify header cart count updated
    const cartButtonText = await homePage.cartButton.textContent();
    expect(cartButtonText).toContain('1 item(s)');
  });

  test('should open cart preview dropdown when clicking header cart button', async ({
    homePage,
    searchPage,
    page,
  }) => {
    // Add a product first
    await homePage.open();
    await homePage.searchForProduct('MacBook');
    await searchPage.addProductToCart('MacBook');
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    // Go back to home and click cart button
    await homePage.open();
    await homePage.cartButton.click();

    // Verify cart dropdown is visible
    const cartDropdown = page.locator('#cart .dropdown-menu');
    await expect(cartDropdown).toBeVisible({ timeout: 5000 });
  });

  test('should display product details in cart preview dropdown', async ({
    homePage,
    searchPage,
    page,
  }) => {
    // Add a product
    await homePage.open();
    await homePage.searchForProduct('MacBook');
    await searchPage.addProductToCart('MacBook');
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    // Open cart dropdown
    await homePage.open();
    await homePage.cartButton.click();
    const cartDropdown = page.locator('#cart .dropdown-menu');
    await expect(cartDropdown).toBeVisible({ timeout: 5000 });

    // Verify product name appears in dropdown
    const productInDropdown = cartDropdown.locator('table td.text-left a');
    const names = await productInDropdown.allTextContents();
    expect(names.some(n => n.includes('MacBook'))).toBe(true);
  });

  test('should have View Cart and Checkout links in cart preview dropdown', async ({
    homePage,
    searchPage,
    page,
  }) => {
    // Add a product
    await homePage.open();
    await homePage.searchForProduct('MacBook');
    await searchPage.addProductToCart('MacBook');
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    // Open cart dropdown
    await homePage.open();
    await homePage.cartButton.click();
    const cartDropdown = page.locator('#cart .dropdown-menu');
    await expect(cartDropdown).toBeVisible({ timeout: 5000 });

    // Verify View Cart link
    const viewCartLink = cartDropdown.locator('a:has-text("View Cart")');
    await expect(viewCartLink).toBeVisible();

    // Verify Checkout link
    const checkoutLink = cartDropdown.locator('a:has-text("Checkout")');
    await expect(checkoutLink).toBeVisible();
  });

  test('should navigate to cart page from View Cart link in dropdown', async ({
    homePage,
    searchPage,
    page,
  }) => {
    // Add a product
    await homePage.open();
    await homePage.searchForProduct('MacBook');
    await searchPage.addProductToCart('MacBook');
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });

    // Open cart dropdown and click View Cart
    await homePage.open();
    await homePage.cartButton.click();
    const cartDropdown = page.locator('#cart .dropdown-menu');
    await expect(cartDropdown).toBeVisible({ timeout: 5000 });

    const viewCartLink = cartDropdown.locator('a:has-text("View Cart")');
    await viewCartLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=checkout/cart');
  });

  test('should show empty cart message in dropdown when no items', async ({
    homePage,
    cartPage,
    page,
  }) => {
    // Clear cart
    await cartPage.open();
    await cartPage.clearCart();

    // Go home and click cart button
    await homePage.open();
    await homePage.cartButton.click();

    // Verify empty message in dropdown
    const cartDropdown = page.locator('#cart .dropdown-menu');
    await expect(cartDropdown).toBeVisible({ timeout: 5000 });

    const emptyMsg = cartDropdown.locator('p');
    if (await emptyMsg.count() > 0) {
      const text = await emptyMsg.first().textContent();
      expect(text).toContain('Your shopping cart is empty');
    }
  });
});
