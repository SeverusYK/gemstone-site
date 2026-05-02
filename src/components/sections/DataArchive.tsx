"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { X, ExternalLink, ArrowRight } from "lucide-react";

const PREVIEW_COUNT = 6;

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg border-system bg-panel z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-grid">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-wider text-muted">
              {project.id}
            </span>
            <span className="px-2 py-0.5 bg-neon/10 border border-neon/30 font-mono text-[10px] text-neon tracking-wider">
              {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-pure transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-neon mb-2">
            {project.field}
          </p>
          <h3 className="font-display text-xl font-bold mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted mb-4">{project.titleKr}</p>

          <p className="text-sm text-pure/80 leading-relaxed mb-6 whitespace-pre-wrap">
            {project.description}
          </p>

          {/* Accuracy */}
          {project.accuracy && project.accuracy !== "—" && (
            <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-grid">
              <span className="font-mono text-[10px] tracking-wider text-muted">
                MODEL_ACCURACY
              </span>
              <span className="font-mono text-lg font-bold text-neon">
                {project.accuracy}
              </span>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-neon/10 border border-neon/20 font-mono text-[10px] tracking-wider text-neon"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-void border border-grid font-mono text-[10px] tracking-wider text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DataArchive() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const preview = projects.slice(0, PREVIEW_COUNT);

  return (
    <>
      <section
        id="archive"
        ref={sectionRef}
        className="relative py-24 md:py-32 px-5 md:px-8 border-t border-grid"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Section header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="label-mono text-neon mb-2">[ 02 ]</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              DATA
              <br />
              ARCHIVE
            </h2>
            <p className="mt-4 text-muted text-sm md:text-base max-w-md">
              QUERY_RESULT_ARCHIVE — Status: EXECUTED &nbsp;·&nbsp; {projects.length} RECORDS TOTAL
            </p>
          </motion.div>

          {/* Project grid — 6 preview cards, 2 col → 3 col on wide screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {preview.map((project, i) => (
              <motion.button
                key={project.id}
                className="text-left border-system bg-panel/30 hover:bg-panel/80 p-6 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                onClick={() => setSelected(project)}
                whileHover={{ y: -2 }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-wider text-muted">
                    {project.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "EXECUTED"
                          ? "bg-neon"
                          : project.status === "IN_PROGRESS"
                          ? "bg-yellow-400"
                          : "bg-muted"
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] tracking-wider ${
                        project.status === "EXECUTED"
                          ? "text-neon"
                          : project.status === "IN_PROGRESS"
                          ? "text-yellow-400"
                          : "text-muted"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Field tag */}
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted mb-2">
                  {project.field}
                </p>

                {/* Title */}
                <h3 className="font-display text-base font-bold group-hover:text-neon transition-colors duration-200 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted mb-4">{project.titleKr}</p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-4 border-t border-grid">
                  {project.accuracy && project.accuracy !== "—" ? (
                    <span className="font-mono text-xs text-neon">
                      ACC: {project.accuracy}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-muted">—</span>
                  )}
                  <span className="font-mono text-[10px] text-muted group-hover:text-pure transition-colors flex items-center gap-1">
                    OPEN <ExternalLink size={10} />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* View all link */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            {/* Divider line */}
            <div className="flex-1 h-px bg-grid" />
            <Link
              href="/archive"
              className="group flex items-center gap-3 px-5 py-3 border border-grid hover:border-neon bg-panel/40 hover:bg-neon/10 transition-all duration-300"
            >
              <span className="font-mono text-xs tracking-[0.15em] text-muted group-hover:text-neon transition-colors">
                VIEW ALL {projects.length} RECORDS
              </span>
              <ArrowRight
                size={14}
                className="text-muted group-hover:text-neon group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
