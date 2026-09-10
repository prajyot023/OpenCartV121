import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC008: Homepage Features Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should display homepage slideshow/carousel', async ({ page }) => {
    // Verify the slideshow container is visible
    const slideshow = page.locator('#slideshow0, .swiper-container, .slideshow');
    await expect(slideshow.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display featured products section with Add to Cart buttons', async ({ page }) => {
    // Verify featured product cards are displayed
    const featuredProducts = page.locator('.product-layout .product-thumb');
    const count = await featuredProducts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify each product card has an Add to Cart button
    const addToCartButtons = page.locator('.product-thumb .button-group button:first-child');
    expect(await addToCartButtons.count()).toBeGreaterThanOrEqual(1);
  });

  test('should display featured product names and prices', async ({ page }) => {
    const productNames = page.locator('.product-thumb h4 a');
    const productPrices = page.locator('.product-thumb .price');

    expect(await productNames.count()).toBeGreaterThanOrEqual(1);
    expect(await productPrices.count()).toBeGreaterThanOrEqual(1);

    // Verify first product name is not empty
    const firstName = await productNames.first().textContent();
    expect(firstName?.trim().length).toBeGreaterThan(0);
  });

  test('should display brand logos carousel', async ({ page }) => {
    // Brand/manufacturer carousel at the bottom of the page
    const brandCarousel = page.locator('#carousel0, .swiper-container').last();
    await expect(brandCarousel).toBeVisible({ timeout: 10000 });
  });

  test('should display all 4 footer columns with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify footer heading columns
    const footerHeadings = page.locator('footer h5');
    expect(await footerHeadings.count()).toBeGreaterThanOrEqual(4);

    // Verify footer links exist
    const footerLinks = page.locator('footer a');
    expect(await footerLinks.count()).toBeGreaterThan(10);
  });

  test('should display top header bar with functional links', async ({ page }) => {
    // Verify Contact link in top bar
    const phoneIcon = page.locator('.fa-phone').first();
    await expect(phoneIcon).toBeVisible();

    // Verify My Account dropdown
    const myAccountLink = page.locator('//span[normalize-space()="My Account"]');
    await expect(myAccountLink).toBeVisible();

    // Verify Wish List link
    const wishListLink = page.locator('#wishlist-total, a[title="Wish List"]');
    await expect(wishListLink.first()).toBeVisible();

    // Verify Shopping Cart link
    const shoppingCartLink = page.locator('//a[@title="Shopping Cart"]');
    await expect(shoppingCartLink).toBeVisible();

    // Verify Checkout link
    const checkoutLink = page.locator('//a[@title="Checkout"]');
    await expect(checkoutLink).toBeVisible();
  });

  test('should navigate to correct pages from header links', async ({ page }) => {
    // Click Shopping Cart link
    const shoppingCartLink = page.locator('//a[@title="Shopping Cart"]');
    await shoppingCartLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=checkout/cart');

    // Go back and click Checkout link
    await page.goBack();
    const checkoutLink = page.locator('//a[@title="Checkout"]');
    await checkoutLink.click();
    await page.waitForLoadState('domcontentloaded');
    // Checkout redirects to cart when cart is empty, or to checkout when items exist
    expect(page.url()).toMatch(/route=checkout\/(checkout|cart)/);
  });
});
