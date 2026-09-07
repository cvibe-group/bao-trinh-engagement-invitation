"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { invitation } from "@/lib/invitation-content";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { sectionTitleClass } from "@/components/invitation-ui";
import { cn } from "@/lib/utils";

function coverflowStyle(offset: number): CSSProperties | null {
  const abs = Math.abs(offset);
  if (abs > 4) return null;
  const scale = offset === 0 ? 1 : abs === 1 ? 0.85 : 0.7;
  const opacity = offset === 0 ? 1 : abs === 1 ? 0.75 : abs === 2 ? 0.5 : 0.3;
  return {
    aspectRatio: "2 / 3",
    transform: `translateX(${offset * 60}%) translateZ(${-abs * 150}px) rotateY(${offset * 45}deg) scale(${scale})`,
    opacity,
    zIndex: 100 - abs,
    transitionDuration: "1100ms",
  };
}

export function AlbumSection() {
  const photos = invitation.album;
  const n = photos.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);

  function offsetOf(i: number) {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  function prev() {
    setIndex((i) => (i - 1 + n) % n);
  }
  function next() {
    setIndex((i) => (i + 1) % n);
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || open || n <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, 3000);
    return () => window.clearInterval(id);
  }, [inView, open, n, index]);

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="pointer-events-none absolute -right-1 top-[-7px] z-10 w-[42px] md:top-2 md:right-6 md:w-[54px]">
        <img
          src="/images/themes/love-art/3-tim.webp"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="relative flex w-full max-w-[414px] flex-col items-center px-2 md:max-w-none md:px-6">
        <h2 className={cn(sectionTitleClass, "mb-2")}>
          {invitation.albumHeading}
        </h2>

        <div className="mt-4 w-full max-w-[390px] md:max-w-[560px] lg:max-w-[600px]">
          <div className="relative h-[340px] touch-pan-y md:h-[520px]">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prev}
              className="absolute top-1/2 left-0 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-200/60 transition-colors hover:bg-neutral-200 md:flex"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={next}
              className="absolute top-1/2 right-0 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-200/60 transition-colors hover:bg-neutral-200 md:flex"
            >
              <ChevronRightIcon className="size-4" />
            </button>

            <div
              className="relative flex h-full w-full items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative flex h-full w-full items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {photos.map((src, i) => {
                  const offset = offsetOf(i);
                  const style = coverflowStyle(offset);
                  if (!style) return null;
                  return (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Wedding photo ${i + 1}`}
                      onClick={() => {
                        if (offset === 0) setOpen(true);
                        else if (offset < 0) prev();
                        else next();
                      }}
                      className={cn(
                        "absolute h-[92%] cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all ease-in-out",
                        offset === 0 && "ring-2 ring-white/30",
                      )}
                      style={style}
                    >
                      <img
                        src={src}
                        alt={`Wedding photo ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <span className="text-sm tabular-nums opacity-60">
              {index + 1} / {n}
            </span>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black/95">
          <button
            type="button"
            aria-label="close"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-white/80 hover:text-white"
          >
            <CloseIcon className="size-7" />
          </button>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-10">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prev}
              className="absolute left-2 rounded-full p-2 text-white sm:left-6"
            >
              <ChevronLeftIcon className="size-8 sm:size-10" />
            </button>
            <img
              src={photos[index]}
              alt={`Ảnh ${index + 1}`}
              className="max-h-[78vh] max-w-full object-contain"
            />
            <button
              type="button"
              aria-label="Next photo"
              onClick={next}
              className="absolute right-2 rounded-full p-2 text-white sm:right-6"
            >
              <ChevronRightIcon className="size-8 sm:size-10" />
            </button>
          </div>
          <p className="pb-3 text-center text-sm text-white/80">
            {index + 1} / {n}
          </p>
          <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-5">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-12 shrink-0 overflow-hidden rounded ${
                  i === index ? "ring-2 ring-white" : "opacity-60"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
