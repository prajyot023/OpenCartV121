import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC015: Contact Us Suite', () => {
  test('should display store information on contact page', async ({
    contactPage,
  }) => {
    await contactPage.open();

    // Verify page heading
    await expect(contactPage.pageHeading).toBeVisible();
    const heading = await contactPage.pageHeading.textContent();
    expect(heading?.trim()).toContain('Contact Us');

    // Verify store info panel is visible
    await expect(contactPage.storeInfoPanel).toBeVisible();
  });

  test('should display contact form with all required fields', async ({
    contactPage,
  }) => {
    await contactPage.open();

    // Verify all form fields are visible
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.enquiryTextarea).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('should submit contact form with valid data successfully', async ({
    contactPage,
  }) => {
    await contactPage.open();

    await contactPage.submitContactForm(
      'Test User',
      'testuser@example.com',
      'This is a test enquiry message submitted via automated testing. Please disregard this message.'
    );

    // Verify success page is shown
    const isSuccess = await contactPage.isSuccessMessageDisplayed();
    expect(isSuccess).toBe(true);
  });

  test('should show validation errors when submitting empty contact form', async ({
    contactPage,
  }) => {
    await contactPage.open();

    // Submit empty form
    await contactPage.submitButton.click();

    // Verify field validation errors appear
    const errorCount = await contactPage.getValidationErrorCount();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should show validation error for invalid email format', async ({
    contactPage,
    page,
  }) => {
    await contactPage.open();

    await contactPage.nameInput.fill('Test User');
    await contactPage.emailInput.fill('invalid-email');
    await contactPage.enquiryTextarea.fill('This is a test enquiry that is long enough to pass validation checks.');

    await contactPage.submitButton.click();

    // Should show validation error or HTML5 validation will prevent submission
    // Check if still on contact page (form not submitted successfully)
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    // Either stays on contact page due to validation or shows error
    expect(
      currentUrl.includes('route=information/contact') ||
      await contactPage.getValidationErrorCount() > 0
    ).toBe(true);
  });
});
