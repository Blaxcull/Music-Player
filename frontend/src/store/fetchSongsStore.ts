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
  Liked: boolean
};

type SongStore = {
  songs: Song[];
  loading: boolean;
  error: string | null;
  fetchSongs: () => Promise<Song[] | undefined>;
};

export const useSongStore = create<SongStore>((set) => ({
  songs: [],
  loading: false,
  error: null,

  fetchSongs: async (): Promise<Song[] | undefined> =>{  // 🚫 prevent refetch if already loaded

    set({ loading: true, error: null });

    try {
        console.log("fetching songs")
      const response = await api.get("backend/api/songs/fetchAllSongs");
      console.log("fetching songs")
      console.log(response.data);
      set({ songs: response.data, loading: false });
      console.log(response.data);
      return response.data;

    } catch (err: unknown) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        }
      console.error(err);
    }
  },
}));
