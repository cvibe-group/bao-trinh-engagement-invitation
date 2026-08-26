"use client";

import { useEffect, useRef } from "react";

type UseAutoScrollOptions = {
  enabled: boolean;
  playing: boolean;
  scrollSpeed?: number;
  startDelay?: number;
};

export function useAutoScroll({
  enabled,
  playing,
  scrollSpeed = 20,
  startDelay = 2000,
}: UseAutoScrollOptions) {
  const rafRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<number | undefined>(undefined);
  const stoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const userStoppedRef = useRef(false);
  const playingRef = useRef(playing);

  playingRef.current = playing;
  pausedRef.current = !playing || userStoppedRef.current;

  useEffect(() => {
    if (!playing || userStoppedRef.current || stoppedRef.current) return;
    const y =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    startTimeRef.current = performance.now() - (y / scrollSpeed) * 1000;
  }, [playing, scrollSpeed]);

  useEffect(() => {
    if (
      !enabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    stoppedRef.current = false;
    userStoppedRef.current = false;
    pausedRef.current = !playingRef.current;
    startTimeRef.current = undefined;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const controller = new AbortController();

    const stop = () => {
      if (stoppedRef.current) return;
      stoppedRef.current = true;
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
      controller.abort();
    };

    const tick = (now: number) => {
      if (stoppedRef.current) return;
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startTimeRef.current === undefined) startTimeRef.current = now;
      const y = ((now - startTimeRef.current) / 1000) * scrollSpeed;
      window.scrollTo(0, y);
      const viewBottom =
        (window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop) + window.innerHeight;
      if (viewBottom >= document.documentElement.scrollHeight - 10) {
        stop();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    timeoutRef.current = window.setTimeout(() => {
      if (stoppedRef.current) return;
      let wheelDelta = 0;
      const onWheel = (event: WheelEvent) => {
        if (userStoppedRef.current || stoppedRef.current) return;
        wheelDelta += Math.abs(event.deltaY);
        if (wheelDelta >= 50) {
          userStoppedRef.current = true;
          pausedRef.current = true;
        }
      };
      const onTouch = () => {
        if (userStoppedRef.current || stoppedRef.current) return;
        userStoppedRef.current = true;
        pausedRef.current = true;
      };
      window.addEventListener("wheel", onWheel, {
        passive: true,
        signal: controller.signal,
      });
      window.addEventListener("touchstart", onTouch, {
        passive: true,
        signal: controller.signal,
      });
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      stop();
    };
  }, [enabled, scrollSpeed, startDelay]);
}
