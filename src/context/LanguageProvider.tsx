import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LanguageContext,
  SUPPORTED_LANGUAGES,
  applyGoogleTranslate,
  clearTranslateCookie,
  clearTranslateHash,
  resetTranslationState,
  setTranslateCookie,
} from "./LanguageContext";

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguageState] = useState("en");
  const [hasUserSelected, setHasUserSelected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    resetTranslationState();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!SUPPORTED_LANGUAGES.has(language)) {
      return;
    }

    if (!hasUserSelected) {
      return;
    }

    if (language === "en") {
      clearTranslateCookie();
      clearTranslateHash();
    }

    setTranslateCookie(language);

    let attempts = 0;
    const tryApply = () => {
      attempts += 1;
      const applied = applyGoogleTranslate(language);

      if (!applied && attempts < 20) {
        window.setTimeout(tryApply, 300);
      }
    };

    tryApply();
  }, [hasUserSelected, language]);

  const setLanguage = useCallback((nextLanguage: string) => {
    setHasUserSelected(true);
    setLanguageState(SUPPORTED_LANGUAGES.has(nextLanguage) ? nextLanguage : "en");
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
