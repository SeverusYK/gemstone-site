"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { links } from "@/lib/data";

export function Execute() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="execute"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-5 md:px-8 border-t border-grid overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] text-center">
        {/* Section label */}
        <motion.p
          className="label-mono text-neon mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          [ 04 ]
        </motion.p>

        {/* Big CTA text */}
        <motion.h2
          className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          JOIN THE
          <br />
          <span className="text-neon">CREW</span>
        </motion.h2>

        <motion.p
          className="font-mono text-sm md:text-base text-muted mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          데이터를 해체하고 재조립할 새로운 원석을 호출합니다.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href={links.applyForm}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-neon text-void font-mono text-sm md:text-base font-bold tracking-[0.1em] uppercase transition-all duration-200 hover:bg-void hover:text-neon border-2 border-neon glitch-hover"
          >
            <span className="font-mono">&gt;_</span>
            <span>RUN_SCRIPT</span>

            {/* Hover glow */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_30px_rgba(204,255,0,0.3),0_0_60px_rgba(204,255,0,0.1)]" />
          </a>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] text-grid mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          REDIRECT → GOOGLE_FORM // APPLICATION_PORTAL
        </motion.p>
      </div>
    </section>
  );
}
