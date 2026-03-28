import { Header1 } from "@/components/elements/h1";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AudioElement from "@/components/audio_elements/AudioElement";

import {
  getTopSoundsAllTime,
  getTopSoundsWeek,
} from "@/lib/schemas/soundStats.model";

import RandomSound from "@/components/audio_elements/RandomSound";

export default async function Home() {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  let limit = 3;
  const ThisWeekTopSounds = await getTopSoundsWeek(limit);
  const ThisWeekTopSoundsMap = ThisWeekTopSounds.map((sound) => ({
    _id: sound._id.toString(),
    title: sound.title,
    soundId: sound.soundId,
    category: sound.category,
    views: sound.views,
    likes: sound.likes,
    createdAt: sound.createdAt,
    updatedAt: sound.updatedAt,
  }));

  const BestOfAllTimeSounds = await getTopSoundsAllTime(limit);
  const BestOfAllTimeSoundsMap = BestOfAllTimeSounds.map((sound) => ({
    _id: sound._id.toString(),
    title: sound.title,
    soundId: sound.soundId,
    category: sound.category,
    views: sound.views,
    likes: sound.likes,
    createdAt: sound.createdAt,
    updatedAt: sound.updatedAt,
  }));

  return (
    <div className="font-montserrat flex flex-col lg:grid lg:grid-cols-6 lg:grid-rows-5 gap-4 flex-1 p-2 pt-8 lg:gap-8 sm:p-10 w-full h-240 lg:h-auto">
      {/* Header section - full width on mobile, grid on desktop */}
      <div className="w-full lg:col-span-4">
        <Header1>
          <p className="text-left">No B Sounds</p>
        </Header1>
      </div>

      {/* Instagram button - full width on mobile, positioned on desktop */}
      <div className="w-full lg:col-span-2 lg:col-start-5 flex items-center justify-center ">
        <Button asChild variant="accent" className="w-full lg:w-auto">
          <Link
            href="https://www.instagram.com/nobsounds"
            target="_blank"
            className="flex justify-center items-center gap-4 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:animate-pulse focus-visible:scale-105 focus-visible:shadow-lg focus-visible:animate-pulse"
          >
            <Instagram /> Visit us on Instagram
          </Link>
        </Button>
      </div>

      {/* Content sections - stack vertically on mobile, grid on desktop */}
      <Card className="w-full lg:col-span-3 lg:row-span-2 lg:row-start-2 bg-[#202020] rounded-3xl p-4 font-semibold min-h-30 lg:min-h-0 text-[#EBF4DD]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <CardTitle className="capitalize lg:text-2xl">
            Top of This Week
          </CardTitle>
          <CardAction className="">
            <Button variant="link_inherit" asChild>
              <Link href="/search">
                View more
                <ArrowRight />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col justify-around h-full gap-4 pb-6 ">
          {ThisWeekTopSoundsMap.map((audio, i) => (
            <AudioElement
              key={audio._id}
              id={i + 1}
              title={audio.title}
              type={audio.category}
              soundId={audio.soundId}
              cdnUrl={CDNurl}
              slimOption={true} // 👈 pass slimOption as true for this section
            />
          ))}
        </CardContent>
      </Card>

      <Card className="w-full lg:col-span-3 lg:row-span-2 lg:row-start-2 bg-[#202020] rounded-3xl p-4 font-semibold min-h-30 lg:min-h-0 text-[#EBF4DD]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <CardTitle className="capitalize lg:text-2xl">
            Best of all Time
          </CardTitle>

          <CardAction className="">
            <Button variant="link_inherit" asChild>
              <Link href="/search">
                View more
                <ArrowRight />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col justify-around h-full gap-4 pb-6 ">
          {BestOfAllTimeSoundsMap.map((audio, i) => (
            <AudioElement
              key={audio._id}
              id={i + 1}
              title={audio.title}
              type={audio.category}
              soundId={audio.soundId}
              cdnUrl={CDNurl}
              slimOption={true} // 👈 pass slimOption as true for this section
            />
          ))}
        </CardContent>
      </Card>

      <RandomSound cdnUrl={CDNurl} />

      {/* <Card className="w-full lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-2 bg-[#EBF4DD] rounded-3xl p-4 text-black font-semibold min-h-50 lg:min-h-0">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>

          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
