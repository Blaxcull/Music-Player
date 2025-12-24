

interface PlaySongButtonProps {
  index: number;
}

import { usePlayerStore } from "@/store/playerStore";


const PlaySongButton = ({ index }: PlaySongButtonProps) => {

    const { isPlaying, currentIndex, toggle, playAt, queue} = usePlayerStore();








const onClick = () => {
  if (currentIndex === index) {
    toggle();
  } else {
    playAt(index, queue);
  }
};

const showIsPlaying = () => {
    if (currentIndex === index && isPlaying) {
        return "p";
    }
    else {
        return index+1;
    }
  };



  return (
    <span className="w-8 flex-shrink-0 relative">
      <span className={`group-hover:hidden
${
    currentIndex === index && isPlaying ? "text-green-500" : "text-gray-900"

}
${
    currentIndex === index && !isPlaying ? "text-green-500" : "text-gray-900"
}

`
      }>

      {showIsPlaying()}

      </span>


      <span className="hidden group-hover:inline"

       onClick={onClick}

      >   {currentIndex === index && isPlaying ? "⏸" : "▶"}</span>
    </span>
  );
};


export default PlaySongButton
