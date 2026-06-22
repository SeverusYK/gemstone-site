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
      className="relative py-32 md:py-44 px-5 md:px-8 border-t border-border overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] text-center">
        {/* Section label */}
        <motion.p
          className="font-mono text-xs tracking-[0.12em] text-accent mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          04
        </motion.p>

        {/* Big CTA text */}
        <motion.h2
          className="font-display text-4xl md:text-7xl lg:text-8xl text-ink mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Join the
          <br />
          <span className="italic text-accent">Crew.</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-subtle mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          데이터에 올바른 질문을 던질 새로운 동료를 기다립니다.
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
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-ink text-cream font-sans text-sm md:text-base font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-accent/20"
          >
            <span>지원하기</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.15em] text-subtle mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Tally 양식으로 이동합니다
        </motion.p>
      </div>
    </section>
  );
}
