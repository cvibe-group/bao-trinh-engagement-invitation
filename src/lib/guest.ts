export const GUEST_NAME_MAX = 80;
export const GUEST_QUERY = "to";

export function parseGuestName(raw: string | null | undefined): string {
  if (!raw) return "";
  let name = raw;
  try {
    name = decodeURIComponent(raw);
  } catch {
    name = raw;
  }
  return name
    .replace(/[\u0000-\u001F<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, GUEST_NAME_MAX);
}

export function buildInvitePath(name: string): string {
  const guest = parseGuestName(name);
  if (!guest) return "/";
  return `/?${GUEST_QUERY}=${encodeURIComponent(guest)}`;
}

export function buildInviteUrl(origin: string, name: string): string {
  return new URL(buildInvitePath(name), origin).toString();
}
