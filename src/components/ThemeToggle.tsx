import { useId } from "react";
import { useTheme } from "../theme/context";
import { useLanguage } from "../i18n/context";

// Ícone sol ↔ lua: no escuro mostra a lua (o "recorte" da máscara entra no círculo
// e os raios recolhem girando); no claro o recorte sai e os raios voltam.
const RAYS = Array.from({ length: 8 }, (_, i) => i * 45);

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const maskId = useId();
    const label = theme === "dark" ? t.theme.toLight : t.theme.toDark;

    return (
        <button
            type="button"
            onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label={label}
            title={label}
            className="header-toggle theme-toggle p-1.5 rounded-lg cursor-pointer"
        >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <mask id={maskId}>
                    <rect width="24" height="24" fill="white" />
                    <circle className="theme-toggle__bite" cx="17" cy="7" r="7" fill="black" />
                </mask>
                <g mask={`url(#${maskId})`}>
                    <circle className="theme-toggle__core" cx="12" cy="12" r="8.5" fill="currentColor" />
                </g>
                <g className="theme-toggle__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {RAYS.map((deg) => (
                        <line key={deg} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${deg} 12 12)`} />
                    ))}
                </g>
            </svg>
        </button>
    );
}
