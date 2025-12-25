
import { useEffect } from "react";
import { useSongStore } from "@/store/fetchSongsStore";
import PlaySongButton from "./PlaySongButton";
import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";






const DisplayAllSongs = () => {
    const { songs, fetchSongs, loading, error } = useSongStore();
    const setQueue = usePlayerStore((state) => state.setQueue);

    const { currentIndex } = usePlayerStore();
    const { playAt,playOrder, toggle,orderIndex, shuffle, queue, isPlaying, setShuffle} = usePlayerStore();


  useEffect(() => {
    fetchSongs().then((data) => {
      if (data) setQueue(data); // only once
    });
  }, [fetchSongs, setQueue]);



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
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">All Songs</h1>
        <div className="flex items-center gap-2">
        <button 
          className="flex items-center gap-2 px-4 py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-medium"
          onClick={() => {
              console.log(playOrder)
              
              if (currentIndex === -1){ 
              playAt(orderIndex);

              }
              else{
                  toggle();
              } 

          }}
        >
        {isPlaying ? <Pause className="text-gray-500" fill="currentColor" /> : <Play className="text-gray-500" fill="currentColor" />}
        </button>

        <Button
          className="bg-transparent text-2xl text-gray-400 hover:text-white
            tabular-nums
            ml-2
          "
          disabled={!queue.length}
          onClick={() => {
              setShuffle();

              
            

          }}
        >
        {console.log(queue.length, shuffle)}
{queue.length && shuffle ? "x" : "o"}

        </Button>
        </div>


      </div>
      
      <div className="px-6 py-4">
        <ul className="w-full select-none">
          {/* Header */}
          <li className="text-gray-500 text-sm mb-2 flex items-center">
            <span className="w-8 flex-shrink-0">#</span>
            <span className="flex-[3] min-w-[150px]">Title</span>
            <span className="flex-[2] min-w-[120px]">Artist</span>
            <span className="flex-[2] min-w-[120px]">Date Added</span>
            <span className="w-20 flex-shrink-0 text-right pr-6">Duration</span>
          </li>
          <hr className="border-gray-200 w-full mb-4" />

          {/* Songs */}
          {songs.map((song, index) => (
            <li
              key={song._id}
              className="
                group flex items-center py-2 
                text-gray-900 text-sm
                hover:bg-gray-50
                transition-colors duration-200
                rounded-lg
                
              "
            >
              <div className="w-8 flex-shrink-0">
                <PlaySongButton index={index} />
              </div>
              <span className={`flex-[3] min-w-[150px] ${currentIndex === index ? 'text-green-500' : 'text-gray-900'}`}>
                {song.Title}
              </span>
              <span className="flex-[2] min-w-[120px] text-gray-600">{song.Artist}</span>
              <span className="flex-[2] min-w-[120px] text-gray-500">{formatSongDate(song.Date)}</span>
              <span className="w-20 flex-shrink-0 text-right text-gray-500 pr-9">
                {formatSongDuration(song.Duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default DisplayAllSongs
