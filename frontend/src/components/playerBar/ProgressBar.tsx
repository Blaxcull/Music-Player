import { Progress } from "@/components/ui/SongProgress";
import { useSeekBar } from "./useSeekBar";
import { formatSongDuration } from "./useTime";

const ProgressBar = () => {

  const { progress, barRef, onClick, onMouseDown, currentTime, duration } = useSeekBar();

  return (
    <div className="relative w-full h-full">
      {/* Play / Pause */}

      {/* Progress */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] flex items-center px-4">
        <span className="text-sm tabular-nums text-gray-300">
          {currentTime
            ? formatSongDuration(currentTime)
            : "0:00"}
        </span>

        <Progress
          ref={barRef}
          value={progress}
          className="mx-4 flex-1 cursor-pointer"
          onClick={onClick}
          onMouseDown={onMouseDown}
        />

        <span className="text-sm tabular-nums text-gray-300">
          {duration
            ? formatSongDuration(duration)
            : "0:00"}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;

