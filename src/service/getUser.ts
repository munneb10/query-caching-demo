import { redis } from "../redis";
import { getUserFromDB } from "../db";

const TTL = 60; // seconds

export async function getUser(id: string) {
  const cacheKey = `user:${id}`;

  // 1️⃣ Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("🔥 Cache HIT");
    return JSON.parse(cached);
  }

  console.log("❄️ Cache MISS");

  // 2️⃣ Fetch from PostgreSQL
  const user = await getUserFromDB(id);

  // 3️⃣ Store in Redis with TTL
  if (user) {
    await redis.set(cacheKey, JSON.stringify(user), "EX", TTL);
  }

  return user;
}
