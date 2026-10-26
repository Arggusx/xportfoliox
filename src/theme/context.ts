import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextValue {
    theme: Theme;
    /** `origin` é o ponto (px na viewport) de onde a transição circular parte. */
    toggleTheme: (origin?: { x: number; y: number }) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
    theme: "dark",
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
