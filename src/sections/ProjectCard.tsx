import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ProjectModal, type ProjectData } from "../components/ProjectModal";

const panelUrl = import.meta.env.VITE_URL_PANEL;
const menuUrl = import.meta.env.VITE_URL_MENU;
const sanctUrl = import.meta.env.VITE_URL_SANCT;
const repoUrlGame = import.meta.env.VITE_URL_GIT_GAME;
const repoAppUrl = import.meta.env.VITE_URL_APP;
const langbossUrl = import.meta.env.VITE_LANGBOSS;
const karateUrl = import.meta.env.VITE_karate;

const projectsData: ProjectData[] = [
    {
        link: "painel.png",
        title: "Painel de Gerenciamento",
        desc: "Painel de administração do sistema de cardápio online, para o gerenciamento de pedidos.",
        fullDescription: "Sistema administrativo completo desenvolvido para proprietários de restaurantes e lanchonetes. Permite visualizar e alterar o status de pedidos em tempo real, gerenciar itens do menu, cadastrar adicionais e analisar o fluxo de caixa com relatórios detalhados.",
        techs: ["React", "Node.js", "TypeScript", "Tailwind CSS", "WebSockets"],
        features: [
            "Gestão de pedidos em tempo real",
            "Controle de estoque e cardápio",
            "Dashboard estatístico de vendas",
            "Notificações sonoras e visuais"
        ],
        color: "blue",
        linkDemo: panelUrl,
    },
    {
        link: "cardapio.png",
        title: "Cardápio Online",
        desc: "Site principal do sistema de cardápio online. Ele permite que os usuários façam pedidos e acompanhem em tempo real.",
        fullDescription: "Aplicação web voltada para o consumidor final, permitindo navegação fluida pelos produtos por categorias, personalização de adicionais, adição ao carrinho interativo e checkout direto com envio de pedido.",
        techs: ["React", "TypeScript", "Tailwind CSS", "API Integration"],
        features: [
            "Navegação intuitiva por categorias",
            "Carrinho de compras dinâmico",
            "Checkout rápido com envio de dados",
            "Acompanhamento do status do pedido"
        ],
        color: "yellow",
        linkDemo: menuUrl,
    },
    {
        link: "oratio-daily.png",
        title: "Oratio Daily",
        desc: "Site desenvolvido para ajudar pessoas que gostariam de aprender mais sobre a religião católica.",
        fullDescription: "Plataforma espiritual interativa criada para disponibilizar orações diárias, liturgia diária, histórias dos santos do dia e momentos de reflexão diária com uma interface serena e acessível.",
        techs: ["React", "TypeScript", "Tailwind CSS", "API Litúrgica"],
        features: [
            "Leituras litúrgicas atualizadas diariamente",
            "Biblioteca de orações categorizadas",
            "Biografia e história do Santo do Dia",
            "Design responsivo e com foco em leitura"
        ],
        color: "yellow-light",
        linkDemo: sanctUrl,
    },
    {
        link: "langboss.png",
        title: "Tradutor Langboss",
        desc: "LangBoss é mais do que uma simples plataforma de tradução; é uma experiência de imersão linguística.",
        fullDescription: "Ferramenta moderna de tradução e aprendizado de idiomas que combina inteligência e contextualização para fornecer traduções precisas, explicações gramaticais e exemplos práticos de conversação.",
        techs: ["React", "Inteligência Artificial", "TypeScript", "Tailwind CSS"],
        features: [
            "Traduções contextuais precisas",
            "Explicador sintático e gramatical",
            "Exemplos de uso no dia a dia",
            "Interface minimalista e focada em produtividade"
        ],
        color: "yellow",
        linkDemo: langbossUrl,
    },
    {
        link: "jogo.png",
        title: "Monterra",
        desc: "Um jogo autoral, estilo Topdown e inspirado no clássico Stardew Valley, totalmente em pixel art.",
        fullDescription: "Projeto de desenvolvimento de jogos em formato 2D Top-Down, construído com mecânicas de exploração, movimentação com colisão, mapas detalhados em tileset e pixel art autoral inspirada nos clássicos RPGs da era 16-bits.",
        techs: ["JavaScript", "HTML5 Canvas", "Pixel Art", "Game Engine"],
        features: [
            "Pixel art e sprites autorais",
            "Mecânicas de movimentação e colisão de mapa",
            "Sistema de interação com cenários",
            "Trilha sonora e efeitos retro"
        ],
        color: "green",
        linkDemo: repoUrlGame,
    },
    {
        link: "ponto.png",
        title: "Sistema de Ponto Eletrônico",
        desc: "Aplicativo para registro e controle eficiente de marcações de ponto, horas e organização.",
        fullDescription: "Plataforma focada em simplificar o registro diário de jornada de trabalho para colaboradores e gestores. Conta com controle de entrada/saída, cálculo automático de saldo de horas e relatórios simplificados.",
        techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
        features: [
            "Registro fácil de entrada e saída",
            "Cálculo e gestão de banco de horas",
            "Histórico completo de marcações",
            "Relatórios exportáveis para a gestão"
        ],
        color: "red",
        linkDemo: repoAppUrl,
    },
    {
        link: "torakan.png",
        title: "Portal Torakan Academy",
        desc: "Plataforma completa de gestão de academias de Karatê, desenvolvida para ajudar os professores e alunos a entender melhor sobre a cultura e prática do Karatê-dō.",
        fullDescription: "Sistema voltado para a difusão da arte marcial Karatê-dō e gestão de dojos. Integra biblioteca de Kata, glossário de termos em japonês, exames de faixa e gerenciamento de alunos.",
        techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
        features: [
            "Guia interativo de Katas e técnicas",
            "Glossário com termos em japonês",
            "Controle de graduação e exames de faixa",
            "Gestão de frequência e perfil de alunos"
        ],
        color: "green",
        linkDemo: karateUrl,
    },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section id="projects" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center neon-text-dark-blue">
                    Meus Projetos
                </h2>
                <p className="text-sm md:text-md text-center max-w-xl mx-auto mb-12 text-gray-400 leading-relaxed font-semibold">
                    Alguns dos projetos em que trabalhei, combinando criatividade, tecnologia e performance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, idx) => (
                        <ProjectCardItem
                            key={idx}
                            project={project}
                            onOpenModal={() => handleOpenModal(project)}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="inline-block px-6 py-3 backdrop-blur bg-slate-900 neon-border-blue text-white rounded-lg neon-btn hover:bg-blue-900/30 transition font-bold"
                    >
                        Ver Todos os Projetos
                    </a>
                </div>
            </div>

            {/* Modal de Detalhes do Projeto */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
};

interface ProjectCardItemProps {
    project: ProjectData;
    onOpenModal: () => void;
}

const ProjectCardItem = ({ project, onOpenModal }: ProjectCardItemProps) => {
    const { link, title, desc, color, linkDemo } = project;

    return (
        <div className={`project-card-color rounded-xl w-full h-full p-5 overflow-hidden neon-border-${color} bg-slate-800/90 flex flex-col justify-between`}>
            <div>
                <div className="overflow-hidden rounded-lg mb-4">
                    <img
                        src={`${link}`}
                        className="rounded-lg w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                        alt={title}
                    />
                </div>
                <h3 className={`text-xl font-bold mb-2 neon-text-${color}`}>{title}</h3>
                <p className="text-gray-300 text-sm font-medium mb-6">{desc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                {linkDemo && linkDemo !== "#" ? (
                    <a
                        href={`${linkDemo}`}
                        className="flex items-center gap-1.5 text-blue-400 font-semibold hover:text-blue-300 transition text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver Demo
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                ) : (
                    <span className="text-xs text-slate-500 font-semibold">Demo em breve</span>
                )}

                <button
                    className={`flex items-center gap-1.5 text-white/90 font-bold text-xs hover:underline py-2 px-3.5 backdrop-blur bg-white/5 rounded-md neon-glow transition cursor-pointer`}
                    onClick={onOpenModal}
                >
                    Detalhes <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};

export default Projects;