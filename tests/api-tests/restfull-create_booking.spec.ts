import { test, expect } from '../../src/fixtures/base';
import bookingPayload from '../data/restfull-bookers-createBooking.json';

test.describe('Restful Booker Create Booking API', () => {
  test('creates a booking and validates the response @smoke @critical', async ({ request }, testInfo) => {
    const response = await test.step('Send the Create Booking request', async () => {
      return request.post('https://restful-booker.herokuapp.com/booking', {
        data: bookingPayload,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    const expectedStatusCode = 200;
    const actualStatusCode = response.status();
    const statusCodeLog = `Expected status code: ${expectedStatusCode}; Actual status code: ${actualStatusCode}`;
    console.log(statusCodeLog);
    await testInfo.attach('create-booking-status-code', {
      body: statusCodeLog,
      contentType: 'text/plain',
    });
    await expect(actualStatusCode).toBe(expectedStatusCode);

    const expectedStatusText = 'OK';
    const actualStatusText = response.statusText();
    const statusTextLog = `Expected status text: ${expectedStatusText}; Actual status text: ${actualStatusText}`;
    console.log(statusTextLog);
    await testInfo.attach('create-booking-status-text', {
      body: statusTextLog,
      contentType: 'text/plain',
    });
    await expect(actualStatusText).toBe(expectedStatusText);

    const responseBody = await test.step('Validate the response body', async () => {
      return response.json();
    });

    const expectedBookingIdType = 'number';
    const actualBookingIdType = typeof responseBody.bookingid;
    const bookingIdTypeLog = `Expected bookingid type: ${expectedBookingIdType}; Actual bookingid type: ${actualBookingIdType}`;
    console.log(bookingIdTypeLog);
    await testInfo.attach('create-booking-id-type', {
      body: bookingIdTypeLog,
      contentType: 'text/plain',
    });
    await expect(actualBookingIdType).toBe(expectedBookingIdType);
    await expect(responseBody.bookingid).toBeGreaterThan(0);

    const expectedBooking = bookingPayload;
    const actualBooking = responseBody.booking;
    const bookingLog = `Expected booking: ${JSON.stringify(expectedBooking)}; Actual booking: ${JSON.stringify(actualBooking)}`;
    console.log(bookingLog);
    await testInfo.attach('create-booking-body', {
      body: bookingLog,
      contentType: 'text/plain',
    });
    await expect(actualBooking).toEqual(expectedBooking);
  });
});