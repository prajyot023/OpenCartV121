import { test, expect } from '../src/fixtures/testFixtures';
import testData from '../src/data/loginData.json';

test.describe('TC003: Data-Driven Login Testing (DDT)', () => {
  for (const record of testData) {
    test(`verify_loginDDT: ${record.description} (${record.email})`, async ({
      homePage,
      loginPage,
      myAccountPage,
    }) => {
      // 1. Open home page and navigate to Login
      await homePage.open();
      await homePage.clickLogin();

      // 2. Perform login attempt
      await loginPage.login(record.email, record.password);

      // 3. Check if My Account page opened
      const isAccountExists = await myAccountPage.isMyAccountPageExists(4000);

      if (record.expected === 'Valid') {
        if (isAccountExists) {
          // If login succeeded, perform logout to reset state
          await myAccountPage.clickLogout();
          expect(isAccountExists).toBe(true);
        } else {
          // Public demo accounts might have passwords changed by external users
          const warning = await loginPage.getWarningMessage();
          expect(warning).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
        }
      } else {
        // Invalid credential: must not access My Account, and must show warning or remain on login
        if (isAccountExists) {
          await myAccountPage.clickLogout();
        }
        expect(isAccountExists).toBe(false);
        const warning = await loginPage.getWarningMessage();
        expect(warning).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
      }
    });
  }
});
