import { NextResponse } from "next/server";
import { GUEST_NAME_MAX, parseGuestName } from "@/lib/guest";
import {
  SheetsNotConfiguredError,
  appendGuest,
  listGuests,
} from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const guests = await listGuests();
    return NextResponse.json({ guests });
  } catch (error) {
    if (error instanceof SheetsNotConfiguredError) {
      return NextResponse.json({ error: "not_configured", guests: [] }, { status: 503 });
    }
    console.error("Guests read failed", error);
    return NextResponse.json({ error: "sheets_failed", guests: [] }, { status: 502 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = parseGuestName(typeof record.name === "string" ? record.name : "");
  const url = typeof record.url === "string" ? record.url.trim() : "";

  if (!name || name.length > GUEST_NAME_MAX || !url) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  try {
    await appendGuest({ name, url });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SheetsNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("Guest write failed", error);
    return NextResponse.json({ error: "sheets_failed" }, { status: 502 });
  }
}
