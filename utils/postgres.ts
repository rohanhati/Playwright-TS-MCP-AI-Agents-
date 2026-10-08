import { Client } from 'pg';

export async function queryDB(sql: string) {
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'retaildb',
    password: 'admin',
    port: 5432,
  });
  await client.connect();
  const res = await client.query(sql);
  await client.end();
  return res.rows;
}