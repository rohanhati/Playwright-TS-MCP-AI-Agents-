import { test, expect } from '../../src/fixtures/base';
import { queryDB } from '../../utils/postgres';
import fs from 'fs';

type Order = {
  order_id: string;
  customer_id: string;
  amount: string;
  status: string;
};

function readSourceOrders(): Order[] {
  const [header, ...rows] = fs
    .readFileSync('retail_dbt/seeds/source.csv', 'utf-8')
    .trim()
    .split(/\r?\n/);

  if (header !== 'order_id,customer_id,amount,status') {
    throw new Error(`Unexpected source.csv header: ${header}`);
  }

  return rows.filter(Boolean).map((row) => {
    const [order_id, customer_id, amount, status] = row.split(',');
    return { order_id, customer_id, amount, status };
  });
}

function normalizeOrders(rows: Record<string, unknown>[]): Order[] {
  return rows.map((row) => ({
    order_id: String(row.order_id),
    customer_id: String(row.customer_id),
    amount: String(row.amount),
    status: String(row.status),
  }));
}

test.describe('Source-to-bronze ingestion', () => {
  test('matches source.csv with bronze.bronze_orders', async () => {
    await test.step('Read source and bronze orders', async () => {
      const expectedOrders = readSourceOrders();
      const bronzeOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_bronze.bronze_orders ORDER BY order_id',
      ));

      console.log(`Expected source row count: ${expectedOrders.length}; Actual bronze row count: ${bronzeOrders.length}`);
      expect(bronzeOrders.length).toBe(expectedOrders.length);

      console.log(`Expected source rows: ${JSON.stringify(expectedOrders)}; Actual bronze rows: ${JSON.stringify(bronzeOrders)}`);
      expect(bronzeOrders).toEqual(expectedOrders);
    });
  });
});