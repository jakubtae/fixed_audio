"use client";
import { Audio } from "@/lib/list";
type AudioElementProps = Audio & {
  id: number;
  cdnUrl: string;
  fullSound?: Sound; // 👈 add
  onUnlike?: (action: OptimisticAction) => void;
  variant?: "grid" | "list";
  slimOption?: boolean;
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
import Link from "next/link";
import { playSound } from "./PlaySound";

const AudioElement = ({
  title,
  soundId,
  type,
  id,
  cdnUrl,
  onUnlike,
  fullSound,
  variant, // 👈 set default value
  slimOption,
}: AudioElementProps) => {
  const audioUrl = `${cdnUrl}/${soundId}.mp3`;

  if (!type) {
    type = "other";
  }
  const bgImage = useMemo(() => {
    return `/${type === "other" ? "Other" : type}.svg`;
  }, []); // ← empty deps = run once per mount

  // 👇 truncate title to 15 characters for slim variant
  const displayTitle =
    slimOption && title.length > 15 ? `${title.substring(0, 12)}...` : title;

  // 👇 variant-specific styles
  const containerClasses =
    variant === "grid"
      ? `flex flex-col items-center justify-between p-${
          slimOption ? "2" : "4"
        } rounded-2xl shadow bg-no-repeat bg-cover 
         hover:scale-105 transition-transform duration-200 cursor-pointer`
      : slimOption
        ? "flex items-center justify-between py-1 px-3 rounded-xl shadow-[0_0px_2px_rgba(255,255,255,0.2)] bg-no-repeat bg-cover"
        : "flex items-center justify-between py-2 px-6 rounded-3xl shadow-[0_0px_4px_rgba(255,255,255,0.2)] bg-no-repeat bg-cover";

  const idClasses = slimOption
    ? "text-xs text-white w-4"
    : "text-sm text-white w-6.25";

  const playerContainerClasses = slimOption
    ? "w-6 h-6 rounded shadow-[0_0px_2px_rgba(255,255,255,0.2)] flex-center"
    : "w-8.75 h-8.75 rounded shadow-[0_0px_4px_rgba(255,255,255,0.2)] flex-center";

  const titleClasses = slimOption
    ? "text-xs font-semibold capitalize max-w-28"
    : "text font-semibold capitalize max-w-54 text-xs sm:text-base";

  const badgeClasses = slimOption
    ? "py-0.5 px-2 text-[6px] bg-[#444444] text-white rounded-full"
    : "py-1 px-4 text-[8px] min-[500px]:text-xs bg-[#444444] text-white rounded-full";

  const downloadButtonClasses = slimOption
    ? "bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block scale-75"
    : "bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block";

  return (
    <div
      className={containerClasses}
      style={{ backgroundImage: `url('${bgImage}')` }}
      onClick={() => {
        console.log("Playing sound:", { title, soundId, type });
        playSound({ src: audioUrl, soundId, artist: type, title });
      }}
    >
      {variant === "grid" ? (
        <>
          {/* GRID LAYOUT */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div
              className={`${
                slimOption ? "w-10 h-10" : "w-14 h-14"
              } rounded flex-center`}
              style={{ background: gradientMap[type] }}
            >
              <AnimatedAudioPlayer
                src={audioUrl}
                title={title}
                artist={type}
                soundId={soundId}
                slimOption={slimOption}
              />
            </div>

            <Button
              variant="link_inherit"
              asChild
              className="py-0 font-semibold"
            >
              <Link href={`/sounds/${soundId}`}>
                <div className="flex flex-col">
                  <h3 className={titleClasses}>{displayTitle}</h3>
                </div>
              </Link>
            </Button>

            {!slimOption && (
              <Badge className="text-[8px] px-2 py-0.5">{type}</Badge>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <AudioMenu
              title={title}
              soundId={soundId}
              type={type}
              cdnUrl={cdnUrl}
              fullSound={fullSound}
              onUnlike={onUnlike}
              slimOption={slimOption}
            />
          </div>
        </>
      ) : (
        <>
          {/* LIST LAYOUT (your original) */}
          <div className="flex-center gap-2">
            <span className={idClasses}>{id}</span>

            <div
              className={playerContainerClasses}
              style={{ background: gradientMap[type] }}
            >
              <AnimatedAudioPlayer
                src={audioUrl}
                title={title}
                artist={type}
                soundId={soundId}
                slimOption={slimOption}
              />
            </div>

            <Button
              variant="link_inherit"
              asChild
              className="py-0 font-semibold"
            >
              <Link href={`/sounds/${soundId}`}>
                <div className="flex flex-col">
                  <h3 className={titleClasses}>{displayTitle}</h3>
                </div>
              </Link>
            </Button>
          </div>

          <div className="flex-center gap-2">
            {!slimOption && (
              <>
                <Badge className={badgeClasses}>{type}</Badge>

                <Button
                  variant="secondary"
                  className={downloadButtonClasses}
                  asChild
                >
                  <a
                    href={audioUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download strokeWidth={3} />
                  </a>
                </Button>
              </>
            )}

            <AudioMenu
              title={title}
              soundId={soundId}
              type={type}
              cdnUrl={cdnUrl}
              fullSound={fullSound}
              onUnlike={onUnlike}
              slimOption={slimOption}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AudioElement;
