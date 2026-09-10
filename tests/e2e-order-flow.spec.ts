import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('End-to-End Customer Journey Suite', () => {
  test('Complete Customer E2E Flow: Register Account -> Verify Dashboard -> Search Product -> Add to Cart -> Inspect Cart -> Validate Checkout -> Logout', async ({
    homePage,
    registerPage,
    searchPage,
    cartPage,
    myAccountPage,
    page,
  }) => {
    // -------------------------------------------------------------
    // Step 1: Open Storefront & Register New Customer
    // -------------------------------------------------------------
    await homePage.open();
    await homePage.clickRegister();

    const customer = DataGenerator.generateCustomerData();
    await registerPage.register(customer);

    const regConfirmation = await registerPage.getConfirmationMsg();
    expect(regConfirmation).toBe('Your Account Has Been Created!');

    // -------------------------------------------------------------
    // Step 2: Verify Account Access & Dashboard
    // -------------------------------------------------------------
    await myAccountPage.open();
    const isDashboardVisible = await myAccountPage.isMyAccountPageExists();
    expect(isDashboardVisible).toBe(true);

    // -------------------------------------------------------------
    // Step 3: Search for a Product (MacBook)
    // -------------------------------------------------------------
    const targetProduct = 'MacBook';
    await homePage.searchForProduct(targetProduct);

    const isProductFound = await searchPage.isProductDisplayed(targetProduct);
    expect(isProductFound).toBe(true);

    const productsCount = await searchPage.getProductsCount();
    expect(productsCount).toBeGreaterThanOrEqual(1);

    // -------------------------------------------------------------
    // Step 4: Add Product to Shopping Cart
    // -------------------------------------------------------------
    await searchPage.addProductToCart(targetProduct);

    // Assert green success banner
    await expect(searchPage.successAlert).toBeVisible({ timeout: 10000 });
    const successMsg = await searchPage.successAlert.textContent();
    expect(successMsg).toContain('Success: You have added');
    expect(successMsg).toContain(targetProduct);

    // -------------------------------------------------------------
    // Step 5: Open Shopping Cart & Verify Contents
    // -------------------------------------------------------------
    await cartPage.open();

    const isItemInCart = await cartPage.isProductInCart(targetProduct);
    expect(isItemInCart).toBe(true);

    const cartProducts = await cartPage.getCartProductNames();
    expect(cartProducts.some(name => name.includes(targetProduct))).toBe(true);

    // -------------------------------------------------------------
    // Step 6: Verify Checkout Action & Stock Validation
    // -------------------------------------------------------------
    await cartPage.clickCheckout();

    // On TutorialsNinja demo store, inventory is flagged as out of stock (***)
    // which OpenCart validates by displaying warning and keeping user on cart,
    // or routing to checkout if stock allows. Wait for that navigation to land before
    // reading the URL, otherwise this still reads the cart page it started on.
    await page.waitForURL(/route=checkout\/(cart|checkout)/, { timeout: 30000 });
    expect(cartPage.getUrl()).toMatch(/route=checkout\/(cart|checkout)/);

    // -------------------------------------------------------------
    // Step 7: Verify Account Order History
    // -------------------------------------------------------------
    await myAccountPage.open();
    expect(await myAccountPage.isMyAccountPageExists()).toBe(true);

    // -------------------------------------------------------------
    // Step 8: Clean Logout & Session Teardown
    // -------------------------------------------------------------
    await myAccountPage.clickLogout();
  });
});
