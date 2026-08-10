import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getUiTranslations, type UiDictionary } from '../i18n/translations';
import { SUPPORTED_LANGUAGES, type LanguageInfo } from '../i18n/languages';

interface LanguageContextType {
  currentLang: string;
  t: (key: keyof UiDictionary) => string;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ currentLang: string; children: ReactNode }> = ({ currentLang, children }) => {
  const translations = getUiTranslations(currentLang);

  const t = (key: keyof UiDictionary): string => {
    return translations[key] || getUiTranslations('en')[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
