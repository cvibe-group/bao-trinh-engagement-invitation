import { invitation } from "@/lib/invitation-content";
import { sectionTitleClass } from "@/components/invitation-ui";

export function TimelineSection() {
  const items = invitation.timeline;
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute start-[8%] top-[28%] z-10 w-[16%] max-w-[64px] md:start-[20%] md:max-w-[80px]">
        <img
          src="/images/themes/love-art/dau-ly.webp"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute start-[8%] top-[68%] z-10 w-[15%] max-w-[58px] md:start-[20%] md:max-w-[72px]">
        <img
          src="/images/themes/love-art/re-ly.webp"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4 md:gap-8 md:px-6">
        <h2 className={sectionTitleClass}>{invitation.timelineHeading}</h2>
        <ol className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10">
          {items.map((item, i) => (
            <li key={item.time} className="contents">
              <span className="font-hand pt-0.5 text-right text-[16px] leading-snug tracking-wide text-invitation tabular-nums md:text-[17px]">
                {item.time}
              </span>
              <span
                aria-hidden
                className="relative flex items-center justify-center self-stretch"
              >
                {i < items.length - 1 ? (
                  <span className="absolute top-1/2 -bottom-8 left-1/2 w-px -translate-x-1/2 bg-invitation/40 md:-bottom-10" />
                ) : null}
                <span className="relative block h-2.5 w-2.5 rounded-full bg-invitation shadow-[0_0_0_2px_rgba(215,12,27,0.13)]" />
              </span>
              <span className="font-hand pt-0.5 text-left text-[14px] leading-snug font-medium md:text-[16px]">
                {item.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
