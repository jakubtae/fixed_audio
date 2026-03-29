import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") ?? 30);
    const page = Number(searchParams.get("page") ?? 0);

    // Filters
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const filters = searchParams.get("filters"); // today | this-week | null
    // Sorting (only for all-time)
    const sortKey =
      (searchParams.get("sortKey") as "views" | "likes" | "createdAt") ||
      "createdAt";
    const sortOrder: 1 | -1 = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const client = await clientPromise;
    const db = client.db("Dev");

    const soundsCollection = db.collection("Sound");

    // =========================
    // 🔥 TIMEFRAME (TODAY / THIS-WEEK)
    // =========================
    if (filters === "today" || filters === "this-week") {
      const statsCollection = db.collection("soundStats");
      const now = new Date();
      let dateFrom: string;

      if (filters === "today") {
        dateFrom = now.toISOString().slice(0, 10);
      } else {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        dateFrom = weekAgo.toISOString().slice(0, 10);
      }

      const pipeline: any[] = [
        {
          $match: {
            date: { $gte: dateFrom },
          },
        },
        {
          $group: {
            _id: "$soundId",
            streams: { $sum: "$streams" },
          },
        },
        {
          $sort: { streams: -1 }, // 🔥 always trending by usage
        },
        {
          $skip: page * limit,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: "Sound",
            localField: "_id",
            foreignField: "soundId",
            as: "sound",
          },
        },
        {
          $unwind: "$sound",
        },
        {
          $replaceRoot: { newRoot: "$sound" },
        },
      ];

      // Apply filters AFTER lookup
      if (type && type !== "All") {
        pipeline.push({
          $match: { category: type },
        });
      }

      if (search) {
        pipeline.push({
          $match: {
            title: { $regex: search, $options: "i" },
          },
        });
      }
      const sounds = await statsCollection.aggregate(pipeline).toArray();

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
        hasMore: sounds.length === limit,
        page: page + 1,
      });
    }

    // =========================
    // 🧱 ALL-TIME (DEFAULT)
    // =========================

    const query: any = {};
    console.log("all time");
    if (type && type !== "All") {
      query.category = type;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const sounds = await soundsCollection
      .find(query)
      .sort({ [sortKey]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .toArray();

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
      { status: 500 },
    );
  }
}
