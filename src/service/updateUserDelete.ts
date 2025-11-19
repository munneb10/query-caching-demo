import { pool } from "../db";
import { redis } from "../redis";

export async function updateUserDeleteCache(id: string, data: any) {
  // 1️⃣ Update database
  await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3",
    [data.name, data.email, id]
  );

  // 2️⃣ Delete the Redis cache key
  await redis.del(`user:${id}`);

  console.log("🗑️ Cache deleted (Delete-on-write strategy)");
}
