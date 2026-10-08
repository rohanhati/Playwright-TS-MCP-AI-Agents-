# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: db testing\reconciliation.spec.ts >> Reconciliation Validation – Source vs Gold
- Location: tests\db testing\reconciliation.spec.ts:4:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Test source

```ts
  1  | import { test, expect } from '../../src/fixtures/base';
  2  | import { queryDB } from '../../utils/postgres';
  3  | 
  4  | test('Reconciliation Validation – Source vs Gold', async () => {
  5  |   const sourceCount = (await queryDB('SELECT COUNT(*) FROM bronze.orders'))[0].count;
  6  |   const goldCount = (await queryDB('SELECT COUNT(*) FROM bronze_gold.gold_kpis'))[0].count;
  7  | 
  8  |   // Compare record counts
> 9  |   expect(Number(sourceCount)).toBe(Number(goldCount));
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  10 | 
  11 |   // Compare total revenue
  12 |   const sourceRevenue = (await queryDB('SELECT SUM(amount) FROM bronze.orders WHERE status = \'Completed\''))[0].sum;
  13 |   const goldRevenue = (await queryDB('SELECT SUM(amount) FROM bronze_gold.gold_kpis'))[0].sum;
  14 | 
  15 |   expect(Number(goldRevenue)).toBeCloseTo(Number(sourceRevenue));
  16 | });
```