"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { X, ExternalLink } from "lucide-react";

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

          <p className="text-sm text-pure/80 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Accuracy */}
          {project.accuracy && (
            <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-grid">
              <span className="font-mono text-[10px] tracking-wider text-muted">
                MODEL_ACCURACY
              </span>
              <span className="font-mono text-lg font-bold text-neon">
                {project.accuracy}
              </span>
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
              QUERY_RESULT_ARCHIVE — Status: EXECUTED
            </p>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                className="text-left border-system bg-panel/30 hover:bg-panel/80 p-6 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                onClick={() => setSelected(project)}
                whileHover={{ y: -2 }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-wider text-muted">
                    {project.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                    <span className="font-mono text-[10px] tracking-wider text-neon">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Field tag */}
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted mb-2">
                  {project.field}
                </p>

                {/* Title */}
                <h3 className="font-display text-lg font-bold group-hover:text-neon transition-colors duration-200 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted mb-4">{project.titleKr}</p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-4 border-t border-grid">
                  {project.accuracy && (
                    <span className="font-mono text-xs text-neon">
                      ACC: {project.accuracy}
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-muted group-hover:text-pure transition-colors flex items-center gap-1">
                    OPEN <ExternalLink size={10} />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
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
