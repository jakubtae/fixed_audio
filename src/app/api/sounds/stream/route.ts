import {
  incrementDailyStreams,
  incrementViews,
} from "@/lib/schemas/soundStats.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { soundId } = await req.json();

    if (!soundId) {
      return NextResponse.json({ error: "Missing soundId" }, { status: 400 });
    }

    await incrementViews(soundId);
    await incrementDailyStreams(soundId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
