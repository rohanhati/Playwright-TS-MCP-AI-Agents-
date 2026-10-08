import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeClaimsPage extends BasePage {
  readonly claimsNavigation;
  readonly employeeClaimsHeading;
  readonly employeeNameLabel;
  readonly referenceIdLabel;
  readonly eventNameLabel;
  readonly statusLabel;
  readonly fromDateLabel;
  readonly toDateLabel;
  readonly profileMenu;
  readonly logoutMenuItem;

  constructor(page: Page) {
    super(page);
    this.claimsNavigation = page.getByRole('link', { name: /^Claims?$/i });
    this.employeeClaimsHeading = page.getByRole('heading', { name: /^Employee Claims$/i });
    this.employeeNameLabel = page.getByText(/^Employee Name$/i, { exact: true });
    this.referenceIdLabel = page.getByText(/^Reference Id$/i, { exact: true });
    this.eventNameLabel = page.getByText(/^Event Name$/i, { exact: true });
    this.statusLabel = page.getByText(/^Status$/i, { exact: true });
    this.fromDateLabel = page.getByText(/^From Date$/i, { exact: true });
    this.toDateLabel = page.getByText(/^To Date$/i, { exact: true });
    this.profileMenu = page.getByRole('banner').getByRole('img', { name: /profile.*/i });
    this.logoutMenuItem = page.getByText(/^Logout$/i, { exact: true });
  }

  async goto(): Promise<void> {
    await this.claimsNavigation.click();
  }

  async openProfileMenu(): Promise<void> {
    await this.profileMenu.click();
  }

  async logout(): Promise<void> {
    await this.logoutMenuItem.click();
  }
}