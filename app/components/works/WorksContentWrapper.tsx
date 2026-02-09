"use client";

import { ReactNode } from "react";

interface ContentWrapperProps {
  isExpanded: boolean;
  children: ReactNode;
}

export default function WorksContentWrapper({ isExpanded, children }: ContentWrapperProps) {
  return (
    <div
      className={`
        grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out
        ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
      `}
    >
      <div className="min-h-0">
        <div className="flex flex-col gap-8 px-3 py-6 lg:px-6 lg:py-10 bg-zinc-300/50">
          {children}
        </div>
      </div>
    </div>
  );
}