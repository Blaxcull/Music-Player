export const formatSongDuration = (duration: number): string => {
  const mins = Math.floor(duration / 60);
  const secs = Math.floor(duration % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

