import { ArrowRight, ExternalLink } from "lucide-react";

const Projects = () => {
    return (
        <section id="projects" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center neon-text-dark-blue">
                    Meus Projetos
                </h2>
                <p className="text-sm md:text-md text-center md:ml-90 lg:ml-110 sm:mb-30 text-gray-400 max-w-xl leading-relaxed font-light mb-10">
                    Alguns dos projetos em que trabalhei, combinando criatividade, tecnologia e performance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard
                        icon="laptop-code"
                        title="Sistema de Gerenciamento"
                        desc="Plataforma completa para gestão de negócios com dashboard interativo e relatórios em tempo real."
                        techs={["React", "Node.js", "MongoDB"]}
                        color="blue"
                    />

                    <ProjectCard
                        icon="mobile-alt"
                        title="App de Finanças"
                        desc="Aplicativo móvel para controle financeiro pessoal com integração bancária e análise de gastos."
                        techs={["Flutter", "Firebase", "Dart"]}
                        color="pink"
                    />

                    <ProjectCard
                        icon="gamepad"
                        title="Jogo Web"
                        desc="Jogo multiplayer online desenvolvido com tecnologias web modernas e física realista."
                        techs={["Three.js", "WebSockets", "JavaScript"]}
                        color="purple"
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

const ProjectCard = ({ icon, title, desc, techs, color }: { icon: string; title: string; desc: string; techs: string[]; color: string }) => {
    return (
        <div className={`project-card rounded-lg w-[90%] h-[100%] mx-auto overflow-hidden neon-border-${color} bg-slate-800/90`}>
            <div className={`h-48 bg-gradient-to-r from-${color}-900 to-purple-900 flex items-center justify-center`}>
                <i className={`fas fa-${icon} text-6xl text-neon-${color}`}></i>
            </div>
            <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 neon-text-${color}`}>{title}</h3>
                <p className="text-gray-300 text-sm  mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                    {techs.map((tech, idx) => (
                        <span key={idx} className={`px-2 py-1 bg-${color}-900 bg-opacity-50 text-xs rounded`}>{tech}</span>
                    ))}
                </div>
                <div className="justify-between flex">
                    <a href="" className="justify-between flex gap-2 hover:cursor-pointer text-blue-400 font-medium py-2 px-4 text-xs">Demonstração <ExternalLink className="w-4 h-4 transition" /></a>
                    <a href="#" className={`gap-2 justify-between flex hover:cursor-pointer text-neon-${color} font-bold text-xs hover:underline text-white/90 py-2 px-4 backdrop-blur bg-white/5 rounded-md neon-glow`}>Detalhes <ArrowRight className="w-4 h-4 transition" /></a>
                </div>
            </div>
        </div>
    );
};

export default Projects;