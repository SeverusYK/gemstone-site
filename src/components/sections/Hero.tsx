"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicModelBackground = dynamic(() => import("../3d/DynamicModelBackground"), { ssr: false });

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
    >
      <DynamicModelBackground />
      
      {/* System status bar */}
      <div className="absolute z-10 top-14 left-0 right-0 flex items-center justify-between px-5 md:px-8 py-3 border-b border-grid">
        <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-muted">
          SYSTEM STATUS:{" "}
          <span className="text-neon">ONLINE</span>
        </span>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-muted hidden sm:block">
          GEMSTONE CREW // DATA ANALYSIS UNIT
        </span>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-muted">
          V.2.0
        </span>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Overline */}
        <motion.p
          className="font-mono text-xs tracking-[0.2em] text-muted mb-4 md:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          [ DATA ANALYSIS CREW ]
        </motion.p>

        {/* Giant Title */}
        <motion.h1
          className="font-display font-bold leading-[0.9] tracking-[-0.04em] text-pure"
          style={{
            fontSize: "clamp(3.5rem, 14vw, 13rem)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8, ease: "easeOut" }}
        >
          GEM
          <br />
          <span className="text-neon">STONE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="mt-6 md:mt-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <p className="font-mono text-sm md:text-base tracking-[0.05em] text-pure/80 leading-relaxed">
            WE RENDER THE UNSEEN.
          </p>
          <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
            결측치와 노이즈 사이에서 유의미한 인사이트를 세공하다.
          </p>
        </motion.div>

        {/* Decorative data readout — right side (desktop only) */}
        <motion.div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-48 border-system p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          <p className="label-mono mb-3">LIVE METRICS</p>
          {[
            { label: "MEMBERS", value: "24" },
            { label: "PROJECTS", value: "12" },
            { label: "DATASETS", value: "1.2M" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex justify-between items-center py-2 border-b border-grid last:border-b-0"
            >
              <span className="font-mono text-[10px] tracking-wider text-muted">
                {metric.label}
              </span>
              <span className="font-mono text-xs text-neon font-medium">
                {metric.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-neon" />
        </motion.div>
      </motion.div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute z-10 bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
