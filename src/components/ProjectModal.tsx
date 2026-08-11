import { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Code2, Sparkles } from "lucide-react";

export interface ProjectData {
  link: string;
  title: string;
  desc: string;
  fullDescription: string;
  features: string[];
  techs: string[];
  color: string; // e.g. 'blue', 'yellow', 'yellow-light', 'green', 'red'
  linkDemo: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const colorClass = project.color || "blue";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 rounded-2xl p-6 sm:p-8 text-white neon-border-${colorClass} shadow-2xl transition-all transform scale-100 border border-slate-700/60`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 border-b border-slate-800 pb-4">
          <div>
            <span className={`text-xs uppercase tracking-wider font-bold neon-text-${colorClass} block mb-1`}>
              Detalhes do Projeto
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold neon-text-${colorClass} tracking-tight`}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Imagem do Projeto */}
        <div className="relative overflow-hidden rounded-xl border border-slate-700/50 mb-6 bg-slate-950/60 shadow-lg">
          <img
            src={project.link}
            alt={project.title}
            className="w-full h-48 sm:h-64 object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Badges de Tecnologias */}
        {project.techs && project.techs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-400" /> Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800/90 text-slate-200 border border-slate-700 flex items-center gap-1 hover:border-slate-500 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Descrição Completa */}
        <div className="mb-6">
          <h3 className="text-xs uppercase font-bold text-slate-400 mb-2">Sobre o Projeto</h3>
          <p className="text-slate-300 text-sm leading-relaxed font-normal bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            {project.fullDescription || project.desc}
          </p>
        </div>

        {/* Funcionalidades Principais */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className={`w-4 h-4 neon-text-${colorClass}`} /> Principais Funcionalidades
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800"
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 neon-text-${colorClass}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            Fechar
          </button>

          {project.linkDemo && project.linkDemo !== "#" && (
            <a
              href={project.linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 text-white flex items-center gap-2 neon-border-${colorClass} neon-glow hover:bg-slate-800 transition cursor-pointer`}
            >
              Acessar Projeto <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
