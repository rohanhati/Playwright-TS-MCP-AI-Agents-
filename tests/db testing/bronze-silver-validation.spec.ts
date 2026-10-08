import { test, expect } from '../../src/fixtures/base';
import { queryDB } from '../../utils/postgres';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Order = {
  order_id: string;
  customer_id: string;
  amount: string;
  status: string;
};

type DatabaseRow = Record<string, unknown>;

function readSourceOrders(): Order[] {
  const sourcePath = resolve(process.cwd(), 'retail_dbt', 'seeds', 'source.csv');
  const [header, ...rows] = readFileSync(sourcePath, 'utf-8').trim().split(/\r?\n/);

  if (header !== 'order_id,customer_id,amount,status') {
    throw new Error(`Unexpected source.csv header: ${header}`);
  }

  return rows.filter(Boolean).map((row) => {
    const [order_id, customer_id, amount, status] = row.split(',');
    return { order_id, customer_id, amount, status };
  });
}

function normalizeOrders(rows: DatabaseRow[]): Order[] {
  return rows.map((row) => ({
    order_id: String(row.order_id),
    customer_id: String(row.customer_id),
    amount: String(row.amount),
    status: String(row.status),
  }));
}

test.describe('Bronze and silver data validation', () => {
  test('validates source ingestion into bronze @smoke', async () => {
    await test.step('Compare source.csv with bronze_orders', async () => {
      const expectedOrders = readSourceOrders();
      const actualOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_bronze.bronze_orders ORDER BY order_id',
      ));

      console.log(`Expected bronze row count: ${expectedOrders.length}; Actual bronze row count: ${actualOrders.length}`);
      expect(actualOrders.length).toBe(expectedOrders.length);

      console.log(`Expected bronze rows: ${JSON.stringify(expectedOrders)}; Actual bronze rows: ${JSON.stringify(actualOrders)}`);
      expect(actualOrders).toEqual(expectedOrders);
    });
  });

  test('validates bronze-to-silver record transformation @regression', async () => {
    await test.step('Compare bronze_orders with silver_orders', async () => {
      const bronzeOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_bronze.bronze_orders ORDER BY order_id',
      ));
      const silverOrders = normalizeOrders(await queryDB(
        'SELECT order_id, customer_id, amount, status FROM bronze_silver.silver_orders ORDER BY order_id',
      ));

      console.log(`Expected silver row count: ${bronzeOrders.length}; Actual silver row count: ${silverOrders.length}`);
      expect(silverOrders.length).toBe(bronzeOrders.length);

      console.log(`Expected silver rows: ${JSON.stringify(bronzeOrders)}; Actual silver rows: ${JSON.stringify(silverOrders)}`);
      expect(silverOrders).toEqual(bronzeOrders);
    });
  });

  test('rejects invalid records in silver @regression', async () => {
    const [result] = await queryDB(
      `SELECT COUNT(*) AS invalid_rows
       FROM bronze_silver.silver_orders
       WHERE amount IS NULL
       OR status NOT IN ('Completed', 'Pending')`,
    );
    const invalidRowCount = Number(result.invalid_rows);

    console.log(`Expected invalid silver rows: 0; Actual invalid silver rows: ${invalidRowCount}`);
    expect(invalidRowCount).toBe(0);
  });
});
