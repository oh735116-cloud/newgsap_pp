"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

// ==========================================
// 1. 자기소개서 기반 5개 챕터
// ==========================================

type GraphicType =
  | "music"
  | "understanding"
  | "education"
  | "performance"
  | "development";

type Chapter = {
  number: string;
  category: string;
  english: string;
  description: string;
  keywords: string[];
  graphic: GraphicType;
};

const chapters: Chapter[] = [
  {
    number: "01",
    category: "FOUNDATION",
    english: "The Beginning of Rhythm",
    description:
      "2016–2023년 타악기를 전공했습니다. 연주와 합주를 통해 음악적 표현과 협업의 기초를 다졌습니다.",
    keywords: ["PERCUSSION", "ENSEMBLE", "EXPRESSION"],
    graphic: "music",
  },
  {
    number: "02",
    category: "UNDERSTANDING",
    english: "Different Rhythms, One Harmony",
    description:
      "사람마다 다른 속도와 강점을 존중합니다. 음악 안에서 각자의 방식으로 참여하고 함께 성장하는 가치를 배웠습니다.",
    keywords: ["LISTENING", "RESPECT", "GROWTH"],
    graphic: "understanding",
  },
  {
    number: "03",
    category: "EDUCATION",
    english: "Learning Through Music",
    description:
      "학교와 문화센터에서 드럼과 타악기를 지도했습니다. 학생 수준에 맞춘 수업과 합주로 배움의 과정을 함께했습니다.",
    keywords: ["DRUM", "EDUCATION", "COMMUNICATION"],
    graphic: "education",
  },
  {
    number: "04",
    category: "PERFORMANCE",
    english: "Beyond the Stage",
    description:
      "군악대와 공연·문화행사에서 현장 경험을 쌓았습니다. 지원서 작성 보조로 문화예술사업의 준비 과정도 익혔습니다.",
    keywords: ["PERFORMANCE", "CULTURE", "TEAMWORK"],
    graphic: "performance",
  },
  {
    number: "05",
    category: "EXPANSION",
    english: "From Rhythm to Creative Code",
    description:
      "약 7개월의 IT 교육으로 웹 개발을 배웠습니다. 웹 프로젝트와 인터랙션을 구현하며 음악적 감각을 디지털 경험으로 확장합니다.",
    keywords: ["WEB DEVELOPMENT", "GSAP", "CREATIVE CODING"],
    graphic: "development",
  },
];

// ==========================================
// 2. 큐브 표면에 배치할 음악 SVG
// ==========================================

// 별도의 사진이나 이미지 파일이 필요하지 않습니다.
// SVG는 선택된 큐브 면 위에만 표시됩니다.

function MusicSymbol({ type }: { type: GraphicType }) {
  if (type === "music") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* 오선지 */}
        {[105, 125, 145, 165, 185].map((y) => (
          <line
            key={y}
            x1="15"
            x2="285"
            y1={y}
            y2={y}
            stroke="#8DA983"
            strokeWidth="1.5"
            opacity="0.7"
          />
        ))}

        {/* 음표 */}
        {[
          { x: 65, y: 165 },
          { x: 130, y: 145 },
          { x: 195, y: 125 },
          { x: 255, y: 155 },
        ].map((note, i) => (
          <g key={i}>
            <ellipse
              cx={note.x}
              cy={note.y}
              rx="11"
              ry="8"
              fill="#E1EED4"
              transform={`rotate(-20 ${note.x} ${note.y})`}
            />
            <path
              d={`M${note.x + 10} ${note.y} v-49`}
              stroke="#E1EED4"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "understanding") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* 서로 다른 두 개의 파형 */}
        <path
          d="M15 105 Q45 35 75 105 T135 105 T195 105 T255 105 T285 105"
          stroke="#D6E7C9"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M15 195 Q55 255 95 195 T175 195 T255 195 T285 195"
          stroke="#7CA47B"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle
          cx="150"
          cy="150"
          r="83"
          stroke="#B6D0A9"
          strokeWidth="2"
          opacity="0.5"
        />

        <circle cx="150" cy="150" r="8" fill="#E1EED4" />
      </svg>
    );
  }

  if (type === "education") {
    const pads = [
      { x: 30, y: 37 },
      { x: 158, y: 37 },
      { x: 30, y: 162 },
      { x: 158, y: 162 },
    ];

    return (
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {pads.map((pad, i) => (
          <g key={i}>
            <rect
              x={pad.x}
              y={pad.y}
              width="112"
              height="105"
              rx="18"
              fill="#304A33"
              stroke="#A8C59D"
              strokeWidth="2"
            />

            <rect
              x={pad.x + 11}
              y={pad.y + 11}
              width="90"
              height="83"
              rx="12"
              fill={i === 1 ? "#76996B" : "#4A7248"}
              opacity="0.75"
            />

            <circle cx={pad.x + 56} cy={pad.y + 52} r="12" fill="#D5E8C8" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "performance") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path d="M150 15 L22 275 L278 275 Z" fill="#B7D1A8" opacity="0.12" />

        {/* 공연 사운드 파형 */}
        {Array.from({ length: 25 }, (_, i) => {
          const height =
            15 + Math.abs(Math.sin(i * 0.78) * Math.cos(i * 0.19)) * 180;

          return (
            <rect
              key={i}
              x={22 + i * 10.6}
              y={150 - height / 2}
              width="5"
              height={height}
              rx="2.5"
              fill={i % 3 === 0 ? "#DFEDD3" : "#86A77C"}
            />
          );
        })}
      </svg>
    );
  }

  // 개발: 리듬 파형과 코드 기호
  return (
    <svg
      viewBox="0 0 300 300"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 19 }, (_, i) => {
        const height = 20 + Math.abs(Math.sin(i * 0.7)) * 110;

        return (
          <rect
            key={i}
            x={25 + i * 14}
            y={150 - height / 2}
            width="5"
            height={height}
            rx="2.5"
            fill="#789E78"
            opacity="0.7"
          />
        );
      })}

      <g
        stroke="#E0EDD4"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M100 110 L60 150 L100 190" />
        <path d="M200 110 L240 150 L200 190" />
        <path d="M175 90 L125 210" />
      </g>
    </svg>
  );
}

// 번호와 카테고리 다음에 영어 부제와 짧은 한국어 설명을 배치합니다.
function ChapterContent({ chapter }: { chapter: Chapter }) {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="font-serif text-5xl text-[#B8CEA8]">
          {chapter.number}
        </span>
        <span className="text-xs tracking-[0.2em] text-[#AFC69F]">
          {chapter.category}
        </span>
      </div>
      <h3 className="font-serif text-3xl leading-tight text-[#E1EED4] lg:text-4xl">
        {chapter.english}
      </h3>
      <p className="mt-6 break-keep text-base leading-8 text-[#C1CDBB]">
        {chapter.description}
      </p>
      <ul aria-label="키워드" className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
        {chapter.keywords.map((keyword) => (
          <li
            key={keyword}
            className="border-b border-[#7F9875]/60 py-2 text-[10px] tracking-wider text-[#B2C9A6]"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 네 옆면과 윗면에 챕터를 배치하고 아래는 빈 면으로 둡니다.
const faceRotations = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

export default function ArtisticCareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cube = cubeRef.current;
      const text = textRef.current;
      if (!section || !cube || !text) return;
      const mm = gsap.matchMedia();
      // 화면 크기와 모션 설정이 바뀌면 pin과 애니메이션을 해제합니다.
      mm.add(
        "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = Array.from(
            text.querySelectorAll<HTMLElement>(".career-panel"),
          );
          const graphics = Array.from(
            cube.querySelectorAll<HTMLElement>(".career-graphic"),
          );
          const playhead = { position: 0 };
          const render = () => {
            const position = playhead.position;
            const active = Math.min(4, Math.max(0, Math.round(position)));
            // 회전 중앙에서는 모든 SVG를 숨겨 다음 그림의 옆면 노출을 막습니다.
            const alpha = gsap.utils.clamp(
              0,
              1,
              (0.28 - Math.abs(position - active)) / 0.18,
            );
            // X 회전을 바깥쪽에 적용해 마지막 윗면이 정면을 향하게 합니다.
            cube.style.transform =
              "rotateX(" +
              -90 * Math.max(0, position - 3) +
              "deg) rotateY(" +
              -90 * Math.min(position, 3) +
              "deg)";
            graphics.forEach((graphic, index) => {
              gsap.set(graphic, { autoAlpha: index === active ? alpha : 0 });
            });
            panels.forEach((panel, index) => {
              gsap.set(panel, {
                autoAlpha: index === active ? alpha : 0,
                y: (1 - alpha) * 10,
              });
              panel.setAttribute(
                "aria-hidden",
                String(index !== active || alpha === 0),
              );
            });
            gsap.set(progressRef.current, { scaleX: position / 4 });
            if (indicatorRef.current)
              indicatorRef.current.textContent = chapters[active].number;
          };
          render();
          gsap.to(playhead, {
            position: 4,
            ease: "none",
            onUpdate: render,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + window.innerHeight * 4,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          return () => {
            cube.style.removeProperty("transform");
            panels.forEach((panel) => panel.removeAttribute("aria-hidden"));
          };
        },
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="artistic-works"
      ref={sectionRef}
      aria-label="Artistic Journey"
      className="relative isolate overflow-hidden bg-[#111711] text-[#F5F1E7]"
    >
      <div className="career-desktop relative h-screen bg-[radial-gradient(ellipse_at_72%_50%,#263B29_0%,#111711_65%)]">
        <h2 className="absolute left-[7vw] top-20 text-xs tracking-[0.3em] text-[#B7CAA4]">
          02 / ARTISTIC JOURNEY
        </h2>
        <div className="absolute inset-y-0 left-0 z-20 w-1/2 py-36 pl-[7vw] pr-[3vw]">
          <div ref={textRef} className="relative h-full">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.number}
                className={
                  "career-panel absolute inset-0 flex items-center " +
                  (index === 0 ? "visible" : "invisible opacity-0")
                }
              >
                <ChapterContent chapter={chapter} />
              </article>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center"
          aria-hidden="true"
        >
          <div className="career-scene" style={{ perspective: "1200px" }}>
            <div
              ref={cubeRef}
              className="career-cube relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {faceRotations.map((rotation, index) => (
                <div
                  key={rotation}
                  className="absolute inset-0 border border-[#8DA983]/40 bg-[#243A29]"
                  style={{
                    transform:
                      rotation + " translateZ(calc(var(--cube-size) / 2))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* 빈 면으로 입체감을 유지하고 그래픽은 한 면에만 표시합니다. */}
                  {chapters[index] && (
                    <div
                      className={
                        "career-graphic absolute inset-0 p-[12%] " +
                        (index === 0 ? "visible" : "invisible opacity-0")
                      }
                    >
                      <MusicSymbol type={chapters[index].graphic} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-[7%] w-[86%] text-[#B7CAA4]">
          <div className="mb-4 flex justify-between text-[10px] tracking-[0.2em]">
            <span>SCROLL TO ROTATE ↓</span>
            <span>
              <span ref={indicatorRef}>01</span> / 05
            </span>
          </div>
          <div className="h-px bg-white/20">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-[#C7DCB8]"
            />
          </div>
          <div className="mt-4 flex justify-between gap-2 text-[9px] tracking-wider">
            {chapters.map((chapter) => (
              <span key={chapter.number}>{chapter.category}</span>
            ))}
          </div>
        </div>
      </div>
      {/* 모바일·낮은 화면·모션 감소 환경에서는 정적 목록을 사용합니다. */}
      <div className="career-static">
        <h2 className="px-6 pb-10 pt-24 text-xs tracking-[0.3em] text-[#B7CAA4]">
          02 / ARTISTIC JOURNEY
        </h2>
        {chapters.map((chapter) => (
          <article
            key={chapter.number}
            className="border-t border-white/10 px-6 py-12"
          >
            <div className="mx-auto max-w-2xl">
              <ChapterContent chapter={chapter} />
              <div className="mx-auto mt-8 h-[240px] w-[240px]">
                <MusicSymbol type={chapter.graphic} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <style jsx>{`
        .career-desktop {
          display: none;
        }
        .career-static {
          display: block;
        }
        .career-scene {
          --cube-size: clamp(200px, 27vw, 380px);
        }
        .career-cube {
          width: var(--cube-size);
          height: var(--cube-size);
        }
        @media (min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference) {
          .career-desktop {
            display: block;
          }
          .career-static {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
