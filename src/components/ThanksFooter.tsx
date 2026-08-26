import { invitation } from "@/lib/invitation-content";

export function ThanksFooter() {
  return (
    <footer className="flex w-full max-w-[360px] flex-col items-center gap-3 px-4 text-center md:max-w-2xl md:px-10">
      <img
        src="/images/themes/love-art/thanks.webp"
        alt="Thanks"
        className="mb-3 h-auto w-[100px] object-contain opacity-80 md:w-[124px]"
      />
      <span className="font-hand mx-auto flex max-w-[560px] flex-col items-center gap-1 text-[13px] leading-normal md:text-[15px]">
        {invitation.thanksLine}
      </span>
    </footer>
  );
}
