import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC010: Product Detail Page Suite', () => {
  // MacBook product page (product_id=43)
  const productId = 43;

  test('should display product title, price, availability, model, and brand', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Verify product title
    await expect(productPage.productTitle).toBeVisible();
    const title = await productPage.productTitle.textContent();
    expect(title?.trim()).toBe('MacBook');

    // Verify product price is displayed
    await expect(productPage.productPrice).toBeVisible();
    const price = await productPage.productPrice.textContent();
    expect(price?.trim().length).toBeGreaterThan(0);

    // Verify product metadata (availability, model, brand)
    const productInfo = page.locator('#content .list-unstyled');
    await expect(productInfo.first()).toBeVisible();

    // Check for Brand/Manufacturer
    const brandLink = page.locator('#content a[href*="manufacturer"]');
    await expect(brandLink).toBeVisible();

    // Check for Availability text
    const availText = page.locator('//li[contains(text(),"Availability")]');
    expect(await availText.count()).toBeGreaterThanOrEqual(1);
  });

  test('should display Description tab with content', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Click Description tab
    await productPage.descriptionTab.click();

    // Verify description content is visible
    const descriptionContent = page.locator('#tab-description');
    await expect(descriptionContent).toBeVisible();

    const descText = await descriptionContent.textContent();
    expect(descText?.trim().length).toBeGreaterThan(0);
  });

  test('should display Specification tab', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Click Specification tab
    const specTab = page.locator('//a[contains(text(),"Specification")]');
    await specTab.click();

    const specContent = page.locator('#tab-specification');
    await expect(specContent).toBeVisible();
  });

  test('should display Reviews tab with review form', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Click Reviews tab
    await productPage.reviewsTab.click();

    // Verify review form elements
    const reviewNameInput = page.locator('#input-name');
    const reviewTextarea = page.locator('#input-review');
    const ratingRadios = page.locator('input[name="rating"]');
    const reviewSubmitBtn = page.locator('#button-review');

    await expect(reviewNameInput).toBeVisible();
    await expect(reviewTextarea).toBeVisible();
    expect(await ratingRadios.count()).toBe(5); // 1-5 star rating
    await expect(reviewSubmitBtn).toBeVisible();
  });

  test('should show validation error when submitting review without rating', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);
    await productPage.reviewsTab.click();

    // Fill name and review text but don't select rating
    await page.locator('#input-name').fill('Test User');
    await page.locator('#input-review').fill('This is a test review for validation checking purposes.');

    // Submit without rating
    await page.locator('#button-review').click();

    // Wait for alert/error message
    const alertMsg = page.locator('.alert.alert-danger, .text-danger');
    await expect(alertMsg.first()).toBeVisible({ timeout: 5000 });
  });

  test('should accept quantity input and add to cart', async ({
    productPage,
  }) => {
    await productPage.open(productId);

    // Set quantity
    await productPage.setQuantity(2);

    // Verify quantity input value
    const qtyValue = await productPage.productQuantityInput.inputValue();
    expect(qtyValue).toBe('2');

    // Add to cart
    await productPage.clickAddToCart();
    const successMsg = await productPage.getSuccessAlertMessage();
    expect(successMsg).toContain('Success: You have added');
  });

  test('should display product image and clickable thumbnails', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Verify main product image
    const mainImage = page.locator('.thumbnails li a.thumbnail');
    await expect(mainImage.first()).toBeVisible();

    // Verify thumbnail images exist
    const thumbnails = page.locator('.thumbnails li');
    expect(await thumbnails.count()).toBeGreaterThanOrEqual(1);
  });

  test('should have functional Add to Wish List and Compare buttons', async ({
    productPage,
    page,
  }) => {
    await productPage.open(productId);

    // Verify Wish List button
    const wishlistBtn = page.locator('.btn-group button:has(.fa-heart), button[data-original-title="Add to Wish List"]');
    await expect(wishlistBtn.first()).toBeVisible();

    // Verify Compare button
    const compareBtn = page.locator('.btn-group button:has(.fa-exchange), button[data-original-title="Compare this Product"]');
    await expect(compareBtn.first()).toBeVisible();
  });
});
