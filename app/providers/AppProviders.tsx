"use client";

import { ReactNode } from "react";
import { LanguageProvider, IntroProvider, SmoothScroll } from "./";
import CurtainLoader from "../ui/CurtainLoader";
import { MainAnimationGate } from "./MainAnimationGate";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <IntroProvider>
        <CurtainLoader >
          <SmoothScroll>
            <MainAnimationGate>
              {children}
            </MainAnimationGate>
          </SmoothScroll>
        </CurtainLoader >
      </IntroProvider>
    </LanguageProvider>
  );
}