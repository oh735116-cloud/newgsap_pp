"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// 수행한 경험과 앞으로 활용할 수 있는 역량을 구분합니다.
const works = [
  {
    title: "Performance & Ensemble", korean: "공연과 앙상블", caption: "LISTEN / RESPOND / RESONATE",
    quote: "하나의 공연은 서로의 소리를 듣는 것에서 시작됩니다.",
    experience: ["2016–2023년 타악기 전공 및 음악·공연예술 경험", "군악대 복무를 통한 연주와 단체 활동", "다양한 합주와 공연에서 익힌 호흡, 타이밍, 협업"],
    connection: "합주에서 익힌 타이밍과 흐름에 대한 감각을 바탕으로, 연극·영화 등 공연예술 분야에서도 참여자와 소통하고 리듬과 음악으로 장면의 분위기를 함께 고민할 수 있습니다.",
  },
  {
    title: "Music Education & Mentoring", korean: "음악교육과 지도", caption: "PRACTICE / LISTEN / GROW",
    quote: "서로 다른 속도가 모여 하나의 무대를 완성합니다.",
    experience: ["약 3년간 학교·문화센터에서 드럼과 타악기 지도", "음악 이론·악보 읽기 교육 및 방과후 오케스트라 지도", "연주회·대회·방학 집중교육 준비와 학생별 맞춤 연습"],
    connection: "학생의 수준에 맞춰 설명하고 연습을 이끈 경험은 참여자의 특성을 이해하는 기반입니다. 단체 연습과 리허설에서도 서로 다른 역할과 속도를 조율하는 소통에 활용할 수 있습니다.",
  },
  {
    title: "Cultural Arts & Production Support", korean: "문화예술 현장 경험", caption: "PREPARE / COLLABORATE / PRESENT",
    quote: "무대 위의 순간을 완성하는 보이지 않는 과정까지 이해합니다.",
    experience: ["문화가 있는 날 ‘청춘마이크’ 사업 참여 및 2차 예선 진출", "공연·행사 관련 지원서와 자료 준비 보조", "경주 APEC 관련 기념행사를 비롯한 문화행사 참여"],
    connection: "공연과 지원사업의 준비 과정을 경험하며 문화콘텐츠 제작에 관심을 넓혔습니다. 자료 정리와 문서 업무를 보조한 경험을 바탕으로 현장 구성원과 운영 인력의 협업에 기여하고자 합니다.",
  },
];

// 외부 이미지 없이 타악기, 연습, 무대의 서로 다른 리듬을 표현합니다.
function WorkGraphic({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 560 420" fill="none" aria-hidden="true" focusable="false" className="h-auto w-full">
      {index === 0 ? (
        <>
          <circle cx="280" cy="210" r="165" stroke="currentColor" opacity=".12" />
          <path d="M155 183V277C155 325 405 325 405 277V183" fill="#DFE3D3" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="280" cy="183" rx="125" ry="45" fill="#F3F0E8" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="280" cy="183" rx="108" ry="32" stroke="currentColor" opacity=".35" />
          {[180, 230, 280, 330, 380].map((x) => <path key={x} d={`M${x} 225v65`} stroke="currentColor" opacity=".35" />)}
          <path className="works-draw" pathLength="1" d="M150 72L318 175M410 70L246 179" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path className="works-draw" pathLength="1" d="M20 340Q50 340 65 310T110 340T155 340T200 340Q230 340 250 340H540" stroke="currentColor" strokeWidth="2" />
          <path className="works-draw" pathLength="1" d="M20 365Q65 365 90 345T140 365T190 365Q225 340 250 340H540" stroke="currentColor" opacity=".5" strokeWidth="2" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M80 352H480" stroke="currentColor" opacity=".3" />
          {[0, 1, 2, 3].map((pad) => (
            <g key={pad}>
              <rect x={128 + (pad % 2) * 160} y={46 + Math.floor(pad / 2) * 140} width="144" height="124" rx="24" stroke="currentColor" />
              <rect className="works-pad" x={139 + (pad % 2) * 160} y={57 + Math.floor(pad / 2) * 140} width="122" height="102" rx="17" fill={pad === 1 ? "#3F5F2E" : "#CCD5BE"} />
              <circle cx={200 + (pad % 2) * 160} cy={108 + Math.floor(pad / 2) * 140} r="5" fill={pad === 1 ? "#F3F0E8" : "#3F5F2E"} />
              <circle className="works-beat" cx={128 + pad * 100} cy="352" r="6" fill="currentColor" />
            </g>
          ))}
        </>
      ) : (
        <>
          <path d="M75 330V62H485V330" stroke="currentColor" strokeWidth="2" />
          <path d="M75 62H160Q160 220 75 278ZM485 62H400Q400 220 485 278Z" fill="#CCD5BE" />
          <path d="M98 64Q132 195 78 255M462 64Q428 195 482 255" stroke="currentColor" opacity=".4" />
          <path className="works-light" d="M215 90L115 323H390Z" fill="#9EB181" opacity=".3" />
          <path className="works-light" d="M345 90L175 323H445Z" fill="#3F5F2E" opacity=".13" />
          <path d="M60 330H500M85 340H475" stroke="currentColor" strokeWidth="2" />
          <path className="works-draw" pathLength="1" d="M120 380H440" stroke="currentColor" />
          {[120, 280, 440].map((x) => <circle key={x} cx={x} cy="380" r="5" fill="currentColor" />)}
          <rect x="199" y="72" width="32" height="20" rx="4" fill="currentColor" />
          <rect x="329" y="72" width="32" height="20" rx="4" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export default function ArtisticWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    const media = gsap.matchMedia();

    // 기본 HTML은 항상 보입니다. 모션 허용 환경에서만 등장 효과를 추가합니다.
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(title, {
        type: "lines", mask: "lines", autoSplit: true, aria: "auto",
        // autoSplit은 폰트 로딩과 너비 변경을 감지하고 반환된 애니메이션을 교체합니다.
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105, duration: 1, stagger: 0.12, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: title, start: "top 88%", once: true },
          });
        },
      });

      section.querySelectorAll<HTMLElement>(".works-entry").forEach((entry, index) => {
        // pin 없이 각 항목이 들어올 때 한 번만 실행하며 다른 섹션을 제어하지 않습니다.
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out", immediateRender: false },
          scrollTrigger: { trigger: entry, start: "top 85%", once: true },
        });
        timeline.from(entry.querySelector(".works-copy"), { y: 24, opacity: 0, duration: 0.75 });
        const lines = entry.querySelectorAll(".works-draw");
        if (lines.length) timeline.fromTo(lines,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.3, stagger: 0.12 }, 0.1);
        if (index === 1) {
          timeline.from(entry.querySelectorAll(".works-pad"), {
            scale: 0.86, opacity: 0.35, transformOrigin: "50% 50%", stagger: 0.16, duration: 0.5,
          }, 0.1).from(entry.querySelectorAll(".works-beat"), {
            scale: 0, transformOrigin: "50% 50%", stagger: 0.16, duration: 0.4,
          }, 0.2);
        }
        if (index === 2) timeline.from(entry.querySelectorAll(".works-light"), {
          scaleX: 0.05, opacity: 0, transformOrigin: "50% 0%", stagger: 0.2, duration: 1.2,
        }, 0.1);
      });
      // Strict Mode 재실행과 설정 변경 시 분할 DOM 및 내부 관찰자를 복구합니다.
      return () => split.revert();
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section id="artistic-showcase" ref={sectionRef} aria-labelledby="works-heading" className="works-section bg-[#F3F0E8] px-6 py-24 text-[#263522] md:px-[7vw] md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <header className="pb-16 md:pb-24">
          <div className="mb-10 flex flex-wrap justify-between gap-4 text-[11px] tracking-[0.2em] text-[#3F5F2E]">
            <p>04 / ARTISTIC WORKS</p><p>MUSIC · PEOPLE · CULTURE</p>
          </div>
          <h2 id="works-heading" ref={titleRef} className="works-heading max-w-5xl text-[clamp(3.4rem,8.5vw,8.5rem)] leading-[0.98] tracking-[-0.055em]">
            Beyond the Stage.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-end">
            <p className="text-sm tracking-wide text-[#3F5F2E]">소리를 듣고, 사람을 잇고, 무대를 이해합니다.</p>
            <p className="max-w-lg break-keep text-base leading-8 text-[#596151]">음악에서 시작된 경험은 사람과 현장으로 이어집니다. 연주자로서의 감각, 교육자로서의 소통, 문화예술 현장에서 배운 준비의 과정을 소개합니다.</p>
          </div>
        </header>

        {works.map((work, index) => (
          <article key={work.title} className="works-entry border-t border-[#3F5F2E]/25 py-14 md:py-20" aria-labelledby={`works-title-${index}`}>
            <div className="mb-8 flex items-center gap-4 text-xs tracking-[0.16em] text-[#3F5F2E]">
              <span className="font-mono">0{index + 1}</span><span>{work.korean}</span>
              <span className="works-rule h-px w-12 origin-left bg-[#3F5F2E]/50" />
            </div>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[7vw]">
              <figure className={index === 1 ? "lg:order-2" : ""}>
                <div className="works-art text-[#3F5F2E]"><WorkGraphic index={index} /></div>
                <figcaption className="mt-2 text-center font-mono text-[10px] tracking-[0.15em] text-[#596151]">{work.caption}</figcaption>
              </figure>
              <div className="works-copy min-w-0">
                <h3 id={`works-title-${index}`} className="works-title works-heading text-3xl leading-[1.12] tracking-[-0.035em] md:text-4xl xl:text-5xl">{work.title}</h3>
                <p className="mt-6 break-keep text-xl font-medium leading-relaxed">{work.quote}</p>
                <h4 className="mb-3 mt-8 text-xs font-semibold tracking-wide text-[#3F5F2E]">현장에서 쌓은 경험</h4>
                <ul className="space-y-2 text-sm leading-7 text-[#596151]">
                  {work.experience.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-[#3F5F2E]">—</span><span className="break-keep">{item}</span></li>)}
                </ul>
                <div className="mt-7 border-l-2 border-[#8B9E71] pl-5">
                  <h4 className="mb-2 text-xs font-semibold text-[#3F5F2E]">공연예술로 이어갈 역량</h4>
                  <p className="break-keep text-sm leading-7 text-[#596151]">{work.connection}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
        <p className="border-t border-[#3F5F2E]/25 pt-10 text-center text-sm leading-7 text-[#596151]">함께 듣는 태도에서, 함께 완성하는 무대로.</p>
      </div>
      {/* 호버는 장식에만 적용합니다. 터치·키보드 사용자는 모든 내용을 그대로 읽습니다. */}
      <style jsx>{`
        .works-heading { font-family: Georgia, "Times New Roman", serif; font-weight: 400; }
        @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
          .works-title { transition: color 350ms ease; }
          .works-art, .works-rule { transition: transform 600ms ease; }
          .works-entry:hover .works-title { color: #3f5f2e; }
          .works-entry:hover .works-art { transform: scale(1.025); }
          .works-entry:hover .works-rule { transform: scaleX(1.6); }
        }
      `}</style>
    </section>
  );
}
