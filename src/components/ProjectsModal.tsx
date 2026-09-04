import React from 'react';
import { ExternalLink, X, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export function ProjectsModal({ isOpen, onClose, onHoverChange }: ProjectsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Window Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-[#0b0c10]/95 border border-white/10 rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00ffd5]/10 border border-[#00ffd5]/30 flex items-center justify-center text-[#00ffd5]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">Our Projects & Websites</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#00ffd5]/15 text-[#00ffd5] border border-[#00ffd5]/30">
                  {PROJECTS.length} LIVE
                </span>
              </div>
              <p className="text-xs text-zinc-400">Gemeinsam gebaute Anwendungen & Web-Erlebnisse</p>
            </div>
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => onHoverChange?.(true)}
            onMouseLeave={() => onHoverChange?.(false)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all group cursor-none"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* Scrollable Project Links List (untereinander) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-3 custom-scrollbar">
          <div className="flex flex-col divide-y divide-white/5">
            {PROJECTS.map((project) => (
              <ProjectListItem 
                key={project.id} 
                project={project} 
                onHoverChange={onHoverChange} 
              />
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff00c8]" />
            <span>Built by Max & Block</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400">Klicke auf ein Projekt, um es im neuen Tab zu öffnen</span>
        </div>
      </div>
    </div>
  );
}

interface ProjectListItemProps {
  key?: React.Key;
  project: Project;
  onHoverChange?: (isHovered: boolean) => void;
}

function ProjectListItem({ 
  project, 
  onHoverChange 
}: ProjectListItemProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="group py-4 px-3 sm:px-4 rounded-xl hover:bg-white/[0.04] transition-all duration-200 flex items-center justify-between gap-4 cursor-none"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-2 h-2 rounded-full bg-[#00ffd5] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#00ffd5] transition-colors truncate">
              {project.title}
            </span>
            <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors truncate">
              {project.displayUrl}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-zinc-400 group-hover:text-[#00ffd5] transition-colors shrink-0">
        <span className="text-xs font-medium hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity">
          Öffnen
        </span>
        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </a>
  );
}
