import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { LeavePage } from '../../src/pages/LeavePage';
import leaveSectionData from '../data/leave-section.json';

test.describe('OrangeHRM Leave sections', () => {
  test('shows Leave heading and all 7 sections after valid login @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const leavePage = new LeavePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.goto();
      await expect(loginPage.usernameInput).toBeVisible();
      await loginPage.login(leaveSectionData.username, leaveSectionData.password);
      await expect(loginPage.dashboardHeading).toBeVisible();
    });

    await test.step('Open Leave area and verify heading', async () => {
      await leavePage.openLeave();
      await expect(leavePage.leaveHeading).toBeVisible();
      await expect(leavePage.leaveHeading).toHaveText(leaveSectionData.heading);
    });

    await test.step('Verify all section entries below the heading', async () => {
      const topBarText = await leavePage.topBarMenu.textContent();
      expect(topBarText).not.toBeNull();
      for (const sectionName of leaveSectionData.expectedSections as string[]) {
        expect(topBarText).toContain(sectionName);
      }
    });
  });
});
