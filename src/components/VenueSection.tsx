import { invitation } from "@/lib/invitation-content";
import { sectionTitleClass } from "@/components/invitation-ui";

export function VenueSection() {
  return (
    <section className="relative w-full px-2 md:px-6">
      <div className="relative text-center">
        <h3 className={sectionTitleClass}>{invitation.venueHeading}</h3>
        <p className="font-hand mx-auto mt-2 max-w-[280px] text-center text-[12px] leading-snug font-light whitespace-pre-line md:mt-3 md:max-w-md md:text-[14px] lg:max-w-lg lg:text-[15px]">
          {invitation.venue}
        </p>
      </div>
      <div className="relative flex w-full flex-col items-center gap-4 md:gap-5">
        <iframe
          title="Bản đồ địa điểm"
          src={invitation.mapUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="mt-2 h-[240px] w-full max-w-[338px] overflow-hidden rounded-[15px] border-0 md:h-[300px] md:max-w-[560px] lg:h-[320px] lg:max-w-[600px]"
        />
      </div>
    </section>
  );
}
