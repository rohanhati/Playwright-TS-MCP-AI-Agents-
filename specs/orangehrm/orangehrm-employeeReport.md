# Test Plan: OrangeHRM Employee Reports

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-17

## Overview
Verify that a valid OrangeHRM demo user can authenticate and navigate to the PIM Reports area. After the report records load, open the first available report and capture the opened report view as a screenshot attached to the test report.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and unauthenticated session.
- Use the valid demo credentials: username `Admin` and password `admin123`.
- The authenticated account has access to PIM and its Reports area.

## Scenarios

### Scenario 1.1 — Login and open the first PIM employee report
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is open on the OrangeHRM login URL and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM application — expected: the login page is displayed with Username and Password fields and a Login button.
  2. Enter `Admin` in the Username field — expected: the Username field contains `Admin`.
  3. Enter `admin123` in the Password field — expected: the Password field accepts the password without a validation error.
  4. Click Login — expected: the application navigates to the authenticated Dashboard route and a `Dashboard` heading is visible.
  5. Open `PIM` from the left-side navigation — expected: the PIM area opens and its submenu is available.
  6. Open `Reports` from the PIM submenu — expected: the PIM Reports page is displayed with its report records/list area.
  7. Wait until the report records appear — expected: the report list/table is visible, its loading state has completed, and at least one report record is available.
  8. Open the first report record — expected: the first report is selected and its report details/results view is displayed.
  9. Capture a screenshot of the opened report and attach it to the test report — expected: the screenshot is stored as a test attachment and shows the opened first employee report.
- **Assertions:**
  - Successful authentication is confirmed by the Dashboard heading and authenticated dashboard URL.
  - The PIM Reports page is visible after navigating through the PIM menu.
  - The report records area is visible after loading completes and contains at least one record.
  - The first report opens into a distinct report details/results view.
  - A screenshot attachment is present in the generated test report and represents the opened report.
- **Edge cases considered:**
  - Login remains on the authentication page or displays an authentication error.
  - PIM or Reports is unavailable in the navigation.
  - Report records remain in a loading state or the list is empty.
  - The first report is not actionable or opens in a new tab/window.
  - The report view fails to render before the screenshot is captured.

## Not covered (and why)
- Creating, editing, deleting, exporting, or filtering employee reports is excluded because the requested flow only opens the first available report.
- Other OrangeHRM modules and invalid-login behavior are outside this scenario.
- The live browser flow could not be interactively explored because the available browser session was not initialized; the plan uses the repository's existing OrangeHRM accessibility snapshot for the authenticated navigation contract.