# opencart-playwright-ts-framework

[![Playwright Tests](https://github.com/prajyot023/opencart-playwright-ts-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/prajyot023/opencart-playwright-ts-framework/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50-green.svg?logo=playwright)](https://playwright.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> Production-ready End-to-End (E2E) Test Automation Framework for OpenCart built with **Playwright**, **TypeScript**, and **Page Object Model (POM)** design pattern. Features multi-browser execution, Data-Driven Testing (DDT), custom fixtures, HTML reporting, and GitHub Actions CI/CD pipeline.

**Target Application**: [TutorialsNinja OpenCart Demo Store](https://tutorialsninja.com/demo/index.php)

---

## 🚀 Key Features

- **Page Object Model (POM)**: Complete architectural separation of locators, actions, and assertions across modular page classes.
- **Dependency Injection via Fixtures**: Playwright custom fixtures (`testFixtures.ts`) automatically initialize and inject page objects into test suites with isolated browser contexts.
- **Data-Driven Testing (DDT)**: Parameterized test runs powered by external JSON datasets (`src/data/loginData.json`) for positive and negative scenario validation.
- **Dynamic Data Generation**: In-house `DataGenerator` utility replacing external dependencies to produce randomized unique customer records (names, emails, phone numbers, passwords).
- **Cross-Browser & Parallel Testing**: Multi-browser support configured for Chromium, Firefox, and WebKit (Safari), running parallel test workers for high throughput.
- **Resilient Locators & Auto-Waiting**: Utilizes Playwright's role-based, CSS, and XPath locators with automatic waiting, eliminating arbitrary sleep statements.
- **Rich Diagnostics & Reporting**: Built-in HTML reports, automatic failure screenshots, video recordings, and Playwright Trace Viewer integration for rapid debugging.
- **CI/CD Automation**: Fully configured GitHub Actions workflow (`.github/workflows/playwright.yml`) that triggers on push and pull requests with report artifact uploads.

---

## 📁 Project Structure

```
opencart-playwright-ts-framework/
├── .github/
│   └── workflows/
│       ├── playwright.yml               # GitHub Actions CI workflow (multi-browser testing & reports)
│       └── copilot-setup-steps.yml
├── src/
│   ├── data/
│   │   └── loginData.json               # Data-driven test records (valid/invalid credentials)
│   ├── fixtures/
│   │   └── testFixtures.ts              # Playwright custom fixtures & page dependency injection
│   ├── pages/                           # Page Object Model Layer
│   │   ├── BasePage.ts                  # Base class with shared actions, timeouts & navigation
│   │   ├── HomePage.ts                  # Header, navigation bar, search box & currency selector
│   │   ├── AccountRegistrationPage.ts   # Registration form fields, privacy policy & confirmation
│   │   ├── LoginPage.ts                 # Returning customer login form, password reset & error alerts
│   │   ├── MyAccountPage.ts             # Account dashboard verification & logout functionality
│   │   ├── SearchPage.ts                # Search results, product grid, sorting & add-to-cart
│   │   ├── ProductPage.ts               # Product details page, quantity inputs, reviews & add-to-cart
│   │   ├── CartPage.ts                  # Cart table, quantity update, item removal & checkout button
│   │   ├── CheckoutPage.ts              # Multi-step accordion checkout (Billing, Delivery, Payment, Confirm)
│   │   ├── CategoryPage.ts              # Category listing, breadcrumbs, list/grid view, sorting & paging
│   │   ├── SpecialsPage.ts              # Special offers listing, old/new prices & add-to-cart
│   │   ├── ComparePage.ts               # Product comparison table, removal & add-to-cart
│   │   ├── WishlistPage.ts              # Wishlist table, item removal & add-to-cart
│   │   ├── ContactPage.ts               # Store information panel & contact enquiry form
│   │   ├── VoucherPage.ts               # Gift certificate purchase form, themes & terms agreement
│   │   ├── ReturnsPage.ts               # Product return request form, reasons & validation
│   │   └── ForgotPasswordPage.ts        # Password reset request form & confirmation alerts
│   └── utils/
│       └── dataGenerator.ts             # Dynamic test data generator (random strings, emails, numbers)
├── tests/                               # Test Suites
│   ├── e2e-order-flow.spec.ts           # Full E2E customer journey (Register -> Search -> Cart -> Checkout -> Logout)
│   ├── tc001-account-registration.spec.ts # TC001: User registration flow & success message validation
│   ├── tc002-login.spec.ts               # TC002: Login verification with valid credentials & logout
│   ├── tc003-login-ddt.spec.ts           # TC003: Data-driven login verification with multiple datasets
│   ├── tc004-search.spec.ts              # TC004: Product search (existing & non-existing items)
│   ├── tc005-cart.spec.ts                # TC005: Add to cart, view cart, quantity update & item removal
│   ├── tc006-currency-navigation.spec.ts # TC006: Currency switching (EUR, GBP, USD) & header verification
│   ├── tc007-checkout.spec.ts            # TC007: Multi-step checkout, guest/registered flow & order placement
│   ├── tc008-homepage.spec.ts            # TC008: Slideshow, featured products, footer & header links
│   ├── tc009-navigation-menu.spec.ts     # TC009: Top navigation categories & sub-category dropdowns
│   ├── tc010-product-detail.spec.ts      # TC010: Product tabs, images, quantity & add-to-cart
│   ├── tc011-product-review.spec.ts      # TC011: Review submission & review form validation
│   ├── tc012-category-listing.spec.ts    # TC012: Breadcrumbs, list/grid view, sorting & sub-categories
│   ├── tc013-product-compare.spec.ts     # TC013: Add, view and remove products in the comparison table
│   ├── tc014-wishlist.spec.ts            # TC014: Wishlist auth redirect, add, remove & add-to-cart
│   ├── tc015-contact-us.spec.ts          # TC015: Store information, enquiry form & validation
│   ├── tc016-specials.spec.ts            # TC016: Special offer prices, listing controls & add-to-cart
│   ├── tc017-gift-voucher.spec.ts        # TC017: Gift certificate form, themes, terms & purchase
│   ├── tc018-product-returns.spec.ts     # TC018: Return request form fields, reasons & submission
│   ├── tc019-forgotten-password.spec.ts  # TC019: Password reset request for known & unknown emails
│   ├── tc020-footer-links.spec.ts        # TC020: Information pages & footer column links
│   ├── tc021-header-cart-preview.spec.ts # TC021: Header cart counter & cart preview dropdown
│   └── tc022-account-management.spec.ts  # TC022: Account dashboard links, newsletter & order history
├── .env                                 # Local environment variables (BASE_URL, credentials)
├── .env.example                         # Environment configuration template
├── .gitignore                           # Git ignore definitions
├── package.json                         # Node.js project manifest & execution scripts
├── playwright.config.ts                 # Playwright test configuration & browser definitions
└── tsconfig.json                        # TypeScript compiler configuration
```

---

## 🧩 Page Object Model (POM) Architecture

| Page Object | File Path | Responsibilities |
|:---|:---|:---|
| **BasePage** | `src/pages/BasePage.ts` | Base abstraction providing common methods: navigation, waiting, title retrieval, and URL verification. |
| **HomePage** | `src/pages/HomePage.ts` | Header dropdowns (My Account, Currency), search input box, cart quick-view button, navigation links. |
| **AccountRegistrationPage** | `src/pages/AccountRegistrationPage.ts` | First name, last name, email, phone, password inputs, newsletter subscription, privacy policy checkbox, and account confirmation. |
| **LoginPage** | `src/pages/LoginPage.ts` | Returning customer login form, email/password inputs, forgotten password link, and warning alert verification. |
| **MyAccountPage** | `src/pages/MyAccountPage.ts` | Account dashboard header checks, account edit links, and customer logout execution. |
| **SearchPage** | `src/pages/SearchPage.ts` | Product search verification, search results count, product name matching, and direct add-to-cart button. |
| **ProductPage** | `src/pages/ProductPage.ts` | Product detail view, quantity specification, direct add-to-cart, and success alert verification. |
| **CartPage** | `src/pages/CartPage.ts` | Shopping cart table, product row verification, quantity modifications, item removal, empty cart detection, and checkout transition. |
| **CheckoutPage** | `src/pages/CheckoutPage.ts` | Multi-step accordion checkout handling: Step 1 (Checkout options), Step 2 (Billing Details), Step 3 (Delivery Details), Step 4 (Delivery Method), Step 5 (Payment Method), Step 6 (Confirm Order & Success Page). |
| **CategoryPage** | `src/pages/CategoryPage.ts` | Category listing: breadcrumbs, sidebar categories, list/grid view toggles, sort and per-page dropdowns, compare and wishlist buttons. |
| **SpecialsPage** | `src/pages/SpecialsPage.ts` | Special offers listing: product cards, old and new prices, view toggles, sorting, and add-to-cart. |
| **ComparePage** | `src/pages/ComparePage.ts` | Product comparison table: compared product names, per-product removal, add-to-cart, and the empty-state message. |
| **WishlistPage** | `src/pages/WishlistPage.ts` | Wishlist table: product names, item count, removal, add-to-cart, and the empty-state message. |
| **ContactPage** | `src/pages/ContactPage.ts` | Store information panel, enquiry form fields, field-level validation, and success page detection. |
| **VoucherPage** | `src/pages/VoucherPage.ts` | Gift certificate purchase: recipient and sender fields, themes, amount, terms agreement, and purchase confirmation. |
| **ReturnsPage** | `src/pages/ReturnsPage.ts` | Product return request: order and product information fields, return reasons, opened state, and submission result. |
| **ForgotPasswordPage** | `src/pages/ForgotPasswordPage.ts` | Password reset request form, confirmation alert, warning alert, and the back-to-login button. |

---

## 🧪 Test Suites Overview

| Suite | File Path | Description |
|:---|:---|:---|
| **E2E Order Flow** | `tests/e2e-order-flow.spec.ts` | Complete customer journey: Registers a fresh account -> verifies dashboard -> searches for product -> adds item to cart -> verifies cart -> navigates to checkout -> logs out. |
| **TC001: Registration** | `tests/tc001-account-registration.spec.ts` | Validates registration form submission with dynamically generated customer details and asserts "Your Account Has Been Created!". |
| **TC002: Login** | `tests/tc002-login.spec.ts` | Verifies login with valid credentials, verifies the account dashboard presence, and performs a clean logout. |
| **TC003: Login DDT** | `tests/tc003-login-ddt.spec.ts` | Parameterized data-driven login tests reading from `loginData.json` testing valid and invalid credential combinations. |
| **TC004: Search** | `tests/tc004-search.spec.ts` | Validates search with existing product (`iPhone`) and non-existing product, checking product presence and error messages. |
| **TC005: Shopping Cart** | `tests/tc005-cart.spec.ts` | Adds products to shopping cart, verifies item presence, updates quantities, removes products, and verifies empty cart state. |
| **TC006: Currency Navigation** | `tests/tc006-currency-navigation.spec.ts` | Switches currency across Euro (€), Pound Sterling (£), and US Dollar ($), asserting currency symbol updates on prices. |
| **TC007: Checkout Suite** | `tests/tc007-checkout.spec.ts` | Validates Step 1 checkout options (Guest/Register/Login) and executes complete multi-step checkout through to order confirmation. |
| **TC008: Homepage** | `tests/tc008-homepage.spec.ts` | Verifies the slideshow, featured product cards and prices, brand carousel, footer columns, and top header links. |
| **TC009: Navigation Menu** | `tests/tc009-navigation-menu.spec.ts` | Verifies top-level categories, sub-category dropdowns, and navigation into category pages. |
| **TC010: Product Detail** | `tests/tc010-product-detail.spec.ts` | Verifies title, price, brand and availability, the Description/Specification/Reviews tabs, images, quantity, and add-to-cart. |
| **TC011: Product Review** | `tests/tc011-product-review.spec.ts` | Submits a valid review and asserts validation for empty forms, short review text, and a missing rating. |
| **TC012: Category Listing** | `tests/tc012-category-listing.spec.ts` | Verifies breadcrumbs, category headings, sidebar links, list/grid views, sorting, and sub-category listings. |
| **TC013: Product Compare** | `tests/tc013-product-compare.spec.ts` | Adds products to the comparison table from a category page, verifies the table, and removes a product. |
| **TC014: Wishlist** | `tests/tc014-wishlist.spec.ts` | Verifies the login redirect for anonymous users, then adds, removes, and carts wishlist items as a registered customer. |
| **TC015: Contact Us** | `tests/tc015-contact-us.spec.ts` | Verifies store information, submits a valid enquiry to the success page, and asserts form validation. |
| **TC016: Specials** | `tests/tc016-specials.spec.ts` | Verifies discounted pricing, listing controls, and adding a special offer to the cart. |
| **TC017: Gift Voucher** | `tests/tc017-gift-voucher.spec.ts` | Verifies the gift certificate form and themes, asserts validation, and completes a purchase. |
| **TC018: Product Returns** | `tests/tc018-product-returns.spec.ts` | Verifies the return request form fields and reasons, asserts validation, and submits a valid return. |
| **TC019: Forgotten Password** | `tests/tc019-forgotten-password.spec.ts` | Requests a password reset for a registered and an unknown email, and verifies navigation to and from the login page. |
| **TC020: Footer Links** | `tests/tc020-footer-links.spec.ts` | Loads the information pages (About Us, Delivery, Privacy, Terms) and verifies each footer column's links. |
| **TC021: Header Cart Preview** | `tests/tc021-header-cart-preview.spec.ts` | Verifies the header cart counter and the cart preview dropdown contents, links, and empty state. |
| **TC022: Account Management** | `tests/tc022-account-management.spec.ts` | Verifies the account dashboard links: edit account, change password, address book, order history, and newsletter. |

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### 2. Installation
```bash
# Clone repository
git clone https://github.com/prajyot023/opencart-playwright-ts-framework.git
cd opencart-playwright-ts-framework

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install chromium
```

### 3. Environment Configuration
Create a `.env` file in the root directory (or copy from `.env.example`):
```ini
BASE_URL=https://tutorialsninja.com/demo/index.php
USER_EMAIL=mohanraj@gmail.com
USER_PASSWORD=test@123
SEARCH_PRODUCT=iPhone
```

---

## 🏃 Running Tests

### End-to-End Journey (Headed Mode)
```bash
npm run test:e2e
```

### Run All Tests (Headless)
```bash
npm test
```

### Run Tests in Headed Browser Mode
```bash
npm run test:headed
```

### Run Tests with Interactive Playwright UI Mode
```bash
npm run test:ui
```

### Run Across Specific Browsers
```bash
# Chromium (Google Chrome / Edge)
npm run test:chromium

# Firefox
npm run test:firefox

# WebKit (Safari)
npm run test:webkit
```

### Run Individual Test Suites
```bash
# TC001: Registration
npx playwright test tests/tc001-account-registration.spec.ts

# TC002: Login
npx playwright test tests/tc002-login.spec.ts

# TC003: Login Data-Driven Testing (DDT)
npx playwright test tests/tc003-login-ddt.spec.ts

# TC004: Product Search
npx playwright test tests/tc004-search.spec.ts

# TC005: Shopping Cart
npx playwright test tests/tc005-cart.spec.ts

# TC006: Currency & Navigation
npx playwright test tests/tc006-currency-navigation.spec.ts

# TC007: Multi-Step Checkout
npx playwright test tests/tc007-checkout.spec.ts

# Any other suite, by file name
npx playwright test tests/tc016-specials.spec.ts

# Complete E2E Order Journey
npx playwright test tests/e2e-order-flow.spec.ts
```

### TypeScript Type Checking
```bash
npm run typecheck
```

---

## 📊 Viewing Test Reports & Diagnostics

### HTML Test Report
After test execution, launch the interactive Playwright HTML report:
```bash
npm run report
```

### Trace Viewer (Debugging Test Runs)
When a test fails, Playwright automatically generates a trace recording. Inspect the full DOM snapshot and network timeline:
```bash
npx playwright show-trace test-results/<test-run-folder>/trace.zip
```

---

## 🤖 CI/CD Integration

The repository includes an automated GitHub Actions pipeline configured in `.github/workflows/playwright.yml`:
- Runs automatically on every `push` and `pull_request` to `master` and `main` branches.
- Sets up Node.js with caching, installs dependencies via `npm ci`, and installs required browser binaries.
- Executes tests with `npx playwright test --project=chromium`.
- Archives and uploads the `playwright-report/` artifact on build completion (retained for 30 days).
