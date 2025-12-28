import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useLikedSongStore } from "@/store/fetchLikedSongsStore";

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

interface LikeButtonProps {
  isLiked: boolean;
  songId: string;
  song: Song;
}

const LikeButton = ({ isLiked, songId, song }: LikeButtonProps) => {
  const [localLike, setLocalLike] = useState<boolean | null>(null);

  const addLiked = useLikedSongStore((s) => s.addSong);
  const removeLiked = useLikedSongStore((s) => s.removeSong);

  const showIsLiked = localLike ?? isLiked;

  const onClick = async () => {
    const next = !showIsLiked;

    // ✅ instant UI update
    setLocalLike(next);

    // ✅ instant store sync
    if (next) {
      addLiked({ ...song, Liked: true });
    } else {
      removeLiked(songId);
    }

    try {
      await api.post("/api/songs/isLikedClicked", {
        songID: songId,
        liked: next,
      });
    } catch {
      // ⛑ rollback if backend fails
      setLocalLike(!next);
    }
  };

  return (
    <span className="w-8 flex-shrink-0 relative hidden group-hover:inline">
      <Button
        onClick={onClick}
        className={`bg-transparent ${
          showIsLiked ? "text-green-500" : "text-gray-400"
        }`}
      >
        {showIsLiked ? "o" : "n"}
      </Button>
    </span>
  );
};

export default LikeButton;

