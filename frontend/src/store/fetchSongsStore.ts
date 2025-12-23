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
};

type SongStore = {
  songs: Song[];
  loading: boolean;
  error: string | null;
  fetchSongs: () => Promise<void>;
};

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  loading: false,
  error: null,

  fetchSongs: async () => {
    // 🚫 prevent refetch if already loaded
    if (get().songs.length > 0) return;

    set({ loading: true, error: null });

    try {
      const response = await api.get("/api/songs/fetchAllSongs");
      console.log(response.data);
      set({ songs: response.data, loading: false });
    } catch (err: Err) {
      set({ error: "Failed to fetch songs",loading: false });
      console.error(err);
    }
  },
}));
