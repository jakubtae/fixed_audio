import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") ?? 12);
    const page = Number(searchParams.get("page") ?? 0);

    // Filters
    const type = searchParams.get("type"); // category filter
    const search = searchParams.get("search"); // 🔍 title search

    // Sorting
    const sortKey =
      (searchParams.get("sortKey") as "views" | "likes" | "createdAt") ||
      "createdAt";
    const sortOrder: 1 | -1 = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const client = await clientPromise;
    const db = client.db("Dev");
    const soundsCollection = db.collection("Sound");

    // Build query
    const query: any = {};

    if (type) {
      query.category = type;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i", // case-insensitive
      };
    }

    // Fetch data
    const sounds = await soundsCollection
      .find(query)
      .sort({ [sortKey]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .toArray();

    // Check if there are more items
    const totalInQuery = await soundsCollection.countDocuments(query);
    const hasMore = (page + 1) * limit < totalInQuery;

    return NextResponse.json({
      items: sounds.map((sound) => ({
        _id: sound._id.toString(),
        title: sound.title,
        soundId: sound.soundId,
        category: sound.category,
        views: sound.views,
        likes: sound.likes,
        createdAt: sound.createdAt,
        updatedAt: sound.updatedAt,
      })),
      hasMore,
      page: page + 1,
    });
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return NextResponse.json(
      { error: "Failed to fetch sounds" },
      { status: 500 }
    );
  }
}
