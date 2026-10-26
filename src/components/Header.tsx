import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { useTheme } from "../theme/context";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: t.nav.home, href: "#home" },
        { label: t.nav.about, href: "#about" },
        { label: t.nav.resume, href: "#resume" },
        { label: t.nav.projects, href: "#projects" },
        { label: t.nav.tools, href: "#tools" },
    ];

    const themeLabel = theme === "dark" ? t.theme.toLight : t.theme.toDark;

    const toggles = (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => setLang(lang === "en" ? "pt" : "en")}
                aria-label={t.langSwitch.label}
                title={t.langSwitch.label}
                className="header-toggle flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
            >
                <Languages className="w-4 h-4" />
                {t.langSwitch.short}
            </button>
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={themeLabel}
                title={themeLabel}
                className="header-toggle p-1.5 rounded-lg cursor-pointer"
            >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
        </div>
    );

    return (
        <header
            className={`site-header fixed left-0 right-0 z-50 transition-all ${scrolled || menuOpen ? "is-solid backdrop-blur-md shadow-md" : ""}`}
        >
            <div className="flex items-center justify-between gap-4 py-3 px-5 lg:px-24">
                <a href="#home" className="text-md sm:text-2xl font-bold neon-text-blue">
                    &lt; Douglas /&gt;
                </a>

                {/*desktop */}
                <nav aria-label={t.nav.label} className="hidden lg:flex items-center gap-6">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="group relative px-1 py-2 text-base font-bold"
                        >
                            <span className="nav-link relative z-10 transition-colors duration-300">
                                {label}
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0"></span>
                        </a>
                    ))}
                    {toggles}
                </nav>

                <div className="flex items-center gap-2 lg:hidden">
                    {toggles}
                    <button
                        type="button"
                        className="p-2 nav-link"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/*mobile*/}
            {menuOpen && (
                <nav id="mobile-menu" aria-label={t.nav.label} className="lg:hidden mobile-menu shadow-lg">
                    <div className="flex flex-col items-start gap-4 p-4 pl-6">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="nav-link text-lg font-bold transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
