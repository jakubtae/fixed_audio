import { getDB } from "./getDb";

let initialized = false;

export async function initDB() {
  if (initialized) return;

  const db = await getDB();

  const sounds = db.collection("Sound");
  const soundStats = db.collection("soundStats");

  // Unique sound IDs
  await sounds.createIndex({ soundId: 1 }, { unique: true });

  // One stats document per sound per day
  await soundStats.createIndex({ soundId: 1, date: 1 }, { unique: true });

  // Speed up date range queries (Top week / Top month)
  await soundStats.createIndex({ date: 1 });

  initialized = true;

  console.log("MongoDB indexes initialized");
}
