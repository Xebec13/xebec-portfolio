"use client";

import { Work } from "@/app/constants/works";

interface WorksDetailsProps {
  project: Work;
}

export default function WorksDetails({ project }: WorksDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
      {/* Sekcja Tekstowa */}
      <div className="flex flex-col gap-6">
        <p className="text-lg md:text-xl leading-relaxed opacity-90">
          {project.review}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.keyWords.map((word) => (
            <span key={word} className="px-3 py-1 bg-neutral-900/10 rounded-full text-sm uppercase">
              #{word}
            </span>
          ))}
        </div>
      </div>

      {/* Miejsce na Twoje obrazki/linki */}
      <div className="flex flex-col gap-4">
        <div className="aspect-video bg-neutral-900/20 rounded-sm flex items-center justify-center italic">
          Placeholder for: {project.images[0]}
        </div>
      </div>
    </div>
  );
}