import { createContext, useContext } from "react";
import { translations, type Lang } from "./translations";

export interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (typeof translations)[Lang];
}

export const LanguageContext = createContext<LanguageContextValue>({
    lang: "en",
    setLang: () => {},
    t: translations.en,
});

export const useLanguage = () => useContext(LanguageContext);
