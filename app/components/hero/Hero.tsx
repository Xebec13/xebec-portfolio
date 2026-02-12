"use client"; // Kluczowa zmiana

import { GLOBAL } from "../../constants/portfolio";
import { useLanguage } from "@/app/providers/language-provider";
import InteractiveGrid from "../../ui/InteractiveGrid";
import HeroInfo from "./HeroInfo";
import HeroBio from "./HeroBio";

export default function Hero() {
  const { t } = useLanguage();
  const [firstName, lastName] = GLOBAL.name.split(" ");
  const profileImg = "/portfolio-img.png"; 

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-start md:justify-evenly overflow-hidden px-10 pt-15 md:px-15 md:pt-10 lg:px-20 lg:pt-5">
      <InteractiveGrid 
        totalCells={50} 
      />
      
      <HeroInfo 
        firstName={firstName} 
        lastName={lastName} 
        imgSrc={profileImg} 
      />
      
      {/* Przekazujemy role i przetłumaczone bio */}
      <HeroBio role={GLOBAL.role} bio={t.hero.bio} />
    </section>
  );
}