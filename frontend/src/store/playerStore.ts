import { create } from "zustand";

type Song = {
  _id: string;
  Title: string;
  Artist: string;
  Duration: number;
  SignedSongURL: string;
  SignedCoverURL: string;
};

type LoopMode = "none" | "one" | "all";

type PlayerStore = {
  audio: HTMLAudioElement | null;

  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;

  loopMode: LoopMode;

  playAt: (index: number, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;

  setQueue: (songs: Song[]) => void;
  setLoopMode: (mode: LoopMode) => void;
  seek: (percent: number) => void;
  setVolume: (volume: number) => void;
  volume: number;
};

export const usePlayerStore = create<PlayerStore>((set, get) => {
  const audio = typeof window !== "undefined" ? new Audio() : null;

  if (audio) {
    audio.addEventListener("ended", () => {
      const { loopMode, currentIndex, queue } = get();

      if (queue.length === 0) return;

      // 🔁 LOOP ONE → handled by audio.loop
      if (loopMode === "one") return;

      // 🔁 LOOP ALL
      if (loopMode === "all") {
        const nextIndex = (currentIndex + 1) % queue.length;
        get().playAt(nextIndex);
        return;
      }

      // ❌ NO LOOP
      if (currentIndex + 1 < queue.length) {
        get().playAt(currentIndex + 1);
      } else {
        set({ isPlaying: false });
      }
    });
  }

  return {
    audio,
    queue: [],
    currentIndex: -1,
    isPlaying: false,
    loopMode: "none",

    setLoopMode: (mode) => {
      if (!audio) return;

      audio.loop = mode === "one";
      set({ loopMode: mode });
    },

    seek: (percent) => {
      if (!audio) return;
      audio.currentTime = percent * audio.duration;
    },

    setQueue: (songs) => set({ queue: songs }),

    playAt: (index, newQueue) => {
      if (!audio) return;

      const queue = newQueue ?? get().queue;
      const song = queue[index];
      if (!song) return;

      audio.src = song.SignedSongURL.split("?")[0];
      audio.play();

      set({
        queue,
        currentIndex: index,
        isPlaying: true,
      });
    },

    toggle: () => {
      if (!audio) return;

      if (audio.paused) {
        audio.play();
        set({ isPlaying: true });
      } else {
        audio.pause();
        set({ isPlaying: false });
      }
    },

    next: () => {
      const { currentIndex, queue, loopMode } = get();
      if (queue.length === 0) return;

      if (currentIndex + 1 < queue.length) {
        get().playAt(currentIndex + 1);
      } else if (loopMode === "all") {
        get().playAt(0);
      }
      // else → do nothing
    },

    prev: () => {
      const { currentIndex } = get();
      if (currentIndex > 0) {
        get().playAt(currentIndex - 1);
      }
    },

      volume: 1,
    setVolume: (volume: number) => {
      if (!audio) return;
      audio.volume = volume;
      set({ volume });
    },


  };
});

