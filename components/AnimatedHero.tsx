"use client";

// React DOM 참조
import { useRef } from "react";

// GSAP 기본 라이브러리
import gsap from "gsap";

// React 전용 GSAP 훅
import { useGSAP } from "@gsap/react";

// 텍스트 분할 플러그인
import { SplitText } from "gsap/SplitText";

// 스크롤 애니메이션 플러그인
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

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

  // Hero 텍스트 콘텐츠 전체
  const contentRef = useRef<HTMLDivElement>(null);

  // 배경 동영상
  const videoRef = useRef<HTMLVideoElement>(null);

  // 동영상 위의 어두운 오버레이
  const overlayRef = useRef<HTMLDivElement>(null);

  // ========================================
  // 2. GSAP 애니메이션
  // ========================================

  useGSAP(
    () => {
      const section = containerRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;
      const buttons = buttonRef.current;
      const content = contentRef.current;
      const overlay = overlayRef.current;
      const video = videoRef.current;

      // DOM 준비 확인
      if (
        !section ||
        !title ||
        !description ||
        !buttons ||
        !content ||
        !overlay
      ) {
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

      // ========================================
      // 4. 스크롤에 따른 배경 밝기 변화
      // ========================================

      // 인트로가 끝난 상태를 기준으로
      // 스크롤 밝기 애니메이션을 실행
      const scrollTimeline = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          // Hero 영역을 기준으로 감지
          trigger: section,

          // Hero가 화면 상단에 있을 때 시작
          start: "top top",

          // 화면 높이의 120%만큼 스크롤
          end: () => `+=${window.innerHeight * 0.5}`,

          // 영상이 밝아지는 동안 화면 고정
          pin: true,

          // 스크롤 진행도에 따라 애니메이션 제어
          scrub: 1,

          // 브라우저 크기 변경 시 재계산
          invalidateOnRefresh: true,

          // 화면 고정 전환을 자연스럽게 처리
          anticipatePin: 1,

          // 디버깅 표시
          markers: false,
        },
      });

      // ========================================
      // 5. 어두운 오버레이 제거
      // ========================================

      scrollTimeline.fromTo(
        overlay,
        {
          // 시작: 어두운 오버레이 완전히 적용
          opacity: 1,
        },
        {
          // 종료: 오버레이를 거의 제거
          opacity: 0.08,

          // 전체 확대 과정 중 2초 비중
          duration: 2,
        },
        0,
      );

      // ========================================
      // 6. 스크롤에 따른 텍스트 퇴장
      // ========================================

      scrollTimeline.to(
        content,
        {
          // 텍스트를 위로 이동
          y: -80,

          // 영상이 밝아지면서 텍스트 사라짐
          opacity: 0,

          // 스크롤 진행 초반부터 중반까지 실행
          duration: 1.5,
        },
        0.3,
      );

      // ========================================
      // 7. 밝아진 영상 잠시 유지
      // ========================================

      scrollTimeline.to(
        {},
        {
          // 영상이 잘 보이는 구간 확보
          duration: 0.8,
        },
      );

      // ========================================
      // 8. 컴포넌트 정리
      // ========================================

      return () => {
        // SplitText가 변경한 HTML 원상복구
        split.revert();

        // 나머지 GSAP 및 ScrollTrigger는
        // useGSAP이 자동으로 정리
      };
    },
    {
      scope: containerRef,
    },
  );

  // ========================================
  // 9. Hero 화면 JSX
  // ========================================

  return (
    <section
      ref={containerRef}
      className="
        relative isolate
        flex h-screen min-h-[600px]
        items-center justify-center
        overflow-hidden
        bg-[#111711]
        px-6 text-[#F5F1E7]
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

      {/* =====================================
          스크롤에 따라 투명해지는 오버레이

          시작: 영상 어둡게
          종료: 영상 밝게 표시
      ===================================== */}

      <div
        ref={overlayRef}
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-gradient-to-r
          from-[#111711]/95
          via-[#111711]/80
          to-[#111711]/60
        "
      />

      {/* =====================================
          메인 콘텐츠
      ===================================== */}

      <div
        ref={contentRef}
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
            text-[#B2C69F]
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
            href="/projects"
            data-cursor-hover
            className="
              text-sm font-medium
              text-[#F5F1E7]
              underline underline-offset-8
              transition-colors
              hover:text-[#B2C69F]
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
