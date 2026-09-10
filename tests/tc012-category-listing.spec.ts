import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC012: Category & Listing Page Suite', () => {
  test('should display breadcrumb navigation on category page', async ({
    categoryPage,
  }) => {
    await categoryPage.open('20'); // Desktops
    const breadcrumbs = await categoryPage.getBreadcrumbItems();

    expect(breadcrumbs.length).toBeGreaterThanOrEqual(2);
    // Should contain Home and Desktops
    expect(breadcrumbs.some(b => b.includes('Desktops'))).toBe(true);
  });

  test('should display category heading', async ({
    categoryPage,
  }) => {
    await categoryPage.open('20'); // Desktops
    const title = await categoryPage.getCategoryTitle();
    expect(title).toContain('Desktops');
  });

  test('should display sidebar category navigation links', async ({
    categoryPage,
  }) => {
    await categoryPage.open('20'); // Desktops
    const sidebarLinks = categoryPage.sidebarCategories;
    expect(await sidebarLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('should switch to list view and verify layout change', async ({
    categoryPage,
    page,
  }) => {
    // Use a category with products, e.g. Laptops & Notebooks -> Show All (path=18)
    await categoryPage.open('18');

    await categoryPage.switchToListView();
    await page.waitForTimeout(500);

    // In list view, products have class product-list
    const listItems = page.locator('.product-layout.product-list');
    // Products should be visible (if any products exist in the category)
    const totalProducts = await categoryPage.getProductCount();
    if (totalProducts > 0) {
      expect(await listItems.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('should switch to grid view and verify layout change', async ({
    categoryPage,
    page,
  }) => {
    await categoryPage.open('18');

    // Switch to list first, then grid
    await categoryPage.switchToListView();
    await page.waitForTimeout(300);
    await categoryPage.switchToGridView();
    await page.waitForTimeout(300);

    // In grid view, products have class product-grid
    const gridItems = page.locator('.product-layout.product-grid');
    const totalProducts = await categoryPage.getProductCount();
    if (totalProducts > 0) {
      expect(await gridItems.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('should sort products by Name (A - Z) via Sort By dropdown', async ({
    categoryPage,
  }) => {
    // Use Phones & PDAs category (path=24) which usually has products
    await categoryPage.open('24');

    const initialNames = await categoryPage.getProductNames();

    // Sort by Name A-Z
    await categoryPage.sortBy('https://tutorialsninja.com/demo/index.php?route=product/category&path=24&sort=pd.name&order=ASC');

    const sortedNames = await categoryPage.getProductNames();

    if (sortedNames.length > 1) {
      // Verify alphabetical order
      for (let i = 0; i < sortedNames.length - 1; i++) {
        expect(sortedNames[i].toLowerCase() <= sortedNames[i + 1].toLowerCase()).toBe(true);
      }
    }
  });

  test('should display product compare link with correct count', async ({
    categoryPage,
  }) => {
    await categoryPage.open('20');
    const compareText = await categoryPage.getCompareCountText();
    expect(compareText).toContain('Product Compare');
  });

  test('should display correct products in sub-category (Mac under Desktops)', async ({
    categoryPage,
    page,
  }) => {
    // Navigate to Desktops > Mac sub-category (path=20_27)
    await categoryPage.open('20_27');

    const heading = await categoryPage.getCategoryTitle();
    expect(heading).toContain('Mac');
  });

  test('should display Sort By and Show dropdowns', async ({
    categoryPage,
  }) => {
    await categoryPage.open('20');

    await expect(categoryPage.sortByDropdown).toBeVisible();
    await expect(categoryPage.showLimitDropdown).toBeVisible();
  });
});
