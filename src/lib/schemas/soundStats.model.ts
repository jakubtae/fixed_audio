import { getDB } from "../getDb";
import { SoundStat } from "./soundStats.types";

const COLLECTION_NAME = "soundStats";

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

export async function getSoundStatsCollection() {
  const db = await getDB();
  return db.collection<SoundStat>(COLLECTION_NAME);
}

export async function incrementDailyStreams(soundId: string) {
  const collection = await getSoundStatsCollection();

  const today = getTodayString();
  const now = new Date();

  await collection.updateOne(
    { soundId, date: today },
    {
      $inc: { streams: 1 },
      $set: { updatedAt: now },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );
}
export async function incrementViews(soundId: string) {
  const db = await getDB();
  return db.collection("Sound").updateOne({ soundId }, { $inc: { views: 1 } });
}

export async function getTopSoundsWeek(limit: number) {
  const db = await getDB();
  const collection = db.collection("soundStats");

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);

  return collection
    .aggregate([
      {
        $match: {
          date: { $gte: weekAgoStr },
        },
      },
      {
        $group: {
          _id: "$soundId",
          streams: { $sum: "$streams" },
        },
      },
      {
        $sort: { streams: -1 },
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
    ])
    .toArray();
}
