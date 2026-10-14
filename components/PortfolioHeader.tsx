"use client";

// React 상태 관리와 DOM 참조
import { useEffect, useRef, useState } from "react";

// GSAP 애니메이션 라이브러리
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// GSAP React 플러그인 등록
gsap.registerPlugin(useGSAP);

// 메뉴 데이터
const menus = [
  { label: "소개", href: "#about" },
  { label: "예술 활동", href: "#artistic-works" },
  { label: "작업", href: "#development-works" },
];

export default function PortfolioHeader() {
  // 헤더 DOM 참조
  const headerRef = useRef<HTMLElement>(null);

  // 모바일 메뉴 열림 여부
  const [menuOpen, setMenuOpen] = useState(false);

  // 링크 복사 성공 여부
  const [copied, setCopied] = useState(false);

  const [headerTone, setHeaderTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    let lastCheck = -Infinity;
    let currentTone: "light" | "dark" = "light";
    const updateHeader = (time: number) => {
      // 스크롤이 멈춘 뒤에도 진행되는 GSAP 전환을 반영하되 초당 10회로 제한합니다.
      if (time - lastCheck < 0.1) return;
      lastCheck = time;
      const header = headerRef.current;
      if (!header) return;

      let nextTone: "light" | "dark" = "light";
      // 고정/pin, clip-path, 가로 스크롤을 반영한 실제 헤더 아래 섹션을 찾습니다.
      const elements = document.elementsFromPoint(window.innerWidth / 2, 42);
      for (const element of elements) {
        if (header.contains(element)) continue;
        let surface = element.closest<HTMLElement>("[data-header-tone]");
        if (!surface) continue;
        // 퇴장 중 투명해진 섹션에서는 뒤에 있는 배경의 테마를 사용합니다.
        while (surface && Number(getComputedStyle(surface).opacity) < 0.5) {
          surface = surface.parentElement?.closest<HTMLElement>("[data-header-tone]") ?? null;
        }
        if (!surface) continue;
        nextTone = surface.dataset.headerTone === "dark" ? "dark" : "light";
        break;
      }
      if (nextTone !== currentTone) {
        currentTone = nextTone;
        setHeaderTone(nextTone);
      }
    };
    updateHeader(0);
    gsap.ticker.add(updateHeader);
    return () => gsap.ticker.remove(updateHeader);
  }, []);

  // ------------------------------------
  // 1. GSAP 헤더 등장 애니메이션
  // ------------------------------------
  useGSAP(
    () => {
      // 접근성: 움직임 감소 설정 확인
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      // 헤더가 위에서 아래로 등장
      gsap.from(headerRef.current, {
        y: -100,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 메뉴들이 순서대로 나타남
      gsap.from(".header-menu-item", {
        y: -15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.4,
        ease: "power2.out",
      });
    },
    { scope: headerRef },
  );

  // ------------------------------------
  // 2. 링크 복사 기능
  // ------------------------------------
  const handleCopyLink = async () => {
    try {
      // 현재 웹페이지 URL 복사
      await navigator.clipboard.writeText(window.location.href);

      // 복사 성공 메시지 표시
      setCopied(true);

      // 2초 후 문구 초기화
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("링크 복사 실패:", error);
      setCopied(false);
      alert("링크 복사에 실패했습니다.");
    }
  };

  // ------------------------------------
  // 3. 메뉴 클릭 시 모바일 메뉴 닫기
  // ------------------------------------
  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      data-tone={menuOpen ? "dark" : headerTone}
      data-menu-open={menuOpen}
      className="portfolio-header fixed left-0 top-0 z-[60] w-full
        transition-colors duration-200 motion-reduce:transition-none"
    >
      {/* 메인 헤더 */}
      <div
        className="
          mx-auto flex h-[84px] max-w-7xl
          items-center justify-between
          px-6 md:px-12
        "
      >
        {/* ----------------------------
            왼쪽: 로고
        ---------------------------- */}
        <a
          href="#top"
          onClick={handleMenuClick}
          data-cursor-hover
          className="flex items-center gap-4"
          aria-label="페이지 맨 위로 이동"
        >
          <span
            className="
              font-serif text-[39px]
              font-normal leading-none
              tracking-[-0.08em]
            "
          >
            Hg
          </span>

          {/* 로고 구분선 */}
          <span className="h-5 w-px bg-current opacity-70" />

          <span
            className="
              text-[10px] font-semibold
              tracking-[0.18em]
            "
          >
            PORTFOLIO
          </span>
        </a>

        {/* ----------------------------
            가운데: PC 메뉴
        ---------------------------- */}
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="메인 내비게이션"
        >
          {menus.map((menu) => (
            <a
              key={menu.href}
              href={menu.href}
              data-cursor-hover
              className="
                header-menu-item relative
                text-[13px] font-medium
                transition-colors duration-300
                hover:text-[var(--header-hover)]
              "
            >
              {menu.label}
            </a>
          ))}
        </nav>

        {/* ----------------------------
            오른쪽: 링크 복사
        ---------------------------- */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={handleCopyLink}
            data-cursor-hover
            className="
              border-b border-current
              pb-1 text-[13px]
              transition-colors duration-300
              hover:text-[var(--header-hover)]
            "
          >
            {copied ? "복사 완료 ✓" : "링크 복사"}
          </button>
        </div>

        {/* ----------------------------
            모바일 메뉴 버튼
        ---------------------------- */}
        <button
          type="button"
          data-cursor-hover
          className="
            flex h-10 w-10 flex-col
            items-center justify-center
            gap-[5px] md:hidden
          "
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="portfolio-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2px] w-6 bg-current
              transition-transform duration-300
              ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />

          <span
            className={`h-[2px] w-6 bg-current
              transition-transform duration-300
              ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ----------------------------
          모바일 드롭다운 메뉴
      ---------------------------- */}
      {menuOpen && (
        <nav
          id="portfolio-mobile-menu"
          className="
            border-t border-[#dce4f0]
            bg-[#f3f6fb] text-[#1d2d48]
            px-6 py-7 md:hidden
          "
          aria-label="모바일 내비게이션"
        >
          <div className="flex flex-col gap-6">
            {menus.map((menu) => (
              <a
                key={menu.href}
                href={menu.href}
                onClick={handleMenuClick}
                className="text-base font-medium"
              >
                {menu.label}
              </a>
            ))}

            <button
              type="button"
              onClick={handleCopyLink}
              className="
                self-start border-b
                border-[#344968] pb-1 text-sm
              "
            >
              {copied ? "복사 완료 ✓" : "링크 복사"}
            </button>
          </div>
        </nav>
      )}

      {/* 링크 복사 상태를 스크린리더에 알림 */}
      <span className="sr-only" role="status">
        {copied ? "링크가 복사되었습니다." : ""}
      </span>
    </header>
  );
}

