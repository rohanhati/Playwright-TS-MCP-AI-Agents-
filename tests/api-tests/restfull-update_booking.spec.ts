import { test, expect } from '../../src/fixtures/base';
import createBookingPayload from '../data/restfull-bookers-createBooking.json';
import updateBookingPayload from '../data/restfull-bookers-updateBooking.json';

test.describe('Restful Booker Update Booking API', () => {
  test('updates a booking and validates the response @smoke @critical', async ({ request }, testInfo) => {
    const username = process.env.RESTFUL_BOOKER_USERNAME;
    const password = process.env.RESTFUL_BOOKER_PASSWORD;

    await expect(username, 'RESTFUL_BOOKER_USERNAME must be configured').toBeTruthy();
    await expect(password, 'RESTFUL_BOOKER_PASSWORD must be configured').toBeTruthy();

    const authResponse = await test.step('Create an API authentication token', async () => {
      return request.post('https://restful-booker.herokuapp.com/auth', {
        data: { username, password },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    const authBody = await authResponse.json();
    const token = authBody.token;
    await expect(token, 'Authentication response should contain a token').toBeTruthy();

    const createResponse = await test.step('Create a booking for the update flow', async () => {
      return request.post('https://restful-booker.herokuapp.com/booking', {
        data: createBookingPayload,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    await expect(bookingId, 'Create response should contain a booking ID').toBeGreaterThan(0);

    const response = await test.step('Send the Update Booking request', async () => {
      return request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: updateBookingPayload,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
      });
    });

    const expectedStatusCode = 200;
    const actualStatusCode = response.status();
    const statusCodeLog = `Expected status code: ${expectedStatusCode}; Actual status code: ${actualStatusCode}`;
    console.log(statusCodeLog);
    await testInfo.attach('update-booking-status-code', {
      body: statusCodeLog,
      contentType: 'text/plain',
    });
    await expect(actualStatusCode).toBe(expectedStatusCode);

    const expectedStatusText = 'OK';
    const actualStatusText = response.statusText();
    const statusTextLog = `Expected status text: ${expectedStatusText}; Actual status text: ${actualStatusText}`;
    console.log(statusTextLog);
    await testInfo.attach('update-booking-status-text', {
      body: statusTextLog,
      contentType: 'text/plain',
    });
    await expect(actualStatusText).toBe(expectedStatusText);

    const responseBody = await test.step('Validate the updated booking response body', async () => {
      return response.json();
    });
    const responseBodyLog = `Expected booking: ${JSON.stringify(updateBookingPayload)}; Actual booking: ${JSON.stringify(responseBody)}`;
    console.log(responseBodyLog);
    await testInfo.attach('update-booking-response-body', {
      body: responseBodyLog,
      contentType: 'text/plain',
    });
    await expect(responseBody.firstname).toBe(updateBookingPayload.firstname);
    await expect(responseBody.lastname).toBe(updateBookingPayload.lastname);
    await expect(responseBody.totalprice).toBe(updateBookingPayload.totalprice);
    await expect(responseBody.depositpaid).toBe(updateBookingPayload.depositpaid);
    await expect(responseBody.bookingdates.checkin).toBe(updateBookingPayload.bookingdates.checkin);
    await expect(responseBody.bookingdates.checkout).toBe(updateBookingPayload.bookingdates.checkout);
    await expect(responseBody.additionalneeds).toBe(updateBookingPayload.additionalneeds);
    await expect(typeof responseBody.totalprice).toBe('number');
    await expect(typeof responseBody.depositpaid).toBe('boolean');
  });
});