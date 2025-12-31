import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/playerStore";

const Loop = () => {
  const loopMode = usePlayerStore((s) => s.loopMode);
  const setLoopMode = usePlayerStore((s) => s.setLoopMode);

  const icon =
    loopMode === "all" ? "a" :
    loopMode === "one" ? "o" :
    "n";

  const onClick = () => {
    if (loopMode === "none") setLoopMode("one");
    else if (loopMode === "one") setLoopMode("all");
    else setLoopMode("none");
  };

 return (
<Button
  onClick={onClick}
  className="
    w-10 h-10
    flex items-center justify-center
    bg-transparent
    text-2xl
    text-gray-400 hover:text-white
    ml-2
    text-center
    hover:bg-transparent
    transparent text-gray-400 transition-none
    "
>
    {icon}
</Button>
);
};

export default Loop;
