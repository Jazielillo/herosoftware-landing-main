
import CallToActionSection from "@/components/CallToActionSection";
import HeroInActionSection from "@/components/HeroInActionSection";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import OurSolutionsSection from "@/components/OurSolutionsSection";
import Slogan from "@/components/shared/Slogan";
import VictoriesSection from "@/components/VictoriesSection";


export default function Home() {
  return (
    <>
      <div id="inicio">
        <div className="mt-14 lg:mt-[120px]"></div>
        <HeroSection />

        <div className="h-10 xl:h-20"></div>

        <Slogan />

        <div className="h-10 xl:h-5"></div>

        <MissionSection />

        <div className="h-[60px] xl:h-[80px]"></div>

        <div className="hero-in-action-trigger">
          <HeroInActionSection />
        </div>

      </div>

      <div id="servicios" className="mt-[-100px]">
        <OurSolutionsSection />
      </div>

      <div className="h-[60px] xl:h-[80px]"></div>

      <div id="proyectos">
        <VictoriesSection />
      </div>

      <div className="h-[60px] xl:h-[80px]"></div>

      <CallToActionSection />

      <div className="h-[60px] xl:h-[80px]"></div>
    </>
  );
}