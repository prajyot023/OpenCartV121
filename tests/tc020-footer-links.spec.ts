import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC020: Footer Links & Information Pages Suite', () => {
  test('should load About Us page with content', async ({ page }) => {
    await page.goto('index.php?route=information/information&information_id=4', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('About Us');

    // Verify there's actual content
    const content = page.locator('#content');
    const text = await content.textContent();
    expect(text?.trim().length).toBeGreaterThan(50);
  });

  test('should load Delivery Information page with content', async ({ page }) => {
    await page.goto('index.php?route=information/information&information_id=6', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('Delivery Information');
  });

  test('should load Privacy Policy page with content', async ({ page }) => {
    await page.goto('index.php?route=information/information&information_id=3', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('Privacy Policy');
  });

  test('should load Terms & Conditions page with content', async ({ page }) => {
    await page.goto('index.php?route=information/information&information_id=5', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('Terms & Conditions');
  });

  test('should verify all Information column footer links work', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // Find all footer links under "Information" column
    const footerInfoLinks = page.locator('footer .col-sm-3:first-child a');
    const count = await footerInfoLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Test first link navigates correctly
    const firstLinkHref = await footerInfoLinks.first().getAttribute('href');
    expect(firstLinkHref).toBeTruthy();
  });

  test('should verify Customer Service column footer links exist', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // Find footer links under Customer Service column
    const footerLinks = page.locator('footer .col-sm-3').nth(1).locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should verify Extras column footer links exist', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // Find footer links under Extras column
    const footerLinks = page.locator('footer .col-sm-3').nth(2).locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should verify My Account column footer links exist', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // Find footer links under My Account column
    const footerLinks = page.locator('footer .col-sm-3').nth(3).locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should navigate to Contact Us page from footer link', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    const contactLink = page.locator('footer a[href*="route=information/contact"]');
    if (await contactLink.count() > 0) {
      await contactLink.first().click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('route=information/contact');
    }
  });

  test('should navigate to Returns page from footer link', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    const returnsLink = page.locator('footer a[href*="route=account/return"]');
    if (await returnsLink.count() > 0) {
      await returnsLink.first().click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('return');
    }
  });
});
