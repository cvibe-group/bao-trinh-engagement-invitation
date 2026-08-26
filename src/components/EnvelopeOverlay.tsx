"use client";

import { useMemo } from "react";
import { invitation } from "@/lib/invitation-content";

const PARTICLES = [
  { left: 36.4, size: 20.1, color: "#FFC107", opacity: 0.41, duration: 23.1, delay: -10.4, sway: 18 },
  { left: 40.9, size: 10.0, color: "#FFE066", opacity: 0.29, duration: 24.8, delay: -17.6, sway: -24 },
  { left: 72.3, size: 23.6, color: "#FFD700", opacity: 0.14, duration: 21.5, delay: -4.2, sway: -3 },
  { left: 22.1, size: 11.9, color: "#FFD700", opacity: 0.22, duration: 19.8, delay: -8.1, sway: 12 },
  { left: 17.7, size: 12.6, color: "#FFC107", opacity: 0.31, duration: 26.2, delay: -12.0, sway: -16 },
  { left: 65.2, size: 16.7, color: "#FFE066", opacity: 0.53, duration: 22.4, delay: -6.5, sway: 20 },
  { left: 15.0, size: 12.5, color: "#FF6B6B", opacity: 0.33, duration: 20.1, delay: -14.3, sway: 8 },
  { left: 15.3, size: 16.4, color: "#FF6B6B", opacity: 0.18, duration: 25.0, delay: -2.8, sway: -10 },
  { left: 22.1, size: 21.9, color: "#FFC107", opacity: 0.38, duration: 18.6, delay: -9.7, sway: 14 },
  { left: 30.3, size: 15.6, color: "#FFD700", opacity: 0.46, duration: 23.9, delay: -15.1, sway: -18 },
  { left: 84.0, size: 15.9, color: "#FFD700", opacity: 0.51, duration: 21.2, delay: -5.4, sway: 22 },
  { left: 29.4, size: 19.8, color: "#FF6B6B", opacity: 0.49, duration: 24.3, delay: -11.8, sway: -7 },
];

type EnvelopeOverlayProps = {
  leaving: boolean;
  onOpen: () => void;
  onLeaveEnd: () => void;
};

export function EnvelopeOverlay({
  leaving,
  onOpen,
  onLeaveEnd,
}: EnvelopeOverlayProps) {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div
      suppressHydrationWarning
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        leaving ? "animate-envelope-away pointer-events-none" : ""
      }`}
      style={{
        background:
          "linear-gradient(165deg, rgb(139, 0, 0) 0%, rgb(196, 18, 48) 45%, rgb(139, 0, 0) 100%)",
      }}
      onAnimationEnd={(event) => {
        if (
          leaving &&
          event.target === event.currentTarget &&
          event.animationName.includes("envelope-away")
        ) {
          onLeaveEnd();
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {particles.map((p, i) => (
          <div
            key={i}
            className="animate-ambient-rise absolute bottom-[-30px]"
            style={{
              left: `${p.left}%`,
              color: p.color,
              fontSize: `${p.size}px`,
              lineHeight: 1.5,
              ["--particle-opacity" as string]: String(p.opacity),
              ["--rise-duration" as string]: `${p.duration}s`,
              ["--rise-delay" as string]: `${p.delay}s`,
              ["--sway" as string]: `${p.sway}px`,
            }}
          >
            囍
          </div>
        ))}
      </div>

      <div className="relative z-10 w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
        <div
          className="animate-hy-pulse absolute left-1/2 top-[50px] z-30 flex size-16 items-center justify-center rounded-full"
          style={{
            boxShadow: "rgba(215, 12, 27, 0.5) 0px 5.57px 31.8px 0px",
          }}
        >
          <img
            src="/images/themes/love-art/hy.webp"
            alt=""
            className="size-[52px] object-contain"
          />
        </div>

        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            background:
              "linear-gradient(to right bottom, rgb(255, 255, 255), rgb(255, 245, 245), rgb(255, 255, 255))",
            boxShadow:
              "rgba(0, 0, 0, 0.45) 0px 25px 60px -12px, rgba(0, 0, 0, 0.2) 0px 8px 24px 0px, rgba(215, 12, 27, 0.15) 0px 0px 40px 0px",
          }}
        >
          <img
            src="/images/themes/love-art/hoa-tim.webp"
            alt=""
            className="pointer-events-none absolute top-4 right-5 w-[72px] opacity-70 sm:w-[88px]"
          />
          <img
            src="/images/themes/love-art/tim.webp"
            alt=""
            className="pointer-events-none absolute bottom-6 left-5 w-[56px] opacity-70 sm:w-[68px]"
          />

          <div className="flex flex-col items-center px-6 pb-8 pt-[72px] sm:px-10 sm:pb-10 sm:pt-20">
            <h1
              suppressHydrationWarning
              className="mb-2 flex flex-col items-center leading-tight text-invitation"
            >
              <span className="font-hand block w-full text-center text-3xl sm:text-4xl">
                {invitation.groom.shortName}
              </span>
              <span className="block w-full text-center font-serif text-lg leading-none sm:text-xl">
                {"&"}
              </span>
              <span className="font-hand block w-full text-center text-3xl sm:text-4xl">
                {invitation.bride.shortName}
              </span>
            </h1>

            <div className="mb-3 mt-1 flex items-center gap-2 text-invitation">
              <div
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0), rgba(215,12,27,0.4))",
                }}
              />
              <span className="text-sm leading-none">❦</span>
              <div
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0), rgba(215,12,27,0.4))",
                }}
              />
            </div>

            <p className="font-serif text-[15px] text-invitation sm:text-base">
              {invitation.envelopeDate}
            </p>
            <p className="mt-1 font-serif text-[15px] text-invitation sm:text-base">
              {invitation.envelopeInvite}
            </p>

            <button
              type="button"
              onClick={onOpen}
              className="btn-shine relative mt-5 flex w-fit cursor-pointer items-center rounded-full px-8 py-2.5 font-serif text-lg font-medium text-white no-underline shadow-lg"
              style={{
                backgroundColor: "rgb(215, 12, 27)",
                boxShadow: "rgba(215, 12, 27, 0.35) 0px 4px 14px 0px",
              }}
            >
              {invitation.envelopeCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
