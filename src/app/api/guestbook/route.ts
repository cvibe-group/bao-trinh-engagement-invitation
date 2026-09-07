import { NextResponse } from "next/server";
import {
  SheetsNotConfiguredError,
  appendGuestbook,
  listGuestbook,
} from "@/lib/google-sheets";

const NAME_MAX = 80;
const MESSAGE_MAX = 500;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const wishes = await listGuestbook();
    return NextResponse.json({ wishes });
  } catch (error) {
    if (error instanceof SheetsNotConfiguredError) {
      return NextResponse.json({ error: "not_configured", wishes: [] }, { status: 503 });
    }
    console.error("Guestbook read failed", error);
    return NextResponse.json({ error: "sheets_failed", wishes: [] }, { status: 502 });
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
  const author = typeof record.author === "string" ? record.author.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";

  if (!author || author.length > NAME_MAX || !message || message.length > MESSAGE_MAX) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  try {
    const wish = await appendGuestbook({ author, message });
    return NextResponse.json({ ok: true, wish });
  } catch (error) {
    if (error instanceof SheetsNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("Guestbook write failed", error);
    return NextResponse.json({ error: "sheets_failed" }, { status: 502 });
  }
}
