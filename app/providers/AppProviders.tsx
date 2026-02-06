"use client";

import { ReactNode } from "react";
import { LanguageProvider, IntroProvider, SmoothScroll } from "./";
import CurtainLoader from "../ui/CurtainLoader";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <IntroProvider>
        <SmoothScroll>
          <CurtainLoader>
            {children}
          </CurtainLoader>
        </SmoothScroll>
      </IntroProvider>
    </LanguageProvider>
  );
}