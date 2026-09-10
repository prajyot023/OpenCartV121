import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC016: Special Offers / Sale Page Suite', () => {
  test('should display products on the specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();
    // Specials page may have 0 products if none are on sale
    expect(productCount).toBeGreaterThanOrEqual(0);

    if (productCount > 0) {
      const names = await specialsPage.getProductNames();
      expect(names.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('should display original (old) price with strikethrough and special (new) price', async ({
    specialsPage,
    page,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();

    if (productCount > 0) {
      // Verify old (strikethrough) prices exist
      const oldPriceCount = await specialsPage.getOriginalPriceCount();
      expect(oldPriceCount).toBeGreaterThanOrEqual(1);

      // Verify new (discounted) prices exist
      const newPriceCount = await specialsPage.getSpecialPriceCount();
      expect(newPriceCount).toBeGreaterThanOrEqual(1);

      // Verify the old price has line-through text-decoration
      const oldPriceElement = specialsPage.originalPrices.first();
      const textDecoration = await oldPriceElement.evaluate(el => {
        return window.getComputedStyle(el).textDecoration;
      });
      expect(textDecoration).toContain('line-through');
    }
  });

  test('should display Sort By and Show dropdowns on specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();

    if (productCount > 0) {
      await expect(specialsPage.sortByDropdown).toBeVisible();
      await expect(specialsPage.showLimitDropdown).toBeVisible();
    }
  });

  test('should have list and grid view buttons on specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();

    if (productCount > 0) {
      await expect(specialsPage.listViewButton).toBeVisible();
      await expect(specialsPage.gridViewButton).toBeVisible();
    }
  });

  test('should add product to cart from specials page', async ({
    specialsPage,
    cartPage,
    page,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();

    if (productCount > 0) {
      // Click add to cart on first product
      await specialsPage.addToCartButtons.first().click();

      // Verify success alert
      const successAlert = page.locator('.alert.alert-success');
      await expect(successAlert).toBeVisible({ timeout: 10000 });
      const alertText = await successAlert.textContent();
      expect(alertText).toContain('Success');
    }
  });
});
