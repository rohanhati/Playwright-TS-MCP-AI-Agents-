import { test, expect } from '../../src/fixtures/base';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { LoginPage } from '../../src/pages/LoginPage';
import loginData from '../data/login-logout.json';

test.describe('OrangeHRM demo login', () => {
  test('logs in, verifies the dashboard heading, and logs out @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Open the login page and authenticate', async () => {
      await loginPage.goto();
      await expect(loginPage.loginHeading).toBeVisible();
      await loginPage.login(loginData.username, loginData.password);
    });

    await test.step('Verify the authenticated dashboard heading', async () => {
      const actualHeading = await dashboardPage.dashboardHeading.textContent();
      const assertionLog = `Expected heading: ${loginData.dashboardHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('dashboard-heading', {
        body: assertionLog,
        contentType: 'text/plain',
      });
      await expect(dashboardPage.dashboardHeading).toHaveText(loginData.dashboardHeading);
    });

    await test.step('Open the profile menu and log out', async () => {
      await dashboardPage.openProfileMenu();
      const actualLogoutMenuItem = await dashboardPage.logoutMenuItem.textContent();
      const assertionLog = `Expected menu item: ${loginData.logoutMenuItem}; Actual menu item: ${actualLogoutMenuItem}`;
      console.log(assertionLog);
      await testInfo.attach('logout-menu-item', {
        body: assertionLog,
        contentType: 'text/plain',
      });
      await expect(dashboardPage.logoutMenuItem).toHaveText(loginData.logoutMenuItem);
      await dashboardPage.logout();
    });

    await test.step('Verify the login page after logout', async () => {
      const actualHeading = await loginPage.loginHeading.textContent();
      const assertionLog = `Expected heading: ${loginData.loginHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('login-heading-after-logout', {
        body: assertionLog,
        contentType: 'text/plain',
      });
      await expect(loginPage.loginHeading).toHaveText(loginData.loginHeading);
    });
  });
});