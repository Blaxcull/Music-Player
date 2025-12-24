import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";

export const useSeekBar = () => {
  const audio = usePlayerStore((s) => s.audio);
  const seek = usePlayerStore((s) => s.seek);

  const [progress, setProgress] = useState(0);

  const barRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragProgressRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);





  /* ---------- Audio → UI sync ---------- */
  useEffect(() => {
    if (!audio) return;

    const update = () => {
      if (isDraggingRef.current) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audio]);

  /* ---------- Window blur safety ---------- */
  useEffect(() => {
    const handleBlur = () => {
      if (!isDraggingRef.current || !audio) return;

      isDraggingRef.current = false;
      seek(dragProgressRef.current / 100);
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [audio, seek]);

  /* ---------- Helpers ---------- */
  const seekWithClientX = (clientX: number) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;

    dragProgressRef.current = percent * 100;
    setProgress(dragProgressRef.current);
  };

  /* ---------- Events ---------- */
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    if (!audio) return;

    const rect = barRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    seek(percent);
    setProgress(percent * 100);
    setCurrentTime(audio.currentTime);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {

    isDraggingRef.current = true;
    seekWithClientX(e.clientX);

    if (!audio) return;
    setCurrentTime(audio.currentTime);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    seekWithClientX(e.clientX);
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
    seek(dragProgressRef.current / 100);

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return {
    progress,
    barRef,
    onClick,
    onMouseDown,
    currentTime,
    duration,
  };
};

