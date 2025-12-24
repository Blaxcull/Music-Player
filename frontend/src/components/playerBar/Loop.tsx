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
      className="bg-transparent text-2xl text-gray-400 hover:text-white

      tabular-nums
      ml-2

      "
    >
      {icon}
    </Button>
  );
};

export default Loop;
