import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  readonly leaveNavigation;
  readonly leaveHeading;
  readonly topBarMenu;

  constructor(page: Page) {
    super(page);
    this.leaveNavigation = page.getByRole('link', { name: /^Leave$/i }).first();
    this.leaveHeading = page
      .locator('h6, h5, span, div')
      .filter({ hasText: /^Leave$/i })
      .first();
    this.topBarMenu = page.getByRole('navigation', { name: 'Topbar Menu' }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveModule');
  }

  async openLeave(): Promise<void> {
    await this.leaveNavigation.click();
    await this.page.waitForURL(/\/leave\//);
  }
}
