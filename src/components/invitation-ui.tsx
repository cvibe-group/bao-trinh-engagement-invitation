import { cn } from "@/lib/utils";

export const sectionTitleClass =
  "w-full text-center font-sans text-[26px] font-bold uppercase tracking-[0.05em] text-invitation md:text-[32px]";

function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("h-[22px] w-0.5 shrink-0 rounded-full md:h-7", className)}
    />
  );
}

export function DateStamp({
  time,
  weekday,
  day,
  monthLabel,
  year,
  lunar,
  timeSize = "ceremony",
  scheme = "ceremony",
}: {
  time: string;
  weekday: string;
  day: string;
  monthLabel: string;
  year: string;
  lunar: string;
  timeSize?: "ceremony" | "reception";
  scheme?: "ceremony" | "reception";
}) {
  const red = scheme === "ceremony";
  return (
    <div className="flex flex-col items-center gap-4 text-center md:gap-5">
      <p
        className={cn(
          "font-hand leading-none text-invitation",
          timeSize === "ceremony"
            ? "text-[20px] md:text-[30px]"
            : "text-[20px] md:text-[24px]",
        )}
      >
        {time}
      </p>
      <div
        className={cn(
          "font-hand flex items-center",
          red ? "gap-2 text-invitation md:gap-3" : "gap-6",
        )}
      >
        <span
          className={cn(
            "text-[14px] uppercase md:text-[15px]",
            red ? "font-light" : "font-medium tracking-wide",
          )}
        >
          {weekday}
        </span>
        <Tick className={red ? "bg-invitation" : "bg-black"} />
        <span className="text-[32px] leading-none font-medium text-invitation md:text-[38px]">
          {day}
        </span>
        <Tick className={red ? "bg-invitation" : "bg-black"} />
        <span
          className={cn(
            "text-[14px] uppercase md:text-[15px]",
            red ? "font-light" : "font-medium tracking-wide",
          )}
        >
          {monthLabel}
        </span>
      </div>
      <p
        className={cn(
          "font-hand text-[20px] font-medium md:text-[22px]",
          red ? "text-invitation" : "text-black",
        )}
      >
        {year}
      </p>
      <p
        className={cn(
          "font-hand text-[13px] font-light md:text-[14px]",
          scheme === "reception" && "tracking-[0.15em] uppercase",
        )}
      >
        {lunar}
      </p>
    </div>
  );
}
