import { Pool } from 'pg';

/**
 * PostgreSQL Pool 생성
 * process.env.* 그대로 사용 ⇒ .env 에 설정된 값이 자동 반영됩니다.
 */
console.log("db/index.ts - process.env", process.env)
export const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT),
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
console.log('▶️ Pool options:', pool.options);console.log('▶️ DB_HOST=', process.env.DB_HOST)
console.log('▶️ DB_DATABASE=', process.env.DB_DATABASE)
console.log('▶️ Pool.options=', pool.options)