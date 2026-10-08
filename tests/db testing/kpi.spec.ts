import { test, expect } from '../../src/fixtures/base';
import { queryDB } from '../../utils/postgres';

test('KPI Validation – Gold KPIs', async () => {
  const kpis = await queryDB('SELECT total_orders, total_revenue, avg_order_value FROM bronze_gold.gold_kpis');

  const { total_orders, total_revenue, avg_order_value } = kpis[0];

  // Basic sanity checks
  const totalOrdersLog = `Expected total orders: greater than 0; Actual total orders: ${total_orders}`;
  console.log(totalOrdersLog);
  expect(Number(total_orders)).toBeGreaterThan(0);

  const totalRevenueLog = `Expected total revenue: greater than 0; Actual total revenue: ${total_revenue}`;
  console.log(totalRevenueLog);
  expect(Number(total_revenue)).toBeGreaterThan(0);

  const averageOrderValueLog = `Expected average order value: greater than 0; Actual average order value: ${avg_order_value}`;
  console.log(averageOrderValueLog);
  expect(Number(avg_order_value)).toBeGreaterThan(0);

  // Derived KPI check
  const derivedAvg = Number(total_revenue) / Number(total_orders);
  const derivedAverageLog = `Expected average order value: ${derivedAvg}; Actual average order value: ${avg_order_value}`;
  console.log(derivedAverageLog);
  expect(Number(avg_order_value)).toBeCloseTo(derivedAvg);
});
 