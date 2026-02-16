"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";

type AnimatedAudioPlayerProps = {
  src: string;
  title: string;
  artist?: string;
  soundId: string;
};

export default function AnimatedAudioPlayer({
  src,
  title,
  soundId,
  artist = "Unknown Artist",
}: AnimatedAudioPlayerProps) {
  const { currentTrack, isPlaying, setTrack, togglePlay } = usePlayerStore();

  const isCurrentTrack = currentTrack?.audioUrl === src;

  const handleClick = () => {
    // If this track is already selected → just toggle
    if (isCurrentTrack) {
      togglePlay();
      return;
    }

    // Otherwise set new track globally
    setTrack({
      title,
      artist,
      audioUrl: src,
      soundId,
    });
  };

  return (
    <button onClick={handleClick} className="flex-center">
      <span className="text-sm">
        {isCurrentTrack && isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
    </button>
  );
}
