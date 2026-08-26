"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { MusicNoteIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type MusicToggleHandle = {
  play: () => Promise<void>;
};

type MusicToggleProps = {
  ref?: Ref<MusicToggleHandle>;
  onPlayingChange?: (playing: boolean) => void;
};

export function MusicToggle({ ref, onPlayingChange }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      // Browsers block unmuted autoplay without a user gesture.
    }
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => {
      const isPlaying = !audio.paused;
      setPlaying(isPlaying);
      onPlayingChange?.(isPlaying);
    };
    audio.addEventListener("play", sync);
    audio.addEventListener("playing", sync);
    audio.addEventListener("pause", sync);
    sync();
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("playing", sync);
      audio.removeEventListener("pause", sync);
    };
  }, [onPlayingChange]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    await play();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/xung-doi-cuoi-thoi.mp3"
        loop
        playsInline
        preload="auto"
        autoPlay
      />
      <button
        type="button"
        aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}
        onClick={toggle}
        className="fixed right-4 bottom-14 z-40 size-12 cursor-pointer rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none active:scale-95"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            playing && "animate-spin-cd",
          )}
          style={{
            background:
              "linear-gradient(to right bottom, rgba(215, 12, 27, 0.8), rgb(215, 12, 27), rgba(215, 12, 27, 0.867))",
            animation: playing ? "spin-cd 3s linear infinite" : undefined,
          }}
        >
          <span className="absolute inset-1 rounded-full border border-white/20" />
          <span className="absolute inset-0 rounded-full bg-linear-to-tr from-white/30 via-transparent to-transparent" />
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          {playing ? (
            <span className="flex h-4 items-end gap-0.5">
              <span
                className="animate-dance-1 w-1 rounded-full bg-white"
                style={{ height: "60%", animation: "dance 0.4s ease-in-out infinite" }}
              />
              <span
                className="animate-dance-2 w-1 rounded-full bg-white"
                style={{
                  height: "100%",
                  animation: "dance 0.4s ease-in-out 0.1s infinite",
                }}
              />
              <span
                className="animate-dance-3 w-1 rounded-full bg-white"
                style={{
                  height: "40%",
                  animation: "dance 0.4s ease-in-out 0.2s infinite",
                }}
              />
              <span
                className="animate-dance-4 w-1 rounded-full bg-white"
                style={{
                  height: "80%",
                  animation: "dance 0.4s ease-in-out 0.3s infinite",
                }}
              />
            </span>
          ) : (
            <MusicNoteIcon className="size-5 text-white" />
          )}
        </span>
      </button>
    </>
  );
}
