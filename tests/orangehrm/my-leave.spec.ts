import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { MyLeavePage } from '../../src/pages/MyLeavePage';

test.describe('OrangeHRM My Leave search', () => {
  test('searches personal leave records after valid login @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const myLeavePage = new MyLeavePage(page);

    await test.step('Log in with valid credentials', async () => {
      await loginPage.goto();
      await expect(loginPage.usernameInput).toBeVisible();
      await loginPage.login('Admin', 'admin123');
      await expect(loginPage.dashboardHeading).toBeVisible();
    });

    await test.step('Open My Leave and search by CAN - Personal', async () => {
      await myLeavePage.openMyLeave();
      await expect(myLeavePage.leaveTypeSelect).toBeVisible();
      await myLeavePage.searchByLeaveType();
      await expect(myLeavePage.leaveResults).toBeVisible();
    });

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('my-leave-search-results', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});