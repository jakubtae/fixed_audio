"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AudioElement from "./AudioElement";
import { Sound } from "@/lib/schemas/sound.types";

// Derive categories directly from the Sound type
const CATEGORY_OPTIONS: Sound["category"][] = [
  "Anime & Manga",
  "Games",
  "Memes",
  "Movies",
  "Music",
  "Politics",
  "Pranks",
  "Reactions",
  "Sound Effects",
  "Sports",
  "Television",
  "Tiktok Trends",
  "Viral",
  "other",
  "Whatsapp Audios",
];

export default function AudioLayout({ cdnUrl }: { cdnUrl: string }) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [page, setPage] = useState(0); // page-based pagination
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Filter + sort state
  const [selectedType, setSelectedType] = useState<Sound["category"] | "">("");
  const [sortKey, setSortKey] = useState<"views" | "likes" | "createdAt">(
    "views"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const fetchingRef = useRef(false);

  // Fetch sounds from API
  const fetchSounds = useCallback(
    async (pageNumber: number = 0, reset = false) => {
      if (fetchingRef.current) return;

      fetchingRef.current = true;
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("limit", "12");
        params.append("page", pageNumber.toString());
        if (selectedType) params.append("type", selectedType);
        params.append("sortKey", sortKey);
        params.append("sortOrder", sortOrder);

        const res = await fetch(`/api/sounds?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch sounds");

        const data = await res.json();

        setSounds((prev) => (reset ? data.items : [...prev, ...data.items]));
        setPage(data.page);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching sounds:", error);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
        setIsInitialLoad(false);
      }
    },
    [selectedType, sortKey, sortOrder]
  );

  // Initial fetch
  useEffect(() => {
    fetchSounds(0, true);
  }, [fetchSounds]);

  // Refetch on filter/sort change
  useEffect(() => {
    setSounds([]);
    setPage(0);
    setHasMore(true);
    fetchSounds(0, true);
  }, [selectedType, sortKey, sortOrder, fetchSounds]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !fetchingRef.current) {
          fetchSounds(page);
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [hasMore, loading, page, fetchSounds]);

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
      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap gap-4 w-full md:w-2/3 mb-4">
        <select
          className="border rounded px-3 py-2"
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as Sound["category"] | "")
          }
        >
          <option value="">All Types</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={`${sortKey}-${sortOrder}`}
          onChange={(e) => {
            const [key, order] = e.target.value.split("-");
            setSortKey(key as "views" | "likes" | "createdAt");
            setSortOrder(order as "asc" | "desc");
          }}
        >
          <option value="views-desc">Most Viewed</option>
          <option value="views-asc">Least Viewed</option>
          <option value="likes-desc">Most Liked</option>
          <option value="likes-asc">Least Liked</option>
        </select>
      </div>

      {/* Audio Elements */}
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

        {/* Sentinel for infinite scroll */}
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

      {/* Bottom loading / end message */}
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
