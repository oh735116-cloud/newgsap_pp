"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projectImages } from "@/data/projectImages";
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

function ProjectVisual({ project, index, selected }: { project: WebProject; index: number; selected: number }) {
  // 파일 삭제·오타·404가 있어도 깨진 이미지 대신 같은 크기의 포스터를 유지합니다.
  const [failedSource, setFailedSource] = useState<string | null>(null);
  // public 루트의 이미지도 허용합니다. 외부 주소 및 이중 슬래시 경로는 제외합니다.
  const shot = project.screenshots[selected];
  const imagePath = shot?.src || project.imageSrc;
  const source = /^\/(?!\/)/.test(imagePath) ? imagePath : "";
  const asset = projectImages[source];
  const reference = projectImages["/nadleplan_main.png"];
  const frame = project.type === "mobile" && asset ? asset : reference;
  return (
    <div className="digital-screen" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      <div className={`digital-poster digital-poster-${index}`} role="img" aria-hidden={!!source && source !== failedSource} aria-label={`${project.name} 추상 포스터 — 실제 서비스 화면이 아닙니다`}>
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
        <Image key={source} src={asset ?? source} alt={`${project.name} ${shot?.label || "서비스 화면"}`} fill unoptimized
          sizes={project.type === "mobile" ? "280px" : "(min-width: 1024px) 65vw, 90vw"}
          onLoad={() => ScrollTrigger.refresh()}
          className={"digital-screenshot"} onError={() => setFailedSource(source)} />
      )}
    </div>
  );
}

export default function WebProjectsSection() {
  const [selectedShots, setSelectedShots] = useState<Record<string, number>>({});
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const title = titleRef.current;
    if (!root || !title) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(title, {
        type: "lines", mask: "lines", autoSplit: true, aria: "auto",
        onSplit(self) {
          return gsap.from(self.lines, { yPercent: 105, duration: 0.9, stagger: 0.12,
            ease: "power3.out", scrollTrigger: { trigger: title, start: "top 90%", once: true } });
        },
      });
      const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]", root);
      panels.forEach((panel) => gsap.from(panel.querySelector("[data-project-reveal]"), {
        opacity: 0, y: 24, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: panel, start: "top 90%", once: true },
      }));
      let active = true;
      document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; split.revert(); };
    });
    return () => media.revert();
  }, { scope: rootRef });

  return (
    <section ref={rootRef} id="development-works" data-header-tone="dark" aria-labelledby="digital-works-title" className="digital-section">
      <div className="digital-stage">
        <header className="digital-heading">
          <p className="digital-eyebrow">Selected Digital Works / {String(webProjects.length).padStart(2, "0")}</p>
          <h2 ref={titleRef} id="digital-works-title" className="portfolio-heading">Ideas Made <em>Interactive.</em></h2>
          <div className="digital-intro"><p>아이디어를 실제로 작동하는 디지털 경험으로 구현합니다.</p></div>
        </header>
        <div className="digital-track">
          {webProjects.map((project, index) => {
            const liveUrl = safeUrl(project.liveUrl);
            const githubUrl = safeUrl(project.githubUrl);
            return (
              <article key={project.id} data-project-panel className="digital-panel" aria-labelledby={`digital-${project.id}`}>
                <div className={`digital-visual ${project.type === "mobile" ? "digital-display-mobile" : "digital-display-desktop"}`}>
                  <div className="digital-displayUnit">
                    <div data-project-reveal className={`digital-device ${project.type === "mobile" ? "digital-phone" : "digital-browser"}`}>
                      {project.type === "mobile" && <div className="digital-notch" aria-hidden="true" />}
                      <ProjectVisual project={project} index={index} selected={selectedShots[project.id] ?? 0} />
                    </div>
                  </div>
                </div>
                <div className="digital-caption">
                  <div>
                    <p className="digital-kind">{String(index + 1).padStart(2, "0")} / {project.type === "mobile" ? "MOBILE PROJECT" : "WEB PROJECT"}</p>
                    <h3 id={`digital-${project.id}`}>{project.name}</h3>
                    {project.summary && <p className="digital-summary">{project.summary}</p>}
                    {project.technologies.length > 0 && <ul className="digital-tags" aria-label="사용 기술">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
                  </div>
                  {project.screenshots.length > 1 && (
                    <div className="digital-shotPicker" role="group" aria-label={`${project.name} 화면 선택`}>
                      {project.screenshots.map((shot, shotIndex) => (
                        <button key={shot.src} type="button" data-cursor-hover
                          aria-pressed={(selectedShots[project.id] ?? 0) === shotIndex}
                          onClick={() => setSelectedShots((current) => ({ ...current, [project.id]: shotIndex }))}>
                          {shot.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="digital-links">
                    {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" data-cursor-hover aria-label={`${project.name} 서비스 방문 (새 탭)`}><span>프로젝트 방문 ↗</span></a>}
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" data-cursor-hover aria-label={`${project.name} GitHub (새 탭)`}><span>GitHub ↗</span></a>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="digital-footer">FROM AN IDEA TO YOUR SCREEN <span>4 WEB / 1 MOBILE</span></p>
      </div>
    </section>
  );
}

