# Test Plan: OrangeHRM Leave Sections

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-17

## Overview
Verify that a valid OrangeHRM demo user can log in, access the Leave area, and confirm the Leave page heading and all seven section entries displayed below it. The test focuses on navigation and structural validation of the Leave landing page without exercising leave creation or approval workflows.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- The session starts as an unauthenticated user in a clean browser context.
- The demo user credentials are valid: `Admin` / `admin123`.
- The authenticated account has access to the Leave module in the main navigation.

## Scenarios

### Scenario 1.1 — Leave landing page displays heading and all 7 menu sections
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser session is open on the OrangeHRM login page and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM login page — expected: the login screen is visible with Username, Password, and Login controls.
  2. Enter `Admin` in the Username field — expected: the value is accepted and displayed in the input.
  3. Enter `admin123` in the Password field — expected: the value is accepted and masked as a password input.
  4. Click the Login button — expected: the dashboard loads successfully and the user is signed in.
  5. Open the Leave navigation area from the left-side navigation — expected: the Leave section expands or becomes active.
  6. Navigate to the Leave landing page — expected: the Leave page is displayed and the main heading is visible.
  7. Inspect the section list directly below the heading — expected: all seven area entries are visible in the intended order.
- **Assertions:**
  - The authenticated session is confirmed by the successful dashboard load.
  - The Leave heading is visible and matches the expected page context.
  - The following seven sections are visible beneath the heading: `Apply`, `My Leave`, `Entitlements`, `Reports`, `Configure`, `Leave List`, and `Assign Leave`.
  - The list is complete and no section item is missing or duplicated.
- **Edge cases considered:**
  - Login fails or redirects back to the login screen.
  - Leave menu item is not visible in the left navigation.
  - Leave page heading text differs from the expected value because of localization or UI changes.
  - One or more section links are hidden, collapsed, or not rendered under the heading.
  - The page loads but only a subset of the section list is visible.

## Not covered (and why)
- Leave creation, approval, rejection, cancellation, or entitlement workflows are intentionally excluded because this plan focuses only on page structure and navigation verification.
- Invalid login attempts are not included here because the scenario explicitly validates the happy path for the required demo login.
- Date-filtered leave searches, report generation, and advanced configuration actions are outside the scope of the requested heading-and-section verification.
