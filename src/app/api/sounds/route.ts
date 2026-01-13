import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit") ?? 12);
  const cursor = searchParams.get("cursor"); // last _id from previous page
  console.log("Received cursor:", cursor);

  try {
    const client = await clientPromise;
    const db = client.db("Dev");
    const soundsCollection = db.collection("Sound");

    const query: any = {};

    if (cursor) {
      query._id = { $lt: new ObjectId(cursor) };
    }

    const sounds = await soundsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit + 1) // fetch one extra
      .toArray();

    const hasMore = sounds.length > limit;
    const items = hasMore ? sounds.slice(0, limit) : sounds;

    return NextResponse.json({
      items: items.map((sound) => ({
        _id: sound._id.toString(),
        title: sound.title,
        soundId: sound.soundId,
        createdAt: sound.createdAt,
        updatedAt: sound.updatedAt,
        category: sound.category,
      })),
      hasMore,
      nextCursor: hasMore ? items[items.length - 1]._id.toString() : null,
    });
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return NextResponse.json(
      { error: "Failed to fetch sounds" },
      { status: 500 }
    );
  }
}
