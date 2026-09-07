"use client";

import { FormEvent, useEffect, useState } from "react";
import { invitation } from "@/lib/invitation-content";
import type { Wish } from "@/types/invitation";
import { sectionTitleClass } from "@/components/invitation-ui";

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

export function GuestbookSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/guestbook", { cache: "no-store" });
        const data: unknown = await res.json();
        const list =
          data && typeof data === "object" && Array.isArray((data as { wishes?: unknown }).wishes)
            ? (data as { wishes: unknown[] }).wishes.filter(isWish)
            : [];
        if (!cancelled) setWishes(list);
      } catch {
        if (!cancelled) setWishes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!author.trim() || !message.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          message: message.trim(),
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      if (!res.ok) throw new Error("guestbook_failed");
      const wish =
        data && typeof data === "object" ? (data as { wish?: unknown }).wish : null;
      if (isWish(wish)) {
        setWishes((prev) => [wish, ...prev.filter((item) => item.id !== wish.id)]);
      }
      setAuthor("");
      setMessage("");
    } catch {
      setError("Không gửi được lời chúc. Thử lại nhé.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative mx-auto w-full max-w-[338px] px-2 md:max-w-[560px] md:px-6">
      <div className="text-center">
        <h2 className={sectionTitleClass}>{invitation.guestbookHeading}</h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-6 w-full max-w-full md:max-w-[600px]"
      >
        <div className="rounded-md border border-[rgba(215,12,27,0.27)] p-4 md:p-5">
          <div className="mb-4">
            <input
              required
              maxLength={80}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={invitation.guestbookNamePlaceholder}
              className="font-hand w-full rounded-[6px] border border-black/20 px-3 py-2 text-base focus:outline-none md:py-2.5 md:text-[15px]"
            />
          </div>
          <textarea
            required
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={invitation.guestbookMessagePlaceholder}
            rows={4}
            className="font-hand w-full rounded-[6px] border border-black/20 px-3 py-2 text-base focus:outline-none md:py-2.5 md:text-[15px]"
          />
          {error ? (
            <p className="font-hand mt-2 text-sm text-invitation">{error}</p>
          ) : null}
          <div className="mt-3 flex items-center justify-end text-[12px] md:text-[13px]">
            <button
              type="submit"
              disabled={sending}
              className="font-hand rounded-full bg-invitation px-6 py-2 text-[13px] font-light tracking-wider text-white uppercase transition-transform hover:scale-105 disabled:opacity-60 md:text-[14px]"
            >
              {sending ? "Đang gửi..." : invitation.guestbookSubmit}
            </button>
          </div>
        </div>
      </form>

      <div className="mx-auto mt-8 max-h-[500px] w-full max-w-full space-y-3 overflow-y-auto pr-2 md:max-w-[600px]">
        {loading ? (
          <p className="font-hand text-center text-sm opacity-60">
            Đang tải lời chúc...
          </p>
        ) : wishes.length === 0 ? (
          <p className="font-hand text-center text-sm">
            {invitation.guestbookEmpty}
          </p>
        ) : (
          wishes.map((wish) => (
            <article
              key={wish.id}
              className="font-hand rounded-md border border-[rgba(215,12,27,0.13)] p-3 text-[13px] md:p-4 md:text-[14px]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-black">{wish.author}</p>
                <p className="text-[11px] opacity-50">{wish.at}</p>
              </div>
              <p className="mt-2 leading-relaxed">{wish.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
