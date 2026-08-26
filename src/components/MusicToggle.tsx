"use client";

import { useRef, useState } from "react";
import { MusicNoteIcon, PauseIcon } from "@/components/icons";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/xung-doi-cuoi-thoi.mp3"
        loop
        preload="none"
      />
      <button
        type="button"
        aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}
        onClick={toggle}
        className="fixed right-4 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-invitation text-white shadow-[0_6px_18px_rgba(215,12,27,0.4)]"
      >
        {playing ? (
          <PauseIcon className="size-5" />
        ) : (
          <MusicNoteIcon className="size-6" />
        )}
      </button>
    </>
  );
}
