"use client";

import { useEffect } from "react";
import { playSound } from "./PlaySound";
import { Sound } from "@/lib/schemas/sound.types";

export default function AutoPlayRandom({
  sound,
  cdnUrl,
}: {
  sound: Sound;
  cdnUrl: string;
}) {
  useEffect(() => {
    if (!sound) return;

    playSound({
      src: `${cdnUrl}/${sound.soundId}.mp3`,
      title: sound.title,
      soundId: sound.soundId,
      artist: sound.category,
    });
  }, [sound]);

  return null; // 👈 no UI
}
