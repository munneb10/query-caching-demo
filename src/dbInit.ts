import { pool } from "./db";

export async function initializeDatabase() {
  // 1️⃣ Create table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);

  console.log("📦 users table ready");

  // 2️⃣ Check if table has data
  const result = await pool.query(`SELECT COUNT(*) FROM users;`);
  const count = Number(result.rows[0].count);

  if (count === 0) {
    // 3️⃣ Insert sample data
    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('Taha', 'taha@example.com'),
      ('Alvi', 'alvi@example.com'),
      ('John Doe', 'john@example.com');
    `);

    console.log("🌱 Sample user data inserted");
  } else {
    console.log("👍 users table already has data");
  }
}
