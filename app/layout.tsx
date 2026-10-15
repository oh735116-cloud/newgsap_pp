// Next.js 타입
import type { Metadata } from "next";

// Next.js 기본 폰트
import { Geist } from "next/font/google";

// 전체 CSS
import "./globals.css";

// 포트폴리오 커스텀 커서
import CustomCursor from "@/components/CustomCursor";

// ========================================
// 1. 폰트 설정
// ========================================
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// ========================================
// 2. 사이트 메타데이터
// ========================================
export const metadata: Metadata = {
  title: "Hg | Portfolio",
  description: "음악과 공연예술의 경험을 디지털 기술로 확장하는 포트폴리오. 예술 활동과 웹 프로젝트를 소개합니다.",
};

// ========================================
// 3. 전체 레이아웃
// ========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>
        {/* 각 페이지의 실제 화면 */}
        {children}

        {/* 커스텀 마우스 커서 */}
        <CustomCursor />
      </body>
    </html>
  );
}
