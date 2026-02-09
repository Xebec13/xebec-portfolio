"use client";

import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiReact, SiNextdotjs, SiTailwindcss 
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export type TechKey = 
  | "html" | "css" | "js" | "ts" 
  | "react" | "nextjs" | "tailwind" 
  | "motion" | "gsap";

interface TechConfig {
  label: string;
  icon?: React.ElementType;
}

export const TECH_MAP: Record<TechKey, TechConfig> = {
  html: { label: "HTML5", icon: SiHtml5 },
  css: { label: "CSS3", icon: SiCss3 },
  js: { label: "JavaScript", icon: SiJavascript },
  ts: { label: "TypeScript", icon: SiTypescript },
  react: { label: "React", icon: SiReact },
  nextjs: { label: "Next.js", icon: SiNextdotjs },
  tailwind: { label: "Tailwind", icon: SiTailwindcss },
  motion: { label: "Motion", icon: TbBrandFramerMotion },
  gsap: { label: "GSAP" }, 
};

interface TechIconProps {
  tech: TechKey;
  mode?: "icon" | "label"; 
  className?: string; 
}

export default function TechIcon({ tech, mode = "icon", className = "" }: TechIconProps) {
  const config = TECH_MAP[tech];
  if (!config) return null;

  const Icon = config.icon;

  if (mode === "icon") {
    if (Icon) {
      return <Icon className={className} />;
    }
    
    // Poprawka: Tekst zamiast ikony nie może mieć 'block' i sztywnego 'width', 
    // jeśli ma współgrać z ikonami w flexie.
    return (
      <span 
        className={`text-[8px] md:text-[10px] font-bold tracking-tight leading-none uppercase whitespace-nowrap flex items-center ${className}`}
      >
        {config.label}
      </span>
    );
  }

  return (
    <span className={className}>
      {config.label}
    </span>
  );
}