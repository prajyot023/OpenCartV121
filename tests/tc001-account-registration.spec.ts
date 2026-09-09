import { test, expect } from '../src/fixtures/testFixtures';
import { DataGenerator } from '../src/utils/dataGenerator';

test.describe('TC001: Account Registration Suite', () => {
  test('verify_account_registration - should register new account successfully', async ({
    homePage,
    registerPage,
  }) => {
    // 1. Navigate to Home Page and open Register Page
    await homePage.open();
    await homePage.clickRegister();

    // 2. Generate unique test customer data
    const customerData = DataGenerator.generateCustomerData();

    // 3. Complete and submit registration form
    await registerPage.register(customerData);

    // 4. Assert success confirmation message
    const confirmationMessage = await registerPage.getConfirmationMsg();
    expect(confirmationMessage).toBe('Your Account Has Been Created!');
  });

  test('should show validation warnings when submitting blank registration form', async ({
    registerPage,
  }) => {
    await registerPage.open();
    await registerPage.clickContinue();

    // Verify privacy policy warning appears
    const warning = await registerPage.getWarningMessage();
    expect(warning).toContain('Warning: You must agree to the Privacy Policy!');

    // Verify mandatory field validation indicators exist
    const errorsCount = await registerPage.fieldErrors.count();
    expect(errorsCount).toBeGreaterThan(0);
  });
});
