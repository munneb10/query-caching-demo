# ⭐ **Query Caching Demo: PostgreSQL + Redis (3 Real-World Strategies)**

*A tiny project that explains a massive concept.*

---

## 🌟 Why This Project Exists

Every developer thinks caching is simple…
until their system starts returning **wrong data**, users complain, and logs show *“Cache HIT”* on stale values.

That happened to me once and it forced me to understand something deeper:

> **Caching is not about storing data.
> Caching is about choosing the right compromise.**

So I built this tiny demo to simulate the **3 caching strategies used by real-world systems** like Netflix, Uber, Shopify, Stripe but in a way that anyone can understand:

* PostgreSQL = source of truth
* Redis = distributed cache
* Logs = show HIT, MISS, stale, updated, expired

One project.
Three strategies.
Three completely different outcomes.

---

## 🧠 What This Project Teaches

This project demonstrates the **Cache-Aside Pattern** and the three ways teams keep their caches fresh:

### **1️⃣ Delete-on-Write (Invalidate Cache)**

* Update DB → delete Redis key
* Next read fetches fresh DB data
  ✔ safest
  ❌ more DB calls

### **2️⃣ Write-Through (Update Cache Immediately)**

* Update DB → update Redis
  ✔ always fresh
  ❌ slower writes

### **3️⃣ TTL-Based (Let Cache Expire Naturally)**

* Update DB → do nothing to Redis
  ✔ simplest
  ❌ stale until TTL expires

Each strategy lives in its own file.
You can *feel* the difference instantly when testing.

---

## 🚀 Tech Stack

* **Node.js + TypeScript**
* **PostgreSQL** (real data source)
* **Redis** (distributed cache)
* **Express.js** (simple HTTP API)
* **ioredis** (Redis client)
* **pg** (Postgres client)

---

## 📦 Installation (5 steps super simple)

### **1. Clone the repo**

```bash
git clone https://github.com/munneb10/query-caching-demo
cd query-caching-demo
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Start PostgreSQL**

Make sure you have Postgres running locally.

### **4. Start Redis**

```bash
redis-server
```

### **5. Start the project**

The DB initializer runs automatically (Make sure **query_demo** database exists in postgresql).

```bash
npm run dev
```

You’ll see:

```
📦 users table ready
🌱 Sample user data inserted
🧠 Connected to Redis
🚀 Server running on port 3000
```

If you see this → you're ready to play.

---

## 🎮 How To Play With It (The Fun Part)

This demo is hands-on.
You’ll literally *see caching decisions happen*.

### ⚡ Step 1 Warm the cache

```bash
curl -X GET http://localhost:3000/user/1
```

Logs:

```
❄️ Cache MISS
⏳ Fetching from PostgreSQL…
```

Again:

```
curl -X GET http://localhost:3000/user/1
```

Logs:

```
🔥 Cache HIT
```

---

# 🧪 TEST THE 3 STRATEGIES

---

## 🔥 **1. DELETE-ON-WRITE**

Updates DB and deletes Redis key.

### Update user:

```bash
curl -X PUT http://localhost:3000/strategy/delete/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"DeleteStrategy","email":"delete@test.com"}'
```

### Fetch again:

```bash
curl -X GET http://localhost:3000/user/1
```

Logs:

```
❄️ Cache MISS  → updated DB data
```

---

## 🔥 **2. WRITE-THROUGH**

Updates DB + Redis instantly.

### Update user:

```bash
curl -X PUT http://localhost:3000/strategy/write-through/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"WriteThrough","email":"write@test.com"}'
```

### Fetch again:

```bash
curl -X GET http://localhost:3000/user/1
```

Logs:

```
🔥 Cache HIT → NEW data (instantly)
```

---

## 🔥 **3. TTL-BASED**

Updates DB but leaves cache untouched.

### Update user:

```bash
curl -X PUT http://localhost:3000/strategy/ttl/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"TTL","email":"ttl@test.com"}'
```

### Immediate GET:

```bash
curl -X GET http://localhost:3000/user/1
```

Logs:

```
🔥 Cache HIT → OLD (stale) data
```

### Wait for TTL (60 seconds)

```bash
sleep 12
```

### Fetch again:

```bash
curl -X GET http://localhost:3000/user/1
```

Logs:

```
❄️ Cache MISS → fresh DB data
```

---

## ❤️ Final Thoughts

I built this project to deeply understand caching
not just the buzzwords, but the *tradeoffs*.

If you’re learning system design, backend engineering, or preparing for interviews, this tiny project will teach you more than hours of reading.

Because here, you don't just read about caching.
**You see it happen.**
