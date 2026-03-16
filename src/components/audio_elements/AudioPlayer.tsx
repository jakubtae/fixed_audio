"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";

type AnimatedAudioPlayerProps = {
  src: string;
  title: string;
  artist?: string;
  soundId: string;
  variant?: "default" | "slim";
};

export default function AnimatedAudioPlayer({
  src,
  title,
  soundId,
  artist = "Unknown Artist",
  variant,
}: AnimatedAudioPlayerProps) {
  const { currentTrack, isPlaying, setTrack, togglePlay } = usePlayerStore();

  const isCurrentTrack = currentTrack?.audioUrl === src;

  const handleClick = async () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      setTrack({
        title,
        artist,
        audioUrl: src,
        soundId,
      });
    }

    await registerStream();
  };

  async function registerStream() {
    const today = new Date().toISOString().slice(0, 10);

    const STORAGE_KEY = "soundStreams";
    const raw = localStorage.getItem(STORAGE_KEY);

    let streams: Record<string, string> = raw ? JSON.parse(raw) : {};

    // cleanup old records
    for (const key in streams) {
      if (streams[key] < today) {
        delete streams[key];
      }
    }

    const recordKey = `${soundId}`;

    // already counted today
    if (streams[recordKey] === today) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(streams));
      return;
    }

    try {
      await fetch("/api/sounds/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ soundId }),
      });

      streams[recordKey] = today;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(streams));
    } catch (err) {
      console.error("Failed to register stream", err);
    }
  }

  return (
    <button onClick={handleClick} className="flex-center">
      <span>
        {isCurrentTrack && isPlaying ? (
          <PauseIcon size={variant === "slim" ? 16 : 22} />
        ) : (
          <PlayIcon size={variant === "slim" ? 16 : 22} />
        )}
      </span>
    </button>
  );
}
