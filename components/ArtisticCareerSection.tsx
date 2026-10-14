"use client";

import { useRef, useState } from "react";
import Image from "next/image";

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
  image: string;
  imageAlt: string;
};

const chapters: Chapter[] = [
  {
    number: "01",
    category: "FOUNDATION",
    english: "The Beginning of Rhythm",
    description:
      "2012년, 고등학교 관악부에서 타악기 파트를 맡으며 음악에 대한 관심은 더욱 깊어졌습니다.중학교 시절부터 드럼을 배워왔기에 타악기 연주는 익숙했지만, 여러 악기와 호흡을 맞추며 하나의 음악을 완성하는 경험은 새롭게 다가왔습니다.객석에서 공연을 바라보던 때와 달리, 직접 무대에 오르기 전 느꼈던 긴장감과 설렘은 지금도 생생하게 기억하고 있습니다.무대 뒤에서 공연을 기다리는 순간부터 연주를 마치고 내려오는 순간까지, 관객일 때는 알지 못했던 새로운 감정들을 경험했습니다.그때 처음 느꼈던 무대의 떨림은 지금까지도 이어지고 있으며, 음악과 공연예술의 길을 걸어가게 만든 소중한 시작점이 되었습니다.",
    keywords: ["PERCUSSION", "PASSION", "STAGE"],
    graphic: "music",
    image: "/01-foundation-upscaled.webp",
    imageAlt: "타악기 전공 및 합주 활동",
  },
  {
    number: "02",
    category: "COOPERATION",
    english: "Different Rhythms, One Harmony",
    description:
      "음악대학 재학 중 군악대에 지원하여 군 복무와 함께 음악 활동을 이어갔습니다.군악대에서는 다양한 연주와 공연에 참여하며 단체 음악의 중요성을 경험했습니다.개인의 연주 실력도 중요했지만, 여러 악기가 하나의 음악을 완성하기 위해서는 서로의 소리를 듣고 호흡을 맞추는 과정이 필요했습니다.정해진 일정과 규율 속에서 연습과 공연을 준비하며 책임감과 협동심을 배울 수 있었습니다.또한 여러 구성원과 함께 활동하면서 맡은 역할을 성실히 수행하는 자세의 중요성을 깨달았습니다.군악대에서의 경험은 음악적 역량뿐 아니라 조직 안에서 협력하고 적응하는 능력을 키우는 계기가 되었습니다.이때 배운 책임감과 협업의 가치는 이후 음악교육과 공연 활동에서도 중요한 밑거름이 되었습니다.",
    keywords: ["DICIPLINE", "HARMONY", "TEAMWORK"],
    graphic: "understanding",
    image: "/02-understanding.jpg",
    imageAlt: "음악으로 함께 소통하고 성장하는 활동",
  },
  {
    number: "03",
    category: "EDUCATION",
    english: "Learning Through Music",
    description:
      "졸업 후 약 3년간 여러 학교와 문화센터에서 드럼과 타악기를 지도하며 음악교육의 길을 걸었습니다.학생들에게 악보 읽기와 연주의 기초부터 합주에 필요한 협력과 소통의 중요성까지 가르쳤습니다.서로 다른 실력과 개성을 가진 학생들이 각자의 속도로 성장할 수 있도록 수업을 구성하고 지도했습니다.특히 오케스트라 활동에서는 자신의 연주뿐 아니라 다른 악기의 소리를 듣고 함께 호흡하는 방법을 알려주었습니다.정기연주회와 대회, 방학 중 집중교육을 준비하며 학생들과 하나의 목표를 향해 노력했습니다.그렇게 함께 준비한 정기연주회 무대는 학생들의 성장을 직접 확인할 수 있었던 뜻깊은 순간이었습니다.이 경험을 통해 음악을 직접 연주하는 기쁨뿐 아니라, 누군가의 성장을 돕고 함께 무대를 완성하는 보람을 배웠습니다.",
    keywords: ["TEACHING", "EDUCATION", "COMMUNICATION"],
    graphic: "education",
    image: "/03-education-upscaled.webp",
    imageAlt: "드럼 및 타악기 교육 활동",
  },
  {
    number: "04",
    category: "PERFORMANCE",
    english: "With the Stage",
    description:
      "무대에서는 클래식부터 마칭 퍼커션까지 다양한 장르의 공연에 참여했습니다.크로마앙상블, 경북타악앙상블, 마칭타악단체 매드라인, 노이앙상블 등 여러 연주단체에서 활동하며 폭넓은 무대 경험을 쌓았습니다.안동오케스트라의 ‘협주곡의 밤’에 출연했으며, 크로마앙상블과 함께 경주 APEC 관련 기념행사에서도 연주했습니다.군악대 복무 중에는 다수의 공식 행사와 공연에 참여하며 다양한 환경에서의 연주 경험을 넓혔습니다.또한 문화예술 지원사업인 ‘청춘마이크’에 참여하며 공연을 위한 지원 절차와 사업 진행 과정을 경험했습니다.여러 공연을 준비하면서 주관기관의 공모에 지원하고 선정되어 실제 무대에 오르기까지의 과정도 경험했습니다.연주 활동 외에도 공연 무대 설치 아르바이트를 통해 무대 준비 과정과 현장 스태프의 역할을 기초적으로 익혔습니다.이러한 경험을 바탕으로 음악 공연뿐 아니라 연극·뮤지컬 등 다양한 공연예술 분야의 제작 및 운영 업무에도 참여하고 싶습니다.",
    keywords: ["PERFORMANCE", "PLANNING", "PRODUCTION","ART"],
    graphic: "performance",
    image: "/04-performance.jpg",
    imageAlt: "군악대 및 공연·문화행사 활동",
  },
  {
    number: "05",
    category: "EXPANSION",
    english: "From Rhythm to Creative Code",
    description:
      "약 7개월의 IT 교육으로 웹 개발을 배웠습니다. 웹 프로젝트와 인터랙션을 구현하며 음악적 감각을 디지털 경험으로 확장합니다.",
    keywords: ["WEB DEVELOPMENT", "GSAP", "CREATIVE CODING"],
    graphic: "development",
    image: "/05-development.jpg",
    imageAlt: "웹 개발 및 디지털 프로젝트 활동",
  },
];

// ==========================================
// 2. 큐브 표면에 배치할 음악 SVG
// ==========================================

// 사진을 추가하기 전이나 불러오지 못한 경우 기존 SVG를 표시합니다.

function MusicSymbol({ type }: { type: GraphicType }) {
  // SVG 속성은 소수점 3자리로 고정해 서버/브라우저의 삼각함수 정밀도 차이를 제거합니다.
  const svgValue = (value: number) => value.toFixed(3);

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
            stroke="#88a7d1"
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
              fill="#deebff"
              transform={`rotate(-20 ${note.x} ${note.y})`}
            />
            <path
              d={`M${note.x + 10} ${note.y} v-49`}
              stroke="#deebff"
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
          stroke="#d4e4fa"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M15 195 Q55 255 95 195 T175 195 T255 195 T285 195"
          stroke="#789dcf"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle
          cx="150"
          cy="150"
          r="83"
          stroke="#afc9ee"
          strokeWidth="2"
          opacity="0.5"
        />

        <circle cx="150" cy="150" r="8" fill="#deebff" />
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
              fill="#29466e"
              stroke="#a4bfe5"
              strokeWidth="2"
            />

            <rect
              x={pad.x + 11}
              y={pad.y + 11}
              width="90"
              height="83"
              rx="12"
              fill={i === 1 ? "#6b91c5" : "#456b9d"}
              opacity="0.75"
            />

            <circle cx={pad.x + 56} cy={pad.y + 52} r="12" fill="#d2e4ff" />
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
        <path d="M150 15 L22 275 L278 275 Z" fill="#b3ccee" opacity="0.12" />

        {/* 공연 사운드 파형 */}
        {Array.from({ length: 25 }, (_, i) => {
          const height =
            15 + Math.abs(Math.sin(i * 0.78) * Math.cos(i * 0.19)) * 180;

          return (
            <rect
              key={i}
              x={svgValue(22 + i * 10.6)}
              y={svgValue(150 - height / 2)}
              width="5"
              height={svgValue(height)}
              rx="2.5"
              fill={i % 3 === 0 ? "#dceaff" : "#83a4d2"}
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
            x={svgValue(25 + i * 14)}
            y={svgValue(150 - height / 2)}
            width="5"
            height={svgValue(height)}
            rx="2.5"
            fill="#7499cb"
            opacity="0.7"
          />
        );
      })}

      <g
        stroke="#dce9fc"
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

function ChapterImage({ chapter }: { chapter: Chapter }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c1629]">
      {imageFailed && (
        <div className="absolute inset-0 p-[12%]" aria-hidden="true">
          <MusicSymbol type={chapter.graphic} />
        </div>
      )}
      {!imageFailed && (
        <Image
          src={chapter.image}
          alt={chapter.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 768px) 65vw, 100vw"
          className="object-cover object-[70px_center]"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}

// 번호와 카테고리 다음에 영어 부제와 짧은 한국어 설명을 배치합니다.
function ChapterContent({ chapter }: { chapter: Chapter }) {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="font-serif text-5xl text-[#b6cbed]">
          {chapter.number}
        </span>
        <span className="text-xs tracking-[0.2em] text-[#aac1e4]">
          {chapter.category}
        </span>
      </div>
      <h3 className="font-serif text-3xl leading-tight text-[#deebff] lg:text-4xl">
        {chapter.english}
      </h3>
      <p className="mt-6 break-keep text-base leading-8 text-[#bdcbe0]">
        {chapter.description}
      </p>
      <ul aria-label="키워드" className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
        {chapter.keywords.map((keyword) => (
          <li
            key={keyword}
            className="border-b border-[#7993b8]/60 py-2 text-[10px] tracking-wider text-[#afc6e8]"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ArtisticCareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const gallery = galleryRef.current;
      const text = textRef.current;
      if (!section || !gallery || !text) return;
      const mm = gsap.matchMedia();
      // 화면 크기와 모션 설정이 바뀌면 pin과 애니메이션을 해제합니다.
      mm.add(
        "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = Array.from(
            text.querySelectorAll<HTMLElement>(".career-panel"),
          );
          const graphics = Array.from(
            gallery.querySelectorAll<HTMLElement>(".career-graphic"),
          );
          const playhead = { position: 0 };
          const render = () => {
            const position = playhead.position;
            const current = Math.min(chapters.length - 1, Math.floor(position));
            const next = Math.min(current + 1, chapters.length - 1);
            // Hold each photo briefly, then ease into the next image.
            const transition = gsap.utils.clamp(0, 1, (position - current - 0.2) / 0.6);
            const blend = transition * transition * (3 - 2 * transition);
            const active = blend < 0.5 ? current : next;
            // Keep the incoming photo opaque underneath to avoid a dark dip.
            graphics.forEach((graphic, index) => {
              const isCurrent = index === current;
              const isNext = index === next && next !== current;
              gsap.set(graphic, {
                autoAlpha: isCurrent ? 1 - blend : isNext ? 1 : 0,
                scale: isCurrent ? 1 + blend * 0.02 : 1,
                zIndex: isCurrent ? 2 : 1,
              });
            });
            // Swap text at the midpoint so paragraphs never overlap.
            const textAlpha = Math.abs(1 - 2 * blend);
            panels.forEach((panel, index) => {
              gsap.set(panel, {
                autoAlpha: index === active ? textAlpha : 0,
                y: index === active ? (1 - textAlpha) * 10 : 10,
              });
              panel.setAttribute("aria-hidden", String(index !== active || textAlpha === 0));
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
      data-header-tone="light"
      ref={sectionRef}
      aria-label="Artistic Journey"
      className="relative isolate overflow-hidden bg-[#0c1629] text-[#f1f5fc]"
    >
      <div className="career-desktop relative h-screen overflow-hidden bg-[#0c1629]">
        <h2 className="absolute left-[7vw] top-30 z-20 text-xs tracking-[0.3em] text-[#b1c6e8]">
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
          className="absolute inset-y-0 right-0 w-[65%]"
          aria-hidden="true"
        >
          <div
            ref={galleryRef}
            className="relative h-full w-full overflow-hidden bg-[#1b3152]"
          >
            {chapters.map((chapter, index) => (
              <div
                key={chapter.number}
                className={
                  "career-graphic absolute inset-0 " +
                  (index === 0 ? "visible" : "invisible opacity-0")
                }
              >
                <ChapterImage chapter={chapter} />
              </div>
            ))}
          </div>
        </div>
        <div className="career-background-shade pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
        <div className="absolute bottom-10 left-[7%] z-20 w-[86%] text-[#b1c6e8]">
          <div className="mb-4 flex justify-between text-[10px] tracking-[0.2em]">
            <span>SCROLL TO EXPLORE</span>
            <span>
              <span ref={indicatorRef}>01</span> / 05
            </span>
          </div>
          <div className="h-px bg-white/20">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-[#c2d8f5]"
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
        <h2 className="px-6 pb-10 pt-24 text-xs tracking-[0.3em] text-[#b1c6e8]">
          02 / ARTISTIC JOURNEY
        </h2>
        {chapters.map((chapter) => (
          <article
            key={chapter.number}
            className="relative isolate overflow-hidden border-t border-white/10 px-6 py-16 md:py-24"
          >
            <div className="absolute inset-0 -z-20 md:left-[35%]" aria-hidden="true">
              <ChapterImage chapter={chapter} />
            </div>
            <div className="career-static-shade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <div className="mx-auto max-w-7xl md:pl-[4vw]">
              <div className="md:w-1/2">
              <ChapterContent chapter={chapter} />
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
        .career-background-shade {
          background:
            linear-gradient(to top, #0c1629 0%, rgba(12, 22, 41, 0.75) 12%, transparent 35%),
            linear-gradient(to right, #0c1629 0%, #0c1629 35%, rgba(12, 22, 41, 0.96) 43%, rgba(12, 22, 41, 0.55) 57%, rgba(12, 22, 41, 0.08) 78%, transparent 100%);
        }
        .career-static-shade {
          background: linear-gradient(to right, rgba(12, 22, 41, 0.96), rgba(12, 22, 41, 0.78));
        }
        @media (min-width: 768px) {
          .career-static-shade {
            background: linear-gradient(to right, #0c1629 30%, rgba(12, 22, 41, 0.95) 45%, rgba(12, 22, 41, 0.3) 75%, rgba(12, 22, 41, 0.12));
          }
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
