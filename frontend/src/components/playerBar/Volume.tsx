import { Progress } from "@/components/ui/SongProgress";
import { useVolumeBar } from "./useVolumeBar";

const Volume = () => {
  const {
    progress,
    barRef,
    onClick,
    onMouseDown,
  } = useVolumeBar();

  return (
    <div className="w-full pr-3 flex justify-end">
      <div
        ref={barRef}
        onClick={onClick}
        onMouseDown={onMouseDown}
        className="h-6 w-30 flex items-center justify-center cursor-pointer"
      >
        {/* TODO: add volume icon */}
        <div className="text-white pr-3">V</div>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default Volume;

