"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { DICTIONARY, Language, DictionarySchema } from "../constants/portfolio";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: DictionarySchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pl" : "en"));
  };

  // Memoizujemy obiekt t, aby uniknąć niepotrzebnych kalkulacji przy re-renderach
  const t = useMemo(() => DICTIONARY[language], [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};