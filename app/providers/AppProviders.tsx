"use client";

import { ReactNode, useEffect } from "react"; // Dodano useEffect
import { LanguageProvider, IntroProvider, SmoothScroll } from "./";
import CurtainLoader from "@/app/ui/CurtainLoader";
import { MainAnimationGate } from "./MainAnimationGate";

export function AppProviders({ children }: { children: ReactNode }) {
  // Logika Scroll To Top wstrzyknięta bezpośrednio tutaj
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <LanguageProvider>
      <IntroProvider>
        <CurtainLoader>
          <SmoothScroll>
            <MainAnimationGate>
              {children}
            </MainAnimationGate>
          </SmoothScroll>
        </CurtainLoader>
      </IntroProvider>
    </LanguageProvider>
  );
}