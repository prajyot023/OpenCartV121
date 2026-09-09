# opencart-playwright-ts-framework

> Production-ready E2E Test Automation Framework for OpenCart built with Playwright, TypeScript, and Page Object Model (POM). Features multi-browser execution, DDT, custom fixtures, HTML reporting, and GitHub Actions CI/CD.

Target Application: [TutorialsNinja OpenCart Demo Store](https://tutorialsninja.com/demo/index.php)

---

## 🚀 Key Features

- **Page Object Model (POM)**: Complete separation of page locators, actions, and test logic across dedicated page classes.
- **Dependency Injection via Fixtures**: Automatically instantiated page objects via custom Playwright test fixtures (`{ homePage, loginPage, registerPage, myAccountPage, searchPage, cartPage, checkoutPage, productPage }`).
- **Data-Driven Testing (DDT)**: Parameterized tests driven by external JSON datasets (`src/data/loginData.json`).
- **Dynamic Data Generation**: Built-in test data generator utility (`DataGenerator`) replacing Apache Commons RandomStringUtils for unique registrations and passwords.
- **Cross-Browser Testing**: Pre-configured support for Chromium, Firefox, and WebKit (Safari).
- **Rich Reporting & Diagnostics**: Built-in HTML reports, automatic failure screenshots, video recordings, and Playwright Trace viewer.
- **Parallel Execution**: Isolated browser contexts running tests concurrently with high throughput.

---

## 📁 Project Structure

```
opencart-playwright-ts-framework/
├── package.json                         # Dependencies and test execution scripts
├── tsconfig.json                        # TypeScript configuration
├── playwright.config.ts                 # Playwright test configuration
├── .env                                 # Environment variables (Base URL, test credentials)
├── .env.example                         # Template environment variables
├── .gitignore                           # Excluded artifacts
│
├── src/
│   ├── pages/                           # Page Object Model Layer
│   │   ├── BasePage.ts                  # Shared page methods & navigation
│   │   ├── HomePage.ts                  # Header, menus, search bar
│   │   ├── AccountRegistrationPage.ts   # Registration form & confirmation
│   │   ├── LoginPage.ts                 # Login form & alerts
│   │   ├── MyAccountPage.ts             # Account dashboard & logout
│   │   ├── SearchPage.ts                # Search results & filtering
│   │   └── CartPage.ts                  # Shopping cart view & checkout
│   │
│   ├── fixtures/
│   │   └── testFixtures.ts              # Playwright custom fixtures
│   │
│   ├── utils/
│   │   └── dataGenerator.ts             # Dynamic test data generator
│   │
│   └── data/
│       └── loginData.json               # Data-driven test records
│
└── tests/                               # Test Suites
    ├── tc001-account-registration.spec.ts # TC001: Registration flow & validations
    ├── tc002-login.spec.ts               # TC002: Login verification & logout
    ├── tc003-login-ddt.spec.ts           # TC003: Data-driven login verification
    ├── tc004-search.spec.ts              # TC004: Product search (positive & negative)
    ├── tc005-cart.spec.ts                # TC005: Add to cart & cart content check
    ├── tc006-currency-navigation.spec.ts # TC006: Currency switching & header checks
    └── tc007-checkout.spec.ts            # TC007: Multi-step checkout & order placement
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v26+ supported)
- **NPM**: v9.0.0 or higher

### 2. Installation
```bash
npm install
npx playwright install chromium
```

### 3. Environment Setup
The `.env` file contains default configurations:
```ini
BASE_URL=https://tutorialsninja.com/demo/index.php
USER_EMAIL=mohanraj@gmail.com
USER_PASSWORD=test@123
SEARCH_PRODUCT=iPhone
```

---

## 🧪 Running Tests

### Run complete End-to-End flow in headed mode
```bash
npm run test:e2e
```

### Run all tests (headless)
```bash
npm test
```

### Run tests in headed browser mode
```bash
npm run test:headed
```

### Run tests with interactive Playwright UI Mode
```bash
npm run test:ui
```

### Run specific browser projects
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run individual test suites
```bash
npx playwright test tests/tc001-account-registration.spec.ts
npx playwright test tests/tc002-login.spec.ts
npx playwright test tests/tc003-login-ddt.spec.ts
npx playwright test tests/tc004-search.spec.ts
npx playwright test tests/tc005-cart.spec.ts
```

### Run type checking
```bash
npm run typecheck
```

---

## 📊 Viewing Test Reports & Traces

### HTML Report
After running tests, view the comprehensive HTML test report:
```bash
npm run report
```

### Inspect Trace on Failure
```bash
npx playwright show-trace test-results/.../trace.zip
```
