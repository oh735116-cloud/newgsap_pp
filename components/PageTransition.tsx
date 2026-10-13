"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PageTransition() {
  // Next.js 페이지 이동 기능
  const router = useRouter();

  // 화면을 덮을 요소
  const overlayRef = useRef<HTMLDivElement>(null);

  // 중복 클릭 방지
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 첫 렌더링 시 오버레이 초기화
  useGSAP(() => {
    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, {
      yPercent: 100,
    });
  });

  // 페이지 전환 실행
  const handleTransition = (path: string) => {
    if (!overlayRef.current || isTransitioning) return;

    setIsTransitioning(true);

    // 오버레이가 아래에서 위로 올라옴
    gsap.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.7,
      ease: "power3.inOut",

      onComplete: () => {
        // 화면이 완전히 덮인 뒤 페이지 이동
        router.push(path);

        // 예제에서는 짧은 대기 후 오버레이 제거
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.inOut",

          onComplete: () => {
            gsap.set(overlayRef.current, {
              yPercent: 100,
            });

            setIsTransitioning(false);
          },
        });
      },
    });
  };

  return (
    <>
      {/* 페이지 이동 테스트 버튼 */}
      <div className="fixed bottom-6 right-6 z-40 flex gap-3">
        <button
          type="button"
          disabled={isTransitioning}
          onClick={() => handleTransition("/")}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
        >
          Home
        </button>

        <button
          type="button"
          disabled={isTransitioning}
          onClick={() => handleTransition("/projects")}
          className="rounded-lg bg-purple-600 px-5 py-3 text-white disabled:opacity-50"
        >
          Projects
        </button>
      </div>

      {/* 화면 전환 오버레이 */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-slate-900"
      />
    </>
  );
}
