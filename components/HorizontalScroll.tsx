"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

// 테스트용 프로젝트 카드 10개
const projects = [
  { id: 1, title: "Project 01", color: "bg-blue-600" },
  { id: 2, title: "Project 02", color: "bg-purple-600" },
  { id: 3, title: "Project 03", color: "bg-emerald-600" },
  { id: 4, title: "Project 04", color: "bg-orange-600" },
  { id: 5, title: "Project 05", color: "bg-pink-600" },
  { id: 6, title: "Project 06", color: "bg-cyan-600" },
];

export default function HorizontalScroll() {
  // 화면 고정 기준 섹션
  const sectionRef = useRef<HTMLElement>(null);

  // 가로로 이동할 카드 영역
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      // DOM 요소가 없으면 실행하지 않음
      if (!section || !track) return;

      // 실제 카드들이 이동해야 하는 거리 계산
      const getDistance = () => {
        return Math.max(0, track.scrollWidth - section.clientWidth);
      };

      // 스크롤 길이 배율
      // 0.5 = 짧고 빠르게
      // 1 = 기본 길이
      // 2 = 길고 느리게
      const scrollMultiplier = 1;

      // 카드 가로 스크롤 애니메이션
      gsap.to(track, {
        // 카드 전체 너비에 맞춰 이동
        x: () => -getDistance(),

        // 일정한 속도로 움직임
        ease: "none",

        scrollTrigger: {
          trigger: section,

          // 섹션이 화면 상단에 도달하면 시작
          start: "top top",

          // 카드 개수와 너비에 따라 스크롤 길이 계산
          end: () => `+=${Math.max(1, getDistance() * scrollMultiplier)}`,

          // 화면 고정
          pin: true,

          // 스크롤과 애니메이션 연결
          scrub: 1,

          // 화면 크기 변경 시 거리 다시 계산
          invalidateOnRefresh: true,

          // 디버깅 표시 비활성화
          markers: false,

          // 화면 고정 시 튀는 현상 완화
          anticipatePin: 1,
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  // 이 아래에는 기존 return (...) JSX 코드를 유지합니다.

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        h-screen
        flex-col
        justify-center
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* 상단 제목 */}
      <div className="mb-10 px-8">
        <p className="mb-3 text-sm text-blue-400">
          GSAP SCROLLTRIGGER PRACTICE
        </p>

        <h2 className="text-4xl font-bold md:text-6xl">Horizontal Projects</h2>

        <p className="mt-4 text-slate-400">
          아래로 스크롤하면 카드가 가로로 이동합니다.
        </p>
      </div>

      {/* 가로로 움직이는 카드 영역 */}
      <div ref={trackRef} className="flex w-max gap-8 px-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`
              flex
              h-[350px]
              w-[80vw]
              max-w-[650px]
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-3xl
              ${project.color}
            `}
          >
            <p className="mb-4 text-lg opacity-70">
              PROJECT {String(project.id).padStart(2, "0")}
            </p>

            <h3 className="text-4xl font-bold md:text-5xl">{project.title}</h3>

            <p className="mt-6 text-white/80">
              GSAP Horizontal Scroll Animation
            </p>
          </article>
        ))}
      </div>

      {/* 하단 설명 */}
      <div className="mt-10 px-8 text-sm text-slate-500">
        ScrollTrigger + Pin + Scrub
      </div>
    </section>
  );
}
