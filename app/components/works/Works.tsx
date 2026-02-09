"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { getWorks } from "@/app/constants/works";
import Divider from "@/app/ui/Divider";
import WorksHeader from "./WorksHeader";
import WorksItem from "./WorksItem";

export default function Works() {
  // Pobieramy tłumaczenia bezpośrednio z Twojego Providera
  const { language, t } = useLanguage(); 
  
  // Pobieramy projekty dla aktualnego języka
  const projects = getWorks(language);

  return (
    <section id="works" className="min-h-screen p-5 md:p-15 bg-zinc-200 text-neutral-900">
      {/* Przekazujemy dane do nagłówka */}
      <WorksHeader 
        headerProject={t.projects.headerProject}
        headerTech={t.projects.headerTech}
        headerDate={t.projects.headerDate}
      />
      
      <Divider type="main" />
      
      <div className="flex flex-col w-full">
        {projects.map((project, index) => (
          <WorksItem 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
}