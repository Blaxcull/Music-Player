import { useEffect, useMemo } from "react";
import { useSongStore } from "@/store/fetchSongsStore";
import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaySongButton from "./PlaySongButton";
import LikeButton from "./LikeButton";
import { AddToPlaylist } from "@/components/playlist/AddToPlaylist";

const DisplayAllSongs = () => {
  const { songs, fetchSongs, loading, error } = useSongStore();
  const searchSong = usePlayerStore((state) => state.searchedSong);

  console.log(searchSong)
  

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
    const wasActive = isActiveQueue;

    setQueueName("allSongs");
    if (!wasActive) setQueue(songs);

    if (!wasActive || currentIndex === -1) {
      // If the queue was not active or nothing is playing, start from first song
      playAt(0);
    } else {
      // Queue is active and a song is playing/paused, toggle playback
      toggle();
    }
  };

    const songIndexMap = useMemo(() => {
  return new Map(songs.map((song, index) => [song._id, index]));
}, [songs]);



  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">All Songs</h1>


        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={handlePlayAll}
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
          <hr className="border-gray-200 mb-4" />

{songs
  .filter((song) =>
    song.Title.toLowerCase().includes(searchSong.toLowerCase()) ||
    song.Artist.toLowerCase().includes(searchSong.toLowerCase())
  )
  .map((song) => {
    const originalIndex = songIndexMap.get(song._id)!;

    return (
        <AddToPlaylist>
  <li
    key={song._id}
    className="group flex items-center py-2 h-15 rounded-lg hover:bg-gray-50"

  >
    <div className="w-8">
      <PlaySongButton
        index={originalIndex}
        songs={songs}
        LocalQueueName="allSongs"
        isActiveQueue={isActiveQueue}
      />
    </div>

    <span className="flex-[8]">
      {song.Title}
    </span>

    <span className="flex-[5] text-gray-600 pl-2">
      {song.Artist}
    </span>

    <span className="flex-[2] text-gray-500 pl-2">
      {formatSongDate(song.Date)}
    </span>

    <span className="flex-[1] text-right">
      <LikeButton
        songId={song._id}
        isLiked={song.Liked}
        song={song}
      />
    </span>

    <span className="flex-[2] pr-2 text-right text-gray-500">
      {formatSongDuration(song.Duration)}
    </span>
  </li>
  </AddToPlaylist>
    );
  })}
        </ul>
      </div>
    </div>
  );
};

export default DisplayAllSongs;

