"use client";

// React DOM 참조
import { useRef } from "react";

// GSAP 기본 라이브러리
import gsap from "gsap";

// React 전용 GSAP 훅
import { useGSAP } from "@gsap/react";

// 텍스트 분할 플러그인
import { SplitText } from "gsap/SplitText";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, SplitText);

// false로 바꾸면 필름 질감을 끄고 기존 배경 오버레이로 복원합니다.
const HERO_FILM_OVERLAY = true;

export default function AnimatedHero() {
  // ========================================
  // 1. DOM 요소 참조
  // ========================================

  // Hero 전체 영역
  const containerRef = useRef<HTMLElement>(null);

  // 메인 제목
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 소개 문구
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // 버튼 영역
  const buttonRef = useRef<HTMLDivElement>(null);

  // 배경 동영상
  const videoRef = useRef<HTMLVideoElement>(null);

  // ========================================
  // 2. GSAP 애니메이션
  // ========================================

  useGSAP(
    () => {
      const section = containerRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;
      const buttons = buttonRef.current;
      const video = videoRef.current;

      // DOM 준비 확인
      if (!section || !title || !description || !buttons) {
        return;
      }

      // 접근성: 움직임 감소 설정
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        video?.pause();
        return;
      }

      // ========================================
      // 3. 첫 화면 등장 애니메이션
      // ========================================

      // 제목을 줄 단위로 분할
      const split = SplitText.create(title, {
        type: "lines",
        mask: "lines",
        aria: "auto",
      });

      // 첫 화면 인트로 타임라인
      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 메인 제목 등장
      introTimeline.from(split.lines, {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.18,
      });

      // 설명 문구 등장
      introTimeline.from(
        description,
        {
          y: 35,
          autoAlpha: 0,
          duration: 0.9,
        },
        "-=0.6",
      );

      // 버튼 등장
      introTimeline.from(
        buttons,
        {
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      return () => {
        // SplitText가 변경한 HTML 원상복구
        split.revert();

        // useGSAP cleans up the remaining intro animations.
      };
    },
    {
      scope: containerRef,
    },
  );

  // ========================================
  // 4. Hero 화면 JSX
  // ========================================

  return (
    <section
      data-header-tone="light"
      ref={containerRef}
      className="
        relative isolate
        flex h-screen min-h-[600px]
        items-center justify-center
        overflow-hidden
        bg-[#0c1629]
        px-6 text-[#f1f5fc]
        md:px-16
      "
    >
      {/* =====================================
          배경 동영상
      ===================================== */}

      <div
        className="
          absolute inset-0
          -z-20 overflow-hidden
        "
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-stage.jpg"
          className="
            h-full w-full object-cover
          "
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          브라우저가 동영상을 지원하지 않습니다.
        </video>
      </div>

      {/* 영상 위에만 고정 질감을 적용해 글자와 버튼은 선명하게 유지합니다. */}
      {HERO_FILM_OVERLAY ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(12,22,41,0.97) 0%, rgba(21,35,59,0.86) 38%, rgba(32,51,82,0.64) 70%, rgba(12,22,41,0.58) 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "url('/hero-film-grain.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
            }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            -z-10
            bg-gradient-to-r
            from-[#0c1629]/95
            via-[#0c1629]/80
            to-[#0c1629]/60
          "
        />
      )}

      {/* =====================================
          메인 콘텐츠
      ===================================== */}

      <div
        className="
          relative z-10
          mx-auto w-full max-w-7xl
        "
      >
        {/* 상단 소개 */}
        <p
          className="
            mb-8
            text-xs font-semibold
            tracking-[0.35em]
            text-[#a9c2e8]
          "
        >
          MUSICIAN · ARTIST · CREATIVE DEVELOPER
        </p>

        {/* 메인 제목 */}
        <h1
          ref={titleRef}
          className="
            portfolio-heading
            max-w-5xl
            text-5xl
            sm:text-7xl
            lg:text-[clamp(5rem,9vw,9rem)]
          "
        >
          Art
          <br />
          and IT.
        </h1>

        {/* 소개 문구 */}
        <p
          ref={descriptionRef}
          className="
            portfolio-description
            mt-10 max-w-xl
            text-base md:text-lg
          "
        >
          음악과 공연예술의 경험을 바탕으로,
          <br />
          예술적 감각과 디지털 기술을 연결합니다.
          <br />
          새로운 경험을 설계하고 구현합니다.
        </p>

        {/* 이동 버튼 */}
        <div
          ref={buttonRef}
          className="
            mt-12 flex flex-wrap
            items-center gap-6
          "
        >
          <a
            href="#artistic-works"
            data-cursor-hover
            className="portfolio-button"
          >
            Explore My Art
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="#development-works"
            data-cursor-hover
            className="
              text-sm font-medium
              text-[#f1f5fc]
              underline underline-offset-8
              transition-colors
              hover:text-[#a9c2e8]
            "
          >
            View Development Projects →
          </a>
        </div>
      </div>

      {/* =====================================
          스크롤 안내
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute bottom-9 left-6
          z-20
          text-[11px]
          tracking-[0.3em]
          text-white/80
          md:left-16
        "
      >
        SCROLL TO EXPLORE ↓
      </div>
    </section>
  );
}
