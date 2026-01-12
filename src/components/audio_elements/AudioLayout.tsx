"use client";

import { useEffect, useState, useCallback } from "react";
import AudioElement from "./AudioElement";
import { Sound } from "@/lib/schemas/sound.types";

export default function AudioLayout({ cdnUrl }: { cdnUrl: string }) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchSounds = useCallback(async (cursor: string | null = null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "12"); // Match server default
      if (cursor) {
        params.append("cursor", cursor);
      }

      const res = await fetch(`/api/sounds?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log("Fetched data:", data);

      setSounds((prev) => {
        // Avoid duplicates by checking if sound already exists
        console.log(prev);
        const newSounds = data.items.filter(
          (newSound: Sound) =>
            !prev.some((existing) => existing._id === newSound._id)
        );
        return [...prev, ...newSounds];
      });

      setNextCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error("Error fetching sounds:", error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchSounds(null); // Initial fetch
  }, [fetchSounds]);

  const loadMore = () => {
    if (!hasMore || loading || !nextCursor) return;
    fetchSounds(nextCursor);
  };

  if (isInitialLoad) {
    return (
      <div className="w-full max-w-6xl flex-center flex-col gap-6">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20  bg-gray-200 animate-pulse rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex-center flex-col gap-6">
      <div className="flex flex-col gap-2 w-full md:w-2/3">
        {sounds.map((audio, i) => (
          <AudioElement
            key={audio._id} // Use actual sound ID instead of index
            title={audio.title}
            soundId={audio.soundId}
            type={audio.type as "music" | "game" | "meme" | "movies" | "other"}
            id={i + 1}
            cdnUrl={cdnUrl}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mx-auto px-6 py-3 bg-black text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}

      {!hasMore && sounds.length > 0 && (
        <p className="text-gray-500 text-sm">No more sounds to load</p>
      )}
    </div>
  );
}
