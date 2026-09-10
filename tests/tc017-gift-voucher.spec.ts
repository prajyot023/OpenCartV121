import { test, expect } from '../src/fixtures/testFixtures';

test.describe('TC017: Gift Certificate / Voucher Suite', () => {
  test('should display all gift certificate form fields', async ({
    voucherPage,
  }) => {
    await voucherPage.open();

    // Verify page heading
    await expect(voucherPage.pageHeading).toBeVisible();
    const heading = await voucherPage.pageHeading.textContent();
    expect(heading?.trim()).toContain('Gift Certificate');

    // Verify all form fields are visible
    await expect(voucherPage.recipientNameInput).toBeVisible();
    await expect(voucherPage.recipientEmailInput).toBeVisible();
    await expect(voucherPage.senderNameInput).toBeVisible();
    await expect(voucherPage.senderEmailInput).toBeVisible();
    await expect(voucherPage.amountInput).toBeVisible();
    await expect(voucherPage.messageTextarea).toBeVisible();
    await expect(voucherPage.agreeCheckbox).toBeVisible();
    await expect(voucherPage.continueButton).toBeVisible();
  });

  test('should display theme selection radio buttons', async ({
    voucherPage,
  }) => {
    await voucherPage.open();

    const themeCount = await voucherPage.themeRadios.count();
    expect(themeCount).toBeGreaterThanOrEqual(1);
  });

  test('should show validation errors when submitting empty voucher form', async ({
    voucherPage,
  }) => {
    await voucherPage.open();

    // Submit empty form
    await voucherPage.continueButton.click();

    // Verify validation errors or warning alert
    const errorCount = await voucherPage.getValidationErrorCount();
    const isWarning = await voucherPage.isWarningAlertDisplayed();
    expect(errorCount > 0 || isWarning).toBe(true);
  });

  test('should require terms agreement checkbox', async ({
    voucherPage,
  }) => {
    await voucherPage.open();

    // Fill form with valid data but don't agree to terms
    await voucherPage.fillVoucherForm({
      recipientName: 'John Doe',
      recipientEmail: 'john.doe@example.com',
      senderName: 'Jane Smith',
      senderEmail: 'jane.smith@example.com',
      theme: 'general',
      message: 'Happy birthday! Enjoy your gift certificate.',
      amount: '25',
      agreeTerms: false,
    });

    // Should show warning about agreeing to terms
    const isWarning = await voucherPage.isWarningAlertDisplayed();
    const errorCount = await voucherPage.getValidationErrorCount();
    // Either a warning alert or validation error should appear
    expect(isWarning || errorCount > 0).toBe(true);
  });

  test('should submit valid gift certificate form successfully', async ({
    voucherPage,
  }) => {
    await voucherPage.open();

    await voucherPage.fillVoucherForm({
      recipientName: 'Test Recipient',
      recipientEmail: 'recipient_test@example.com',
      senderName: 'Test Sender',
      senderEmail: 'sender_test@example.com',
      theme: 'general',
      message: 'This is a test gift certificate purchase for automated testing.',
      amount: '10',
      agreeTerms: true,
    });

    // A valid submit lands on route=account/voucher/success
    const isSuccess = await voucherPage.isPurchaseSuccessful();
    expect(isSuccess).toBe(true);
  });
});
