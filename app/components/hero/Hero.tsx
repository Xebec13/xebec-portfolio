import { GLOBAL } from "../../constants/portfolio";
import InteractiveGrid from "../../ui/InteractiveGrid";
import HeroInfo from "./HeroInfo";
import HeroBio from "./HeroBio";

export default function Hero() {
  const [firstName, lastName] = GLOBAL.name.split(" ");
  const profileImg = "/portfolio-img.png"; 

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center md:justify-evenly px-10 py-20 md:px-20 md:py-25 overflow-hidden">
      <InteractiveGrid />
      
      {/* HeroInfo przyjmuje teraz dane tekstowe oraz ścieżkę do zdjęcia */}
      <HeroInfo 
        firstName={firstName} 
        lastName={lastName} 
        imgSrc={profileImg} 
      />
      
      <HeroBio role={GLOBAL.role} />
    </section>
  );
}