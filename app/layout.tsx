import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
