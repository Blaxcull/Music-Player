import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";

export const useVolumeBar = () => {
  const audio = usePlayerStore((s) => s.audio);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const volume = usePlayerStore((s) => s.volume); // 0 → 1

  const barRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const [progress, setProgress] = useState(volume * 100);

  /* ---------- Store → UI sync ---------- */
  useEffect(() => {
    setProgress(volume * 100);
  }, [volume]);

  /* ---------- Helpers ---------- */
  const setWithClientX = (clientX: number) => {
    if (!barRef.current || !audio) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;

    audio.volume = percent;
    setVolume(percent);
    setProgress(percent * 100);
  };

  /* ---------- Events ---------- */
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setWithClientX(e.clientX);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setWithClientX(e.clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    setWithClientX(e.clientX);
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return {
    progress,
    barRef,
    onClick,
    onMouseDown,
  };
};

