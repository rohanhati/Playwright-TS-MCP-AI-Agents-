import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ClaimsPage extends BasePage {
  readonly claimsNavigation;
  readonly myClaimsLink;
  readonly claimRows;
  readonly firstClaimDetailsButton;
  readonly claimsHeading;
  readonly claimDetailsContent;

  constructor(page: Page) {
    super(page);
    this.claimsNavigation = page.getByRole('link', { name: 'Claim' });
    this.myClaimsLink = page.getByRole('link', { name: 'My Claims' });
    this.claimRows = page.getByRole('row').filter({ has: page.getByRole('button') });
    this.firstClaimDetailsButton = this.claimRows.first().getByRole('button').first();
    this.claimsHeading = page.getByRole('heading', { name: /My Claims/i });
    this.claimDetailsContent = page.getByRole('heading', { name: 'Submit Claim' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewClaimModule');
  }

  async openMyClaims(): Promise<void> {
    // await this.claimsNavigation.click();
    await this.myClaimsLink.click();
  }

  async openFirstClaimDetails(): Promise<void> {
    await this.firstClaimDetailsButton.click();
  }
}