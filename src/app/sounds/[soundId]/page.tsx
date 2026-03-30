import AudioElement from "@/components/audio_elements/AudioElement";
import AnimatedAudioPlayer from "@/components/audio_elements/AudioPlayer";
import { clientPromise } from "@/lib/db";
import { SoundModel } from "@/lib/schemas/sound.model";
import { Sound } from "@/lib/schemas/sound.types";
import { gradientMap } from "@/lib/typeColors";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ soundId: string }>;
}) {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  const soundId = (await params).soundId;
  const client = await clientPromise;
  const db = client.db("Dev");
  const soundsCollection = db.collection<Sound>("Sound");

  const sound = await soundsCollection.findOne({ soundId: soundId });
  const recommendedSounds = await new SoundModel(soundsCollection).findRandom();
  if (!sound) notFound();
  const bgImage = `/${sound.category}.svg`;

  return (
    <div className="flex flex-col flex-center py-10 ">
      <div
        className="flex items-center justify-between gap-4 py-2 px-6 rounded-3xl
                 shadow-[0_0px_4px_rgba(255,255,255,0.2)]
                 bg-no-repeat bg-cover "
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div
          className="w-8.75 h-8.75 rounded
                     shadow-[0_0px_4px_rgba(255,255,255,0.2)] flex-center"
          style={{ background: gradientMap[sound.category] }}
        >
          <AnimatedAudioPlayer
            src={CDNurl + "/" + sound.soundId + ".mp3"}
            title={sound.title}
            soundId={sound.soundId}
          />
        </div>
        <h1 className="text-3xl md:text-6xl font-bold">{sound.title}</h1>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recommended Sounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recommendedSounds?.map((audio, i) => (
            // <div
            //   key={recSound._id}
            //   className="flex items-center gap-4 p-4 rounded-lg
            //               shadow-[0_0px_4px_rgba(255,255,255,0.2)]"
            //   style={{ background: gradientMap[recSound.category] }}
            // >
            //   <AudioElement
            //     src={CDNurl + "/" + recSound.soundId + ".mp3"}
            //     title={recSound.title}
            //     soundId={recSound.soundId}
            //   />
            //   <span className="text-lg font-medium">{recSound.title}</span>
            // </div>
            <AudioElement
              key={audio._id}
              id={i + 1}
              title={audio.title}
              type={audio.category}
              soundId={audio.soundId}
              cdnUrl={CDNurl}
              variant={"grid"} // "grid" | "list"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
