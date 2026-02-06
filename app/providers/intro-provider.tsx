"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface IntroContextType {
  introFinished: boolean;
  setIntroFinished: (value: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introFinished, setIntroFinished] = useState(false);

  const value = useMemo(() => ({
    introFinished,
    setIntroFinished
  }), [introFinished]);

  return (
    <IntroContext.Provider value={value}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
};