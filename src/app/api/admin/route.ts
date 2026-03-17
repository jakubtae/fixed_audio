// /api/admin/seed-sounds.ts

import { resetAndSeedSoundStats } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await resetAndSeedSoundStats();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}
