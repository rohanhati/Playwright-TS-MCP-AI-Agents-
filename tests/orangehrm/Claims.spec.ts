import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { ClaimsPage } from '../../src/pages/ClaimsPage';

test.describe('OrangeHRM My Claims', () => {
  test('opens the first claim details after valid login @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const claimsPage = new ClaimsPage(page);

    await test.step('Log in with valid credentials', async () => {
      await loginPage.goto();
      await expect(loginPage.usernameInput).toBeVisible();
      await loginPage.login('Admin', 'admin123');
      await expect(loginPage.dashboardHeading).toBeVisible();
    });

    await test.step('Open the first My Claims record details', async () => {
      await claimsPage.openMyClaims();
      await expect(claimsPage.claimsHeading).toBeVisible();
      await expect(claimsPage.claimRows).not.toHaveCount(0);
      await claimsPage.openFirstClaimDetails();
      await expect(claimsPage.claimDetailsContent).toBeVisible();
    });

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('my-claims-first-record-details', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});