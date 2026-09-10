import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC018: Product Returns Suite', () => {
  test('should display all return form fields', async ({
    returnsPage,
  }) => {
    await returnsPage.open();

    // Verify page heading
    await expect(returnsPage.pageHeading).toBeVisible();
    const heading = await returnsPage.pageHeading.textContent();
    expect(heading?.trim()).toContain('Product Returns');

    // Verify order information fields
    await expect(returnsPage.firstNameInput).toBeVisible();
    await expect(returnsPage.lastNameInput).toBeVisible();
    await expect(returnsPage.emailInput).toBeVisible();
    await expect(returnsPage.telephoneInput).toBeVisible();
    await expect(returnsPage.orderIdInput).toBeVisible();
    await expect(returnsPage.orderDateInput).toBeVisible();

    // Verify product information fields
    await expect(returnsPage.productNameInput).toBeVisible();
    await expect(returnsPage.productModelInput).toBeVisible();
    await expect(returnsPage.quantityInput).toBeVisible();

    // Verify submit button
    await expect(returnsPage.submitButton).toBeVisible();
  });

  test('should display all return reason radio buttons', async ({
    returnsPage,
  }) => {
    await returnsPage.open();

    const reasonCount = await returnsPage.getReturnReasonCount();
    // OpenCart typically has: Dead On Arrival, Faulty/Defective, Order Error, Other, Received Wrong Item
    expect(reasonCount).toBeGreaterThanOrEqual(1);
  });

  test('should show validation errors when submitting empty return form', async ({
    returnsPage,
  }) => {
    await returnsPage.open();

    // Submit empty form
    await returnsPage.submitButton.click();

    // The form posts and re-renders with the field errors, so wait for the first one
    // instead of counting before the round trip has landed.
    await expect(returnsPage.fieldErrors.first()).toBeVisible();
    expect(await returnsPage.getValidationErrorCount()).toBeGreaterThan(0);
  });

  test('should submit valid return form successfully', async ({
    returnsPage,
  }) => {
    await returnsPage.open();

    await returnsPage.submitReturnForm({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      telephone: '+1234567890',
      orderId: '12345',
      orderDate: '2024-01-15',
      productName: 'MacBook',
      productModel: 'Product 16',
      quantity: '1',
      returnReasonIndex: 0, // First return reason (e.g., "Dead On Arrival")
      productOpened: false,
      comment: 'Product arrived damaged. Requesting replacement.',
    });

    // Verify success message
    const isSuccess = await returnsPage.isReturnSuccessful();
    expect(isSuccess).toBe(true);
  });

  test('should display product opened Yes/No radio buttons', async ({
    returnsPage,
  }) => {
    await returnsPage.open();

    await expect(returnsPage.productOpenedYesRadio).toBeVisible();
    await expect(returnsPage.productOpenedNoRadio).toBeVisible();
  });
});
