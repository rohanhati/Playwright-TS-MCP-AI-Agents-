import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyLeavePage extends BasePage {
  readonly leaveNavigation;
  readonly myLeaveLink;
  readonly leaveTypeSelect;
  readonly personalLeaveOption;
  readonly searchButton;
  readonly leaveResults;

  constructor(page: Page) {
    super(page);
    this.leaveNavigation = page.getByRole('link', { name: 'Leave' });
    this.myLeaveLink = page.getByRole('link', { name: 'My Leave' });
    this.leaveTypeSelect = page.getByText('-- Select --', { exact: true }).first();
    this.personalLeaveOption = page
      .getByRole('option')
      .filter({ hasText: /Personal/i })
      .first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.leaveResults = page.getByRole('table');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeave');
  }

  async openMyLeave(): Promise<void> {
    await this.leaveNavigation.click();
    await this.myLeaveLink.click();
  }

  async searchByLeaveType(): Promise<void> {
    await this.leaveTypeSelect.click();
    await this.personalLeaveOption.waitFor({ state: 'visible' });
    await this.personalLeaveOption.click();
    await this.searchButton.click();
  }
}