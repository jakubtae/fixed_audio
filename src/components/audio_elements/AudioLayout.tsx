"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AudioElement from "./AudioElement";
import { Sound } from "@/lib/schemas/sound.types";

export default function AudioLayout({ cdnUrl }: { cdnUrl: string }) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Create a ref for the sentinel element
  const sentinelRef = useRef<HTMLDivElement>(null);
  // Keep track of previous fetch to avoid duplicate calls
  const fetchingRef = useRef(false);

  const fetchSounds = useCallback(async (cursor: string | null = null) => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) return;

    fetchingRef.current = true;
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
      fetchingRef.current = false;
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchSounds(null); // Initial fetch
  }, [fetchSounds]);

  // Intersection Observer setup
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && nextCursor && !fetchingRef.current) {
          fetchSounds(nextCursor);
        }
      },
      {
        root: null, // Use viewport
        rootMargin: "100px", // Load when sentinel is 100px from viewport
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, loading, nextCursor, fetchSounds]);

  if (isInitialLoad) {
    return (
      <div className="w-full max-w-6xl flex-center flex-col gap-6">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 animate-pulse rounded"
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
            key={audio._id}
            title={audio.title}
            soundId={audio.soundId}
            type={audio.category}
            id={i + 1}
            cdnUrl={cdnUrl}
          />
        ))}

        {/* Sentinel element for infinite scroll */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="h-10 flex items-center justify-center"
          >
            {loading && (
              <div className="text-gray-500 text-sm">
                Loading more sounds...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loading indicator at bottom */}
      {loading && !isInitialLoad && (
        <div className="text-gray-500 text-sm py-4">Loading more sounds...</div>
      )}

      {!hasMore && sounds.length > 0 && (
        <p className="text-gray-500 text-sm py-4">
          You've reached the end! No more sounds to load.
        </p>
      )}
    </div>
  );
}
