"use client";

import { FormEvent, useEffect, useState } from "react";
import { invitation } from "@/lib/invitation-content";
import { GUEST_NAME_MAX, buildInviteUrl, parseGuestName } from "@/lib/guest";

type GuestRow = {
  at: string;
  name: string;
  url: string;
};

function isGuestRow(value: unknown): value is GuestRow {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.at === "string" &&
    typeof row.name === "string" &&
    typeof row.url === "string"
  );
}

export function GenerateInvitePage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<GuestRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/guests", { cache: "no-store" });
        const data: unknown = await res.json();
        const list =
          data && typeof data === "object" && Array.isArray((data as { guests?: unknown }).guests)
            ? (data as { guests: unknown[] }).guests.filter(isGuestRow)
            : [];
        if (!cancelled) setGuests(list);
      } catch {
        if (!cancelled) setGuests([]);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const guest = parseGuestName(name);
    if (!guest || sending) return;
    const inviteUrl = buildInviteUrl(window.location.origin, guest);
    setUrl(inviteUrl);
    setCopied(false);
    setSaved(false);
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: guest, url: inviteUrl }),
      });
      if (!res.ok) throw new Error("save_failed");
      setSaved(true);
      setGuests((prev) => [
        { at: new Date().toLocaleString("vi-VN"), name: guest, url: inviteUrl },
        ...prev.filter((row) => row.url !== inviteUrl),
      ]);
    } catch {
      setError("Đã tạo URL nhưng chưa lưu được vào Sheet. Cập nhật Apps Script rồi thử lại.");
    } finally {
      setSending(false);
    }
  }

  async function copyUrl(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-dvh bg-[#fff8f8] px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <p className="font-serif text-center text-sm tracking-wide text-invitation">
          {invitation.groom.shortName} & {invitation.bride.shortName}
        </p>
        <h1 className="font-hand mt-2 text-center text-4xl text-invitation">
          Tạo thiệp mời
        </h1>
        <p className="font-hand mt-2 text-center text-base text-black/70">
          Nhập tên khách, lấy URL để gửi. Tên sẽ hiện dưới dòng Thân Mời.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-xl border border-[rgba(215,12,27,0.2)] bg-white p-5 shadow-sm"
        >
          <label className="font-hand block text-sm text-black/70" htmlFor="guest-name">
            Tên người được mời
          </label>
          <input
            id="guest-name"
            required
            maxLength={GUEST_NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Cô chú Năm"
            className="font-hand mt-2 w-full rounded-[6px] border border-black/20 px-3 py-2.5 text-base outline-none focus:border-invitation"
          />
          <button
            type="submit"
            disabled={sending}
            className="font-hand mt-4 w-full rounded-full bg-invitation py-2.5 text-sm tracking-wider text-white uppercase disabled:opacity-60"
          >
            {sending ? "Đang tạo..." : "Tạo URL"}
          </button>
        </form>

        {url ? (
          <div className="mt-5 rounded-xl border border-[rgba(215,12,27,0.2)] bg-white p-5">
            <p className="font-serif text-sm text-invitation">Thân Mời</p>
            <p className="font-hand text-2xl text-invitation">{parseGuestName(name) || "—"}</p>
            <p className="mt-3 break-all font-mono text-xs leading-relaxed text-black/80">
              {url}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void copyUrl(url)}
                className="font-hand rounded-full bg-invitation px-4 py-1.5 text-sm text-white"
              >
                {copied ? "Đã copy" : "Copy URL"}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-hand rounded-full border border-invitation px-4 py-1.5 text-sm text-invitation"
              >
                Xem thiệp
              </a>
            </div>
            {saved ? (
              <p className="font-hand mt-3 text-sm text-black/60">Đã lưu vào Sheet (tab Guests).</p>
            ) : null}
            {error ? <p className="font-hand mt-3 text-sm text-invitation">{error}</p> : null}
          </div>
        ) : null}

        <section className="mt-8">
          <h2 className="font-hand text-xl text-invitation">Đã tạo</h2>
          {guests.length === 0 ? (
            <p className="font-hand mt-2 text-sm text-black/50">Chưa có URL nào.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {guests.map((guest) => (
                <li
                  key={`${guest.url}-${guest.at}`}
                  className="rounded-lg border border-[rgba(215,12,27,0.13)] bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-hand font-medium">{guest.name}</p>
                    <p className="text-[11px] opacity-50">{guest.at}</p>
                  </div>
                  <p className="mt-1 break-all font-mono text-[11px] text-black/70">
                    {guest.url}
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyUrl(guest.url)}
                    className="font-hand mt-2 text-sm text-invitation underline"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
