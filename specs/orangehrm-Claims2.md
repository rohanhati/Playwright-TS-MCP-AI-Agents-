# Test Plan: OrangeHRM My Claims Details

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-10-05

## Overview
Verify that the OrangeHRM demo Admin user can sign in, navigate to Claims > My Claims, and open the details view for the first available claim record. Capture a screenshot of the loaded details view and attach it to the test report.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and an unauthenticated session.
- Use the demo credentials: username `Admin` and password `admin123`.
- The account has access to Claims and My Claims, and at least one claim record is available.

## Scenarios

### Scenario 1.1 — Open and capture the first My Claims record
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is on the OrangeHRM login URL with no authenticated session.
- **Steps:**
  1. Navigate to the target URL — expected: the login page shows Username and Password fields and a Login button.
  2. Enter `Admin` and `admin123` in the Username and Password fields — expected: both credentials are entered without a validation error.
  3. Click Login — expected: the authenticated Dashboard page appears with a `Dashboard` heading.
  4. Open `Claims` from the left navigation — expected: the Claims module is displayed.
  5. Select `My Claims` — expected: the My Claims records view appears.
  6. Wait for the records to appear — expected: loading completes and at least one claim record is visible.
  7. Activate the view-details action for the first record — expected: that record's details view opens.
  8. Wait for the claim details to load, then capture a screenshot and attach it to the test report — expected: the screenshot attachment shows the loaded details for the first record.
- **Assertions:**
  - Successful login is confirmed by the Dashboard heading.
  - My Claims displays at least one record after loading.
  - The first record's details are visible before taking the screenshot.
  - The test report contains an attached screenshot of the loaded claim details.
- **Edge cases considered:**
  - Authentication fails or the Dashboard does not appear.
  - Claims or My Claims is unavailable in navigation.
  - Records fail to load or the list is empty.
  - The first row exposes multiple actions; use only the action identified as view/details.
  - The details view requires additional loading or opens in another tab.

## Not covered (and why)
- Creating, editing, submitting, approving, rejecting, deleting, or cancelling claims is excluded; the requested flow is read-only.
- Claim filtering, sorting, pagination, exports, and other Claims pages are outside scope.
- Live browser exploration could not be completed because the browser connector reported that no test session was initialized. The flow is based on the existing OrangeHRM claims plan in this workspace.