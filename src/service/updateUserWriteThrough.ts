import { pool } from "../db";
import { redis } from "../redis";

export async function updateUserWriteThrough(id: string, data: any) {
  // 1️⃣ Update DB
  await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3",
    [data.name, data.email, id]
  );

  // 2️⃣ Update cache immediately
  await redis.set(
    `user:${id}`,
    JSON.stringify({ id, ...data }),
    "EX",
    10
  );

  console.log("✍️ Cache updated (Write-through strategy)");
}
