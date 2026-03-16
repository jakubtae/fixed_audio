"use client";
import { Audio } from "@/lib/list";
type AudioElementProps = Audio & {
  id: number;
  cdnUrl: string;
  fullSound?: Sound; // 👈 add
  onUnlike?: (action: OptimisticAction) => void;
  variant?: "default" | "slim";
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

const AudioElement = ({
  title,
  soundId,
  type,
  id,
  cdnUrl,
  onUnlike,
  fullSound,
  variant, // 👈 set default value
}: AudioElementProps) => {
  const audioUrl = `${cdnUrl}/${soundId}.mp3`;

  if (!type) {
    type = "other";
  }
  const bgImage = useMemo(() => {
    return `/${type}.svg`;
  }, []); // ← empty deps = run once per mount

  // 👇 truncate title to 15 characters for slim variant
  const displayTitle =
    variant === "slim" && title.length > 15
      ? `${title.substring(0, 12)}...`
      : title;

  // 👇 variant-specific styles
  const containerClasses =
    variant === "slim"
      ? "flex items-center justify-between py-1 px-3 rounded-xl shadow-[0_0px_2px_rgba(255,255,255,0.2)] bg-no-repeat bg-cover"
      : "flex items-center justify-between py-2 px-6 rounded-3xl shadow-[0_0px_4px_rgba(255,255,255,0.2)] bg-no-repeat bg-cover";

  const idClasses =
    variant === "slim" ? "text-xs text-white w-4" : "text-sm text-white w-6.25";

  const playerContainerClasses =
    variant === "slim"
      ? "w-6 h-6 rounded shadow-[0_0px_2px_rgba(255,255,255,0.2)] flex-center"
      : "w-8.75 h-8.75 rounded shadow-[0_0px_4px_rgba(255,255,255,0.2)] flex-center";

  const titleClasses =
    variant === "slim"
      ? "text-xs font-semibold capitalize max-w-28"
      : "text font-semibold capitalize max-w-54 text-xs sm:text-base";

  const badgeClasses =
    variant === "slim"
      ? "py-0.5 px-2 text-[6px] bg-[#444444] text-white rounded-full"
      : "py-1 px-4 text-[8px] min-[500px]:text-xs bg-[#444444] text-white rounded-full";

  const downloadButtonClasses =
    variant === "slim"
      ? "bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block scale-75"
      : "bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block";

  return (
    <div
      className={containerClasses}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
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
            variant={variant}
          />
        </div>
        <div className="flex flex-col">
          <h3 className={titleClasses}>{displayTitle}</h3>
        </div>
      </div>
      <div className="flex-center gap-2">
        {variant !== "slim" && (
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
          variant={variant}
        />
      </div>
    </div>
  );
};

export default AudioElement;
