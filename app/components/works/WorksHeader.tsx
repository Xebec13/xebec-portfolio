"use client";

// Definiujemy ścisły interfejs dla danych wejściowych
interface WorksHeaderProps {
  headerProject: string;
  headerTech: string;
  headerDate: string;
}

export default function WorksHeader({ headerProject, headerTech, headerDate }: WorksHeaderProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 p-2 gap-3 font-semibold uppercase text-lg lg:text-2xl">
      <h3 className="justify-self-start">{headerProject}</h3>
      <h3 className="justify-self-start hidden lg:block">{headerTech}</h3>
      <h3 className="justify-self-end">{headerDate}</h3>
    </div>
  );
}