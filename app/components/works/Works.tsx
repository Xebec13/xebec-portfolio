"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { getWorks } from "@/app/constants/works";
import Divider from "@/app/ui/Divider";

import WorksItem from "./WorksItem";

export default function Works() {
  // Pobieramy tłumaczenia bezpośrednio z Twojego Providera
  const { language, t } = useLanguage();

  // Pobieramy projekty dla aktualnego języka
  const projects = getWorks(language);

  return (
    <section id="works" className="min-h-screen p-5 md:p-15 bg-zinc-200 text-neutral-900">
      <div className="font-sansation grid grid-cols-2 lg:grid-cols-3 p-2 gap-3 font-semibold uppercase text-lg lg:text-2xl">
        <p className="justify-self-start ">{t.projects.headerProject}</p>
        <p className="justify-self-start hidden lg:block">{t.projects.headerTech}</p>
        <p className="justify-self-end">{t.projects.headerDate}</p>
      </div>
      <Divider type="main" />
      <div className="flex flex-col w-full">
        {[...projects].reverse().map((project, index) => (
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