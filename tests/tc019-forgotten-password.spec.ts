import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC019: Forgotten Password Suite', () => {
  test('should navigate to forgot password page via login page link', async ({
    loginPage,
    page,
  }) => {
    await loginPage.open();

    // Click the "Forgotten Password" link
    await loginPage.forgottenPasswordLink.click();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/forgotten');

    // Verify page heading
    const heading = page.locator('#content h1');
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.trim()).toContain('Forgot Your Password');
  });

  test('should display email input and action buttons on forgot password page', async ({
    forgotPasswordPage,
  }) => {
    await forgotPasswordPage.open();

    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.continueButton).toBeVisible();
    await expect(forgotPasswordPage.backButton).toBeVisible();
  });

  test('should submit with registered email and show confirmation', async ({
    registerPage,
    myAccountPage,
    forgotPasswordPage,
  }) => {
    // Register a new account first to have a known valid email
    const customer = DataGenerator.generateCustomerData();
    await registerPage.open();
    await registerPage.register(customer);
    await myAccountPage.clickLogout();

    // Now use forgot password with the registered email
    await forgotPasswordPage.open();
    await forgotPasswordPage.submitEmail(customer.email);

    // Verify success confirmation
    const isSuccess = await forgotPasswordPage.isSuccessAlertDisplayed();
    expect(isSuccess).toBe(true);
  });

  test('should show warning when submitting with unregistered email', async ({
    forgotPasswordPage,
  }) => {
    await forgotPasswordPage.open();

    await forgotPasswordPage.submitEmail('nonexistent_email_123456@doesnotexist.com');

    // Verify warning alert
    const isWarning = await forgotPasswordPage.isWarningAlertDisplayed();
    expect(isWarning).toBe(true);

    const warningMsg = await forgotPasswordPage.getWarningMessage();
    expect(warningMsg).toContain('Warning');
  });

  test('should navigate back to login page when clicking Back button', async ({
    forgotPasswordPage,
    page,
  }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.clickBack();

    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('route=account/login');
  });
});
