"use client";

// React DOM 참조
import { useRef } from "react";

// Next.js 이미지 최적화
import Image from "next/image";

// GSAP 라이브러리
import gsap from "gsap";

// 스크롤 애니메이션 플러그인
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React 전용 GSAP 훅
import { useGSAP } from "@gsap/react";

// 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ImageRevealSection() {
  // 전체 섹션: Pin 기준
  const sectionRef = useRef<HTMLElement>(null);

  // 확대할 이미지 카드
  const cardRef = useRef<HTMLDivElement>(null);

  // 이미지 내부 요소
  const imageRef = useRef<HTMLDivElement>(null);

  // 이미지 위에 나타날 제목
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const card = cardRef.current;
      const image = imageRef.current;
      const title = titleRef.current;

      // DOM이 준비되지 않은 경우 종료
      if (!section || !card || !image || !title) return;

      // -----------------------------------------
      // 1. 모션 감소 설정 확인
      // -----------------------------------------
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // 움직임 감소를 사용하는 경우
      // 이미지를 최종 상태로만 표시
      if (reducedMotion) {
        gsap.set(card, {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          clipPath: "inset(0% round 0px)",
        });

        gsap.set(title, {
          autoAlpha: 1,
          y: 0,
        });

        return;
      }

      // -----------------------------------------
      // 2. 초기 상태 설정
      // -----------------------------------------

      // 처음에는 이미지가 작은 카드로 보임
      gsap.set(card, {
        width: "60%",
        height: "60%",
        borderRadius: 28,

        // 카드 바깥쪽을 잘라내는 영역
        clipPath: "inset(0% round 28px)",
      });

      // 배경 이미지를 조금 확대된 상태로 시작
      gsap.set(image, {
        scale: 1.15,
      });

      // 제목은 처음에 보이지 않음
      gsap.set(title, {
        autoAlpha: 0,
        y: 70,
      });

      // -----------------------------------------
      // 3. GSAP Timeline 생성
      // -----------------------------------------
      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          trigger: section,

          // 섹션이 화면 상단에 도착하면 시작
          start: "top top",

          // 화면 높이의 2.5배 동안 진행
          end: () => `+=${window.innerHeight * 0.5}`,

          // 애니메이션이 끝날 때까지 화면 고정
          pin: true,

          // 스크롤 움직임에 부드럽게 반응
          scrub: 1,

          // 화면 크기 변경 시 다시 계산
          invalidateOnRefresh: true,

          // 고정 시 화면 흔들림 완화
          anticipatePin: 1,

          // 개발 중 시작·종료선 확인 가능
          markers: false,
        },
      });

      // -----------------------------------------
      // 4. 이미지 카드 확대 애니메이션
      // -----------------------------------------
      timeline.to(
        card,
        {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          clipPath: "inset(0% round 0px)",

          // 타임라인 중 확대 효과가 차지하는 시간
          duration: 2,
        },
        0,
      );

      // -----------------------------------------
      // 5. 배경 이미지 확대
      // -----------------------------------------
      timeline.to(
        image,
        {
          scale: 1,
          duration: 2,
        },
        0,
      );

      // -----------------------------------------
      // 6. 제목 등장
      // -----------------------------------------
      timeline.to(
        title,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        1.5,
      );

      // -----------------------------------------
      // 7. 마지막 화면을 잠시 유지
      // -----------------------------------------
      timeline.to(
        {},
        {
          duration: 0.7,
        },
      );

      // useGSAP이 애니메이션 및 ScrollTrigger를 정리
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* 이미지 확대 영역 */}
      <div
        ref={cardRef}
        className="
          relative
          overflow-hidden
          shadow-2xl
          shadow-black/30
        "
      >
        {/* 실제 배경 이미지 */}
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/reveal.jpg"
            alt="스크롤에 따라 확대되는 풍경 이미지"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* 이미지 위 어두운 오버레이 */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/35
          "
        />

        {/* 최종적으로 등장할 텍스트 */}
        <div
          ref={titleRef}
          className="
            absolute
            inset-0
            z-10
            flex
            flex-col
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <p
            className="
              mb-4
              text-sm
              font-semibold
              tracking-[0.3em]
              text-blue-200
            "
          >
            STEP 09 — IMAGE REVEAL
          </p>

          <h2
            className="
              text-4xl
              font-bold
              md:text-7xl
            "
          >
            Explore Beyond
          </h2>

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              text-white/80
              md:text-xl
            "
          >
            스크롤을 내릴수록 새로운 세상이 펼쳐집니다.
          </p>
        </div>
      </div>

      {/* 좌측 하단 안내 */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-8
          left-8
          z-20
          text-sm
          text-white/60
        "
      >
        SCROLL TO EXPAND
      </div>
    </section>
  );
}
