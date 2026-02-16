"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { PauseIcon, PlayIcon } from "lucide-react";
import AudioMenu from "../audio_elements/AudioMenu";

export const Player = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // 🔥 Load new track properly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioUrl;
    audio.currentTime = 0;
    audio.load();

    audio.play();
  }, [currentTrack]);

  // 🔥 Play / Pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
      startProgressLoop();
    } else {
      audio.pause();
      stopProgressLoop();
    }
  }, [isPlaying]);

  // 🔥 Get duration once metadata loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  // 🔥 Handle when track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTrackEnd = () => {
      // Set isPlaying to false when track ends
      if (isPlaying) {
        togglePlay(); // This will set isPlaying to false
      }
      setCurrentTime(0); // Reset progress bar
      stopProgressLoop();
    };

    audio.addEventListener("ended", onTrackEnd);

    return () => {
      audio.removeEventListener("ended", onTrackEnd);
    };
  }, [isPlaying, togglePlay]); // Add dependencies

  // 🔥 Smooth progress updater
  const startProgressLoop = () => {
    const update = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        animationRef.current = requestAnimationFrame(update);
      }
    };

    animationRef.current = requestAnimationFrame(update);
  };

  const stopProgressLoop = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  if (!currentTrack) {
    return (
      <div className="hidden">
        <audio ref={audioRef} />
      </div>
    );
  }
  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-neutral-800 flex flex-col justify-center px-6 z-50">
      <audio ref={audioRef} />

      {/* Top Row */}
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="text-sm font-semibold">
            {currentTrack?.title || "Nothing Playing"}
          </div>
          <div className="text-xs text-neutral-400">
            {currentTrack?.artist || ""}
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="text-2xl mx-6"
          disabled={!currentTrack}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="text-xs w-24 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />
        <span className="text-xs w-10">{formatTime(duration)}</span>
        <AudioMenu
          title={currentTrack.title}
          soundId={currentTrack.soundId}
          cdnUrl={currentTrack.audioUrl}
          type="other"
        />
      </div>
    </div>
  );
};
