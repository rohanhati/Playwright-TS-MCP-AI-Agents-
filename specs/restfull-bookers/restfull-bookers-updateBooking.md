# Test Plan: Restful Booker Update Booking

**Target:** https://restful-booker.herokuapp.com/booking/{bookingid}  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-24

## Overview
Verify the Restful Booker Update Booking API by authenticating, preparing an independently controlled booking, and sending a complete JSON update to `PUT /booking/{bookingid}`. The test validates the request configuration, response status code and status text, and the updated booking fields returned in the response body. The API documentation at `https://restful-booker.herokuapp.com/apidoc/index.html` is used only to learn the endpoint contract; the test does not navigate to the documentation page.

## Preconditions
- The Restful Booker API is reachable.
- Playwright's API request context is available; no browser page navigation is required.
- A valid non-sensitive username and password are available for creating an API token through `POST /auth`.
- The test can create a temporary booking through `POST /booking` to obtain a booking ID, or can use a known existing booking ID supplied by the test environment.
- The update request uses a complete JSON booking payload with `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, and `additionalneeds`.

## Scenarios

### Scenario 1.1 — Update a booking and validate the API response
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A Playwright API request context is available, valid authentication credentials are configured, and the Update Booking endpoint can be reached.
- **Steps:**
  1. Authenticate through `POST https://restful-booker.herokuapp.com/auth` — expected: the response is successful and returns a non-empty token.
  2. Create or select a booking to update — expected: a valid positive numeric `bookingid` is available for the update request.
  3. Define the updated booking payload — expected: the JSON object contains `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, and `additionalneeds` with values different from the original booking where the field is being updated.
  4. Send a direct `PUT` request to `https://restful-booker.herokuapp.com/booking/{bookingid}` — expected: the request includes the booking ID, `Content-Type: application/json`, `Accept: application/json`, the authentication token in the required cookie or authorization header, and the complete JSON payload.
  5. Validate the response status code — expected: the status code is exactly `200`.
  6. Validate the response status text — expected: the status text is exactly `OK`.
  7. Parse the response body as JSON — expected: the body is an object representing the updated booking.
  8. Validate the updated booking response — expected: `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, and `additionalneeds` are present and match the submitted update payload.
- **Assertions:**
  - The update request uses `PUT /booking/{bookingid}` with a valid booking ID and complete JSON body.
  - The request includes the required JSON headers and authentication token configuration.
  - The response status code is exactly `200`.
  - The response status text is exactly `OK`.
  - The response body contains all updated top-level booking fields.
  - The nested `bookingdates.checkin` and `bookingdates.checkout` values match the update payload.
  - Boolean `depositpaid` and numeric `totalprice` preserve their expected types and submitted values.
- **Edge cases considered:**
  - Authentication fails or the token is missing, empty, expired, or sent in the wrong header/cookie format.
  - The booking ID is missing, non-numeric, or does not identify an existing booking.
  - The request uses `POST` or `PATCH` instead of the documented `PUT` method.
  - The request omits a required field or sends an incomplete booking object.
  - The API returns a non-`200` status or a status text other than `OK`.
  - The response is not valid JSON or omits one of the updated booking fields.
  - The response returns stale values, changes nested booking dates, or changes the types of `totalprice` or `depositpaid`.
  - The API is temporarily unavailable, rate-limited, or returns a transport error.

## Not covered (and why)
- Navigating to or validating the API documentation UI, because it is only used to learn the request contract.
- Partial updates through `PATCH`, because this scenario verifies the complete `PUT` update contract.
- Invalid credentials, invalid payloads, and unauthorized update behavior, because the scenario focuses on a successful authenticated update.
- Get and delete booking operations, except for the minimum setup needed to obtain a valid booking ID; those are separate API flows.
- Post-update cleanup, because deleting the setup booking would require an additional destructive API operation outside the requested Update Booking flow.