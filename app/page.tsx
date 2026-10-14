import PortfolioHeader from "@/components/PortfolioHeader";
import AnimatedHero from "@/components/AnimatedHero";
import AboutSection from "@/components/AboutSection";
import DiagonalSectionTransition from "@/components/DiagonalSectionTransition";
import ArtisticCareerSection from "@/components/ArtisticCareerSection";
import WebProjectsSection from "@/components/WebProjectsSection";

export default function Home() {
  return (
    <main id="top" data-header-tone="light" className="min-h-screen overflow-x-clip bg-[#111711] text-[#F5F1E7]">
      <PortfolioHeader />
      <AnimatedHero />
      <div id="about-transition-shell" className="relative bg-[#111711]">
        <AboutSection />
      </div>
      <DiagonalSectionTransition />
      <ArtisticCareerSection />
      <WebProjectsSection />
    </main>
  );
}
