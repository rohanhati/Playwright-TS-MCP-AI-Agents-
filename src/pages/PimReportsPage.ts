import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimReportsPage extends BasePage {
  readonly pimNavigation;
  readonly reportsLink;
  readonly reportRows;
  readonly firstReportViewButton;
  readonly reportHeading;
  readonly openedReportHeading;
  readonly reportResults;

  constructor(page: Page) {
    super(page);
    this.pimNavigation = page.getByRole('link', { name: 'PIM' });
    this.reportsLink = page.getByRole('link', { name: 'Reports' });
    this.reportRows = page.getByRole('row').filter({ has: page.getByRole('button') });
    this.firstReportViewButton = this.reportRows.first().getByRole('button').nth(2);
    this.reportHeading = page.getByRole('heading', { name: 'Employee Reports' });
    this.openedReportHeading = page
      .getByRole('heading', { level: 6 })
      .filter({ hasText: /Report/i });
    this.reportResults = page.getByText(/\(\d+\) Records Found/);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewReport');
  }

  async openReports(): Promise<void> {
    await this.pimNavigation.click();
    await this.reportsLink.click();
  }

  async openFirstReport(): Promise<void> {
    await this.firstReportViewButton.click();
  }
}