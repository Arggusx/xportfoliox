import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { ThemeContext, type Theme } from "./context";

const STORAGE_KEY = "portfolio-theme";

// index.html already applies the stored theme before React loads (avoids a flash),
// so the initial state just mirrors what is on <html>.
const readInitialTheme = (): Theme =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark";

const applyTheme = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f8fafc" : "#030014");
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(readInitialTheme);
    const themeRef = useRef(theme);
    themeRef.current = theme;

    useEffect(() => {
        applyTheme(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignore
        }
    }, [theme]);

    const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
        const next: Theme = themeRef.current === "dark" ? "light" : "dark";
        const update = () => {
            applyTheme(next);
            flushSync(() => setTheme(next));
        };

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!document.startViewTransition || reduceMotion) {
            update();
            return;
        }

        // Revelação circular: o novo tema cresce a partir do botão até cobrir a tela.
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? 0;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

        const transition = document.startViewTransition(update);
        transition.ready
            .then(() => {
                document.documentElement.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 550, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" }
                );
            })
            .catch(() => {
                // transição abortada: o tema já foi aplicado em update()
            });
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
