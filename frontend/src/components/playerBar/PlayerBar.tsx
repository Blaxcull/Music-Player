import ProgressBar from "./ProgressBar";
import { Controls } from "./Controls";
import Volume from "./Volume";

const PlayerBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black z-50 px-6 py-[13px]">

      {/* Top row */}
      <div className="grid grid-cols-3 items-center w-full">
        
        {/* Left spacer (empty but same width as volume) */}
        <div />

        {/* Controls — TRUE center */}
        <div className="flex justify-center">
          <Controls />
        </div>

        {/* Volume — right */}
        <div className="flex justify-end">
          <Volume />
        </div>

      </div>

      {/* Bottom row */}
      <div className="mt-2 flex justify-center w-full">
        <ProgressBar />
      </div>

    </div>
  );
};

export default PlayerBar;

