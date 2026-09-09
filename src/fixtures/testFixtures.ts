import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountRegistrationPage } from '../pages/AccountRegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';

type CustomFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: AccountRegistrationPage;
  myAccountPage: MyAccountPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
};

export const test = baseTest.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new AccountRegistrationPage(page);
    await use(registerPage);
  },

  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from '@playwright/test';
