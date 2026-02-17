"use client";
import { Audio } from "@/lib/list";
type AudioElementProps = Audio & {
  id: number;
  cdnUrl: string;
  fullSound?: Sound; // 👈 add
  onUnlike?: (action: OptimisticAction) => void;
};

import { Button } from "../ui/button";
import { Download } from "lucide-react";

import { useMemo } from "react";
import { Badge } from "../ui/badge";

import AnimatedAudioPlayer from "./AudioPlayer";
import { gradientMap } from "@/lib/typeColors";

import AudioMenu from "./AudioMenu";
import { Sound } from "@/lib/schemas/sound.types";
import { OptimisticAction } from "./AudioLikedLayout";

// const gradientMap: Record<Audio["type"], string> = {
//   game: "linear-gradient(to bottom, #b91c1c, #000000)", // red → black
//   meme: "linear-gradient(to bottom, #facc15, #f97316)", // yellow → orange
//   movies: "linear-gradient(to bottom, #2563eb, #7c3aed)", // blue → purple
//   music: "linear-gradient(to bottom, #22c55e, #16a34a)", // green → darker green
//   other: "linear-gradient(to bottom, #e5e7eb, #9ca3af)", // gray → white
// };

const AudioElement = ({
  title,
  soundId,
  type,
  id,
  cdnUrl,
  onUnlike,
  fullSound,
}: AudioElementProps) => {
  const audioUrl = `${cdnUrl}/${soundId}.mp3`;

  if (!type) {
    type = "other";
  }
  const bgImage = useMemo(() => {
    return `/${type}.svg`;
  }, []); // ← empty deps = run once per mount

  return (
    <div
      className="flex items-center justify-between py-2 px-6 rounded-3xl
                 shadow-[0_0px_4px_rgba(255,255,255,0.2)]
                 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="flex-center gap-2">
        <span className="text-sm text-white w-6.25">{id}</span>
        <div
          className="w-8.75 h-8.75 rounded
             shadow-[0_0px_4px_rgba(255,255,255,0.2)] flex-center"
          style={{ background: gradientMap[type] }}
        >
          <AnimatedAudioPlayer
            src={audioUrl}
            title={title}
            artist={type}
            soundId={soundId}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text font-semibold capitalize max-w-54 text-xs sm:text-base">
            {title}
          </h3>
          {/* <span className="text-xs font-semibold text-[#9F9F9F]">Autor</span> */}
        </div>
      </div>
      <div className="flex-center gap-2">
        <Badge className="py-1 px-4 text-[8px] min-[500px]:text-xs  bg-[#444444] text-white rounded-full">
          {type}
        </Badge>

        <Button
          variant="secondary"
          className="bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block"
          asChild
        >
          <a href={audioUrl} download target="_blank" rel="noopener noreferrer">
            {" "}
            <Download strokeWidth={3} />
          </a>
        </Button>
        <AudioMenu
          title={title}
          soundId={soundId}
          type={type}
          cdnUrl={cdnUrl}
          fullSound={fullSound}
          onUnlike={onUnlike}
        />
      </div>
    </div>
  );
};

export default AudioElement;
