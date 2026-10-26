import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./context";

const STORAGE_KEY = "portfolio-theme";

// index.html already applies the stored theme before React loads (avoids a flash),
// so the initial state just mirrors what is on <html>.
const readInitialTheme = (): Theme =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(readInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f8fafc" : "#030014");
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignore
        }
    }, [theme]);

    const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
