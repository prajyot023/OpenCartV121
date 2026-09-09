import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC005: Shopping Cart Suite', () => {
  test('should add a product to cart and verify cart contents', async ({
    homePage,
    searchPage,
    cartPage,
  }) => {
    // 1. Search for a product that adds cleanly without required option dropdowns
    const productName = 'MacBook';
    await homePage.open();
    await homePage.searchForProduct(productName);

    // 2. Add product to cart from search results
    await searchPage.addProductToCart(productName);

    // 3. Wait for success alert notification
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });
    const successMsg = await searchPage.successAlert.textContent();
    expect(successMsg).toContain('Success: You have added');

    // 4. Open Cart page and verify product exists in cart table
    await cartPage.open();
    const isPresent = await cartPage.isProductInCart(productName);
    expect(isPresent).toBe(true);
  });
});
