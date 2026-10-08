import { test, expect } from '../../src/fixtures/base';
import { queryDB } from '../../utils/postgres';

// test('Reconciliation Validation – Source vs Gold', async () => {
//     const sourceCount = (await queryDB('SELECT COUNT(*) FROM bronze.orders'))[0].count;
//     const goldCount = (await queryDB('SELECT COUNT(*) FROM bronze_gold.gold_kpis'))[0].count;

//     // Compare record counts
//     expect(Number(sourceCount)).toBe(Number(goldCount));

//     // Compare total revenue
//     const sourceRevenue = (await queryDB('SELECT SUM(amount) FROM bronze.orders WHERE status = \'Completed\''))[0].sum;
//     const goldRevenue = (await queryDB('SELECT SUM(amount) FROM bronze_gold.gold_kpis'))[0].sum;

//     expect(Number(goldRevenue)).toBeCloseTo(Number(sourceRevenue));
// });

test('Reconciliation Validation – Source vs Gold', async () => {
  const sourceOrders = (await queryDB(
    "SELECT COUNT(*) FROM bronze_bronze.bronze_orders WHERE status = 'Completed' AND amount IS NOT NULL"
  ))[0].count;

  const goldOrders = (await queryDB(
    "SELECT total_orders FROM bronze_gold.gold_kpis"
  ))[0].total_orders;

  const orderCountLog = `Expected gold order count: ${sourceOrders}; Actual gold order count: ${goldOrders}`;
  console.log(orderCountLog);
  expect(Number(goldOrders)).toBe(Number(sourceOrders));

  const sourceRevenue = (await queryDB(
    "SELECT SUM(amount) FROM bronze_bronze.bronze_orders WHERE status = 'Completed' AND amount IS NOT NULL"
  ))[0].sum;

  const goldRevenue = (await queryDB(
    "SELECT total_revenue FROM bronze_gold.gold_kpis"
  ))[0].total_revenue;

  const revenueLog = `Expected gold revenue: ${sourceRevenue}; Actual gold revenue: ${goldRevenue}`;
  console.log(revenueLog);
  expect(Number(goldRevenue)).toBeCloseTo(Number(sourceRevenue));
});