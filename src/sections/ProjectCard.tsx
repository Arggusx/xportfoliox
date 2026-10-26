import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ProjectModal, type ProjectData } from "../components/ProjectModal";
import { useLanguage } from "../i18n/context";
import type { ProjectId } from "../i18n/translations";

const panelUrl = import.meta.env.VITE_URL_PANEL;
const menuUrl = import.meta.env.VITE_URL_MENU;
const sanctUrl = import.meta.env.VITE_URL_SANCT;
const repoUrlGame = import.meta.env.VITE_URL_GIT_GAME;
const repoAppUrl = import.meta.env.VITE_URL_APP;
const langbossUrl = import.meta.env.VITE_LANGBOSS;
const karateUrl = import.meta.env.VITE_karate;

const GITHUB_PROFILE = "https://github.com/Arggusx";

// Textos (título, descrição, features) ficam em src/i18n/translations.ts
const projectsMeta: { id: ProjectId; link: string; color: string; linkDemo: string; githubUrl?: string }[] = [
    { id: "panel", link: "painel.png", color: "blue", linkDemo: panelUrl },
    { id: "menu", link: "cardapio.png", color: "yellow", linkDemo: menuUrl },
    { id: "oratio", link: "oratio-daily.png", color: "yellow-light", linkDemo: sanctUrl },
    { id: "langboss", link: "langboss.png", color: "yellow", linkDemo: langbossUrl },
    { id: "monterra", link: "jogo.png", color: "green", linkDemo: repoUrlGame },
    { id: "ponto", link: "ponto.png", color: "red", linkDemo: repoAppUrl },
    { id: "torakan", link: "torakan.png", color: "green", linkDemo: karateUrl },
];

const Projects = () => {
    const { t } = useLanguage();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const projects: ProjectData[] = projectsMeta.map((meta) => ({ ...meta, ...t.projects.items[meta.id] }));
    const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

    return (
        <section id="projects" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center neon-text-dark-blue">
                    {t.projects.title}
                </h2>
                <p className="text-sm md:text-base text-center max-w-xl mx-auto mb-12 text-muted leading-relaxed font-semibold">
                    {t.projects.intro}
                </p>

                <ul className="flex flex-wrap justify-center gap-8">
                    {projects.map((project) => (
                        <li key={project.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
                            <ProjectCardItem
                                project={project}
                                onOpenModal={() => setSelectedId(project.id)}
                            />
                        </li>
                    ))}
                </ul>

                <div className="text-center mt-12">
                    <a
                        href={GITHUB_PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-surface inline-flex items-center gap-2 px-6 py-3 neon-border-blue rounded-lg neon-btn font-bold"
                    >
                        <i className="fab fa-github" aria-hidden="true"></i>
                        {t.projects.viewAll}
                    </a>
                </div>
            </div>

            {/* Modal de Detalhes do Projeto */}
            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedId(null)}
            />
        </section>
    );
};

interface ProjectCardItemProps {
    project: ProjectData;
    onOpenModal: () => void;
}

const ProjectCardItem = ({ project, onOpenModal }: ProjectCardItemProps) => {
    const { t } = useLanguage();
    const { link, title, desc, color, linkDemo } = project;

    return (
        <article className={`project-card-color rounded-xl w-full h-full p-5 overflow-hidden neon-border-${color} surface-card flex flex-col justify-between`}>
            <div>
                <div className="overflow-hidden rounded-lg mb-4">
                    <img
                        src={`${link}`}
                        className="rounded-lg w-full h-48 object-cover object-top transition-transform duration-500 hover:scale-105"
                        alt={title}
                        loading="lazy"
                    />
                </div>
                <h3 className={`text-xl font-bold mb-2 neon-text-${color}`}>{title}</h3>
                <p className="text-body text-sm font-medium mb-6">{desc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t divider mt-auto">
                {linkDemo && linkDemo !== "#" ? (
                    <a
                        href={`${linkDemo}`}
                        className="flex items-center gap-1.5 text-accent font-semibold hover:underline transition text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t.projects.demo}
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                ) : (
                    <span className="text-xs text-muted font-semibold">{t.projects.soon}</span>
                )}

                <button
                    type="button"
                    className="chip flex items-center gap-1.5 font-bold text-xs hover:underline py-2 px-3.5 rounded-md transition cursor-pointer"
                    onClick={onOpenModal}
                >
                    {t.projects.details} <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </article>
    );
};

export default Projects;
