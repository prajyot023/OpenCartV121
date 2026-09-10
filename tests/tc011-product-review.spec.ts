import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC011: Product Review Submission Suite', () => {
  // MacBook product (product_id=43) - commonly available
  const productId = 43;

  test('should submit a review with all valid fields', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);
    await productPage.reviewsTab.click();

    // Fill review form
    await page.locator('#input-name').fill('TestReviewer');
    await page.locator('#input-review').fill('This is an excellent product. I am thoroughly impressed with the build quality and performance of this MacBook. Highly recommended!');

    // Select 5-star rating
    await page.locator('input[name="rating"][value="5"]').check();

    // Submit review
    await page.locator('#button-review').click();

    // Verify success message (reviews are moderated, so success = submitted for approval)
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 8000 });
    const alertText = await successAlert.textContent();
    expect(alertText).toContain('Thank you for your review');
  });

  test('should show validation when submitting empty review form', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);
    await productPage.reviewsTab.click();

    // Submit without filling anything
    await page.locator('#button-review').click();

    // Verify error alerts
    const dangerAlert = page.locator('.alert.alert-danger');
    await expect(dangerAlert).toBeVisible({ timeout: 5000 });
  });

  test('should show validation when review text is too short', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);
    await productPage.reviewsTab.click();

    // Fill with valid name but short review
    await page.locator('#input-name').fill('TestUser');
    await page.locator('#input-review').fill('Short');
    await page.locator('input[name="rating"][value="4"]').check();

    // Submit
    await page.locator('#button-review').click();

    // Verify warning about review length (must be 25+ characters)
    const dangerAlert = page.locator('.alert.alert-danger');
    await expect(dangerAlert).toBeVisible({ timeout: 5000 });
    const alertText = await dangerAlert.textContent();
    expect(alertText).toContain('Review');
  });

  test('should show validation when no rating is selected', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);
    await productPage.reviewsTab.click();

    // Fill name and valid review text but no rating
    await page.locator('#input-name').fill('TestUser');
    await page.locator('#input-review').fill('This is a sufficiently long review text for validation purposes and testing.');

    // Submit without rating
    await page.locator('#button-review').click();

    // Verify warning about missing rating
    const dangerAlert = page.locator('.alert.alert-danger');
    await expect(dangerAlert).toBeVisible({ timeout: 5000 });
    const alertText = await dangerAlert.textContent();
    expect(alertText).toContain('Warning');
  });
});
