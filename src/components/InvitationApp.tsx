"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { AlbumSection } from "@/components/AlbumSection";
import { CeremonySection } from "@/components/CeremonySection";
import { EnvelopeOverlay } from "@/components/EnvelopeOverlay";
import { GuestbookSection } from "@/components/GuestbookSection";
import { HeroSection } from "@/components/HeroSection";
import { MusicToggle, type MusicToggleHandle } from "@/components/MusicToggle";
import { ReceptionSection } from "@/components/ReceptionSection";
import { ThanksFooter } from "@/components/ThanksFooter";
import { TimelineSection } from "@/components/TimelineSection";
import { VenueSection } from "@/components/VenueSection";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useGuestName } from "@/hooks/use-guest-name";
import { cn } from "@/lib/utils";

function subscribe() {
  return () => undefined;
}

function getSkipEnvelope() {
  return new URLSearchParams(window.location.search).get("open") === "1";
}

export function InvitationApp() {
  const skipEnvelope = useSyncExternalStore(
    subscribe,
    getSkipEnvelope,
    () => false,
  );
  const guestName = useGuestName();
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef<MusicToggleHandle>(null);
  const showOverlay = !skipEnvelope && !dismissed;
  const onPlayingChange = useCallback((next: boolean) => {
    setPlaying(next);
  }, []);

  useAutoScroll({
    enabled: !showOverlay,
    playing,
  });

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-white",
        showOverlay && "h-dvh overflow-hidden",
      )}
    >
      {showOverlay ? (
        <EnvelopeOverlay
          leaving={leaving}
          guestName={guestName}
          onOpen={() => {
            void musicRef.current?.play();
            setLeaving(true);
          }}
          onLeaveEnd={() => setDismissed(true)}
        />
      ) : null}

      <main className="min-h-screen w-full">
        <div className="relative isolate mx-auto w-full max-w-[480px] overflow-hidden md:max-w-[900px] md:border md:border-[#D70C1B22]">
          <HeroSection />
          <div
            aria-label="Nội dung thiệp"
            className="relative z-10 flex w-full flex-col items-center gap-10 px-4 pb-10 pt-6 md:gap-14 md:px-10 md:pb-14 md:pt-8 lg:gap-16"
          >
            <CeremonySection />
            <AlbumSection />
            <ReceptionSection />
            <VenueSection />
            <TimelineSection />
            <GuestbookSection />
            <ThanksFooter />
          </div>
        </div>
      </main>

      <MusicToggle ref={musicRef} onPlayingChange={onPlayingChange} />
    </div>
  );
}
