import { usePlayerStore } from "@/store/playerStore";

type Song = {
  _id: string;
  Title: string;
  Artist: string;
  Duration: number;
  SignedSongURL: string;
  SignedCoverURL: string;
  Liked: boolean;
};

interface PlaySongButtonProps {
  index: number;
  songs: Song[];
  LocalQueueName: string;
  isActiveQueue: boolean;
}

const PlaySongButton = ({
  index,
  songs,
  LocalQueueName,
  isActiveQueue,
}: PlaySongButtonProps) => {
  const {
    queueName,
    setQueueName,
    setQueue,
    isPlaying,
    currentIndex,
    toggle,
    playAt,
    queue,
  } = usePlayerStore();

  const isThisPlaying =
    isActiveQueue && currentIndex === index && isPlaying;

  const onClick = () => {
    const needsQueueUpdate = queueName !== LocalQueueName;

    if (needsQueueUpdate) {
      setQueueName(LocalQueueName);
      setQueue(songs);
    }

    if (isThisPlaying) {
      toggle();
    } else {
      // IMPORTANT: use the correct queue source
      playAt(index, needsQueueUpdate ? songs : queue);
    }
  };

  return (
    <span className="pl-2 w-8 flex-shrink-0 relative">
      {/* index / playing indicator */}
      <span
        className={`group-hover:hidden ${
          isThisPlaying ? "text-green-500" : "text-gray-900"
        }`}
      >
        {isThisPlaying ? "p" : index + 1}
      </span>

      {/* play / pause on hover */}
      <span
        className="hidden group-hover:inline cursor-pointer"
        onClick={onClick}
      >
        {isThisPlaying ? "⏸" : "▶"}
      </span>
    </span>
  );
};

export default PlaySongButton;

