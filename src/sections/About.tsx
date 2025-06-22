function About() {
    return (
        <section id="about" className="section py-20 bg-opacity-50 bg-checkered">
            <div className="container px-4">
                <h2 className="sm:text-4xl text-3xl font-bold mb-16 sm:mb-30 text-center neon-text-dark-blue">
                    Sobre Mim
                </h2>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-10 md:mb-0 flex justify-center">
                        <img src="minha-foto.jpg" alt="About Me" className="profile-img rounded-full w-70 h-70 object-cover transition-transform duration-300 hover:opacity-80 hover:scale-110" />
                    </div>

                    <div className="md:w-2/3 md:pl-12 font-bold">
                        <h1 className="text-3xl w-[350px] sm:text-3xl sm:text-left text-center font-bold mb-10 leading-relaxed neon-text-blue ">
                            Olá, eu sou <br />
                            <span className="neon-text-pink"> Douglas Moreira</span>
                        </h1>
                        <p className="text-gray-300 mb-10 ml-5 sm:ml-0 text-justify w-[80%] leading-relaxed text-base">
                            Sou um desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência criando soluções digitais inovadoras. Minha jornada começou quando eu era adolescente, mexendo com scripts e modificando jogos, e desde então nunca parei de aprender e evoluir.
                        </p>


                        <div className="grid sm:grid-cols-2 sm:w-[80%] gap-5">
                            <div className="p-4 w-full neon-border-blue rounded-lg backdrop-blur bg-slate-900">
                                <h4 className="font-bold mb-2 neon-text-blue text-sm">Educação</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">Ciência da Computação - Unima | Afya</p>
                            </div>
                            <div className="p-4 w-full neon-border-pink rounded-lg backdrop-blur bg-slate-900">
                                <h4 className="font-bold mb-2 neon-text-pink text-sm">Experiência</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">5+ anos de desenvolvimento web</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;