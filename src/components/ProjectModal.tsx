import { useEffect, useRef } from "react";
import { X, ExternalLink, CheckCircle2, Code2, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/context";

export interface ProjectData {
  id: string;
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
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Mantém o foco do teclado dentro do modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const colorClass = project.color || "blue";
  const m = t.projects.modal;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className={`modal-panel relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 neon-border-${colorClass} shadow-2xl transition-all transform scale-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 border-b divider pb-4">
          <div>
            <span className={`text-xs uppercase tracking-wider font-bold neon-text-${colorClass} block mb-1`}>
              {m.label}
            </span>
            <h2 id="project-modal-title" className={`text-2xl sm:text-3xl font-extrabold neon-text-${colorClass} tracking-tight`}>
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={m.closeAria}
            className="chip p-2 rounded-full transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Imagem do Projeto */}
        <div className="relative overflow-hidden rounded-xl border divider mb-6 shadow-lg">
          <img
            src={project.link}
            alt={project.title}
            className="w-full h-48 sm:h-64 object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Badges de Tecnologias */}
        {project.techs && project.techs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase font-bold text-muted mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-500" /> {m.techs}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <span key={tech} className="chip px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 transition">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Descrição Completa */}
        <div className="mb-6">
          <h3 className="text-xs uppercase font-bold text-muted mb-2">{m.about}</h3>
          <p className="surface-inset text-body text-sm leading-relaxed font-normal p-4 rounded-xl">
            {project.fullDescription || project.desc}
          </p>
        </div>

        {/* Funcionalidades Principais */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs uppercase font-bold text-muted mb-3 flex items-center gap-1.5">
              <Sparkles className={`w-4 h-4 neon-text-${colorClass}`} /> {m.features}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="surface-inset flex items-start gap-2.5 text-xs sm:text-sm text-body p-2.5 rounded-lg"
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 neon-text-${colorClass}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t divider">
          <button
            type="button"
            onClick={onClose}
            className="chip px-5 py-2.5 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            {m.close}
          </button>

          {project.linkDemo && project.linkDemo !== "#" && (
            <a
              href={project.linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-surface px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 neon-border-${colorClass} transition cursor-pointer`}
            >
              {m.open} <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
