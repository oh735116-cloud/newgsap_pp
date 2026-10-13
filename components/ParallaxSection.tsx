"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ParallaxSection() {
  // 패럴랙스가 적용될 전체 영역
  const sectionRef = useRef<HTMLElement>(null);

  // 배경 이미지 DOM 참조
  const imageRef = useRef<HTMLDivElement>(null);

  // 텍스트 DOM 참조
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // DOM 참조가 준비되지 않았으면 실행하지 않음
      if (!sectionRef.current || !imageRef.current || !textRef.current) {
        return;
      }

      // 1. 배경 이미지 패럴랙스
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -12, // 처음에는 약간 위쪽에 위치
          scale: 1.2, // 이미지 1.2배 확대
        },
        {
          yPercent: 12, // 스크롤에 따라 아래로 이동
          scale: 1.05, // 이미지 확대 정도 감소
          ease: "none", // 스크롤과 일정하게 연결

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // 스크롤 움직임을 1초 정도 부드럽게 추적
          },
        },
      );

      // 2. 텍스트 패럴랙스
      gsap.fromTo(
        textRef.current,
        {
          y: 100, // 아래쪽 100px에서 시작
          opacity: 0.3, // 반투명한 상태
        },
        {
          y: -100, // 위쪽으로 이동
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      data-header-tone="light"
      ref={sectionRef}
      className="relative isolate h-[80vh] min-h-[500px] overflow-hidden"
    >
      {/* 배경 이미지 영역 */}
      <div ref={imageRef} className="absolute inset-0 -z-10">
        <Image
          src="/mountain.jpg"
          alt="산과 자연 풍경"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* 이미지 위에 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 패럴랙스 텍스트 */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div ref={textRef} className="text-center text-white">
          <h2 className="text-4xl font-bold md:text-6xl">Explore the World</h2>

          <p className="mt-6 text-lg md:text-xl">
            스크롤을 통해 새로운 경험을 만나보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
