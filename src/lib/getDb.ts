import { clientPromise } from "./db";

const DB_NAME = "Dev";

export async function getDB() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}
