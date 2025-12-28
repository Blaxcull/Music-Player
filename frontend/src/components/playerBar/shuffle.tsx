import { usePlayerStore } from "@/store/playerStore";
import { Button } from "@/components/ui/button";



const Shuffle = () => {

    const shuffle = usePlayerStore((s) => s.shuffle);
    const setShuffle = usePlayerStore((s) => s.setShuffle);

    const onclick = () => {
      if (shuffle) setShuffle();
      else setShuffle();
    };

    const icon = shuffle ? "x" : "o";



  return (
      <Button
        className="
          bg-transparent
          hover:bg-transparent
          hover:cursor-pointer
          active:bg-transparent
          focus:bg-transparent
          shadow-none
          hover:shadow-none
          transition-none
          focus-visible:ring-0
          hover:text-white
          text-gray-400
          text-2xl
  
        "
        onClick={() => {
            onclick()
        }}
      >
      {icon}
      </Button>
  )
}

export default Shuffle
