# Test Plan: OrangeHRM My Leave Search

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-17

## Overview
Verify that a valid OrangeHRM demo user can authenticate, open the My Leave view from the left-side Leave section, and search leave records by the `CAN - Personal` leave type. The final results view must be visibly populated and captured as a screenshot attached to the test report.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and unauthenticated session.
- Use the published demo credentials: username `Admin` and password `admin123`.
- The authenticated account has access to the Leave section and My Leave view.

## Scenarios

### Scenario 1.1 — Valid login and search My Leave records by personal leave type
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** A fresh browser context is open on the OrangeHRM login URL and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM application — expected: the login page is displayed with Username and Password fields and a Login button.
  2. Enter `Admin` in the Username field — expected: the Username field contains `Admin`.
  3. Enter `admin123` in the Password field — expected: the Password field accepts the password without a validation error.
  4. Click Login — expected: the application navigates to the authenticated Dashboard route and a `Dashboard` heading is visible.
  5. Open the `Leave` section from the left-side navigation panel — expected: the Leave navigation area is selected or expanded and its submenu is available.
  6. Click `My Leave` — expected: the My Leave page is displayed with its leave search controls.
  7. Open the `Leave Type` dropdown — expected: the leave type options are displayed.
  8. Select `CAN - Personal` — expected: the Leave Type control shows `CAN - Personal` as the selected value.
  9. Click Search — expected: the search request completes and the leave records table refreshes using the selected leave type.
  10. Wait until the leave records are displayed — expected: the results region/table is visible, loading indicators are absent, and the result state corresponds to the `CAN - Personal` filter.
  11. Capture a screenshot of the results view and attach it to the test report — expected: the screenshot is stored as a test attachment and shows the My Leave results after filtering.
- **Assertions:**
  - Successful authentication is confirmed by the Dashboard heading and authenticated dashboard URL.
  - The My Leave page and Leave Type control are visible before searching.
  - The Leave Type control retains `CAN - Personal` after selection and search.
  - The post-search results region is visible after loading completes.
  - A results screenshot attachment is present in the generated test report.
- **Edge cases considered:**
  - Login fails or remains on the login page instead of reaching Dashboard.
  - Leave or My Leave is unavailable in the left-side navigation.
  - `CAN - Personal` is missing from the Leave Type options.
  - The search returns an empty state; verify that the empty state is explicit and not mistaken for a loading or failed response.
  - Results remain in a loading state or the screenshot is captured before the refreshed results are rendered.

## Not covered (and why)
- Invalid login credentials are covered by the existing OrangeHRM login plan and are outside this requested flow.
- Creating, editing, approving, rejecting, deleting, or cancelling leave is not covered because this scenario only searches My Leave records.
- Other leave types, date ranges, employee filters, pagination, and sorting are excluded to keep the plan focused on `CAN - Personal`.