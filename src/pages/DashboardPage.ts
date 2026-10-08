import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardHeading;
  readonly adminNavigation;
  readonly leaveNavigation;
  readonly profileMenu;
  readonly logoutMenuItem;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.adminNavigation = page.getByRole('link', { name: /^Admin$/i });
    this.leaveNavigation = page.getByRole('link', { name: /^Leave$/i });
    this.profileMenu = page.getByRole('banner').getByRole('img', { name: 'profile picture' }).first();
    // this.profileMenu = page.locator('oxd-userdropdown-tab');
    this.logoutMenuItem = page.getByRole('menuitem', { name: /^Logout$/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/dashboard/index');
  }

  async openProfileMenu(): Promise<void> {
    await this.profileMenu.click();
  }

  async logout(): Promise<void> {
    await this.logoutMenuItem.click();
  }
}