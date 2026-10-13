"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CustomCursor() {
  // 원형 커서 요소 참조
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // -----------------------------------
    // 1. 기기 및 접근성 설정 확인
    // -----------------------------------
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // 터치 기기 또는 모션 감소 설정에서는
    // 커스텀 커서를 사용하지 않음
    if (!pointerQuery.matches || motionQuery.matches) {
      return;
    }

    // 기본 커서를 숨기는 CSS 클래스 추가
    document.documentElement.classList.add("gsap-custom-cursor");

    // 처음에는 커스텀 커서를 보이지 않게 설정
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
      scale: 1,
    });

    // -----------------------------------
    // 2. 커서가 마우스를 부드럽게 추적
    // -----------------------------------
    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.25,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.25,
      ease: "power3.out",
    });

    // 현재 커서의 확대 상태
    let isExpanded = false;

    const handlePointerMove = (event: PointerEvent) => {
      // 마우스 위치에 맞춰 커서 이동
      moveX(event.clientX);
      moveY(event.clientY);

      // 커서가 처음 움직일 때 표시
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.2,
        overwrite: "auto",
      });

      // 현재 마우스가 올라간 HTML 요소 확인
      const target = event.target;

      const hoverElement =
        target instanceof Element
          ? target.closest("[data-cursor-hover]")
          : null;

      const shouldExpand = hoverElement !== null;

      // 확대 상태가 변경되었을 때만 실행
      if (shouldExpand !== isExpanded) {
        isExpanded = shouldExpand;

        gsap.to(cursor, {
          scale: isExpanded ? 2.2 : 1,
          backgroundColor: isExpanded
            ? "rgba(96, 165, 250, 0.15)"
            : "rgba(96, 165, 250, 0)",
          borderColor: isExpanded ? "#60a5fa" : "#ffffff",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    // -----------------------------------
    // 3. 브라우저 영역을 벗어나면 숨김
    // -----------------------------------
    const handlePointerLeave = () => {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    // -----------------------------------
    // 4. 이벤트 등록
    // -----------------------------------
    window.addEventListener("pointermove", handlePointerMove);

    document.addEventListener("pointerleave", handlePointerLeave);

    // -----------------------------------
    // 5. 컴포넌트 해제 시 정리
    // -----------------------------------
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      document.removeEventListener("pointerleave", handlePointerLeave);

      // 기존 마우스 커서 복구
      document.documentElement.classList.remove("gsap-custom-cursor");
    };
  });

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0
                 z-[100] flex h-7 w-7
                 items-center justify-center
                 rounded-full border border-white
                 opacity-0"
    >
      {/* 커서 중앙의 작은 점 */}
      <div className="h-1 w-1 rounded-full bg-white" />
    </div>
  );
}
