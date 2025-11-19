import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "query_demo",
  password: "root",
  port: 5432,
});

export async function getUserFromDB(id: string) {
  console.log("⏳ Fetching from PostgreSQL…");

  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
}
