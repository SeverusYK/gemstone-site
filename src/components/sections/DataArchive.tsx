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
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg card-warm z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-wider text-subtle">
              {project.id}
            </span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] tracking-wider ${
              project.status === "EXECUTED"
                ? "bg-green-50 text-green-700 border border-green-200"
                : project.status === "IN_PROGRESS"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-gray-50 text-gray-500 border border-gray-200"
            }`}>
              {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-subtle hover:text-ink transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-accent mb-2">
            {project.field}
          </p>
          <h3 className="font-display text-xl text-ink mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-subtle mb-4">{project.titleKr}</p>

          <p className="text-sm text-ink-light leading-relaxed mb-6 whitespace-pre-wrap">
            {project.description}
          </p>

          {/* Accuracy */}
          {project.accuracy && project.accuracy !== "—" && (
            <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-border">
              <span className="font-mono text-[10px] tracking-wider text-subtle">
                MODEL ACCURACY
              </span>
              <span className="font-mono text-lg font-bold text-accent">
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
                  className="px-2 py-0.5 bg-accent/8 border border-accent/15 rounded-full font-mono text-[10px] tracking-wider text-accent"
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
                className="px-2.5 py-1 bg-cream-deep border border-border rounded-full font-mono text-[10px] tracking-wider text-subtle"
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
        className="relative py-24 md:py-32 px-5 md:px-8 border-t border-border"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Section header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">02</p>
            <h2 className="font-display text-3xl md:text-5xl text-ink">
              Project Archive
            </h2>
            <p className="mt-4 text-subtle text-sm md:text-base max-w-md">
              {projects.length}개의 프로젝트 아카이브
            </p>
          </motion.div>

          {/* Project list (Row layout) */}
          <div className="flex flex-col gap-3 mb-10">
            {preview.map((project, i) => (
              <motion.div
                key={project.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-border/80 hover:bg-accent/5 cursor-pointer transition-all duration-200 group gap-4 w-full bg-card/40 rounded-xl hover:shadow-sm"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                onClick={() => setSelected(project)}
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
            ))}
          </div>

          {/* View all link */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <div className="flex-1 h-px bg-border" />
            <Link
              href="/archive"
              className="group flex items-center gap-3 px-5 py-3 border border-border rounded-full hover:border-accent bg-card hover:bg-accent/5 transition-all duration-300"
            >
              <span className="font-sans text-xs tracking-wide text-subtle group-hover:text-accent transition-colors">
                View all {projects.length} projects
              </span>
              <ArrowRight
                size={14}
                className="text-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
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
