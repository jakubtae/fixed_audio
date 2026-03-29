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

import { LayoutGrid, List, Search } from "lucide-react";
import { Button } from "../ui/button";

// Categories derived from Sound type
const CATEGORY_OPTIONS: (Sound["category"] | "All")[] = [
  "All",
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

export default function AudioLayout({
  cdnUrl,
  filters,
}: {
  cdnUrl: string;
  filters?: string;
}) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [layout, setLayout] = useState<"list" | "grid">(
    localStorage.getItem("audio-layout") === "grid" ? "grid" : "list",
  );
  // Filters / sorting
  const [selectedType, setSelectedType] = useState<
    Sound["category"] | "" | "All"
  >("All");
  const [sortKey, setSortKey] = useState<"views" | "likes" | "createdAt">(
    "views",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const fetchingRef = useRef(false);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  // Fetch sounds
  const fetchSounds = useCallback(
    async (pageNumber = 0, reset = false) => {
      if (fetchingRef.current) return;

      fetchingRef.current = true;
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("limit", "30");
        params.append("page", pageNumber.toString());
        if (selectedType) params.append("type", selectedType);
        if (debouncedSearch) params.append("search", debouncedSearch);
        params.append("sortKey", sortKey);
        params.append("sortOrder", sortOrder);

        const res = await fetch(`/api/sounds?${params.toString()}`);
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
    [selectedType, sortKey, sortOrder, debouncedSearch],
  );

  const handleLayoutToggle = () => {
    setLayout((prev) => (prev === "list" ? "grid" : "list"));
    localStorage.setItem("audio-layout", layout === "list" ? "grid" : "list");
  };
  // Initial fetch
  useEffect(() => {
    fetchSounds(0, true);
  }, [fetchSounds]);

  // Refetch on filter / sort / search change
  useEffect(() => {
    setSounds([]);
    setPage(0);
    setHasMore(true);
    fetchSounds(0, true);
  }, [selectedType, sortKey, sortOrder, debouncedSearch, fetchSounds]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetchingRef.current) {
          fetchSounds(page);
        }
      },
      { rootMargin: "100px", threshold: 0.1 },
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, page, fetchSounds]);
  useEffect(() => {
    const saved = localStorage.getItem("audio-layout");
    if (saved) setLayout(saved as "list" | "grid");
  }, []);

  useEffect(() => {
    localStorage.setItem("audio-layout", layout);
  }, [layout]);
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

  return (
    <div className="w-full flex-center flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 w-full md:w-7/8 mb-4 sticky top-0 bg-[#202020]  z-10 py-4">
        <Search className="absolute ml-4 mt-3" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here ..."
          className="w-full md:flex-1 rounded-md border-2 border-gray-300 px-3 pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
        <Button
          onClick={() => handleLayoutToggle()}
          className="border-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition"
        >
          {layout === "list" ? <LayoutGrid size={16} /> : <List size={16} />}
        </Button>
      </div>

      {/* Sounds */}
      <div
        className={`w-full md:w-7/8 ${
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            : "flex flex-col gap-2"
        }`}
      >
        {sounds.map((audio, i) => (
          <AudioElement
            key={audio._id}
            id={i + 1}
            title={audio.title}
            type={audio.category}
            soundId={audio.soundId}
            cdnUrl={cdnUrl}
            variant={layout} // "grid" | "list"
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
