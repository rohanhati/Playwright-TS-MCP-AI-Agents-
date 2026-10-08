# Test Plan: Restful Booker Create Booking

**Target:** https://restful-booker.herokuapp.com/booking  
**Seed:** tests/seed.spec.ts  
**Date:** 2026-09-24

## Overview
Verify the Restful Booker Create Booking API by sending a valid JSON payload directly to `POST /booking` and inspecting the resulting API response. The API documentation at `https://restful-booker.herokuapp.com/apidoc/index.html` was used during planning to learn the endpoint and payload contract; the test itself does not navigate to the documentation website.

## Preconditions
- The API endpoint `POST https://restful-booker.herokuapp.com/booking` is available.
- Use Playwright's API request context or the request fixture; no browser page navigation or authentication state is required.
- Use a unique, non-sensitive test payload containing `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, and `additionalneeds`.
- The request body is sent as JSON with `Content-Type: application/json`.

## Scenarios

### Scenario 1.1 — Create a booking and validate the API response
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A Playwright API request context is available, and the Restful Booker Create Booking endpoint can be reached.
- **Steps:**
  1. Define the valid booking payload — expected: the JSON object contains `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, and `additionalneeds`.
  2. Send a direct `POST` request to `https://restful-booker.herokuapp.com/booking` with the payload as JSON — expected: a response is received and the request completes without a transport failure.
  3. Validate the response status code — expected: the status code is exactly `200`.
  4. Validate the response status text — expected: the status text is exactly `OK`.
  5. Parse the response body as JSON — expected: the body is a JSON object containing `bookingid` and `booking`.
  6. Validate the created booking identifier — expected: `bookingid` exists and is a positive numeric identifier.
  7. Validate the returned booking details — expected: `booking.firstname`, `booking.lastname`, `booking.totalprice`, `booking.depositpaid`, `booking.bookingdates.checkin`, `booking.bookingdates.checkout`, and `booking.additionalneeds` are present and match the values submitted in the request.
- **Assertions:**
  - The request is sent directly to `POST https://restful-booker.herokuapp.com/booking` with a JSON request body.
  - The response status code is exactly `200`.
  - The response status text is exactly `OK`.
  - The response body contains a positive numeric `bookingid`.
  - The response contains a `booking` object with all submitted booking fields and matching values, including both nested booking dates.
- **Edge cases considered:**
  - The request returns a non-`200` status or a status text other than `OK`.
  - The response is not valid JSON or omits `bookingid` or `booking`.
  - The returned booking object omits a required field or changes a submitted value.
  - `bookingdates` is missing or does not contain both `checkin` and `checkout`.
  - The API is temporarily unavailable, rate-limited, or returns a transport error.
  - The endpoint rejects the expected JSON content type or payload structure.

## Not covered (and why)
- Authentication token creation, because `POST /booking` does not require authentication.
- Get, update, partial update, and delete booking operations because the requested flow is limited to Create Booking.
- Invalid payload and validation-error behavior because this scenario verifies the successful create contract.
- Destructive cleanup, because deleting the created booking would require authentication and is outside the requested response-validation flow.
- Navigating to or validating the API documentation UI, because the documentation was only used to learn the request contract and is not part of the API test.