# Test Plan: OrangeHRM My Claims Details

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-17

## Overview
Verify that a valid OrangeHRM demo user can authenticate, open the Claims module, and navigate to My Claims. After claim records load, open the details view for the first record and attach a screenshot of the loaded details page to the test report.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and unauthenticated session.
- Use the valid demo credentials: username `Admin` and password `admin123`.
- The authenticated account has access to Claims and My Claims.

## Scenarios

### Scenario 1.1 — Login and open details for the first My Claims record
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is open on the OrangeHRM login URL and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM application — expected: the login page is displayed with Username and Password fields and a Login button.
  2. Enter `Admin` in the Username field — expected: the Username field contains `Admin`.
  3. Enter `admin123` in the Password field — expected: the Password field accepts the password without a validation error.
  4. Click Login — expected: the application navigates to the authenticated Dashboard route and a `Dashboard` heading is visible.
  5. Open `Claims` from the left-side navigation — expected: the Claims module opens and its submenu is available.
  6. Click `My Claims` — expected: the My Claims page is displayed with its claims records area.
  7. Wait until the claim records appear — expected: the records table/list is visible, loading has completed, and at least one claim record is available.
  8. Click the view-details action for the first claim record — expected: the first claim's details view opens.
  9. Wait until the claim details are loaded — expected: the details heading or details content is visible and no loading state remains.
  10. Capture a screenshot of the claim details view and attach it to the test report — expected: the screenshot is stored as a test attachment and shows the loaded details for the first claim.
- **Assertions:**
  - Successful authentication is confirmed by the Dashboard heading and authenticated dashboard URL.
  - The Claims module and My Claims view are visible after navigation.
  - The claims records area becomes visible with at least one record after loading.
  - The first record's view-details action opens a distinct claim details view.
  - Loaded claim details are visible before the screenshot is captured.
  - A claim-details screenshot attachment is present in the generated test report.
- **Edge cases considered:**
  - Login remains on the authentication page or displays an authentication error.
  - Claims or My Claims is unavailable in the navigation.
  - Claim records remain loading or the records list is empty.
  - The first record has multiple actions; select the action whose accessible name or tooltip indicates view/details, never delete or cancel.
  - Details open in a new tab or require additional loading before the screenshot is taken.
  - The details view shows an explicit empty/error state instead of claim data.

## Not covered (and why)
- Creating, editing, submitting, approving, rejecting, deleting, or cancelling claims is excluded because the requested flow only views the first existing claim.
- Claim filters, sorting, pagination, exports, and other Claims submenu pages are outside this scenario.
- Invalid-login behavior is covered separately by the existing OrangeHRM login plan.
- The live browser flow could not be interactively explored because the available browser session was not initialized; the plan uses the repository's verified authenticated navigation evidence and runtime-accessible controls for the remaining Claims steps.