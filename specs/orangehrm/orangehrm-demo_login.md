# Test Plan: OrangeHRM Demo Login

**Target:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-18

## Overview
Verify that the OrangeHRM demo Admin account can authenticate with the supplied credentials and that the authenticated dashboard displays its `Dashboard` heading. Then open the profile menu, log out, and verify that the unauthenticated login page is shown again.

## Preconditions
- The OrangeHRM demo site is reachable at the target URL.
- Start with a fresh browser context and no authenticated session.
- The login page is open at the target URL.
- Use the supplied demo credentials: username `Admin` and password `admin123`.

## Scenarios

### Scenario 1.1 — Log in, verify the dashboard heading, and log out
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A fresh browser context is unauthenticated and displaying the OrangeHRM login page.
- **Steps:**
  1. Verify the login form displays the `Username` field, `Password` field, and `Login` button — expected: all controls are visible and available for input.
  2. Fill the `Username` field with `Admin` — expected: the field contains `Admin`.
  3. Fill the `Password` field with `admin123` — expected: the password is accepted without a validation message.
  4. Click the `Login` button — expected: the application navigates to the authenticated dashboard.
  5. Verify the `Dashboard` heading — expected: a visible heading named `Dashboard` confirms successful authentication.
  6. Click the profile icon in the top-right banner — expected: the profile menu opens and exposes a `Logout` action.
  7. Click `Logout` — expected: the authenticated session ends and the application returns to the login route.
  8. Verify the `Login` heading — expected: the unauthenticated login page is visible again with its login form.
- **Assertions:**
  - The authenticated page contains a visible `Dashboard` heading after valid credentials are submitted.
  - Opening the profile icon exposes a visible `Logout` menu item.
  - After logout, the login route is displayed and the `Login` heading is visible.
- **Edge cases considered:**
  - Incorrect or rejected credentials leave the user on the login page and prevent the dashboard heading from appearing.
  - The profile icon is visible but does not open a menu or does not expose `Logout`.
  - Logout fails to clear the session, leaving the dashboard visible or redirecting to an authenticated route.
  - The login page returns after logout without the expected `Login` heading or form controls.

## Not covered (and why)
- Invalid credentials, locked accounts, password visibility, and validation messages are outside the requested successful login flow.
- Dashboard widgets and navigation links are not covered because only the authenticated heading is requested.
- Profile settings and other profile-menu actions are excluded because only `Logout` is requested.
- Live browser interaction could not be performed because the available browser connector reported that no test session was initialized; the plan follows the existing repository page-object and test locators for this flow.