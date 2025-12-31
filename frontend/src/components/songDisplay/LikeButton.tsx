import { useState, useEffect } from "react";
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
  // localLike is now fully controlled by props + state
  const [localLike, setLocalLike] = useState(isLiked);

  const addLiked = useLikedSongStore((s) => s.addSong);
  const removeLiked = useLikedSongStore((s) => s.removeSong);

  // Keep localLike in sync if parent prop changes
  useEffect(() => {
    setLocalLike(isLiked);
  }, [isLiked]);

  const onClick = async () => {
    const next = !localLike;

    // Optimistic UI update
    setLocalLike(next);

    // Sync store immediately
    if (next) {
      addLiked({ ...song, Liked: true });
    } else {
      removeLiked(songId);
    }

    try {
      await api.post("/api/songs/isLikeClicked", {
        songID: songId,
        liked: next,
      });
    } catch (err) {
      // revert state if API fails
      setLocalLike(!next);

      // revert store as well
      if (next) {
        removeLiked(songId);
      } else {
        addLiked({ ...song, Liked: true });
      }
    }
  };

  return (
    <span className="w-8 flex-shrink-0 relative hidden group-hover:inline">
      <Button
        onClick={onClick}
        className={`${
          localLike ? "text-green-500" : "text-gray-400"
        }`}
      >
        {localLike ? "o" : "n"}
      </Button>
    </span>
  );
};

export default LikeButton;

