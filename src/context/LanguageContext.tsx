import { createContext, useContext } from "react";

type LanguageContextValue = {
  language: string;
  setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const PAGE_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = new Set(["en", "hi"]);
export const TRANSLATE_COOKIE = "googtrans";

export const setTranslateCookie = (language: string) => {
  const value = `/${PAGE_LANGUAGE}/${language}`;
  document.cookie = `${TRANSLATE_COOKIE}=${value};path=/`;
  document.cookie = `${TRANSLATE_COOKIE}=${value};path=/;domain=${window.location.hostname}`;
};

export const clearTranslateCookie = () => {
  document.cookie = `${TRANSLATE_COOKIE}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${TRANSLATE_COOKIE}=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const applyGoogleTranslate = (language: string) => {
  const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!select) {
    return false;
  }

  if (select.value !== language) {
    select.value = language;
    select.dispatchEvent(new Event("change"));
  }

  return true;
};

export const clearTranslateHash = () => {
  if (window.location.hash.includes("googtrans")) {
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState({}, "", url.toString());
  }
};

export const resetTranslationState = () => {
  clearTranslateCookie();
  clearTranslateHash();
  document.documentElement.lang = "en";
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
