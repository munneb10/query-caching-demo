import express from "express";
import { initializeDatabase } from "./dbInit";

import { getUser } from "./service/getUser";
import { updateUserDeleteCache } from "./service/updateUserDelete";
import { updateUserWriteThrough } from "./service/updateUserWriteThrough";
import { updateUserTTL } from "./service/updateUserTTL";

const app = express();
app.use(express.json());

async function start() {
  // Run DB setup
  await initializeDatabase();

  // Routes
  app.get("/user/:id", async (req, res) => {
    const user = await getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });

  app.put("/strategy/delete/:id", async (req, res) => {
    await updateUserDeleteCache(req.params.id, req.body);
    res.json({ status: "DB updated + Cache deleted" });
  });

  app.put("/strategy/write-through/:id", async (req, res) => {
    await updateUserWriteThrough(req.params.id, req.body);
    res.json({ status: "DB updated + Cache updated" });
  });

  app.put("/strategy/ttl/:id", async (req, res) => {
    await updateUserTTL(req.params.id, req.body);
    res.json({ status: "DB updated (cache stays until TTL)" });
  });

  app.listen(3000, () => console.log("🚀 Server running on port 3000"));
}

start();
