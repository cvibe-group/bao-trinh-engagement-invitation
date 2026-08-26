"use client";

import { FormEvent, useState } from "react";
import { invitation } from "@/lib/invitation-content";
import type { Wish } from "@/types/invitation";
import { sectionTitleClass } from "@/components/invitation-ui";

export function GuestbookSection() {
  const [wishes, setWishes] = useState<Wish[]>(invitation.seededWishes);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;
    const now = new Date();
    const at = `${now.toLocaleTimeString("vi-VN")} ${now.toLocaleDateString("vi-VN")}`;
    setWishes((prev) => [
      {
        id: String(Date.now()),
        author: author.trim(),
        at,
        message: message.trim(),
      },
      ...prev,
    ]);
    setAuthor("");
    setMessage("");
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
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={invitation.guestbookNamePlaceholder}
              className="font-hand w-full rounded-[6px] border border-black/20 px-3 py-2 text-base focus:outline-none md:py-2.5 md:text-[15px]"
            />
          </div>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={invitation.guestbookMessagePlaceholder}
            rows={4}
            className="font-hand w-full rounded-[6px] border border-black/20 px-3 py-2 text-base focus:outline-none md:py-2.5 md:text-[15px]"
          />
          <div className="mt-3 flex items-center justify-end text-[12px] md:text-[13px]">
            <button
              type="submit"
              className="font-hand rounded-full bg-invitation px-6 py-2 text-[13px] font-light tracking-wider text-white uppercase transition-transform hover:scale-105 md:text-[14px]"
            >
              {invitation.guestbookSubmit}
            </button>
          </div>
        </div>
      </form>

      <div className="mx-auto mt-8 max-h-[500px] w-full max-w-full space-y-3 overflow-y-auto pr-2 md:max-w-[600px]">
        {wishes.length === 0 ? (
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
