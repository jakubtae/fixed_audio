"use client";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AnimatedAudioPlayerProps = {
  src: string; // CDN audio URL
  title?: string;
  autoPlay?: boolean;
};

export default function AnimatedAudioPlayer({
  src,
  title,
  autoPlay = false,
}: AnimatedAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setProgress(audio.currentTime);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const progressPercent =
    duration > 0 ? Math.min((progress / duration) * 100, 100) : 0;

  return (
    <>
      <audio ref={audioRef} src={src} autoPlay={autoPlay} />

      {/* Play / Pause */}
      <button onClick={togglePlay} className="flex-center">
        <span className="text-sm">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>
    </>
  );
}
