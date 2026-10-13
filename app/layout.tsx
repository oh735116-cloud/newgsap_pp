// Next.js 타입
import type { Metadata } from "next";

// Next.js 기본 폰트
import { Geist, Geist_Mono } from "next/font/google";

// 전체 CSS
import "./globals.css";

// STEP 7에서 만든 페이지 전환 컴포넌트
import PageTransition from "@/components/PageTransition";

// STEP 8에서 만든 커스텀 커서 컴포넌트
import CustomCursor from "@/components/CustomCursor";

// ========================================
// 1. 폰트 설정
// ========================================
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ========================================
// 2. 사이트 메타데이터
// ========================================
export const metadata: Metadata = {
  title: "GSAP Animation Practice",
  description: "Next.js와 GSAP 애니메이션 실습",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 각 페이지의 실제 화면 */}
        {children}

        {/* STEP 7: 페이지 전환 애니메이션 */}
        <PageTransition />

        {/* STEP 8: 원형 커스텀 마우스 커서 */}
        <CustomCursor />
      </body>
    </html>
  );
}
