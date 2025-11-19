import { pool } from "../db";

export async function updateUserTTL(id: string, data: any) {
  // Update only the database
  await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3",
    [data.name, data.email, id]
  );

  console.log("⏳ Cache NOT changed (TTL-based strategy)");
}
