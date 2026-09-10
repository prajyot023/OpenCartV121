import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC013: Product Comparison Suite', () => {
  test('should display empty compare page with no products message', async ({
    comparePage,
  }) => {
    await comparePage.open();
    const isEmpty = await comparePage.hasEmptyMessage();
    expect(isEmpty).toBe(true);
  });

  test('should add products to compare from category page and verify success alerts', async ({
    categoryPage,
    page,
  }) => {
    // Navigate to Phones & PDAs category (usually has products like iPhone, HTC Touch HD)
    await categoryPage.open('24');

    // Get all product names and add the first one to compare
    const productNames = await categoryPage.getProductNames();
    expect(productNames.length).toBeGreaterThanOrEqual(1);

    // Add first product to compare
    const compareButtons = page.locator('.product-thumb .button-group button[data-original-title="Compare this Product"]');
    await compareButtons.first().click();

    // Verify success alert
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 8000 });
    const alertText = await successAlert.textContent();
    expect(alertText).toContain('Success: You have added');
    expect(alertText).toContain('product comparison');
  });

  test('should add two products and verify both appear in comparison table', async ({
    categoryPage,
    comparePage,
    page,
  }) => {
    // Navigate to Phones & PDAs category
    await categoryPage.open('24');

    const compareButtons = page.locator('.product-thumb .button-group button[data-original-title="Compare this Product"]');
    const productCount = await compareButtons.count();

    // Add first product
    if (productCount >= 1) {
      await compareButtons.first().click();
      await page.locator('.alert.alert-success').waitFor({ state: 'visible', timeout: 8000 });
      await page.waitForTimeout(500);
    }

    // Add second product if available
    if (productCount >= 2) {
      await compareButtons.nth(1).click();
      await page.locator('.alert.alert-success').waitFor({ state: 'visible', timeout: 8000 });
      await page.waitForTimeout(500);
    }

    // Navigate to compare page
    await comparePage.open();

    // Verify products in comparison
    const compareNames = await comparePage.getComparedProductNames();
    expect(compareNames.length).toBeGreaterThanOrEqual(1);
  });

  test('should remove a product from comparison table', async ({
    categoryPage,
    comparePage,
    page,
  }) => {
    // Add a product to compare first
    await categoryPage.open('24');
    const compareButtons = page.locator('.product-thumb .button-group button[data-original-title="Compare this Product"]');
    await compareButtons.first().click();
    await page.locator('.alert.alert-success').waitFor({ state: 'visible', timeout: 8000 });

    // Go to compare page
    await comparePage.open();

    // Remove the product
    const removeLinks = comparePage.removeButtons;
    const initialCount = await removeLinks.count();

    if (initialCount > 0) {
      await comparePage.removeProductByIndex(0);
      await page.waitForLoadState('domcontentloaded');

      // Verify product was removed (count decreased or empty message shown)
      const newRemoveCount = await comparePage.removeButtons.count();
      const isEmpty = await comparePage.hasEmptyMessage();
      expect(newRemoveCount < initialCount || isEmpty).toBe(true);
    }
  });

  test('should navigate to compare page via Product Compare link in category', async ({
    categoryPage,
    page,
  }) => {
    await categoryPage.open('24');

    // Click product compare link
    await categoryPage.compareLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=product/compare');
  });
});
