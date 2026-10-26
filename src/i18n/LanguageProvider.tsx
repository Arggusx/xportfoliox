import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext } from "./context";
import { translations, type Lang } from "./translations";

const STORAGE_KEY = "portfolio-lang";

const readStoredLang = (): Lang => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "pt") return stored;
    } catch {
        // storage can be blocked (private mode); fall back to the default
    }
    return "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(readStoredLang);
    const t = translations[lang];

    useEffect(() => {
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        document.title = t.meta.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", t.meta.description);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // ignore
        }
    }, [lang, t]);

    const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
