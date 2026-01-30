import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://news.tonyx.dev"),
  title: "Morning News | Tắt tiếng ồn, giữ lại ngữ cảnh",
  description:
    "AI lọc bỏ tin tức gây kích thích dopamine và giận dữ, chỉ truyền tải ngữ cảnh cấu trúc. Đăng ký beta ngay bây giờ.",
  openGraph: {
    title: "Morning News: Tắt tiếng ồn thế giới",
    description:
      "AI lọc tiếng ồn tin tức & tóm tắt insight trong 3 dòng. Đăng ký beta ngay bây giờ.",
    url: "https://news.tonyx.dev",
    siteName: "Morning News",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Morning News Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morning News",
    description: "Dịch vụ lọc tiếng ồn tin tức bằng AI",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
