import type { Wish } from "@/types/invitation";

type SheetsOk = { ok: true } & Record<string, unknown>;
type SheetsErr = { ok: false; error?: string };

export class SheetsNotConfiguredError extends Error {
  constructor() {
    super("Google Sheets webhook is not configured");
    this.name = "SheetsNotConfiguredError";
  }
}

function webhookUrl() {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) throw new SheetsNotConfiguredError();
  return url;
}

async function readJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text) as SheetsOk | SheetsErr;
  } catch {
    throw new Error("Google Sheets returned a non-JSON response");
  }
}

async function postToAppsScript(payload: Record<string, unknown>) {
  const url = webhookUrl();
  const body = JSON.stringify(payload);
  const headers = { "Content-Type": "text/plain;charset=utf-8" };

  // Apps Script accepts the POST, then 302s to an echo URL that is GET-only.
  const first = await fetch(url, {
    method: "POST",
    headers,
    body,
    redirect: "manual",
  });

  const location = first.headers.get("location");
  const res =
    first.status >= 300 && first.status < 400 && location
      ? await fetch(location, { cache: "no-store" })
      : first;

  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed (${res.status})`);
  }

  const data = await readJson(res);
  if (!data.ok) {
    throw new Error(data.error || "Google Sheets webhook rejected the request");
  }
  return data;
}

async function getFromAppsScript(type: string) {
  const url = new URL(webhookUrl());
  url.searchParams.set("type", type);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed (${res.status})`);
  }

  const data = await readJson(res);
  if (!data.ok) {
    throw new Error(data.error || "Google Sheets webhook rejected the request");
  }
  return data;
}

function isWish(value: unknown): value is Wish {
  if (!value || typeof value !== "object") return false;
  const wish = value as Record<string, unknown>;
  return (
    typeof wish.id === "string" &&
    typeof wish.author === "string" &&
    typeof wish.at === "string" &&
    typeof wish.message === "string"
  );
}

export async function appendRsvp(input: {
  name: string;
  status: "yes" | "no";
}) {
  await postToAppsScript({
    type: "rsvp",
    name: input.name,
    status: input.status,
  });
}

export async function appendGuestbook(input: {
  author: string;
  message: string;
}): Promise<Wish> {
  const data = await postToAppsScript({
    type: "guestbook",
    author: input.author,
    message: input.message,
  });
  if (!isWish(data.wish)) {
    throw new Error("Google Sheets did not return the new wish");
  }
  return data.wish;
}

export async function listGuestbook(): Promise<Wish[]> {
  const data = await getFromAppsScript("guestbook");
  if (!Array.isArray(data.wishes)) return [];
  return data.wishes.filter(isWish);
}
