import { create } from "zustand";
import api from "@/lib/api";

type Song = {
  _id: string;
  UserID: string;
  Title: string;
  Artist: string;
  Duration: number;
  SignedSongURL: string;
  SignedCoverURL: string;
  Date: Date;
  Liked: boolean;
};

type SongStore = {
  songs: Song[];
  loading: boolean;
  error: string | null;

  fetchLikedSongs: () => Promise<Song[] | undefined>;
  addSong: (song: Song) => void;
  removeSong: (songId: string) => void;
};

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  loading: false,
  error: null,

  fetchLikedSongs: async () => {
    if (get().songs.length > 0) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/songs/fetchLikedSongs");
      set({ songs: res.data, loading: false });
      return res.data;
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch liked songs", loading: false });
    }
  },

  addSong: (song) =>
    set((state) => ({
      songs: state.songs.some((s) => s._id === song._id)
        ? state.songs
        : [...state.songs, { ...song, Liked: true }],
    })),

  removeSong: (songId) =>
    set((state) => ({
      songs: state.songs.filter((s) => s._id !== songId),
    })),

}));

