"use client";

// React DOM 참조
import { useRef } from "react";

// Next.js 이미지 최적화
import Image from "next/image";

// GSAP 기본 라이브러리
import gsap from "gsap";

// React 전용 GSAP 훅
import { useGSAP } from "@gsap/react";

// 스크롤 애니메이션 플러그인
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 필요한 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutSection() {
  // ========================================
  // 1. DOM 참조
  // ========================================

  // About 전체 섹션
  const sectionRef = useRef<HTMLElement>(null);

  // 성장과정 확장 전환 영역
  const journeyRef = useRef<HTMLDivElement>(null);
  const chapterOneRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const chapterTwoRef = useRef<HTMLDivElement>(null);

  // ========================================
  // 2. GSAP 애니메이션
  // ========================================

  useGSAP(
    () => {
      const section = sectionRef.current;
      const journey = journeyRef.current;
      const chapterOne = chapterOneRef.current;
      const reveal = revealRef.current;
      const chapterTwo = chapterTwoRef.current;

      // DOM이 준비되지 않았을 경우 종료
      if (
        !section ||
        !journey ||
        !chapterOne ||
        !reveal ||
        !chapterTwo
      ) {
        return;
      }

      // 사용자의 애니메이션 감소 설정 확인
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // 모션 감소 설정을 사용하는 경우
      // 텍스트와 이미지를 정적인 상태로 표시
      if (reducedMotion) return;

      // =====================================
      // 3. 성장과정: 1부 → BUT → 2부
      // =====================================

      gsap.set(reveal, {
        clipPath: "circle(0vmax at 50% 50%)",
      });
      gsap.set(chapterTwo, { autoAlpha: 0 });
      gsap.set(".about-part-two-item", { y: 48, autoAlpha: 0 });

      const journeyTimeline = gsap.timeline({
        scrollTrigger: {
          id: "about-expanding-reveal",
          trigger: journey,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      journeyTimeline
        .addLabel("partOne")
        .to(
          chapterOne,
          {
            scale: 0.94,
            autoAlpha: 0.18,
            filter: "blur(8px)",
            duration: 0.8,
          },
          0.9,
        )
        .to(
          reveal,
          {
            clipPath: "circle(150vmax at 50% 50%)",
            duration: 1.1,
            ease: "none",
          },
          1,
        )
        .to(
          ".about-but-word",
          {
            scale: 1.12,
            letterSpacing: "0.2em",
            duration: 0.55,
          },
          1.05,
        )
        .to(
          ".about-but-word",
          {
            y: -28,
            autoAlpha: 0,
            duration: 0.35,
          },
          1.65,
        )
        .set(chapterTwo, { autoAlpha: 1 }, 1.72)
        .to(
          ".about-part-two-item",
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.75,
          },
          1.72,
        )
        .addLabel("partTwo");

    },
    {
      // 현재 About 섹션 내부에서만 선택자 적용
      scope: sectionRef,
    },
  );

  // ========================================
  // 8. JSX 화면 구성
  // ========================================

  return (
    <section
      id="about"
      data-header-tone="dark"
      ref={sectionRef}
      className="
        relative scroll-mt-24
        bg-[#edf2f9]
        px-6 pt-28 pb-0
        text-[#192a46]
        md:px-16 md:pt-36 md:pb-0
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* ==================================
            상단 섹션 정보
        ================================== */}

        <div
          className="
            mb-14 flex flex-wrap
            items-center justify-between
            gap-4 border-b
            border-[#b7c5da]
            pb-6
          "
        >
          <span
            className="
              text-xs font-semibold
              tracking-[0.25em]
              text-[#4c658b]
            "
          ></span>

          <span
            className="
              text-xs tracking-[0.15em]
              text-[#63718a]
            "
          >
            ART & IT
          </span>
        </div>

        {/* ==================================
            성장과정 1부 → BUT → 2부
        ================================== */}

        <div
          ref={journeyRef}
          style={{ marginLeft: "calc(50% - 50vw)" }}
          className="
            relative mt-20
            h-[400svh] w-screen
            bg-[#edf2f9]
            motion-reduce:h-auto
          "
        >
          <div
            className="
              sticky top-0 h-[100svh]
              overflow-hidden bg-[#edf2f9]
              motion-reduce:relative motion-reduce:h-auto
              motion-reduce:overflow-visible
            "
          >
            {/* 1부: 기존 성장과정 */}
            <div
              ref={chapterOneRef}
              className="
              absolute inset-0
              flex items-center
              px-6 py-10
              md:px-16 md:py-20
              motion-reduce:relative motion-reduce:min-h-[100svh]
            "
            >
              <div
                className="
                mx-auto grid w-full max-w-7xl
                items-center gap-6
                lg:grid-cols-2 lg:gap-20
              "
              >
                <div
                  className="
                  relative h-[24svh]
                  overflow-hidden
                  bg-[#1c2e4b]
                  md:h-auto md:aspect-[4/5] md:max-h-[70svh]
                "
                >
                  <Image
                    src="/about-performance.jpg"
                    alt="타악기 공연 및 연주 활동"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="about-photo object-cover"
                  />

                  <div
                    className="
                    absolute inset-x-0 bottom-0
                    bg-gradient-to-t from-black/65
                    to-transparent px-6 pb-6 pt-24
                  "
                  >
                    <p className="text-xs tracking-[0.2em] text-white">
                      MUSIC · PERFORMANCE · EXPRESSION
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className="
                    about-story-item mb-3 md:mb-5
                    text-xs font-semibold
                    tracking-[0.25em] text-[#4c658b]
                  "
                  >
                    PART 01 · 무대를 이해하는 시간
                  </p>

                  <h3
                    className="
                    about-story-item mb-4 md:mb-8
                    text-3xl font-semibold leading-[1.35]
                    md:text-4xl
                  "
                  >
                    무대 위에서 시작된 공연의 꿈.
                  </h3>

                  <div
                    className="
                    space-y-3 text-sm leading-[1.65]
                    text-[#4e607c]
                    md:space-y-5 md:text-base md:leading-[1.9]
                  "
                  >
                    <p className="about-story-item">
                      어린 시절부터 음악과 공연을 좋아했습니다. 중학교 밴드부와
                      고등학교 관악부에서 합주하며 서로의 소리에 귀 기울이는
                      법을 배웠고,
                      <br /> 대학에서 타악기를 전공하며 군악대에서도 연주를
                      이어갔습니다.
                    </p>

                    <p className="about-story-item">
                      동료들과 호흡을 맞추고 준비한 음악을 관객에게 전하는
                      순간은
                      <br />
                      공연을 계속하고 싶은 이유였습니다.
                    </p>

                    <p className="about-story-item">
                      당시에는 연주자로 무대에 서는 것이 제가 가장 하고 싶은
                      일이라고 생각했습니다.
                      <br />
                      그때의 저는 무대 위에서 음악을 전하는 사람을 꿈꿨습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 전환점: 작은 원이 화면 전체로 확장됩니다. */}
            <div
              ref={revealRef}
              data-header-tone="light"
              className="
              pointer-events-none absolute inset-0 z-10
              overflow-hidden bg-[#0c1629]
              text-[#f1f5fc]
              [will-change:clip-path]
              motion-reduce:relative motion-reduce:min-h-[100svh]
              motion-reduce:[clip-path:none!important]
            "
            >
              <div
                className="
                about-but-word absolute inset-0
                flex items-center justify-center
                text-3xl font-semibold
                tracking-[0.08em] md:text-5xl
                motion-reduce:hidden
              "
              >
                BUT
              </div>

              {/* 2부: 새로운 설명 페이지 */}
              <div
                ref={chapterTwoRef}
                className="
                absolute inset-0
                flex items-center
                px-6 py-20 md:px-16
                motion-reduce:relative motion-reduce:min-h-[100svh]
                motion-reduce:opacity-100
              "
              >
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute inset-y-0 left-0 w-full lg:w-[64%]">
                    <Image
                      src="/stage-planner-background.png"
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 64vw"
                      className="
                        object-cover object-[38%_48%]
                        opacity-85 saturate-75
                      "
                    />
                  </div>
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(90deg,rgba(12,22,41,0.12)_0%,rgba(12,22,41,0.25)_34%,rgba(12,22,41,0.78)_52%,#0c1629_68%,#0c1629_100%)]
                    "
                  />
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(180deg,rgba(12,22,41,0)_50%,rgba(12,22,41,0.72)_82%,#0c1629_100%)]
                    "
                  />
                </div>

                <div
                  className="
                  relative z-10 mx-auto grid w-full max-w-7xl
                  gap-12 lg:grid-cols-[0.75fr_1.25fr]
                  lg:items-end lg:gap-24
                "
                >
                  <div className="hidden lg:block" aria-hidden="true" />

                  <div>
                    <h3
                      className="
                      about-part-two-item
                      text-[clamp(2.6rem,6vw,6.6rem)]
                      font-semibold leading-[1.02]
                      tracking-[-0.06em]
                      motion-reduce:translate-y-0 motion-reduce:opacity-100
                    "
                    >
                      이제는 무대를 <br />
                      만드는 사람으로
                    </h3>

                    <div
                      className="
                      about-part-two-item mt-10
                      max-w-2xl border-t border-[#425574]
                      pt-7 text-base leading-[1.9]
                      text-[#bdcbe0]
                      motion-reduce:translate-y-0 motion-reduce:opacity-100
                    "
                    >
                      <p>
                        오페라와 뮤지컬을 즐겨 보면서 관심은 연주를 넘어 공연
                        전체로 넓어졌습니다.
                      </p>
                      <p className="mt-5">
                        특히 『오페라의 유령』의 움직이는 샹들리에는 음악과 무대
                        연출이 어우러질 때 장면의 감동이 얼마나 커지는지 느끼게
                        했습니다.
                      </p>
                      <p className="mt-5">
                        이후 무대 설치 현장에서 하나의 장면이 수많은 기술과
                        협업으로 완성되는 과정을 경험했습니다.
                      </p>
                      <p className="mt-5">
                        그 과정에 참여하며, 직접 연주할 때와는 다른 보람을
                        발견했습니다. 이제는 다양한 의견과 아이디어를 모아
                        무대를 함께 만들고, 공연의 흐름과 관객의 경험을 기획하는
                        일에서 더 큰 가치를 느낍니다.
                      </p>
                      <p className="mt-5">
                        이제는 다양한 의견과 아이디어를 모아 무대를 함께 만들고,
                        공연의 흐름과 관객의 경험을 기획하는 일에서 더 큰 가치를
                        느낍니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
