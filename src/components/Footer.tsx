const Footer = () => {
    return (
        <footer id="contacts" className=" bg-opacity-90 py-5 border-t bg-checkered border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex md:justify-between md:mt-5 flex-col gap-5 md:flex-row">

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-md md:text-xl font-bold neon-text-pink mb-4">Navegação</h3>
                        <ul className="space-y-2 font-bold">
                            <li><a href="#welcome" className="text-gray-400 hover:text-neon-blue transition text-sm">Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-neon-pink transition text-sm">Sobre</a></li>
                            <li><a href="#projects" className="text-gray-400 hover:text-neon-purple transition text-sm">Projetos</a></li>
                            <li><a href="#tools" className="text-gray-400 hover:text-neon-blue transition text-sm">Ferramentas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl text-md font-bold neon-text-purple mb-4">Contato</h3>
                        <div className="flex space-x-4 mb-4">

                            {[
                                {
                                    icon: 'linkedin',
                                    href: 'https://www.linkedin.com/in/douglas-arg?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
                                    color: 'blue',
                                },
                                {
                                    icon: 'github',
                                    href: 'https://github.com/Arggusx',
                                    color: 'pink',
                                },
                                {
                                    icon: 'x-twitter',
                                    href: 'https://x.com/seu-usuario',
                                    color: 'purple',
                                },
                                {
                                    icon: 'instagram',
                                    href: 'https://instagram.com/douglas_uzu',
                                    color: 'blue',
                                },

                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className={`text-2xl text-gray-400 hover:text-neon-${item.color} transition neon-glow-hover `}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <i className={`fab fa-${item.icon}`}></i>
                                </a>
                            ))}
                        </div>
                        <a
                            className="text-gray-400 text-sm sm:text-md font-bold flex gap-2 hover:cursor-pointer"
                            href="https://mail.google.com/mail/?view=cm&to=dougclasher9@gmail.com"
                            target="_blank"
                        >
                            <i className="fas fa-envelope pt-0.5 pr-1 sm:text-md text-[15px]"></i> Email
                        </a>
                        <a
                            className="text-gray-400 mt-2 text-sm font-bold sm:text-md flex gap-2 hover:cursor-pointer"
                            href="https://wa.me/5582996125491?text=Olá%20Douglas%2C%20vim%20pelo%20seu%20portfólio!"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-whatsapp  sm:text-md text-[17px]"></i>Whatsapp
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-800 font-bold sm:text-md text-xs mt-12 pt-6 md:mt-5 text-center text-gray-400">
                    <p>&copy; 2026 Arggusx. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;