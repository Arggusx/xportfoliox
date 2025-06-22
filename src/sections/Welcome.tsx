function Welcome() {
    return (
        <section id="home" className="section flex items-center justify-center pt-10 bg-checkered">
            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                {/* Texto */}
                <div className="md:w-1/2 mb-10 md:mb-0  md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 neon-text-blue break-words">
                        Desenvolvedor <span className="neon-text-pink"> Full Stack</span>
                    </h1>
                    <h2 className="text-2xl sm:text-2xl md:text-3xl mb-6 neon-text-purple break-words">
                        Desenvolvedor (quase) Full Stack
                    </h2>
                    <p className="text-sm md:text-lg text-gray-400 max-w-xl leading-relaxed font-light">
                        Criando experiências digitais impressionantes com tecnologias de ponta e designs inovadores.
                    </p>

                    {/* Botões */}
                    <div className="flex flex-wrap gap-4 mt-10  md:justify-start">
                        <a href="#projects" className="px-6 py-3 bg-transparent neon-border-blue text-white rounded-lg neon-btn hover:bg-blue-900 hover:bg-opacity-30">
                            Meus Projetos
                        </a>
                        <a href="#about" className="px-6 py-3 bg-transparent neon-border-pink text-white rounded-lg neon-btn hover:bg-pink-900 hover:bg-opacity-30">
                            Sobre Mim
                        </a>
                    </div>
                </div>

                {/* Imagem */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-[220px] sm:w-[250px] md:w-[300px]">
                        <div className="absolute inset-0 rounded-full bg-[var(--neon-blue)] blur-xl opacity-30 animate-pulse"></div>
                        <img
                            src="Coding.gif"
                            alt="Profile"
                            className="rounded-full object-cover relative transition-transform duration-300 hover:rotate-3 hover:scale-110 w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            <hr className="my-10 border-gray-700" />
        </section>
    );
}

export default Welcome;
