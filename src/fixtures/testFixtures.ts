import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountRegistrationPage } from '../pages/AccountRegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';
import { ContactPage } from '../pages/ContactPage';
import { ComparePage } from '../pages/ComparePage';
import { WishlistPage } from '../pages/WishlistPage';
import { CategoryPage } from '../pages/CategoryPage';
import { SpecialsPage } from '../pages/SpecialsPage';
import { VoucherPage } from '../pages/VoucherPage';
import { ReturnsPage } from '../pages/ReturnsPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

type CustomFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: AccountRegistrationPage;
  myAccountPage: MyAccountPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
  contactPage: ContactPage;
  comparePage: ComparePage;
  wishlistPage: WishlistPage;
  categoryPage: CategoryPage;
  specialsPage: SpecialsPage;
  voucherPage: VoucherPage;
  returnsPage: ReturnsPage;
  forgotPasswordPage: ForgotPasswordPage;
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

  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },

  comparePage: async ({ page }, use) => {
    const comparePage = new ComparePage(page);
    await use(comparePage);
  },

  wishlistPage: async ({ page }, use) => {
    const wishlistPage = new WishlistPage(page);
    await use(wishlistPage);
  },

  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);
    await use(categoryPage);
  },

  specialsPage: async ({ page }, use) => {
    const specialsPage = new SpecialsPage(page);
    await use(specialsPage);
  },

  voucherPage: async ({ page }, use) => {
    const voucherPage = new VoucherPage(page);
    await use(voucherPage);
  },

  returnsPage: async ({ page }, use) => {
    const returnsPage = new ReturnsPage(page);
    await use(returnsPage);
  },

  forgotPasswordPage: async ({ page }, use) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await use(forgotPasswordPage);
  },
});

export { expect } from '@playwright/test';
