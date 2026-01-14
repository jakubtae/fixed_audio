import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";

interface DataType {
  userId: string;
  soundId: string;
}

interface User {
  _id: ObjectId;
  liked?: string[];
}

export async function POST(req: Request) {
  try {
    const data: DataType = await req.json();
    const { userId, soundId } = data;

    const client = await clientPromise;
    const db = client.db("Dev");
    const users = db.collection<User>("user");

    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const liked: string[] = user.liked ?? [];
    const isFavorited = liked.includes(soundId);

    if (isFavorited) {
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { liked: soundId } }
      );

      return NextResponse.json({
        success: true,
        action: "removed",
      });
    } else {
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { liked: soundId } }
      );

      return NextResponse.json({
        success: true,
        action: "added",
      });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
