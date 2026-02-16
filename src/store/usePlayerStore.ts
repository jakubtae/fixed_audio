import { create } from "zustand";

type Track = {
  title: string;
  artist: string;
  image?: string;
  audioUrl: string;
};

type PlayerStore = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;

  setTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 50,

  setTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  setVolume: (volume) => set({ volume }),
}));
