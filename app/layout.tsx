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
  metadataBase: new URL("https://nocan-news.vercel.app"),
  title: "NoCan News | 소음은 끄고 맥락만 남긴다",
  description:
    "도파민과 분노를 유발하는 뉴스는 AI가 거르고, 구조적 맥락만 전해드립니다. 지금 베타 신청하세요.",
  openGraph: {
    title: "NoCan News: 세상의 소음 끄기",
    description:
      "AI 기반 뉴스 노이즈 캔슬링 & 3줄 인사이트 요약. 지금 베타 신청하세요.",
    url: "https://nocan-news.vercel.app",
    siteName: "NoCan News",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoCan News Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoCan News",
    description: "AI 뉴스 노이즈 캔슬링 서비스",
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
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
