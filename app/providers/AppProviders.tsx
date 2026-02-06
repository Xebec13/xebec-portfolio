"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "./language-provider";
import { IntroProvider } from "./intro-provider";
import SmoothScroll from "./smooth-scroll-provider";
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