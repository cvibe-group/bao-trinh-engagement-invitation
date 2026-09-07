import { invitation } from "@/lib/invitation-content";
import { DateStamp, sectionTitleClass } from "@/components/invitation-ui";

export function CeremonySection() {
  const { ceremony, groom, bride, groomFamily, brideFamily, ceremonyHeading } =
    invitation;

  return (
    <>
      <h2 className={sectionTitleClass}>{ceremonyHeading}</h2>

      <div className="relative grid w-full max-w-[366px] grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] gap-x-3 gap-y-1 text-center md:max-w-[520px] md:gap-x-6 lg:max-w-[600px]">
        <FamilyColumn
          label={groomFamily.grandparentsLabel}
          father={groomFamily.father}
          mother={groomFamily.mother}
          address={groomFamily.address}
        />
        <div className="row-span-4 flex h-full items-center justify-center px-1 md:px-2">
          <div className="h-[60px] w-px bg-invitation md:h-[80px]" />
        </div>
        <FamilyColumn
          label={brideFamily.grandparentsLabel}
          father={brideFamily.father}
          mother={brideFamily.mother}
          address={brideFamily.address}
        />
      </div>

      <div className="font-hand mx-auto flex max-w-[300px] flex-col gap-1 text-center text-[16px] leading-snug text-invitation md:max-w-[560px] md:text-[20px]">
        <span>
          {ceremony.announcement}
          <br />
          {ceremony.ceremonyTitle}
        </span>
      </div>

      <div className="relative flex w-full min-w-0 flex-col items-center gap-1 text-center md:gap-2">
        <h3
          className="font-hand flex w-[90%] items-center justify-center leading-tight whitespace-nowrap text-invitation md:w-[95%]"
          style={{ fontSize: "clamp(40px, 10vw, 80px)", fontWeight: 400 }}
        >
          {groom.fullName}
        </h3>
        <p className="font-hand text-[12px] tracking-wider uppercase md:text-[13px]">
          {groom.roleLabel}
        </p>
        <p className="font-hand text-[30px] md:text-[35px]">&</p>
        <h3
          className="font-hand flex w-[90%] items-center justify-center leading-tight whitespace-nowrap text-invitation md:w-[95%]"
          style={{ fontSize: "clamp(40px, 10vw, 80px)", fontWeight: 400 }}
        >
          {bride.fullName}
        </h3>
        <p className="font-hand text-[12px] tracking-wider uppercase md:text-[13px]">
          {bride.roleLabel}
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-4 text-center md:gap-5">
        <div className="flex flex-col items-center gap-2">
          <p className="font-hand text-center text-[16px] font-medium uppercase md:text-[20px]">
            {ceremony.heldAtLabel} {ceremony.heldAt}
          </p>
          <p className="font-hand text-center text-[14px] font-medium uppercase md:text-[15px]">
            {ceremony.timeLabel}
          </p>
        </div>
        <DateStamp
          time={ceremony.time}
          weekday={ceremony.weekday}
          day={ceremony.day}
          monthLabel={ceremony.monthLabel}
          year={ceremony.year}
          lunar={ceremony.lunar}
        />
      </div>

      <div className="pointer-events-none flex w-full justify-center py-2">
        <img
          src="/images/themes/love-art/love.webp"
          alt=""
          className="h-auto w-[100px] object-contain md:w-[130px]"
        />
      </div>
    </>
  );
}

function FamilyColumn({
  label,
  father,
  mother,
  address,
}: {
  label: string;
  father: string;
  mother: string;
  address: string;
}) {
  return (
    <div className="row-span-4 grid min-h-0 w-full min-w-0 grid-rows-subgrid justify-items-center">
      <span className="font-hand text-[14px] font-light md:text-[15px]">
        {label}
      </span>
      {father && <span className="font-hand text-[14px] font-semibold text-invitation [overflow-wrap:anywhere] md:text-[15px]">
        {father}
      </span>}
      <span className="font-hand text-[14px] font-semibold text-invitation [overflow-wrap:anywhere] md:text-[15px]">
        {mother}
      </span>
      <div className="font-hand mt-1 w-full max-w-[169px] text-[11px] leading-normal whitespace-pre-line md:max-w-[260px] md:text-[12px]">
        {address}
      </div>
    </div>
  );
}
