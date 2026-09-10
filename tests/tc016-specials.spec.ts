import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC016: Special Offers / Sale Page Suite', () => {
  test('should display products on the specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    // The store may have nothing on sale; report that as skipped rather than passing blind.
    const productCount = await specialsPage.getProductCount();
    test.skip(productCount === 0, 'No products are currently on special');

    const names = await specialsPage.getProductNames();
    expect(names.length).toBe(productCount);
    expect(names.every(n => n.trim().length > 0)).toBe(true);
  });

  test('should display original (old) price with strikethrough and special (new) price', async ({
    specialsPage,
    page,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();
    test.skip(productCount === 0, 'No products are currently on special');

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
  });

  test('should display Sort By and Show dropdowns on specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();
    test.skip(productCount === 0, 'No products are currently on special');

    await expect(specialsPage.sortByDropdown).toBeVisible();
    await expect(specialsPage.showLimitDropdown).toBeVisible();
  });

  test('should have list and grid view buttons on specials page', async ({
    specialsPage,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();
    test.skip(productCount === 0, 'No products are currently on special');

    await expect(specialsPage.listViewButton).toBeVisible();
    await expect(specialsPage.gridViewButton).toBeVisible();
  });

  test('should add product to cart from specials page', async ({
    specialsPage,
    cartPage,
    productPage,
    page,
  }) => {
    await specialsPage.open();

    const productCount = await specialsPage.getProductCount();
    test.skip(productCount === 0, 'No products are currently on special');

    await specialsPage.addToCartButtons.first().click();

    // OpenCart's listing button either adds the item outright or, when the product has
    // required options, answers with a redirect to its detail page. Wait for whichever
    // arrives: isVisible() alone does not wait, so it always loses the race to the redirect.
    const successAlert = page.locator('.alert.alert-success');
    const outcome = await Promise.race([
      successAlert.waitFor({ state: 'visible', timeout: 20000 }).then(() => 'added').catch(() => null),
      page.waitForURL(/route=product\/product/, { timeout: 20000 }).then(() => 'redirected').catch(() => null),
    ]);
    expect(outcome, 'Add to Cart neither showed a success banner nor opened the product page').not.toBeNull();

    if (outcome === 'added') {
      expect(await successAlert.textContent()).toContain('Success: You have added');

      await cartPage.open();
      expect(await cartPage.getCartProductNames()).not.toHaveLength(0);
    } else {
      // The shopper must pick the required options on the detail page before it can be added.
      expect(page.url()).toContain('route=product/product');
      await expect(productPage.productTitle).toBeVisible();
      await expect(productPage.addToCartButton).toBeVisible();
    }
  });
});
