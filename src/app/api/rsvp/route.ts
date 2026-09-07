import { NextResponse } from "next/server";
import {
  SheetsNotConfiguredError,
  appendRsvp,
} from "@/lib/google-sheets";

const NAME_MAX = 80;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const status = record.status === "no" ? "no" : record.status === "yes" ? "yes" : null;

  if (!name || name.length > NAME_MAX || !status) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  try {
    await appendRsvp({ name, status });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SheetsNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("RSVP write failed", error);
    return NextResponse.json({ error: "sheets_failed" }, { status: 502 });
  }
}
