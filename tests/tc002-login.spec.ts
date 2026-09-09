import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC002: Login Verification Suite', () => {
  test('verify_login - should successfully login with valid credentials and logout', async ({
    homePage,
    registerPage,
    loginPage,
    myAccountPage,
  }) => {
    // To ensure a 100% reliable valid login across environments, register an active account first
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);
    await myAccountPage.clickLogout();

    // Now test standard Login flow
    await homePage.open();
    await homePage.clickLogin();

    await loginPage.login(customer.email, customer.password);

    // Assert that My Account dashboard is displayed
    const isAccountVisible = await myAccountPage.isMyAccountPageExists();
    expect(isAccountVisible).toBe(true);

    // Test logout functionality
    await myAccountPage.clickLogout();
  });

  test('should display warning alert when logging in with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.open();
    await loginPage.login('invalid_email_user_999@testdomain.com', 'wrong_password_123');

    const isWarning = await loginPage.isWarningDisplayed();
    expect(isWarning).toBe(true);

    const warningText = await loginPage.getWarningMessage();
    expect(warningText).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
  });
});
