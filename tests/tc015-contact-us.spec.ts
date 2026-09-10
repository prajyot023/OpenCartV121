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

    // A valid submit lands on route=information/contact/success
    const isSuccess = await contactPage.isSuccessMessageDisplayed();
    expect(isSuccess).toBe(true);
    expect(contactPage.getUrl()).toContain('route=information/contact/success');
  });

  test('should show validation errors when submitting empty contact form', async ({
    contactPage,
  }) => {
    await contactPage.open();

    // Submit empty form
    await contactPage.submitButton.click();

    // The form posts and re-renders with the field errors, so wait for the first one
    // instead of counting before the round trip has landed.
    await expect(contactPage.fieldErrors.first()).toBeVisible();
    expect(await contactPage.getValidationErrorCount()).toBeGreaterThan(0);
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
    await page.waitForTimeout(1000);

    // An invalid address must not reach the success page. The old assertion allowed any
    // URL containing 'route=information/contact', which the success page also matches.
    expect(page.url()).not.toContain('route=information/contact/success');
  });
});
