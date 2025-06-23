import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const Projects = () => {
    return (
        <section id="projects" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center neon-text-dark-blue">
                    Meus Projetos
                </h2>
                <p className="text-sm md:text-md text-center md:ml-90 lg:ml-110 sm:mb-30 text-gray-400 max-w-xl leading-relaxed font-bold mb-10">
                    Alguns dos projetos em que trabalhei, combinando criatividade, tecnologia e performance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard
                        link="painel.png"
                        title="Painel de Gerenciamento"
                        desc="Painel de administração do sistema de cardápio online, para o gerenciamento de pedidos."
                        //techs={["React", "Node.js", "Prisma", "TypeScript"]}
                        color="blue"
                        linkDemo="https://panel-menu-eng-soft.vercel.app/"
                    />

                    <ProjectCard
                        link="cardapio.png"
                        title="Cardápio Online"
                        desc="Site principal do sistema de cardápio online. Ele permite que os usuários façam pedidos e acompanhem em tempo real."
                        //techs={["Flutter", "Firebase", "Dart"]}
                        color="yellow"
                        linkDemo="https://online-menu-lab-eng-soft.vercel.app/"
                    />

                    <ProjectCard
                        link="sanct.png"
                        title="Sanct Digital"
                        desc="Site desenvolvido para ajudar pessoas que gostariam de aprender mais sobre a religião católica."
                        //techs={["Three.js", "WebSockets", "JavaScript"]}
                        color="yellow-light"
                        linkDemo="https://sanct-digital.vercel.app/"
                    />

                    <ProjectCard
                        link="langboss.png"
                        title="Tradutor Langboss"
                        desc="LangBoss é mais do que uma simples plataforma de tradução; é uma experiência de imersão linguística."
                        //techs={["Three.js", "WebSockets", "JavaScript"]}
                        color="yellow"
                        linkDemo="https://langboss.vercel.app/"
                    />

                    <ProjectCard
                        link="jogo.png"
                        title="Jogo Topdown"
                        desc="Um jogo autoral, estilo Topdown e inspirado no clássico Stardew Valley, totalmente em pixel art."
                        //techs={["Three.js", "WebSockets", "JavaScript"]}
                        color="green"
                        linkDemo="https://github.com/Arggusx/ProjetoTopDown/releases"
                    />

                    <ProjectCard
                        link="finance.png"
                        title="App de Finanças"
                        desc="Um jogo autoral, estilo Topdown e inspirado no clássico Stardew Valley, totalmente em pixel art."
                        //techs={["Three.js", "WebSockets", "JavaScript"]}
                        color="red"
                        linkDemo="https://github.com/Arggusx/FinanceApp"
                    />
                </div>

                <div className="text-center mt-12">
                    <a href="#" className="inline-block px-6 py-3 backdrop-blur bg-slate-900 neon-border-blue text-white rounded-lg neon-btn hover:bg-blue-900 hover:bg-opacity-30">
                        Ver Todos os Projetos
                    </a>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ linkDemo, link, title, desc, color }: { linkDemo: string; link: string; title: string; desc: string; color: string }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={`project-card-color rounded-lg ml-5 w-[90%] h-[100%] p-5 overflow-hidden neon-border-${color} bg-slate-800/90`}>
            <img src={`${link}`} className="rounded-lg  transition-transform duration-500 hover:scale-103" alt="" />
            <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 neon-text-${color}`}>{title}</h3>
                <p className="text-gray-300 text-sm font-semibold  mb-4">{desc}</p>

                <div className="justify-between flex">
                    <a
                        href={`${linkDemo}`}
                        className="justify-between flex gap-2 hover:cursor-pointer text-blue-400 font-semibold py-2 px-4 text-xs"
                        target="_blank"
                    >
                        Demonstração

                        <ExternalLink className="w-4 h-4 transition" /></a>
                    <button
                        className={`gap-2 justify-between flex hover:cursor-pointer text-neon-${color} font-bold text-xs hover:underline text-white/90 py-2 px-4 backdrop-blur bg-white/5 rounded-md neon-glow`}
                        onClick={() => setShowModal(true)}
                    >
                        Detalhes <ArrowRight className="w-4 h-4 transition" />
                    </button>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
                                <h2 className="text-lg font-bold mb-2 text-gray-800">Aviso</h2>
                                <p className="font-semibold text-gray-600 mt-5 mb-10">Ainda estou desenvolvendo a página de detalhes para os projetos. <br /></p>
                                <span className="font-semibold text-gray-600">Obrigado pela compeenção 👍🏼.</span>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Projects;