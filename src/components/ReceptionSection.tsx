"use client";

import { useState } from "react";
import { invitation, googleCalendarUrl } from "@/lib/invitation-content";
import { CalendarHeartIcon, CloseIcon } from "@/components/icons";
import { DateStamp, sectionTitleClass } from "@/components/invitation-ui";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function buildMonthCells(year: number, month: number, highlight: number) {
  const first = new Date(year, month - 1, 1);
  const jsDay = first.getDay();
  const mondayIndex = jsDay === 0 ? 6 : jsDay - 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<number | null> = Array.from(
    { length: mondayIndex },
    () => null,
  );
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells.map((d) => ({ day: d, highlight: d === highlight }));
}

export function ReceptionSection() {
  const { reception, receptionHeading, addToCalendarLabel, rsvpLabel } =
    invitation;
  const cells = buildMonthCells(
    reception.yearNum,
    reception.monthNum,
    reception.highlightDay,
  );
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"yes" | "no">("yes");
  const [done, setDone] = useState(false);

  return (
    <>
      <h2 className={sectionTitleClass}>{receptionHeading}</h2>

      <div className="flex flex-col items-center gap-4 text-center md:gap-5">
        <h3 className="flex flex-col items-center text-center text-[16px] font-medium text-invitation uppercase md:text-[20px]">
          {reception.timeIntro}
        </h3>
        <DateStamp
          time={reception.time}
          weekday={reception.weekday}
          day={reception.day}
          monthLabel={reception.monthLabel}
          year={reception.year}
          lunar={reception.lunar}
          timeSize="reception"
          scheme="reception"
        />
        <div className="mt-4 flex flex-col items-center">
          <span className="font-hand text-[11px] font-light tracking-wider uppercase md:text-[13px]">
            {reception.startLabel}
          </span>
          <span className="font-hand mt-1 text-[20px] font-medium text-invitation md:text-[22px]">
            {reception.startTime}
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-[290px] md:w-[330px]">
        <img
          src="/images/themes/love-art/lich.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />
        <div className="relative z-10 px-5 pt-10 pb-5">
          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-lg md:max-w-[310px]">
            <p className="font-hand py-2.5 text-center text-[13px] font-semibold tracking-wide text-invitation md:text-[14px]">
              {reception.calendarMonthLabel}
            </p>
            <div className="h-2 w-full" />
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <span
                  key={d}
                  className="py-1.5 text-center text-[10px] font-medium opacity-60 md:text-[11px]"
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="h-2.5 w-full" />
            <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
              {cells.map((cell, i) => (
                <span
                  key={i}
                  className="flex h-[30px] items-center justify-center md:h-[34px]"
                >
                  {cell.day ? (
                    cell.highlight ? (
                      <span className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
                        <CalendarHeartIcon className="absolute inset-0 size-full text-invitation drop-shadow-sm" />
                        <span className="relative z-10 text-[11px] font-bold text-white md:text-[12px]">
                          {cell.day}
                        </span>
                      </span>
                    ) : (
                      <span className="text-[12px] md:text-[13px]">{cell.day}</span>
                    )
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href={googleCalendarUrl(invitation)}
        target="_blank"
        rel="noreferrer"
        className="font-hand mt-1 inline-flex items-center justify-center text-[13px] tracking-wide text-invitation underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 md:text-[15px]"
      >
        {addToCalendarLabel}
      </a>

      <div className="mt-2 flex w-full flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => {
            setRsvpOpen(true);
            setDone(false);
          }}
          className="font-hand inline-flex min-h-[36px] items-center justify-center rounded-full bg-invitation px-6 py-0 text-[13px] leading-none font-light tracking-widest text-white uppercase transition-transform hover:scale-[1.03] md:min-h-[40px] md:text-[14px]"
        >
          {rsvpLabel}
        </button>
      </div>

      {rsvpOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              aria-label="close"
              onClick={() => setRsvpOpen(false)}
              className="absolute top-3 right-3 text-neutral-500"
            >
              <CloseIcon className="size-5" />
            </button>
            <h3 className="pr-8 text-lg font-bold text-black">{rsvpLabel}</h3>
            {done ? (
              <p className="font-hand mt-4 text-xl text-invitation">
                Cảm ơn bạn đã xác nhận!
              </p>
            ) : (
              <form
                className="mt-4 flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name.trim()) return;
                  setDone(true);
                }}
              >
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn*"
                  className="font-hand rounded-[6px] border border-black/20 px-3 py-2 text-sm outline-none focus:border-invitation"
                />
                <label className="font-hand flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={status === "yes"}
                    onChange={() => setStatus("yes")}
                  />
                  Tham dự
                </label>
                <label className="font-hand flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={status === "no"}
                    onChange={() => setStatus("no")}
                  />
                  Không tham dự được
                </label>
                <button
                  type="submit"
                  className="font-hand mt-1 rounded-full bg-invitation py-2 text-sm font-light tracking-wider text-white uppercase"
                >
                  Gửi
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
