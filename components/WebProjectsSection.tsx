"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { webProjects, type WebProject } from "@/data/webProjects";
import "./WebProjectsSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// 잘못된 프로토콜과 빈 주소는 링크로 만들지 않습니다. 주소를 추측하지 않습니다.
function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? value : undefined;
  } catch { return undefined; }
}

function ProjectVisual({ project, index }: { project: WebProject; index: number }) {
  // 파일 삭제·오타·404가 있어도 깨진 이미지 대신 같은 크기의 포스터를 유지합니다.
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = project.imageSrc.startsWith("/projects/") ? project.imageSrc : "";
  return (
    <div className={"digital-screen"}>
      <div className={`digital-poster digital-poster-${index}`} role="img" aria-label={`${project.name} 추상 포스터 — 실제 서비스 화면이 아닙니다`}>
        {/* 작품별 기하 포스터입니다. 실제 서비스 화면이나 기능을 추측하지 않습니다. */}
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="digital-graphic">
          {index === 0 && <>
            <path d="M-100 470L340 30L780 470" fill="none" stroke="currentColor" strokeWidth="120" />
            <path d="M200 550L640 110L1080 550" fill="none" stroke="currentColor" strokeWidth="2" />
          </>}
          {index === 1 && <>
            {[0, 1, 2, 3, 4].map((n) => <rect key={n} x={120 + n * 110} y={-150 + n * 35} width="60" height="850" transform="rotate(28 400 250)" fill="currentColor" opacity={0.25 + n * 0.12} />)}
          </>}
          {index === 2 && <>
            <circle cx="400" cy="250" r="215" fill="currentColor" />
            <circle cx="505" cy="175" r="180" fill="var(--poster-bg)" />
            <path d="M0 420H800M0 440H800M0 460H800" stroke="currentColor" strokeWidth="2" />
          </>}
          {index === 3 && <>
            {[0, 1, 2, 3].map((n) => <rect key={n} x={190 + n * 38} y={40 + n * 38} width={420 - n * 76} height={420 - n * 76} rx="36" fill="none" stroke="currentColor" strokeWidth={n === 0 ? 50 : 2} transform="rotate(-15 400 250)" />)}
          </>}
          {index === 4 && <>
            <path d="M290 0V320C290 470 510 470 510 320V0" fill="none" stroke="currentColor" strokeWidth="75" />
            <path d="M230 0V320C230 550 570 550 570 320V0" fill="none" stroke="currentColor" strokeWidth="2" />
          </>}
        </svg>
        <span className={"digital-posterLabel"}>DIGITAL WORK / {String(index + 1).padStart(2, "0")}</span>
        <span className={"digital-posterName"}>{project.name}</span>
        <span className={"digital-posterNote"}>PROJECT POSTER</span>
      </div>
      {source && source !== failedSource && (
        <Image src={source} alt={`${project.name} 서비스 화면`} fill unoptimized
          sizes={project.type === "mobile" ? "280px" : "(min-width: 1024px) 65vw, 90vw"}
          className={"digital-screenshot"} onError={() => setFailedSource(source)} />
      )}
    </div>
  );
}

export default function WebProjectsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const title = titleRef.current;
    if (!root || !stage || !track || !title) return;
    const media = gsap.matchMedia();

    // 기본 레이아웃은 세로입니다. 모션 허용 + 넓고 충분히 높은 화면에서만 pin합니다.
    // 작은 노트북/화면 확대 환경에서도 버튼이 화면 아래로 잘리지 않게 합니다.
    media.add({ desktop: "(min-width: 1024px) and (min-height: 760px)",
      motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const { desktop, motion } = context.conditions!;
      if (!motion) return;
      const split = SplitText.create(title, {
        type: "lines", mask: "lines", autoSplit: true, aria: "auto",
        onSplit(self) {
          return gsap.from(self.lines, { yPercent: 105, duration: 0.9, stagger: 0.12,
            ease: "power3.out", scrollTrigger: { trigger: title, start: "top 90%", once: true } });
        },
      });
      const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]", root);
      let removeFocus = () => {};
      if (desktop) {
        root.classList.add("digital-horizontal");
        // 각 패널의 실제 너비를 사용합니다. resize/refresh 때 이동 거리를 다시 계산합니다.
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        // quickSetter 변경값도 모드 전환 시 복구되도록 초기 상태를 컨텍스트에 등록합니다.
        gsap.set(root.querySelectorAll("[data-project-visual]"), { scale: 1, opacity: 1 });
        const emphasis = panels.map((panel) => {
          const visual = panel.querySelector<HTMLElement>("[data-project-visual]")!;
          return { panel, scale: gsap.quickSetter(visual, "scale"), opacity: gsap.quickSetter(visual, "opacity") };
        });
        const highlight = () => {
          const center = stage.getBoundingClientRect().width / 2;
          emphasis.forEach(({ panel, scale, opacity }) => {
            const rect = panel.getBoundingClientRect();
            const weight = Math.max(0, 1 - Math.abs(rect.left + rect.width / 2 - center) / stage.clientWidth);
            scale(0.94 + weight * 0.06); opacity(0.55 + weight * 0.45);
          });
        };
        const horizontal = gsap.to(track, { x: () => -distance(), ease: "none", onUpdate: highlight,
          scrollTrigger: { id: "digital-works-track", trigger: stage, start: "top top", end: () => `+=${distance()}`,
            pin: true, scrub: 0.7, invalidateOnRefresh: true, onRefresh: highlight } });
        panels.forEach((panel, index) => {
          const visual = panel.querySelector("[data-project-reveal]");
          // 첫 작품은 이미 화면 안에 있으므로 세로 진입, 나머지는 가로 트랙 진입을 감지합니다.
          gsap.fromTo(visual, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9,
            ease: "power2.out", scrollTrigger: index === 0
              ? { trigger: stage, start: "top 65%", once: true }
              : { trigger: panel, containerAnimation: horizontal, start: "left 95%", toggleActions: "play none none reverse" } });
        });
        // Tab으로 화면 밖 링크에 진입하면 해당 프로젝트까지 세로 스크롤을 동기화합니다.
        // 브라우저가 잘린 컨테이너 자체를 가로 스크롤하는 기본 동작도 되돌립니다.
        const onFocus = (event: FocusEvent) => {
          const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-project-panel]");
          const trigger = horizontal.scrollTrigger;
          if (!panel || !trigger) return;
          stage.scrollLeft = 0;
          const progress = Math.min(1, panel.offsetLeft / Math.max(1, distance()));
          trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
          ScrollTrigger.update();
          horizontal.progress(progress);
          trigger.getTween()?.progress(1);
        };
        track.addEventListener("focusin", onFocus);
        removeFocus = () => track.removeEventListener("focusin", onFocus);
      } else {
        panels.forEach((panel) => gsap.from(panel.querySelector("[data-project-reveal]"), {
          clipPath: "inset(0 0 18% 0)", opacity: 0.5, duration: 0.8,
          scrollTrigger: { trigger: panel, start: "top 85%", once: true },
        }));
      }
      // 비동기 폰트 로딩 후 한 번 재측정합니다. 해제된 컴포넌트는 갱신하지 않습니다.
      let active = true;
      document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; removeFocus(); split.revert(); root.classList.remove("digital-horizontal"); };
    });

    // 실제 링크의 클릭 영역은 고정하고 내부 문구만 최대 4px 움직입니다.
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanup = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-project-link]")).map((link) => {
        const label = link.querySelector("span");
        const x = gsap.quickTo(label, "x", { duration: 0.25 });
        const y = gsap.quickTo(label, "y", { duration: 0.25 });
        const move = (event: PointerEvent) => {
          const rect = link.getBoundingClientRect();
          x(gsap.utils.clamp(-4, 4, (event.clientX - rect.left - rect.width / 2) * 0.08));
          y(gsap.utils.clamp(-4, 4, (event.clientY - rect.top - rect.height / 2) * 0.12));
        };
        const reset = () => { x(0); y(0); };
        link.addEventListener("pointermove", move); link.addEventListener("pointerleave", reset);
        return () => { link.removeEventListener("pointermove", move); link.removeEventListener("pointerleave", reset); };
      });
      return () => cleanup.forEach((dispose) => dispose());
    });
    // 이 섹션의 애니메이션만 정리합니다. 다른 섹션의 ScrollTrigger는 유지합니다.
    return () => media.revert();
  }, { scope: rootRef });

  return (
    <section ref={rootRef} id="development-works" aria-labelledby="digital-works-title" className={"digital-section"}>
      <div ref={stageRef} className={"digital-stage"}>
        <header className={"digital-heading"}>
          <p className={"digital-eyebrow"}>Selected Digital Works / 05</p>
          <h2 ref={titleRef} id="digital-works-title" className="portfolio-heading">Ideas Made <em>Interactive.</em></h2>
          <div className={"digital-intro"}>
            <p>아이디어를 실제로 작동하는 디지털 경험으로 구현합니다.</p>
            <span className={"digital-scrollHint"} aria-hidden="true">SCROLL TO EXPLORE <span>↗</span></span>
          </div>
        </header>
        <div ref={trackRef} className={"digital-track"}>
          {webProjects.map((project, index) => {
            const liveUrl = safeUrl(project.liveUrl);
            const githubUrl = safeUrl(project.githubUrl);
            return (
              <article key={project.id} data-project-panel className={"digital-panel"} aria-labelledby={`digital-${project.id}`}>
                <div data-project-visual className={"digital-visual"}>
                  <div data-project-reveal className={`${"digital-device"} ${project.type === "mobile" ? "digital-phone" : "digital-browser"}`}>
                    {project.type !== "mobile" ? (
                      <div className={"digital-chrome"} aria-hidden="true">
                        <span className={"digital-dots"}>● ● ●</span>
                        <span className={"digital-address"}>{liveUrl ? new URL(liveUrl).hostname : project.name}</span><span>↗</span>
                      </div>
                    ) : <div className={"digital-notch"} aria-hidden="true" />}
                    <ProjectVisual project={project} index={index} />
                  </div>
                </div>
                <div className={"digital-caption"}>
                  <span className="digital-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className={"digital-kind"}>{String(index + 1).padStart(2, "0")} / {project.type === "mobile" ? "MOBILE PROJECT" : "WEB PROJECT"}</p>
                    <h3 id={`digital-${project.id}`}>{project.name}</h3>
                    {project.summary && <p className={"digital-summary"}>{project.summary}</p>}
                    {project.technologies.length > 0 && <ul className={"digital-tags"} aria-label="사용 기술">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
                  </div>
                  <div className={"digital-links"}>
                    {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" data-project-link data-cursor-hover aria-label={`${project.name} 서비스 방문 (새 탭)`}><span>프로젝트 방문 ↗</span></a>}
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" data-project-link data-cursor-hover aria-label={`${project.name} GitHub (새 탭)`}><span>GitHub ↗</span></a>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className={"digital-footer"}>FROM AN IDEA TO YOUR SCREEN <span>4 WEB / 1 MOBILE</span></p>
      </div>
    </section>
  );
}




