# Test Plan: OrangeHRM Login and Logout

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-18

## Overview
Verify that the OrangeHRM demo Admin user can log in successfully, sees the authenticated Dashboard heading, and can access the Admin and Leave entries in the left navigation panel. Then open the profile menu, log out, and verify that the authentication page displays the Login heading again.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and an unauthenticated session.
- Use the demo credentials: username `Admin` and password `admin123`.
- The authenticated account has access to the Admin and Leave navigation entries.

## Scenarios

### Scenario 1.1 — Log in, verify left navigation, and log out
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is open on the OrangeHRM login URL and no user is authenticated.
- **Steps:**
  1. Navigate to the OrangeHRM login URL — expected: the login page is displayed with Username and Password fields, a Login button, and a `Login` heading.
  2. Enter `Admin` in the Username field — expected: the Username field contains `Admin`.
  3. Enter `admin123` in the Password field — expected: the Password field accepts the password without a validation error.
  4. Click the Login button — expected: the application navigates to the authenticated dashboard and the `Dashboard` heading is visible.
  5. Inspect the left navigation panel — expected: an `Admin` navigation entry and a `Leave` navigation entry are visible in the left-side panel.
  6. Click the profile icon/menu control in the top-right corner — expected: the user profile menu opens and contains a `Logout` action.
  7. Click `Logout` — expected: the session ends and the application returns to the authentication route.
  8. Verify the `Login` heading — expected: the unauthenticated login page is visible with the `Login` heading and login form controls.
- **Assertions:**
  - The authenticated page shows the `Dashboard` heading after valid credentials are submitted.
  - The left navigation panel visibly contains both `Admin` and `Leave` entries.
  - The top-right profile menu exposes a `Logout` action after login.
  - After logout, the URL is the authentication route and the `Login` heading is visible.
- **Edge cases considered:**
  - Invalid credentials or a failed redirect leaves the user on the login page and prevents the dashboard checks.
  - Either `Admin` or `Leave` is missing, hidden, or rendered outside the left navigation panel.
  - The profile control is present but its menu does not open or does not expose `Logout`.
  - Logout fails to clear the session, leaving the user on an authenticated page or allowing the dashboard to remain visible.
  - The login page returns without the expected heading or form controls.

## Not covered (and why)
- Invalid credentials, locked users, password visibility, and validation messages are outside the requested happy-path flow.
- Navigating into Admin or Leave is not covered; this plan verifies only their presence in the left navigation panel.
- Profile settings and other profile-menu actions are excluded because only Logout is requested.
- The live browser session could not be interactively explored because the available browser connector reported that no test session was initialized; the plan uses the repository's existing OrangeHRM locators and navigation evidence for the controls that could not be inspected interactively.