import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "Sobre", href: "#about" },
        { label: "Projetos", href: "#projects" },
        { label: "Ferramentas", href: "#tools" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled
                ? "backdrop-blur-md shadow-md bg-slate-900/60"
                : "bg-transparent backdrop-blur-0 shadow-none"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4 px-2 sm:px-6">
                    <div className="text-xl sm:text-2xl font-bold neon-text-blue">
                        &lt; Douglas /&gt;
                    </div>
                    <button
                        className="sm:hidden p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir Menu"
                    >
                        {menuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>

                    {/*desktop */}
                    <nav className="hidden sm:flex gap-6">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="group relative px-1 py-2 text-lg font-bold"
                            >
                                <span className="relative z-10 transition-colors duration-300 text-sky-400 group-hover:text-white">
                                    {label}
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/*mobile*/}
            {menuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-[#030014] backdrop-blur-lg border-t border-b border-slate-700 z-40 shadow-lg">
                    <div className="flex flex-col items-start gap-4 p-4">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="text-lg font-bold text-sky-400 hover:text-white transition-colors pl-2"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
