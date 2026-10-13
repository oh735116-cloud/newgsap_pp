"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// React 전용 GSAP 훅 등록
gsap.registerPlugin(useGSAP);

export default function MagneticSection() {
  // 전체 영역 참조
  const sectionRef = useRef<HTMLElement>(null);

  // 버튼 주위의 마우스 감지 영역
  const areaRef = useRef<HTMLDivElement>(null);

  // 실제 움직일 버튼
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const area = areaRef.current;
      const button = buttonRef.current;

      if (!area || !button) return;

      // 정밀한 마우스가 없는 모바일 및 터치 기기에서는
      // 자석 애니메이션을 적용하지 않음
      const pointerQuery = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      );

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (!pointerQuery.matches || motionQuery.matches) {
        return;
      }

      // -----------------------------------
      // 1. 버튼 이동 거리 설정
      // -----------------------------------

      // gsap.quickTo는 목표 값만 갱신해
      // 마우스 이동처럼 자주 발생하는 이벤트에 적합
      const moveX = gsap.quickTo(button, "x", {
        duration: 0.45,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(button, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      // -----------------------------------
      // 2. 마우스 이동 이벤트
      // -----------------------------------
      const handleMouseMove = (event: PointerEvent) => {
        // 감지 영역의 현재 화면 좌표
        const rect = area.getBoundingClientRect();

        // 영역 중앙의 좌표 계산
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 마우스와 영역 중심 사이 거리
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        // 마우스 이동량의 25%만 버튼에 반영
        // 최대 이동 거리를 제한해 지나친 움직임 방지
        const x = gsap.utils.clamp(-35, 35, distanceX * 0.25);

        const y = gsap.utils.clamp(-25, 25, distanceY * 0.25);

        // GSAP으로 버튼 부드럽게 이동
        moveX(x);
        moveY(y);
      };

      // -----------------------------------
      // 3. 마우스가 감지 영역을 벗어날 때
      // -----------------------------------
      const handleMouseLeave = () => {
        // 원래 위치인 0으로 복귀
        moveX(0);
        moveY(0);
      };

      // -----------------------------------
      // 4. 이벤트 등록
      // -----------------------------------
      area.addEventListener("pointermove", handleMouseMove);

      area.addEventListener("pointerleave", handleMouseLeave);

      // -----------------------------------
      // 5. 컴포넌트 해제 시 이벤트 정리
      // -----------------------------------
      return () => {
        area.removeEventListener("pointermove", handleMouseMove);

        area.removeEventListener("pointerleave", handleMouseLeave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      data-header-tone="light"
      ref={sectionRef}
      className="relative flex min-h-[85vh] flex-col
                 items-center justify-center overflow-hidden
                 bg-slate-900 px-6 text-white"
    >
      {/* 실습 안내 텍스트 */}
      <p className="mb-4 text-sm font-semibold tracking-widest text-blue-400">
        STEP 08 — GSAP INTERACTION
      </p>

      <h2 className="text-center text-4xl font-bold md:text-6xl">
        Magnetic Button
      </h2>

      <p className="mt-5 max-w-xl text-center text-slate-400">
        버튼에 마우스를 가까이 가져가 보세요. 버튼이 마우스 방향으로 움직입니다.
      </p>

      {/* 
        버튼보다 넓은 감지 영역을 사용해
        버튼에 접근하기 전부터 반응하도록 구현
      */}
      <div
        ref={areaRef}
        className="mt-12 flex h-52 w-80
                   items-center justify-center"
      >
        {/* 실제 움직이는 버튼 */}
        <button
          ref={buttonRef}
          type="button"
          data-cursor-hover
          onClick={() => {
            // 실습용 클릭 이벤트
            alert("Magnetic Button 클릭 성공!");
          }}
          className="rounded-full bg-blue-600
                     px-10 py-6 text-lg font-bold
                     text-white shadow-xl
                     shadow-blue-600/20
                     hover:bg-blue-500
                     focus-visible:outline-2
                     focus-visible:outline-offset-4
                     focus-visible:outline-white"
        >
          MAGNETIC BUTTON ↗
        </button>
      </div>

      {/* 하단 안내 */}
      <p className="mt-8 text-sm text-slate-500">
        GSAP quickTo() + Pointer Events
      </p>
    </section>
  );
}
