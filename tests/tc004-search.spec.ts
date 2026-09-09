import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC004: Product Search Suite', () => {
  const existingProduct = process.env.SEARCH_PRODUCT || 'iPhone';
  const nonExistingProduct = 'RandomProductXYZ123NonExistent';

  test('should search for an existing product and display it in results', async ({
    homePage,
    searchPage,
  }) => {
    await homePage.open();
    await homePage.searchForProduct(existingProduct);

    // Assert that results contain the searched product
    const isDisplayed = await searchPage.isProductDisplayed(existingProduct);
    expect(isDisplayed).toBe(true);

    const count = await searchPage.getProductsCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display no matching products message for non-existent product', async ({
    homePage,
    searchPage,
  }) => {
    await homePage.open();
    await homePage.searchForProduct(nonExistingProduct);

    const hasNoProducts = await searchPage.hasNoProductsMessage();
    expect(hasNoProducts).toBe(true);

    const count = await searchPage.getProductsCount();
    expect(count).toBe(0);
  });
});
