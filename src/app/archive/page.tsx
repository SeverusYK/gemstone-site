"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { X, ArrowLeft, ExternalLink, Search } from "lucide-react";

// ─── Status badge colours ─────────────────────────────────────────────────────
const statusStyle: Record<string, string> = {
  EXECUTED: "text-neon border-neon/40 bg-neon/10",
  IN_PROGRESS: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  ARCHIVED: "text-muted border-grid bg-panel",
};

// ─── Field filter options ─────────────────────────────────────────────────────
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
      <div className="absolute inset-0 bg-void/85 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg border border-grid bg-panel z-10"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-grid">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-wider text-muted">{project.id}</span>
            <span className={`px-2 py-0.5 border font-mono text-[10px] tracking-wider ${statusStyle[project.status]}`}>
              {project.status}
            </span>
          </div>
          <button onClick={onClose} className="text-muted hover:text-pure transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-neon mb-2">{project.field}</p>
          <h3 className="font-display text-xl font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-muted mb-4">{project.titleKr}</p>
          <p className="text-sm text-pure/80 leading-relaxed mb-6 whitespace-pre-wrap">{project.description}</p>

          {project.accuracy && project.accuracy !== "—" && (
            <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-grid">
              <span className="font-mono text-[10px] tracking-wider text-muted">MODEL_ACCURACY</span>
              <span className="font-mono text-lg font-bold text-neon">{project.accuracy}</span>
            </div>
          )}

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-neon/10 border border-neon/20 font-mono text-[10px] tracking-wider text-neon">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-void border border-grid font-mono text-[10px] tracking-wider text-muted">
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
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.button
      className="text-left border border-grid bg-panel/30 hover:bg-panel/80 p-6 transition-all duration-300 group cursor-pointer w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      onClick={onClick}
      whileHover={{ y: -3 }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-wider text-muted">{project.id}</span>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${project.status === "EXECUTED" ? "bg-neon" : project.status === "IN_PROGRESS" ? "bg-yellow-400" : "bg-muted"}`} />
          <span className={`font-mono text-[10px] tracking-wider ${project.status === "EXECUTED" ? "text-neon" : project.status === "IN_PROGRESS" ? "text-yellow-400" : "text-muted"}`}>
            {project.status}
          </span>
        </div>
      </div>

      <p className="font-mono text-[10px] tracking-[0.15em] text-muted mb-2">{project.field}</p>
      <h3 className="font-display text-base font-bold group-hover:text-neon transition-colors duration-200 mb-1">
        {project.title}
      </h3>
      <p className="text-sm text-muted mb-4">{project.titleKr}</p>

      {/* Tags */}
      {project.tags && (
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 bg-neon/10 border border-neon/20 font-mono text-[9px] tracking-wider text-neon">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-grid">
        {project.accuracy && project.accuracy !== "—" ? (
          <span className="font-mono text-xs text-neon">ACC: {project.accuracy}</span>
        ) : (
          <span className="font-mono text-xs text-muted">—</span>
        )}
        <span className="font-mono text-[10px] text-muted group-hover:text-pure transition-colors flex items-center gap-1">
          OPEN <ExternalLink size={10} />
        </span>
      </div>
    </motion.button>
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
      <main className="min-h-screen bg-void text-pure">
        {/* Top bar */}
        <div className="sticky top-0 z-40 border-b border-grid bg-void/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-14 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted hover:text-neon transition-colors">
              <ArrowLeft size={14} />
              BACK
            </Link>
            <span className="font-display font-bold text-sm tracking-wider">GEMSTONE</span>
            <span className="font-mono text-[10px] text-muted ml-auto">
              {filtered.length}/{projects.length} RECORDS
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
          {/* Page header */}
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.2em] text-neon mb-3">FULL_ARCHIVE</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
              DATA<br />ARCHIVE
            </h1>
            <p className="text-muted text-sm max-w-md font-mono">
              QUERY_RESULT — {projects.length} RECORDS INDEXED
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2.5 bg-panel border border-grid font-mono text-xs text-pure placeholder-muted focus:outline-none focus:border-neon transition-colors"
              />
            </div>

            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-colors ${
                    activeStatus === s
                      ? "border-neon bg-neon/10 text-neon"
                      : "border-grid text-muted hover:border-neon/50 hover:text-pure"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Field filter — scrollable row */}
            <div className="flex flex-wrap gap-2">
              {FIELDS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveField(f)}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-colors ${
                    activeField === f
                      ? "border-neon bg-neon/10 text-neon"
                      : "border-grid text-muted hover:border-neon/50 hover:text-pure"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
              >
                <AnimatePresence>
                  {filtered.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      onClick={() => setSelected(project)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-24 text-muted font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                NO_RECORDS_FOUND — adjust filters
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
