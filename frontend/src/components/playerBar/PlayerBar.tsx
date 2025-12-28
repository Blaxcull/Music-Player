import ProgressBar from "./ProgressBar";
import { Controls } from "./Controls";
import Volume from "./Volume";
import { Cover } from "./Cover";

const PlayerBar = () => {
  return (
      <div className="fixed bottom-0 left-0 w-full h-[90px] bg-black z-50 px-4">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-4">
        
        {/* LEFT — Cover */}
        <div className="flex items-center">
          <Cover />
        </div>

        {/* CENTER — Controls + Progress */}
        <div className="flex flex-col items-center justify-center gap-2 min-w-0 pr-30">
          <Controls />
          <ProgressBar />
        </div>

        {/* RIGHT — Volume */}
        <div className="flex items-center justify-end">
          <Volume />
        </div>

      </div>
    </div>
  );
};

export default PlayerBar;

