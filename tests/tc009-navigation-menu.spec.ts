import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC009: Top Navigation Menu Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should display all top-level navigation categories', async ({ page }) => {
    const navBar = page.locator('.navbar-collapse ul.navbar-nav');
    await expect(navBar).toBeVisible();

    const navItems = page.locator('.navbar-collapse ul.navbar-nav > li > a');
    const categories = await navItems.allTextContents();
    const trimmedCategories = categories.map(c => c.trim());

    expect(trimmedCategories).toContain('Desktops');
    expect(trimmedCategories).toContain('Laptops & Notebooks');
    expect(trimmedCategories).toContain('Components');
    expect(trimmedCategories).toContain('Tablets');
    expect(trimmedCategories).toContain('Software');
    expect(trimmedCategories).toContain('Phones & PDAs');
    expect(trimmedCategories).toContain('Cameras');
    expect(trimmedCategories).toContain('MP3 Players');
  });

  test('should show dropdown sub-categories for Desktops', async ({ page }) => {
    // Click Desktops to reveal dropdown (click is more reliable than hover in headless)
    const desktopsMenu = page.locator('.navbar-nav > li > a:has-text("Desktops")');
    await desktopsMenu.click();

    // Wait for dropdown to appear
    const dropdown = page.locator('.navbar-nav > li:has(> a:has-text("Desktops")) .dropdown-menu');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // Verify sub-categories
    const subItems = dropdown.locator('a');
    const subTexts = await subItems.allTextContents();
    const trimmed = subTexts.map(s => s.trim());

    expect(trimmed).toContain('PC (0)');
    expect(trimmed).toContain('Mac (1)');
    // The store renders this link with no space before the category name
    expect(trimmed).toContain('Show AllDesktops');
  });

  test('should show dropdown sub-categories for Laptops & Notebooks', async ({ page }) => {
    const laptopsMenu = page.locator('.navbar-nav > li > a:has-text("Laptops & Notebooks")');
    await laptopsMenu.click();

    const dropdown = page.locator('.navbar-nav > li:has(> a:has-text("Laptops & Notebooks")) .dropdown-menu');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const subItems = dropdown.locator('a');
    const subTexts = await subItems.allTextContents();
    const trimmed = subTexts.map(s => s.trim());

    expect(trimmed).toContain('Macs (0)');
    expect(trimmed).toContain('Windows (0)');
    // The store renders this link with no space before the category name
    expect(trimmed).toContain('Show AllLaptops & Notebooks');
  });

  test('should navigate to Desktops category page when clicking "Show All Desktops"', async ({ page }) => {
    const desktopsMenu = page.locator('.navbar-nav > li > a:has-text("Desktops")');
    await desktopsMenu.click();

    const dropdown = page.locator('.navbar-nav > li:has(> a:has-text("Desktops")) .dropdown-menu');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // The "Show All" link text is "Show AllDesktops" (no space)
    const showAll = dropdown.locator('a').filter({ hasText: 'Show All' }).last();
    await showAll.click();

    await page.waitForURL(/route=product\/category/, { timeout: 30000 });
    expect(page.url()).toContain('path=20');
  });

  test('should navigate to Tablets page when clicking Tablets link', async ({ page }) => {
    const tabletsLink = page.locator('.navbar-nav > li > a:has-text("Tablets")');
    await tabletsLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=product/category');
  });

  test('should navigate to Phones & PDAs page', async ({ page }) => {
    const phonesLink = page.locator('.navbar-nav > li > a:has-text("Phones & PDAs")');
    await phonesLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=product/category');
  });

  test('should show dropdown for MP3 Players with sub-categories', async ({ page }) => {
    const mp3Menu = page.locator('.navbar-nav > li > a:has-text("MP3 Players")');
    await mp3Menu.click();

    const dropdown = page.locator('.navbar-nav > li:has(> a:has-text("MP3 Players")) .dropdown-menu');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const subItems = dropdown.locator('a');
    expect(await subItems.count()).toBeGreaterThanOrEqual(1);
  });
});
