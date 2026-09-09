import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC006: Storefront Currency & Header Navigation Suite', () => {
  test('should switch currency to EUR, GBP, and USD and verify currency symbol updates', async ({
    homePage,
  }) => {
    await homePage.open();

    // 1. Switch to Euro
    await homePage.switchCurrency('EUR');
    expect(await homePage.getCurrentCurrencySymbol()).toBe('€');

    // 2. Switch to Pound Sterling
    await homePage.switchCurrency('GBP');
    expect(await homePage.getCurrentCurrencySymbol()).toBe('£');

    // 3. Switch back to US Dollar
    await homePage.switchCurrency('USD');
    expect(await homePage.getCurrentCurrencySymbol()).toBe('$');
  });

  test('should verify main logo redirects to store home', async ({
    homePage,
    searchPage,
  }) => {
    await searchPage.open('iPhone');
    await homePage.logo.click();
    await homePage.waitForUrl(/route=common\/home/);
    expect(homePage.getUrl()).toContain('route=common/home');
  });
});
