import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gia Bảo & Phương Trinh",
  description: "Thiệp mời lễ đính hôn Gia Bảo & Phương Trinh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
