import { Pool } from 'pg';

export const pool = new Pool({
  user: 'bookuser',
  host: 'localhost',
  database: 'bookdb',
  password: '1234',
  port: 5432
});