import { test, expect } from '../../src/fixtures/base';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { LoginPage } from '../../src/pages/LoginPage';
import loginData from '../data/login-logout.json';

test.describe('OrangeHRM login and logout', () => {
  test('logs in, verifies navigation, and logs out @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.goto();
      const actualHeading = await loginPage.loginHeading.textContent();
      const assertionLog = `Expected heading: ${loginData.loginHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('login-heading-before-authentication', {
        body: assertionLog,
        contentType: 'text/plain',
      });
      await expect(loginPage.loginHeading).toHaveText(loginData.loginHeading);
    });

    await test.step('Log in with the Admin account', async () => {
      await loginPage.login(loginData.username, loginData.password);
      const actualHeading = await dashboardPage.dashboardHeading.textContent();
      const assertionLog = `Expected heading: ${loginData.dashboardHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('dashboard-heading-after-authentication', {
        body: assertionLog,
        contentType: 'text/plain',
      });
      await expect(dashboardPage.dashboardHeading).toHaveText(loginData.dashboardHeading);
    });

    await test.step('Verify the left navigation panel', async () => {
      const actualAdminNavigation = await dashboardPage.adminNavigation.textContent();
      const adminNavigationLog = `Expected navigation: ${loginData.adminNavigation}; Actual navigation: ${actualAdminNavigation}`;
      console.log(adminNavigationLog);
      await testInfo.attach('admin-navigation', {
        body: adminNavigationLog,
        contentType: 'text/plain',
      });
      await expect(dashboardPage.adminNavigation).toHaveText(loginData.adminNavigation);

      const actualLeaveNavigation = await dashboardPage.leaveNavigation.textContent();
      const leaveNavigationLog = `Expected navigation: ${loginData.leaveNavigation}; Actual navigation: ${actualLeaveNavigation}`;
      console.log(leaveNavigationLog);
      await testInfo.attach('leave-navigation', {
        body: leaveNavigationLog,
        contentType: 'text/plain',
      });
      await expect(dashboardPage.leaveNavigation).toHaveText(loginData.leaveNavigation);
    });

    await test.step('Open the profile menu and log out', async () => {
      await dashboardPage.openProfileMenu();
      const actualLogoutMenuItem = await dashboardPage.logoutMenuItem.textContent();
      const logoutMenuItemLog = `Expected menu item: ${loginData.logoutMenuItem}; Actual menu item: ${actualLogoutMenuItem}`;
      console.log(logoutMenuItemLog);
      await testInfo.attach('logout-menu-item', {
        body: logoutMenuItemLog,
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