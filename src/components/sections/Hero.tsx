"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { RetroComputer } from "@/components/ui/RetroComputer";

const images = ["/intro.png", "/intro2.png"];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-bg"
    >
      {/* Main hero content */}
      <div className="relative z-10 px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div>
            {/* Overline */}
            <motion.p
              className="font-mono text-xs tracking-[0.15em] text-subtle mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Data Analysis Crew
            </motion.p>

            {/* Title */}
            <motion.h1
              className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              Introducing
              <br />
              <span className="italic">Query-data.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              className="mt-6 md:mt-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-base md:text-lg text-ink-light leading-relaxed">
                데이터에 질문하고, 인사이트로 답하다.
                Query-data는 체계적인 커리큘럼과 실전 프로젝트로
                데이터 분석 역량을 키우는 크루입니다.
              </p>
            </motion.div>

            {/* Specs */}
            <motion.div
              className="mt-8 md:mt-10 grid grid-cols-2 gap-x-8 gap-y-4 max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { label: "MEMBERS", value: "24+" },
                { label: "PROJECTS", value: "52" },
                { label: "CURRICULUM", value: "3 Tracks" },
                { label: "MENTORING", value: "Active" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[10px] tracking-[0.15em] text-subtle mb-1">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm font-semibold text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Retro Computer */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <RetroComputer />
          </motion.div>
        </div>
      </div>

      {/* Intro Photos Banner (with Carousel and Slogan Overlay) */}
      <motion.div
        className="relative z-10 px-5 md:px-8 max-w-[1400px] mx-auto w-full pb-16 md:pb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <div className="relative h-[380px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black">
          {/* Background Images Carousel */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 0.55, scale: 1 }} // 이미지를 기존 0.4보다 더 밝고 뚜렷하게 수정
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Query-data 활동 배경"
                  fill
                  className="object-cover object-center filter grayscale-[5%]"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Lighter Dark Mask Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Slogan Text Overlay (Centred layout like the B.D.A.I example) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-20">
            {/* Small Crew Icon/Logo */}
            <motion.div 
              className="flex items-center gap-2 mb-4 md:mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                <span className="font-display text-accent font-bold text-base">Q</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#f8f5f0] font-semibold opacity-80">
                QUERY-DATA
              </span>
            </motion.div>

            {/* Slogan: Be Data-literate, Advance with AI */}
            <motion.h3 
              className="font-sans font-black text-2xl md:text-5xl lg:text-6xl text-[#f8f5f0] tracking-tight leading-tight max-w-4xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Be <span className="text-accent">Data-literate</span>,
              <br />
              Advance with <span className="text-accent">AI</span>
            </motion.h3>

            {/* Subtitle 1 (Korean core phrase) */}
            <motion.p 
              className="mt-5 md:mt-7 font-sans text-sm md:text-xl font-bold text-[#f8f5f0] tracking-wide max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              전공자와 비전공자가 함께 성장하는 데이터 분석 크루
            </motion.p>

            {/* Subtitle 2 (Mission statement) */}
            <motion.p 
              className="mt-2.5 md:mt-3.5 font-sans text-xs md:text-sm text-[#f8f5f0]/60 tracking-wider max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              우리의 미션은 끝없는 질문과 배움으로 데이터 중심의 모두의 성장을 돕는 것입니다.
            </motion.p>
          </div>
          
          {/* Slide Indicator dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? "bg-accent w-4" : "bg-[#f8f5f0]/30 hover:bg-[#f8f5f0]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-subtle">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
