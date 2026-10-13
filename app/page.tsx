// ==========================================
// 상단 포트폴리오 헤더
// ==========================================
import PortfolioHeader from "@/components/PortfolioHeader";

// 첫 번째 섹션: 영상 Hero
import AnimatedHero from "@/components/AnimatedHero";

// 두 번째 섹션: About Me
import AboutSection from "@/components/AboutSection";

// 새로 추가한 대각선 화면 전환
import DiagonalSectionTransition from "@/components/DiagonalSectionTransition";

// 세 번째 섹션: 전체 화면 가로 스크롤
import ArtisticCareerSection from "@/components/ArtisticCareerSection";


// 기존 GSAP 실습 컴포넌트
import ParallaxSection from "@/components/ParallaxSection";
import WebProjectsSection from "@/components/WebProjectsSection";
import MagneticSection from "@/components/MagneticSection";
import ImageRevealSection from "@/components/ImageRevealSection";

export default function Home() {
  // clip은 스크롤 컨테이너를 만들지 않아 기존 pin을 유지하면서 회전 요소의 가로 넘침을 막습니다.
  return (
    <main id="top" data-header-tone="light" className="min-h-screen overflow-x-clip bg-[#111711] text-[#F5F1E7]">
      {/* 상단 고정 헤더 */}
      <PortfolioHeader />

      {/* =====================================
    SECTION 01 — VIDEO HERO
===================================== */}
      <AnimatedHero />

      {/* =====================================
    SECTION 02 — ABOUT ME

    실제 About 화면이 접히도록
    외부 컨테이너로 감싸줍니다.
===================================== */}
      <div id="about-transition-shell" className="relative bg-[#111711]">
        <AboutSection />
      </div>

      {/* =====================================
    SECTION 02 → 03 전환 제어

    화면 자체를 렌더링하지 않고
    실제 About 섹션에 애니메이션 적용
===================================== */}
      <DiagonalSectionTransition />

      {/* =====================================
    SECTION 03 — ARTISTIC JOURNEY
===================================== */}
      <ArtisticCareerSection />
      {/* SECTION 04 제거: 예술 경력 다음에 디지털 작업을 표시합니다. */}

      {/* SECTION 05 — 실제 디지털 프로젝트 전시 */}
      <WebProjectsSection />

      {/* =====================================
          기존 GSAP 실습 컴포넌트
          이후 실제 포트폴리오 콘텐츠로 변경
      ===================================== */}

      <ParallaxSection />

      {/* HorizontalScroll 실습 원본은 보존하고 여기서는 렌더링하지 않습니다. */}

      <MagneticSection />
      <ImageRevealSection />

      {/* 마지막 섹션 */}
      <section
        data-header-tone="light"
        className="
          flex min-h-screen flex-col
          items-center justify-center
          px-6 text-center
        "
      >
        <p className="mb-4 text-[#B2C69F]">ART × TECHNOLOGY</p>

        <h2 className="portfolio-heading text-5xl md:text-7xl">
          Where Creativity Lives.
        </h2>

        <p className="mt-8 text-[#A8B2A3]">
          예술적 경험을 디지털 기술로 확장합니다.
        </p>
      </section>
    </main>
  );
}




