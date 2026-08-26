import { invitation } from "@/lib/invitation-content";

function ComicPortrait({
  photo,
  frame,
  rotate,
  className,
  alt,
}: {
  photo: string;
  frame: string;
  rotate: string;
  className?: string;
  alt: string;
}) {
  return (
    <div className={className} style={{ transform: rotate }}>
      <div className="relative w-full" style={{ paddingBottom: "133.33%" }}>
        <img
          src={photo}
          alt={alt}
          className="absolute top-[2%] left-[2%] h-[96%] w-[96%] rounded-[6px] object-cover shadow-md"
        />
        <img
          src={frame}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section>
      <div className="relative z-10 flex w-full justify-center px-4 pt-16 md:pt-20">
        <p
          className="font-hand text-center text-[clamp(32px,9vw,56px)] leading-none font-bold tracking-[0.02em] text-invitation"
        >
          {invitation.heroTitle}
        </p>
      </div>

      <header
        aria-label="Đầu thiệp"
        className="relative w-full overflow-hidden"
      >
        <div className="absolute top-[44px] left-1/2 z-[5] w-[82%] max-w-[340px] -translate-x-1/2 md:top-[50px] md:w-[90%] md:max-w-[510px]">
          <div className="relative" style={{ paddingBottom: "115%" }}>
            <ComicPortrait
              photo={invitation.bride.photo}
              frame={invitation.bride.frame}
              rotate="rotate(-4deg)"
              className="absolute top-0 left-0 z-[5] w-[57%]"
              alt={invitation.bride.shortName}
            />

            <ComicPortrait
              photo={invitation.groom.photo}
              frame={invitation.groom.frame}
              rotate="rotate(3deg)"
              className="absolute right-0 bottom-[-50px] z-[6] w-[55%]"
              alt={invitation.groom.shortName}
            />

            <div className="pointer-events-none absolute top-[2%] right-[calc(-16%_+_80px)] z-[4] w-[26%] md:right-[calc(-16%_+_40px)] lg:right-[calc(-16%_+_50px)]">
              <img
                src="/images/themes/love-art/hy.webp"
                alt=""
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="pointer-events-none absolute top-[34%] right-[calc(-16%_+_80px)] z-[4] w-[18%] md:top-[31%] md:right-[calc(-16%_+_90px)] lg:right-[calc(-16%_+_100px)]">
              <img
                src="/images/themes/love-art/hoa-tim.webp"
                alt=""
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-[calc(27%-70px)] left-[5%] z-[7] flex flex-col items-center text-center md:bottom-[calc(27%-125px)] md:left-[calc(5%+150px)]">
          <p className="font-hand text-[13px] font-light md:text-[15px]">
            {invitation.bride.roleLabel}
          </p>
          <p className="font-hand text-[19px] font-bold uppercase md:text-[23px]">
            {invitation.bride.shortName}
          </p>
          <div className="pointer-events-none mt-[15px] w-[70px] md:mt-[25px] md:w-[85px]">
            <img
              src="/images/themes/love-art/dau.webp"
              alt=""
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[calc(10%-20px)] left-[calc(42%-100px)] z-[6] w-[11%] max-w-[48px] md:bottom-[calc(10%-50px)] md:max-w-[58px]">
          <img
            src="/images/themes/love-art/tim.webp"
            alt=""
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="absolute right-[5%] bottom-[5%] z-[7] flex flex-row items-center md:right-[calc(5%+130px)]">
          <div className="pointer-events-none mr-[15px] w-[113px] md:mr-[25px] md:w-[135px]">
            <img
              src="/images/themes/love-art/re.webp"
              alt=""
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="font-hand text-[13px] font-light md:text-[15px]">
              {invitation.groom.roleLabel}
            </p>
            <p className="font-hand text-[19px] font-bold uppercase md:text-[23px]">
              {invitation.groom.shortName}
            </p>
          </div>
        </div>

        <div className="h-[600px] w-full md:h-[840px]" />
      </header>
    </section>
  );
}
