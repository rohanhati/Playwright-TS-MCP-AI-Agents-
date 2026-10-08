import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { PimReportsPage } from '../../src/pages/PimReportsPage';

test.describe('OrangeHRM PIM employee reports', () => {
  test('opens the first employee report after valid login @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const reportsPage = new PimReportsPage(page);

    await page.setViewportSize({ width: 1920, height: 1080 });

    await test.step('Log in with valid credentials', async () => {
      await loginPage.goto();
      await expect(loginPage.usernameInput).toBeVisible();
      await loginPage.login('Admin', 'admin123');
      await expect(loginPage.dashboardHeading).toBeVisible();
    });

    await test.step('Open the first PIM employee report', async () => {
      await reportsPage.openReports();
      await expect(reportsPage.reportHeading).toBeVisible();
      await expect(reportsPage.reportRows).not.toHaveCount(0);
      await reportsPage.openFirstReport();
      await expect(reportsPage.openedReportHeading).toBeVisible();
      await expect(reportsPage.reportResults).toBeVisible();
    });

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('employee-report', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});