"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DiagonalSectionTransition() {
  useGSAP(() => {
    // ==========================================
    // 1. 실제 About 섹션 찾기
    // ==========================================

    // 화면을 고정할 외부 컨테이너
    const wrapper = document.querySelector<HTMLElement>(
      "#about-transition-shell",
    );

    // 실제 두 번째 섹션
    const about = document.querySelector<HTMLElement>("#about");

    if (!wrapper || !about) return;

    // ==========================================
    // 2. 사용자 움직임 감소 설정
    // ==========================================

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    // ==========================================
    // 3. 전환 애니메이션
    // ==========================================

    // 실제 About 섹션이 11시 방향으로 움직이도록 설정
    const timeline = gsap.timeline({
      defaults: {
        ease: "none",
      },

      scrollTrigger: {
        // About 섹션 전체를 감싼 컨테이너
        trigger: wrapper,

        // 두 번째 섹션의 맨 아래가
        // 브라우저 화면의 맨 아래에 닿으면 시작
        start: "bottom bottom",

        // 전환을 완료하는 데 사용할 스크롤 거리
        end: () => `+=${window.innerHeight * 0.85}`,

        // 전환하는 동안 두 번째 섹션 고정
        pin: true,

        // 다음 섹션이 겹치지 않도록 공간 확보
        pinSpacing: true,

        // 스크롤 위치와 애니메이션 진행도 연결
        scrub: 1,

        // 브라우저 크기 변경 시 다시 계산
        invalidateOnRefresh: true,

        anticipatePin: 1,

        markers: false,
      },
    });

    // ==========================================
    // 4. 실제 About 섹션 퇴장
    // ==========================================

    timeline.fromTo(
      about,

      // 시작 상태
      {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 1,

        // 왼쪽 위 모서리를 회전 기준으로 지정
        transformOrigin: "0% 0%",

        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },

      // 최종 상태
      {
        // 왼쪽으로 이동
        xPercent: -20,

        // 위쪽으로 이동
        yPercent: -12,

        // 반시계 방향으로 기울어지기
        rotation: -9,

        // 서서히 작아지기
        scale: 0.76,

        // 마지막에는 완전히 투명
        autoAlpha: 0,

        // 오른쪽 아래가 안쪽으로 접히는 형태
        clipPath: "polygon(0% 0%, 100% 0%, 76% 76%, 0% 100%)",

        duration: 1,
      },
    );
  });

  // ==========================================
  // 5. 별도 화면을 생성하지 않음
  // ==========================================

  // 기존 코드처럼 타이틀 패널을 출력하지 않습니다.
  // 실제 About 섹션 자체에만 애니메이션을 적용합니다.
  return null;
}
