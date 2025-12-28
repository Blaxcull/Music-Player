import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/playerStore";
import Loop from "./Loop";
import Shuffle from "./shuffle";
import {Play} from "lucide-react";
import {Pause} from "lucide-react";

export const Controls = () => {
  const toggle = usePlayerStore((state) => state.toggle);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const next = usePlayerStore((state) => state.next);
  const prev = usePlayerStore((state) => state.prev);


  const onclick = () => { toggle() };

  return (
      <>

      
<div className="flex items-center  gap-3">



<Shuffle />

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
  onClick={prev}
>

⏮</Button>
      <Button
        onClick={onclick}
        className="w-10 h-10 rounded-full bg-white text-xl flex items-center justify-center"
        variant="secondary"
      >
        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </Button>

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
    text-2xl
    hover:text-white
    text-gray-400
        "

        onClick={next}

      >⏭</Button>
      <Loop />


    </div>

    </>
  )
}
