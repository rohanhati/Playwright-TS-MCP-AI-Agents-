# Test Plan: OrangeHRM Employee Claim Labels

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-18

## Overview
Verify that the OrangeHRM demo Admin user can log in, open the Claims module, and see the Employee Claims page. Confirm the page heading and all seven visible labels in the Employee Claims section, then log out through the profile menu.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and an unauthenticated session.
- Use the demo credentials: username `Admin` and password `admin123`.
- The Admin account has access to the Claims module.

## Scenarios

### Scenario 1.1 — Verify Employee Claims labels after Admin login
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is open on the OrangeHRM login URL and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM login URL — expected: the login form and `Login` heading are visible.
  2. Enter `Admin` in the Username field and `admin123` in the Password field — expected: both fields contain the supplied credentials and no validation error is shown.
  3. Click Login — expected: the authenticated dashboard opens and the `Dashboard` heading is visible.
  4. Click the `Claim` entry in the left navigation — expected: the Claims module opens and the Employee Claims view is displayed.
  5. Verify the `Employee Claims` heading — expected: the heading is visible within the Claims page.
  6. Verify the seven visible labels in the Employee Claims section — expected: each label is visible and associated with the search form: `Employee Claims`, `Employee Name`, `Reference Id`, `Event Name`, `Status`, `From Date`, and `To Date`.
  7. Click the profile icon/menu control — expected: the profile menu opens and exposes a `Logout` action.
  8. Click `Logout` — expected: the session ends and the application returns to the authentication page.
  9. Verify the `Login` heading — expected: the unauthenticated login form and `Login` heading are visible again.
- **Assertions:**
  - The authenticated dashboard displays the `Dashboard` heading after valid login.
  - The Claims page displays the `Employee Claims` heading.
  - All seven required Employee Claims labels are visible: `Employee Claims`, `Employee Name`, `Reference Id`, `Event Name`, `Status`, `From Date`, and `To Date`.
  - The profile menu contains `Logout`, and logout returns the browser to the authentication page with the `Login` heading.
- **Edge cases considered:**
  - Login fails or leaves the user on the authentication page, preventing Claims navigation.
  - The navigation item is rendered as `Claims` rather than `Claim`; use the accessible name exposed by the live page.
  - The Employee Claims heading or one of the seven labels is missing, duplicated unexpectedly, hidden, or rendered with different capitalization.
  - Date fields may expose `From Date` and `To Date` as labels or accessible names on their associated inputs.
  - The profile control does not open, the Logout action is unavailable, or logout leaves the session authenticated.

## Not covered (and why)
- Claim creation, editing, approval, rejection, deletion, filtering, and submission are excluded because this scenario only verifies the Claims page labels.
- Invalid credentials and other profile-menu actions are outside the requested flow.
- The live browser session could not be initialized by the available browser connector, so the exact runtime label casing and the Claims navigation interaction should be confirmed during test generation.