import { useLanguage } from "../i18n/context";

const socials = [
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/douglas-arg', color: 'blue' },
    { icon: 'github', label: 'GitHub', href: 'https://github.com/Arggusx', color: 'pink' },
    { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/douglas_uzu', color: 'purple' },
];

const Footer = () => {
    const { t } = useLanguage();

    const navLinks = [
        { label: t.nav.home, href: "#home" },
        { label: t.nav.about, href: "#about" },
        { label: t.nav.resume, href: "#resume" },
        { label: t.nav.projects, href: "#projects" },
        { label: t.nav.tools, href: "#tools" },
    ];

    return (
        <footer id="contacts" className="py-5 border-t divider bg-checkered">
            <div className="container mx-auto px-4">
                <div className="flex md:justify-between md:mt-5 flex-col gap-5 md:flex-row">

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-md md:text-xl font-bold neon-text-pink mb-4">{t.footer.navigation}</h3>
                        <ul className="space-y-2 font-bold">
                            {navLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <a href={href} className="footer-link transition text-sm">{label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl text-md font-bold neon-text-purple mb-4">{t.footer.contact}</h3>
                        <div className="flex space-x-4 mb-4">
                            {socials.map((item) => (
                                <a
                                    key={item.icon}
                                    href={item.href}
                                    aria-label={item.label}
                                    className={`footer-link text-2xl hover:text-neon-${item.color} transition neon-glow-hover`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className={`fab fa-${item.icon}`} aria-hidden="true"></i>
                                </a>
                            ))}
                        </div>
                        <a
                            className="footer-link text-sm font-bold flex gap-2"
                            href="mailto:dougclasher9@gmail.com"
                        >
                            <i className="fas fa-envelope pt-0.5 pr-1 text-[15px]" aria-hidden="true"></i> {t.footer.email}
                        </a>
                        <a
                            className="footer-link mt-2 text-sm font-bold flex gap-2"
                            href={`https://wa.me/5582996125491?text=${encodeURIComponent(t.footer.whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-whatsapp text-[17px]" aria-hidden="true"></i>{t.footer.whatsapp}
                        </a>
                    </div>
                </div>

                <div className="border-t divider font-bold sm:text-base text-xs mt-12 pt-6 md:mt-5 text-center text-muted">
                    <p>&copy; {new Date().getFullYear()} Douglas Moreira. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
