import { useEffect } from "react";
import { useLikedSongStore } from "@/store/fetchLikedSongsStore";
import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaySongButton from "./PlaySongButton";
import LikeButton from "./LikeButton";

const DisplayLikedSongs = () => {
  const { songs, fetchLikedSongs, loading, error } = useLikedSongStore();

  const {
    queue,
    queueName,
    setQueue,
    setQueueName,
    currentIndex,
    playAt,
    toggle,
    isPlaying,
    shuffle,
    setShuffle,
  } = usePlayerStore();

  const isActiveQueue = queueName === "likedSongs";

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const formatSongDate = (date: string | Date) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const formatSongDuration = (duration: number) => {
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayLiked = () => {
    const wasLikedSongs = isActiveQueue;

    setQueueName("likedSongs");
    if (!wasLikedSongs) setQueue(songs);

    if (!wasLikedSongs || currentIndex === -1) {
      // Start from first song if queue wasn't active or nothing was playing
      playAt(0);
    } else {
      // Toggle pause/play if queue is active
      toggle();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">Liked Songs</h1>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-medium"
            onClick={handlePlayLiked}
          >
            {isActiveQueue && isPlaying ? (
              <Pause className="text-gray-500" fill="currentColor" />
            ) : (
              <Play className="text-gray-500" fill="currentColor" />
            )}
          </button>

          <Button
            className="bg-transparent text-2xl text-gray-400 tabular-nums ml-2"
            disabled={!queue.length}
            onClick={setShuffle}
          >
            {shuffle ? "x" : "o"}
          </Button>
        </div>
      </div>

      <div className="px-6 py-4">
        <ul className="w-full select-none">
          <li className="text-gray-500 text-sm mb-2 flex items-center">
            <span className="w-8 pl-2">#</span>
            <span className="flex-[8]">Title</span>
            <span className="flex-[5] ">Artist</span>
            <span className="flex-[2] ">Date Added</span>
            <span className="flex-[1] "></span>

            <span className="w-20 flex-[2] text-right">Duration</span>
          </li>
          <hr className="border-gray-200 w-full mb-4" />

          {songs.map((song, index) => (
            <li
              key={song._id}
              className=" h-15 group flex items-center py-2 text-gray-900 text-sm hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="w-8 flex-shrink-0">
                <PlaySongButton
                  index={index}
                  songs={songs}
                  LocalQueueName="likedSongs"
                  isActiveQueue={isActiveQueue}
                />
              </div>

              <span
                className={`flex-[8] ${
                  isActiveQueue && currentIndex === index
                    ? "text-green-500"
                    : "text-gray-900"
                }`}
              >
                {song.Title}
              </span>

              <span className="flex-[5] text-gray-600 pl-2">{song.Artist}</span>
              <span className="flex-[2] text-gray-500 pl-2">
                {formatSongDate(song.Date)}
              </span>
              <span className="flex-[1] text-right">
              <LikeButton songId={song._id} isLiked={song.Liked} song={song} />
              </span>
              <span className="flex-[2] pr-2 text-right text-gray-500">
                {formatSongDuration(song.Duration)}
              </span>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayLikedSongs;

