"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AudioElement from "./AudioElement";
import { Sound } from "@/lib/schemas/sound.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/auth-client";
import Link from "next/link";
import { Button } from "../ui/button";

// Categories derived from Sound type
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

export type OptimisticAction =
  | { type: "remove"; sound: Sound }
  | { type: "restore"; sound: Sound };

export default function AudioLikedLayout({
  cdnUrl,
  liked = false,
}: {
  cdnUrl: string;
  liked?: boolean;
}) {
  const { data: session } = authClient.useSession();
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Filters / sorting
  const [selectedType, setSelectedType] = useState<Sound["category"] | "">("");
  const [sortKey, setSortKey] = useState<"views" | "likes" | "createdAt">(
    "views",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const fetchingRef = useRef(false);

  const handleOptimisticUpdate = useCallback((action: OptimisticAction) => {
    setSounds((prev) => {
      if (action.type === "remove") {
        return prev.filter((s) => s.soundId !== action.sound.soundId);
      }

      if (action.type === "restore") {
        return [action.sound, ...prev];
      }

      return prev;
    });
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchLikedSounds = useCallback(
    async (pageNumber = 0, reset = false) => {
      if (fetchingRef.current) return;

      const session = await authClient.getSession();
      const likedSongs = session.data?.user?.liked || [];

      // 🚨 If no liked songs → immediately return
      if (likedSongs.length === 0) {
        setSounds([]);
        setHasMore(false);
        setLoading(false);
        setIsInitialLoad(false);
        return;
      }

      fetchingRef.current = true;
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("limit", "12");
        params.append("page", pageNumber.toString());

        if (selectedType) params.append("type", selectedType);
        if (debouncedSearch) params.append("search", debouncedSearch);

        params.append("sortKey", sortKey);
        params.append("sortOrder", sortOrder);

        // 🔥 Send liked IDs
        params.append("liked", likedSongs.join(","));

        const res = await fetch(`/api/sounds/liked?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch sounds");

        const data = await res.json();

        setSounds((prev) => (reset ? data.items : [...prev, ...data.items]));
        setPage(data.page);
        setHasMore(data.hasMore);
      } catch (err) {
        console.error("Error fetching sounds:", err);
      } finally {
        fetchingRef.current = false;
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [selectedType, sortKey, sortOrder, debouncedSearch, session],
  );

  // Initial fetch
  useEffect(() => {
    fetchLikedSounds(0, true);
  }, [liked, fetchLikedSounds]);

  // Refetch on filter / sort / search change
  useEffect(() => {
    setSounds([]);
    setPage(0);
    setHasMore(true);
    fetchLikedSounds(0, true);
  }, [selectedType, sortKey, sortOrder, debouncedSearch, fetchLikedSounds]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetchingRef.current) {
          fetchLikedSounds(page);
        }
      },
      { rootMargin: "100px", threshold: 0.1 },
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, page, fetchLikedSounds]);

  if (isInitialLoad) {
    return (
      <div className="w-full max-w-6xl flex-center flex-col gap-6">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }
  console.log("Liked:", liked, "Session:", session);
  if (liked && !session) {
    return (
      <div className="w-full flex flex-col items-center">
        <Button variant="link_inherit" asChild>
          <Link href="/profile">
            <p className="text-gray-500 text-sm">
              Please log in to view your liked songs.
            </p>
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full max-w-7xl flex-center flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 w-full md:w-5/6 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        ></input>

        <Select
          value={selectedType}
          onValueChange={(v) => setSelectedType(v as Sound["category"] | "")}
        >
          <SelectTrigger className="border-2">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${sortKey}-${sortOrder}`}
          onValueChange={(value) => {
            const [key, order] = value.split("-");
            setSortKey(key as typeof sortKey);
            setSortOrder(order as typeof sortOrder);
          }}
        >
          <SelectTrigger className="border-2">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="views-desc">Most Viewed</SelectItem>
            <SelectItem value="views-asc">Least Viewed</SelectItem>
            <SelectItem value="likes-desc">Most Liked</SelectItem>
            <SelectItem value="likes-asc">Least Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sounds */}
      <div className="flex flex-col gap-2 w-full lg:w-5/6">
        {sounds.map((audio, i) => (
          <AudioElement
            key={i}
            id={i + 1}
            title={audio.title}
            type={audio.category}
            soundId={audio.soundId}
            cdnUrl={cdnUrl}
            fullSound={audio} // 👈 pass full object
            onUnlike={handleOptimisticUpdate}
          />
        ))}

        {hasMore && (
          <div ref={sentinelRef} className="h-10 flex-center">
            {loading && (
              <span className="text-gray-500 text-sm">
                Loading more sounds...
              </span>
            )}
          </div>
        )}
      </div>

      {!hasMore && sounds.length > 0 && (
        <p className="text-gray-500 text-sm py-4">You've reached the end.</p>
      )}
    </div>
  );
}
