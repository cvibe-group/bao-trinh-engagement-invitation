import type { Metadata } from "next";
import { GenerateInvitePage } from "@/components/GenerateInvitePage";

export const metadata: Metadata = {
  title: "Tạo thiệp mời | Gia Bảo & Phương Trinh",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GenerateInvitePage />;
}
