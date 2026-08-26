"use client";

import { useState, useSyncExternalStore } from "react";
import { AlbumSection } from "@/components/AlbumSection";
import { CeremonySection } from "@/components/CeremonySection";
import { EnvelopeOverlay } from "@/components/EnvelopeOverlay";
import { GuestbookSection } from "@/components/GuestbookSection";
import { HeroSection } from "@/components/HeroSection";
import { MusicToggle } from "@/components/MusicToggle";
import { ReceptionSection } from "@/components/ReceptionSection";
import { ThanksFooter } from "@/components/ThanksFooter";
import { TimelineSection } from "@/components/TimelineSection";
import { VenueSection } from "@/components/VenueSection";
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
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const showOverlay = !skipEnvelope && !dismissed;

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
          onOpen={() => setLeaving(true)}
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

      <MusicToggle />
    </div>
  );
}
