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

// 글자 및 줄 분할 플러그인
import { SplitText } from "gsap/SplitText";

// 필요한 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// ==========================================
// 소개할 핵심 역량
// ==========================================

const strengths = [
  {
    number: "01",
    title: "Music",
    subtitle: "음악과 공연예술",
    description: "타악기 전공을 바탕으로 쌓아온 연주 경험과 음악적 전문성",
  },
  {
    number: "02",
    title: "Education",
    subtitle: "음악교육과 소통",
    description: "학교와 문화센터에서 진행한 드럼 및 타악기 교육 경험",
  },
  {
    number: "03",
    title: "Development",
    subtitle: "기술과 디지털 표현",
    description: "웹 개발과 인터랙션을 활용하여 새로운 경험을 구현",
  },
];

export default function AboutSection() {
  // ========================================
  // 1. DOM 참조
  // ========================================

  // About 전체 섹션
  const sectionRef = useRef<HTMLElement>(null);

  // 영문 대형 제목
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 공연 이미지
  const imageRef = useRef<HTMLDivElement>(null);

  // 자기소개 영역
  const storyRef = useRef<HTMLDivElement>(null);

  // 세 가지 역량 카드 영역
  const strengthsRef = useRef<HTMLDivElement>(null);

  // ========================================
  // 2. GSAP 애니메이션
  // ========================================

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const image = imageRef.current;
      const story = storyRef.current;
      const cards = strengthsRef.current;

      // DOM이 준비되지 않았을 경우 종료
      if (!section || !title || !image || !story || !cards) {
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
      // 3. 대형 제목 SplitText
      // =====================================

      // 텍스트를 줄 단위로 나누기
      const split = SplitText.create(title, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        aria: "auto",

        // 화면 크기 변경으로 줄이 바뀌면 다시 실행
        onSplit(self) {
          // 현재 줄을 대상으로 애니메이션 생성
          return gsap.from(self.lines, {
            yPercent: 110,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",

            // 제목이 화면에 들어오면 실행
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              once: true,
            },
          });
        },
      });

      // =====================================
      // 4. 이미지 등장 및 확대 해제
      // =====================================

      // 이미지 컨테이너가 아래에서 등장
      gsap.from(image, {
        y: 80,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: image,
          start: "top 85%",
          once: true,
        },
      });

      // 이미지 내부의 실제 사진만 선택
      const photo = image.querySelector(".about-photo");

      if (photo) {
        // 확대된 사진이 원래 크기로 돌아옴
        gsap.fromTo(
          photo,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",

            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // =====================================
      // 5. 자기소개 문단 순차 등장
      // =====================================

      gsap.from(".about-story-item", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",

        scrollTrigger: {
          trigger: story,
          start: "top 85%",
          once: true,
        },
      });

      // =====================================
      // 6. 역량 카드 등장
      // =====================================

      gsap.from(".about-skill-card", {
        y: 60,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power2.out",

        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
          once: true,
        },
      });

      // =====================================
      // 7. 컴포넌트 정리
      // =====================================

      return () => {
        // SplitText가 변경한 HTML 복구
        split.revert();

        // 나머지 GSAP 객체는 useGSAP이 정리
      };
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
      ref={sectionRef}
      className="
        relative scroll-mt-24
        overflow-hidden
        bg-[#F3F0E8]
        px-6 py-28
        text-[#20291F]
        md:px-16 md:py-36
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
            border-[#BCC5B4]
            pb-6
          "
        >
          <span
            className="
              text-xs font-semibold
              tracking-[0.25em]
              text-[#667C53]
            "
          >
            01 / ABOUT ME
          </span>

          <span
            className="
              text-xs tracking-[0.15em]
              text-[#6D7469]
            "
          >
            ARTIST & CREATIVE DEVELOPER
          </span>
        </div>

        {/* ==================================
            메인 영문 제목
        ================================== */}

        <h2
          ref={titleRef}
          className="
            portfolio-heading
            max-w-6xl
            text-5xl leading-[1.15]
            md:text-7xl
            lg:text-[clamp(4rem,7vw,7rem)]
          "
        >
          Art is my foundation.
          <br />
          <span className="text-[#71865C]">Technology is my language.</span>
        </h2>

        {/* ==================================
            공연 사진 + 자기소개
        ================================== */}

        <div
          className="
            mt-20 grid
            items-center gap-12
            lg:grid-cols-2 lg:gap-20
          "
        >
          {/* 왼쪽: 공연 사진 */}
          <div
            ref={imageRef}
            className="
              relative aspect-[4/5]
              overflow-hidden
              bg-[#263126]
            "
          >
            <Image
              src="/about-performance.jpg"
              alt="타악기 공연 및 연주 활동"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="about-photo object-cover"
            />

            {/* 사진 아래 그라데이션 */}
            <div
              className="
                absolute inset-x-0 bottom-0
                bg-gradient-to-t
                from-black/65
                to-transparent
                px-6 pb-6 pt-24
              "
            >
              <p
                className="
                  text-xs tracking-[0.2em]
                  text-white
                "
              >
                MUSIC · PERFORMANCE · EXPRESSION
              </p>
            </div>
          </div>

          {/* 오른쪽: 자기소개 */}
          <div ref={storyRef}>
            <p
              className="
                about-story-item
                mb-6 text-xs
                font-semibold
                tracking-[0.25em]
                text-[#667C53]
              "
            >
              MY STORY
            </p>

            <h3
              className="
                about-story-item
                mb-10 text-3xl
                font-semibold
                leading-[1.5]
                md:text-4xl
              "
            >
              음악으로 시작한 경험을
              <br />
              기술로 확장합니다.
            </h3>

            <div
              className="
                space-y-6
                text-base leading-[2]
                text-[#566052]
              "
            >
              <p className="about-story-item">
                대학에서 타악기를 전공하며 음악과 공연예술 분야의 전문성을
                쌓아왔습니다.
              </p>

              <p className="about-story-item">
                학교와 문화센터에서 드럼 및 타악기 수업을 진행하며 다양한
                사람들과 소통하고, 함께 성장하는 경험을 쌓았습니다.
              </p>

              <p className="about-story-item">
                이제는 예술적 감각을 바탕으로 웹 개발과 인터랙티브 기술을 활용해
                새로운 디지털 경험을 구현하고 있습니다.
              </p>
            </div>

            {/* 자기소개 하단 문구 */}
            <div
              className="
                about-story-item
                mt-12 border-t
                border-[#BCC5B4]
                pt-7
              "
            >
              <p
                className="
                  font-serif text-xl
                  italic text-[#667C53]
                "
              >
                Creating beyond boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================
            핵심 역량 3가지
        ================================== */}

        <div
          ref={strengthsRef}
          className="
            mt-28 grid gap-10
            md:grid-cols-3
          "
        >
          {strengths.map((item) => (
            <article
              key={item.number}
              className="
                about-skill-card
                border-t
                border-[#AEB8A5]
                pt-6
              "
            >
              {/* 번호 */}
              <p
                className="
                  mb-8 text-sm
                  text-[#667C53]
                "
              >
                {item.number}
              </p>

              {/* 영문 역량 */}
              <h4
                className="
                  font-serif
                  text-3xl
                  md:text-4xl
                "
              >
                {item.title}
              </h4>

              {/* 한글 역량 */}
              <p
                className="
                  mt-3 text-sm
                  font-semibold
                  text-[#394A35]
                "
              >
                {item.subtitle}
              </p>

              {/* 설명 */}
              <p
                className="
                  mt-5 max-w-xs
                  text-sm leading-7
                  text-[#667064]
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
