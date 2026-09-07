import { useSyncExternalStore } from "react";
import { GUEST_QUERY, parseGuestName } from "@/lib/guest";

function subscribe() {
  return () => undefined;
}

function readGuestName() {
  return parseGuestName(
    new URLSearchParams(window.location.search).get(GUEST_QUERY),
  );
}

export function useGuestName() {
  return useSyncExternalStore(subscribe, readGuestName, () => "");
}
