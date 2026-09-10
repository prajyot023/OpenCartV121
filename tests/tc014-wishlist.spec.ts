import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC014: Wishlist Suite', () => {
  test('should redirect unauthenticated user to login when accessing wishlist', async ({
    wishlistPage,
    page,
  }) => {
    await wishlistPage.open();

    // Should redirect to login page
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/login');
  });

  test('should add product to wishlist after login and verify it appears', async ({
    registerPage,
    myAccountPage,
    productPage,
    wishlistPage,
    page,
  }) => {
    // Register a new user to have a clean account
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);
    expect(await registerPage.getConfirmationMsg()).toBe('Your Account Has Been Created!');

    // Navigate to a product and add to wishlist
    await productPage.open(43); // MacBook
    const wishlistBtn = page.locator('.btn-group button:has(.fa-heart)').first();
    await wishlistBtn.click();

    // Verify success alert
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 8000 });
    const alertText = await successAlert.textContent();
    expect(alertText).toContain('Success: You have added');
    expect(alertText).toContain('wish list');

    // Navigate to wishlist page
    await wishlistPage.open();

    // Verify product is in wishlist
    const products = await wishlistPage.getWishlistProductNames();
    expect(products.some(p => p.includes('MacBook'))).toBe(true);

    // Cleanup: logout
    await myAccountPage.clickLogout();
  });

  test('should remove product from wishlist and verify empty state', async ({
    registerPage,
    myAccountPage,
    productPage,
    wishlistPage,
    page,
  }) => {
    // Register a new user
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    // Add product to wishlist
    await productPage.open(43);
    const wishlistBtn = page.locator('.btn-group button:has(.fa-heart)').first();
    await wishlistBtn.click();
    await page.locator('.alert.alert-success').waitFor({ state: 'visible', timeout: 8000 });

    // Navigate to wishlist and remove the product
    await wishlistPage.open();
    await wishlistPage.removeFirstItem();
    await page.waitForLoadState('domcontentloaded');

    // Verify success alert for removal
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 5000 });

    // Verify wishlist is now empty
    const isEmpty = await wishlistPage.isWishlistEmpty();
    expect(isEmpty).toBe(true);

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should add product to cart from wishlist page', async ({
    registerPage,
    myAccountPage,
    productPage,
    wishlistPage,
    cartPage,
    page,
  }) => {
    // Register a new user
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    // Add product to wishlist
    await productPage.open(43);
    const wishlistBtn = page.locator('.btn-group button:has(.fa-heart)').first();
    await wishlistBtn.click();
    await page.locator('.alert.alert-success').waitFor({ state: 'visible', timeout: 8000 });

    // Go to wishlist and add to cart
    await wishlistPage.open();
    await wishlistPage.addFirstToCart();

    // Verify success alert
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 8000 });

    // Verify product in cart
    await cartPage.open();
    const isInCart = await cartPage.isProductInCart('MacBook');
    expect(isInCart).toBe(true);

    // Cleanup
    await cartPage.clearCart();
    await myAccountPage.clickLogout();
  });
});
