import { useEffect } from "react";
import { useSongStore } from "@/store/fetchSongsStore";
import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

import PlaySongButton from "./PlaySongButton";
import LikeButton from "./LikeButton";

const DisplayAllSongs = () => {
  const { songs, fetchSongs, loading, error } = useSongStore();

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

  const isActiveQueue = queueName === "allSongs";

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const formatSongDate = (date: string | Date) => {
    const days = Math.floor(
      (Date.now() - new Date(date).getTime()) / 86400000
    );
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const formatSongDuration = (duration: number) => {
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayAll = () => {
    const wasAllSongs = queueName === "allSongs";

    setQueueName("allSongs");
    if (!wasAllSongs) setQueue(songs);

    if (currentIndex === -1) {
      playAt(0);
    } else {
      toggle();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          All Songs
        </h1>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={handlePlayAll}
          >
            {isPlaying ? (
              <Pause className="text-gray-500" fill="currentColor" />
            ) : (
              <Play className="text-gray-500" fill="currentColor" />
            )}
          </button>

          <Button
            className="bg-transparent text-gray-400"
            disabled={!queue.length}
            onClick={setShuffle}
          >
            {shuffle ? "x" : "o"}
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="px-6 py-4">
        <ul className="w-full select-none">
          {/* Table header */}
          <li className="text-gray-500 text-sm mb-2 flex items-center">
            <span className="w-8">#</span>
            <span className="flex-[3]">Title</span>
            <span className="flex-[2]">Artist</span>
            <span className="flex-[2]">Date Added</span>
            <span className="w-20 text-right">Duration</span>
          </li>
          <hr className="border-gray-200 mb-4" />

          {/* Songs */}
          {songs.map((song, index) => (
            <li
              key={song._id}
              className="group flex items-center py-2 rounded-lg hover:bg-gray-50"
            >
              <div className="w-8">
                <PlaySongButton
                  index={index}
                  songs={songs}
                  LocalQueueName="allSongs"
                  isActiveQueue={isActiveQueue}
                />
              </div>

              <span
                className={`flex-[3] ${
                  isActiveQueue && currentIndex === index
                    ? "text-green-500"
                    : "text-gray-900"
                }`}
              >
                {song.Title}
              </span>

              <span className="flex-[2] text-gray-600">
                {song.Artist}
              </span>

              <span className="flex-[2] text-gray-500">
                {formatSongDate(song.Date)}
              </span>

              <span className="w-20 text-right text-gray-500">
                {formatSongDuration(song.Duration)}
              </span>

              <LikeButton
                songId={song._id}
                isLiked={song.Liked}
                song={song}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayAllSongs;

