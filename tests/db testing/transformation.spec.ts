import { test, expect } from '../../src/fixtures/base';
import { queryDB } from '../../utils/postgres';

type Order = {
  order_id: string;
  customer_id: string;
  amount: string;
  status: string;
};

function normalizeOrders(rows: Record<string, unknown>[]): Order[] {
  return rows.map((row) => ({
    order_id: String(row.order_id),
    customer_id: String(row.customer_id),
    amount: String(row.amount),
    status: String(row.status),
  }));
}

test.describe('Bronze-to-silver transformation', () => {
  test('matches bronze.bronze_orders with silver.silver_orders', async () => {
    await test.step('Read bronze and silver orders', async () => {
      const bronzeOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_bronze.bronze_orders ORDER BY order_id',
      ));
      const silverOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_silver.silver_orders ORDER BY order_id',
      ));

      console.log(`Expected silver row count: ${bronzeOrders.length}; Actual silver row count: ${silverOrders.length}`);
      expect(silverOrders.length).toBe(bronzeOrders.length);

      console.log(`Expected bronze rows: ${JSON.stringify(bronzeOrders)}; Actual silver rows: ${JSON.stringify(silverOrders)}`);
      expect(silverOrders).toEqual(bronzeOrders);
    });
  });
});