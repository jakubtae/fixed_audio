import { getDB } from "../lib/getDb";

export async function resetAndSeedSoundStats() {
  const db = await getDB();

  const soundsCollection = db.collection("Sound");
  const statsCollection = db.collection("soundStats");

  // 1. Reset views in Sound
  await soundsCollection.updateMany({}, { $set: { views: 0 } });

  // 2. Clear existing stats
  await statsCollection.deleteMany({});

  const sounds = await soundsCollection.find({}).toArray();

  const today = new Date();
  const daysBack = 21; // 3 weeks

  const statsToInsert: any[] = [];

  for (const sound of sounds) {
    const rand = Math.random();

    let totalViews;
    if (rand < 0.6)
      totalViews = Math.floor(Math.random() * 20); // dead
    else if (rand < 0.9)
      totalViews = Math.floor(Math.random() * 200); // mid
    else totalViews = Math.floor(Math.random() * 1000); // viral

    if (totalViews === 0) continue;

    let remaining = totalViews;
    const dailyMap: Record<string, number> = {};

    // distribute across days
    while (remaining > 0) {
      // bias toward recent days (more realistic)
      const weight = Math.random() ** 2;
      const randomDaysAgo = Math.floor(weight * daysBack);

      const date = new Date();
      date.setDate(today.getDate() - randomDaysAgo);
      const dateStr = date.toISOString().slice(0, 10);

      const chunk = Math.min(remaining, Math.floor(Math.random() * 50) + 1);

      dailyMap[dateStr] = (dailyMap[dateStr] || 0) + chunk;
      remaining -= chunk;
    }

    // push aggregated daily stats
    for (const [date, streams] of Object.entries(dailyMap)) {
      statsToInsert.push({
        soundId: sound.soundId,
        date,
        streams,
      });
    }

    // 3. Update total views in Sound (keeps consistency)
    await soundsCollection.updateOne(
      { soundId: sound.soundId },
      { $set: { views: totalViews } },
    );
    console.log(`Seeded ${totalViews} views for soundId ${sound.soundId}`);
  }

  // 4. Bulk insert stats
  if (statsToInsert.length > 0) {
    await statsCollection.insertMany(statsToInsert);
  }

  console.log(`Done. Seeded ${statsToInsert.length} soundStats documents.`);
}
