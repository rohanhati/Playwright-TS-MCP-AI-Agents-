import { test, expect } from '../../src/fixtures/base';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { EmployeeClaimsPage } from '../../src/pages/EmployeeClaimsPage';
import { LoginPage } from '../../src/pages/LoginPage';
import claimData from '../data/claim-labels.json';

test.describe('OrangeHRM Employee Claims labels', () => {
  test('verifies Employee Claims labels and logs out @smoke @critical', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeClaimsPage = new EmployeeClaimsPage(page);

    await test.step('Log in with the Admin account', async () => {
      await loginPage.goto();
      await loginPage.login(claimData.username, claimData.password);

      const actualHeading = await dashboardPage.dashboardHeading.textContent();
      const assertionLog = `Expected heading: ${claimData.dashboardHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('dashboard-heading', { body: assertionLog, contentType: 'text/plain' });
      await expect(dashboardPage.dashboardHeading).toHaveText(claimData.dashboardHeading);
    });

    await test.step('Open Claims and verify Employee Claims labels', async () => {
      await employeeClaimsPage.goto();

      const actualHeading = await employeeClaimsPage.employeeClaimsHeading.textContent();
      const headingLog = `Expected heading: ${claimData.employeeClaimsHeading}; Actual heading: ${actualHeading}`;
      console.log(headingLog);
      await testInfo.attach('employee-claims-heading', { body: headingLog, contentType: 'text/plain' });
      await expect(employeeClaimsPage.employeeClaimsHeading).toHaveText(claimData.employeeClaimsHeading);

      const labelLocators = [
        employeeClaimsPage.employeeClaimsHeading,
        employeeClaimsPage.employeeNameLabel,
        employeeClaimsPage.referenceIdLabel,
        employeeClaimsPage.eventNameLabel,
        employeeClaimsPage.statusLabel,
        employeeClaimsPage.fromDateLabel,
        employeeClaimsPage.toDateLabel,
      ];

      for (const [index, labelLocator] of labelLocators.entries()) {
        const expectedLabel = claimData.labels[index];
        const actualLabel = await labelLocator.textContent();
        const assertionLog = `Expected label: ${expectedLabel}; Actual label: ${actualLabel}`;
        console.log(assertionLog);
        await testInfo.attach(`employee-claims-label-${index + 1}`, {
          body: assertionLog,
          contentType: 'text/plain',
        });
        await expect(labelLocator).toHaveText(expectedLabel);
      }
    });

    await test.step('Open the profile menu and log out', async () => {
      await employeeClaimsPage.openProfileMenu();

      const actualLogoutLabel = await employeeClaimsPage.logoutMenuItem.textContent();
      const assertionLog = `Expected menu item: ${claimData.logoutMenuItem}; Actual menu item: ${actualLogoutLabel}`;
      console.log(assertionLog);
      await testInfo.attach('logout-menu-item', { body: assertionLog, contentType: 'text/plain' });
      await expect(employeeClaimsPage.logoutMenuItem).toHaveText(claimData.logoutMenuItem);
      await employeeClaimsPage.logout();
    });

    await test.step('Verify the login page after logout', async () => {
      const actualHeading = await loginPage.loginHeading.textContent();
      const assertionLog = `Expected heading: ${claimData.loginHeading}; Actual heading: ${actualHeading}`;
      console.log(assertionLog);
      await testInfo.attach('login-heading-after-logout', { body: assertionLog, contentType: 'text/plain' });
      await expect(loginPage.loginHeading).toHaveText(claimData.loginHeading);
    });
  });
});