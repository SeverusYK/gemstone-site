"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { X, ArrowLeft, ExternalLink, Search } from "lucide-react";

// ─── Status badge styles ─────────────────────────────────────────────────────
const statusStyle: Record<string, string> = {
  EXECUTED: "text-green-700 border-green-200 bg-green-50",
  IN_PROGRESS: "text-amber-700 border-amber-200 bg-amber-50",
  ARCHIVED: "text-gray-500 border-gray-200 bg-gray-50",
};

// ─── Filter options ─────────────────────────────────────────────────────
const FIELDS = ["ALL", ...Array.from(new Set(projects.map((p) => p.field))).sort()];
const STATUSES = ["ALL", "EXECUTED", "IN_PROGRESS", "ARCHIVED"] as const;

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg card-warm z-10"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-wider text-subtle">{project.id}</span>
            <span className={`px-2 py-0.5 rounded-full border font-mono text-[10px] tracking-wider ${statusStyle[project.status]}`}>
              {project.status}
            </span>
          </div>
          <button onClick={onClose} className="text-subtle hover:text-ink transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-accent mb-2">{project.field}</p>
          <h3 className="font-display text-xl text-ink mb-1">{project.title}</h3>
          <p className="text-sm text-subtle mb-4">{project.titleKr}</p>
          <p className="text-sm text-ink-light leading-relaxed mb-6 whitespace-pre-wrap">{project.description}</p>

          {project.accuracy && project.accuracy !== "—" && (
            <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-border">
              <span className="font-mono text-[10px] tracking-wider text-subtle">MODEL ACCURACY</span>
              <span className="font-mono text-lg font-bold text-accent">{project.accuracy}</span>
            </div>
          )}

          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-accent/8 border border-accent/15 rounded-full font-mono text-[10px] tracking-wider text-accent">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-cream-deep border border-border rounded-full font-mono text-[10px] tracking-wider text-subtle">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
// ─── Project Row ──────────────────────────────────────────────────────────────
function ProjectRow({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-border/80 hover:bg-accent/5 cursor-pointer transition-all duration-200 group gap-4 w-full bg-card/40 rounded-xl hover:shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ x: 4 }}
    >
      {/* Left: ID, Field Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
        {/* ID */}
        <span className="font-mono text-xs font-bold text-subtle/80 shrink-0 sm:w-16">
          {project.id}
        </span>
        
        {/* Field Badge */}
        <span className="font-mono text-[9px] tracking-wider text-accent bg-accent/8 border border-accent/15 px-2 py-0.5 rounded shrink-0 self-start sm:self-auto uppercase">
          {project.field}
        </span>

        {/* Title */}
        <div className="flex flex-col min-w-0">
          <span className="font-sans text-sm font-bold text-ink group-hover:text-accent transition-colors duration-200 truncate">
            {project.title}
          </span>
          <span className="font-sans text-xs text-subtle mt-0.5 truncate">
            {project.titleKr}
          </span>
        </div>
      </div>

      {/* Right: Tech Stack, Accuracy & Status Badge */}
      <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end shrink-0">
        {/* Tech Stack */}
        <div className="hidden lg:flex flex-wrap gap-1.5 max-w-xs justify-end">
          {project.tech.slice(0, 3).map((t) => (
            <span 
              key={t} 
              className="px-2 py-0.5 bg-cream-deep border border-border/60 rounded text-[10px] font-mono text-subtle"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] font-mono text-subtle/60 self-center">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Accuracy */}
        <div className="w-16 text-right hidden sm:block">
          {project.accuracy && project.accuracy !== "—" ? (
            <span className="font-mono text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded">
              {project.accuracy}
            </span>
          ) : (
            <span className="font-mono text-xs text-subtle/40">—</span>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 w-24 justify-end">
          <span className={`w-1.5 h-1.5 rounded-full ${
            project.status === "EXECUTED" 
              ? "bg-green-500" 
              : project.status === "IN_PROGRESS" 
              ? "bg-amber-400" 
              : "bg-gray-300"
          }`} />
          <span className={`font-mono text-[10px] tracking-wider font-semibold ${
            project.status === "EXECUTED" 
              ? "text-green-600" 
              : project.status === "IN_PROGRESS" 
              ? "text-amber-600" 
              : "text-subtle"
          }`}>
            {project.status}
          </span>
        </div>

        {/* Arrow / Detail view icon */}
        <div className="text-subtle group-hover:text-accent transition-colors pl-2">
          <ExternalLink size={14} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ArchivePage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeField, setActiveField] = useState("ALL");
  const [activeStatus, setActiveStatus] = useState<string>("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchField = activeField === "ALL" || p.field === activeField;
      const matchStatus = activeStatus === "ALL" || p.status === activeStatus;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.titleKr.includes(q) ||
        p.field.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchField && matchStatus && matchQuery;
    });
  }, [activeField, activeStatus, query]);

  return (
    <>
      <main className="min-h-screen bg-cream text-ink">
        {/* Top bar */}
        <div className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-14 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-sans text-sm text-subtle hover:text-accent transition-colors">
              <ArrowLeft size={14} />
              Back
            </Link>
            <span className="font-display text-base text-ink">Query-data</span>
            <span className="font-mono text-[10px] text-subtle ml-auto">
              {filtered.length}/{projects.length} projects
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
          {/* Page header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">Full Archive</p>
            <h1 className="font-display text-4xl md:text-6xl text-ink mb-4">
              Project<br />Archive
            </h1>
            <p className="text-subtle text-sm max-w-md">
              {projects.length}개의 프로젝트가 아카이브되어 있습니다
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg font-sans text-sm text-ink placeholder-subtle focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border rounded-full transition-colors ${
                    activeStatus === s
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-subtle hover:border-accent/50 hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Field filter */}
            <div className="flex flex-wrap gap-2">
              {FIELDS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveField(f)}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border rounded-full transition-colors ${
                    activeField === f
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-subtle hover:border-accent/50 hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List Layout */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="list"
                className="flex flex-col gap-3"
              >
                {filtered.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onClick={() => setSelected(project)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-24 text-subtle text-sm bg-card/10 rounded-2xl border border-dashed border-border/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No matching projects found — try adjusting filters
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
