// app/api/sounds/random/route.ts
import { NextResponse } from "next/server";
import { getDB } from "@/lib/getDb";

export async function GET() {
  const db = await getDB();
  const [doc] = await db
    .collection("Sound")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  return NextResponse.json(doc || null);
}
