import PortfolioHeader from "@/components/PortfolioHeader";
import AnimatedHero from "@/components/AnimatedHero";
import AboutSection from "@/components/AboutSection";
import ArtisticCareerSection from "@/components/ArtisticCareerSection";
import WebProjectsSection from "@/components/WebProjectsSection";

export default function Home() {
  return (
    <main id="top" data-header-tone="light" className="min-h-screen overflow-x-clip bg-[#0c1629] text-[#f1f5fc]">
      <PortfolioHeader />
      <AnimatedHero />
      <AboutSection />
      <ArtisticCareerSection />
      <WebProjectsSection />
    </main>
  );
}
