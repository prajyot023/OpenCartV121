import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC022: Account Management Suite', () => {
  test('should navigate to My Account dashboard after registration', async ({
    registerPage,
    myAccountPage,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();
    const isDashboard = await myAccountPage.isMyAccountPageExists();
    expect(isDashboard).toBe(true);

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should display Edit Account link and navigate to edit form', async ({
    registerPage,
    myAccountPage,
    page,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Click "Edit your account information" link
    const editLink = page.locator('//a[contains(text(),"Edit your account information")]');
    await expect(editLink).toBeVisible();
    await editLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/edit');

    // Verify edit form fields are pre-filled
    const firstNameInput = page.locator('#input-firstname');
    await expect(firstNameInput).toBeVisible();
    const firstName = await firstNameInput.inputValue();
    expect(firstName).toBe(customer.firstName);

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should display Change Password link and navigate to password form', async ({
    registerPage,
    myAccountPage,
    page,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Click "Change your password" link
    const changePasswordLink = page.locator('//a[contains(text(),"Change your password")]');
    await expect(changePasswordLink).toBeVisible();
    await changePasswordLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/password');

    // Verify password form fields
    const passwordInput = page.locator('#input-password');
    const confirmInput = page.locator('#input-confirm');
    await expect(passwordInput).toBeVisible();
    await expect(confirmInput).toBeVisible();

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should display Address Book link and navigate to address management', async ({
    registerPage,
    myAccountPage,
    page,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Click "Modify your address book entries" link
    const addressLink = page.locator('//a[contains(text(),"address book")]');
    await expect(addressLink).toBeVisible();
    await addressLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/address');

    // Verify address book page heading
    const heading = page.locator('#content h2');
    await expect(heading).toBeVisible();

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should display Order History page (empty state for new account)', async ({
    registerPage,
    myAccountPage,
    page,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Click "View your order history" link
    const orderHistoryLink = page.locator('//a[contains(text(),"order history")]');
    await expect(orderHistoryLink).toBeVisible();
    await orderHistoryLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/order');

    // Verify order history page heading
    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('Order History');

    // For a new account, there should be no orders
    const noOrdersMsg = page.locator('//p[contains(text(),"You have not made any previous orders")]');
    await expect(noOrdersMsg).toBeVisible();

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should toggle newsletter subscription', async ({
    registerPage,
    myAccountPage,
    page,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Click "Subscribe / unsubscribe to newsletter" link
    const newsletterLink = page.locator('//a[contains(text(),"newsletter")]');
    await expect(newsletterLink).toBeVisible();
    await newsletterLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/newsletter');

    // Verify newsletter subscription toggle
    const subscribeYes = page.locator('input[name="newsletter"][value="1"]');
    const subscribeNo = page.locator('input[name="newsletter"][value="0"]');
    await expect(subscribeYes).toBeVisible();
    await expect(subscribeNo).toBeVisible();

    // Toggle to Yes and submit
    await subscribeYes.check();
    const continueBtn = page.locator('input[value="Continue"]');
    await continueBtn.click();

    // Verify success
    const successAlert = page.locator('.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 5000 });

    // Cleanup
    await myAccountPage.clickLogout();
  });

  test('should display right sidebar navigation links in account section', async ({
    registerPage,
    myAccountPage,
  }) => {
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);

    await myAccountPage.open();

    // Verify right-side navigation links
    const sidebarLinks = myAccountPage.rightMenuLinks;
    const count = await sidebarLinks.count();
    expect(count).toBeGreaterThanOrEqual(5); // My Account, Edit Account, Password, Address Book, Wish List, Order History, etc.

    // Verify key links are present
    const linkTexts = await sidebarLinks.allTextContents();
    const trimmedTexts = linkTexts.map(t => t.trim());

    expect(trimmedTexts.some(t => t.includes('My Account'))).toBe(true);
    expect(trimmedTexts.some(t => t.includes('Logout'))).toBe(true);

    // Cleanup
    await myAccountPage.clickLogout();
  });
});
