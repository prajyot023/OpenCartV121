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

    const totalProducts = await categoryPage.getProductCount();
    test.skip(totalProducts === 0, 'Category has no products to lay out');

    await categoryPage.switchToListView();

    // In list view every card carries the product-list class. Assert with toHaveCount so
    // this retries until the class swap lands instead of racing a fixed sleep.
    await expect(page.locator('.product-layout.product-list')).toHaveCount(totalProducts);
  });

  test('should switch to grid view and verify layout change', async ({
    categoryPage,
    page,
  }) => {
    await categoryPage.open('18');

    const totalProducts = await categoryPage.getProductCount();
    test.skip(totalProducts === 0, 'Category has no products to lay out');

    // Switch to list first, then back to grid
    await categoryPage.switchToListView();
    await expect(page.locator('.product-layout.product-list')).toHaveCount(totalProducts);

    await categoryPage.switchToGridView();
    await expect(page.locator('.product-layout.product-grid')).toHaveCount(totalProducts);
  });

  test('should sort products by Name (A - Z) via Sort By dropdown', async ({
    categoryPage,
  }) => {
    // Use Phones & PDAs category (path=24) which usually has products
    await categoryPage.open('24');

    const initialNames = await categoryPage.getProductNames();

    // Sort by Name A-Z. Select by label, not by the option's value: those values are
    // absolute URLs that would pin the suite to one host regardless of BASE_URL.
    await categoryPage.sortBy('Name (A - Z)');
    expect(categoryPage.getUrl()).toContain('sort=pd.name');

    const sortedNames = (await categoryPage.getProductNames()).map(n => n.trim().toLowerCase());
    expect(sortedNames.length).toBe(initialNames.length);
    expect(sortedNames.length).toBeGreaterThan(1);
    expect(sortedNames).toEqual([...sortedNames].sort());
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
