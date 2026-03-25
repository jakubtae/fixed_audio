"use client";

import { usePlayerStore } from "@/store/usePlayerStore";

export async function playSound({
  src,
  title,
  soundId,
  artist = "Unknown Artist",
}: {
  src: string;
  title: string;
  soundId: string;
  artist?: string;
}) {
  const { currentTrack, isPlaying, setTrack, togglePlay } =
    usePlayerStore.getState();

  const isCurrentTrack = currentTrack?.audioUrl === src;

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

  await registerStream(soundId);
}

async function registerStream(soundId: string) {
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
