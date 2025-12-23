import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

import { useEffect } from "react";
import { useSongStore } from "@/store/fetchSongsStore";




const DisplayAllSongs = () => {
    const { songs, fetchSongs, loading, error } = useSongStore();

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


function formatSongDate(date: string | Date): string {
  const now = Date.now(); // number
  const past = new Date(date).getTime(); // number

  const days = Math.floor((now - past) / 86400000);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const formatSongDuration = (duration: number): string => {
  const mins= Math.floor(duration / 60);
  const secs= Math.floor(duration % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};


  return (
      <div className="flex flex-col gap-6">

      

<div className=" justify-between bg-gray-100 rounded-lg p-4 ">
<div className="h-50 bg-white rounded-t-lg p-4">
<h1 className="text-black text-2xl font-bold">All Songs</h1>
</div>
<div className="h-20 text-gray-500 text-sm">
PLAY
    </div>

<ul className="w-full">
  {/* Header */}
<li className="text-gray-500 pl-3 text-sm mb-2 flex items-center">
  <span className="w-8 flex-shrink-0 ">#</span>
  <span className="flex-[3] min-w-[150px]">Title</span>
  <span className="flex-[2] min-w-[120px]">Artist</span>
      <span className="flex-[2] min-w-[120px]">Date Added</span>
  <span className="w-20 flex-shrink-0 mr-6">Duration</span>
</li>
<hr className="border-gray-200 w-full mb-5" />



  {/* Songs */}
  {songs.map((song, index) => (
<li
  key={song._id}
className="
  flex h-15 pl-3 items-center
  text-gray-900 text-sm py-2
  hover:bg-gray-300
  transition-colors duration-50
  rounded-lg
"
>
      <span className="w-8 flex-shrink-0">{index + 1}</span>
      <span className="flex-[3] min-w-[150px]">{song.Title}</span>
      <span className="flex-[2] min-w-[120px]">{song.Artist}</span>
      <span className="flex-[2] min-w-[120px]">{formatSongDate(song.Date)}</span>
      <span className="w-20 mr-6 flex-shrink-0 pl-3">{formatSongDuration(song.Duration)}</span>
    </li>
  ))}
</ul>
    </div>
    </div>
  )
}


export default DisplayAllSongs
