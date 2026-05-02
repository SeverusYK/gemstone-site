"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { curriculumSteps } from "@/lib/data";

const codeLines = [
  { text: "# ✨ 활동 개요", type: "comment" as const },
  { text: "activity_overview = {", type: "keyword" as const },
  { text: '    "체계적인 단계별 과정": "기초부터 실전까지 연결되는 커리큘럼",', type: "string" as const },
  { text: '    "실전 프로젝트 중심": "각 단계에서 팀·개인 프로젝트 수행",', type: "string" as const },
  { text: '    "현직자 멘토링": "졸업 선배 및 현업 멘토가 함께하는 코드 리뷰",', type: "string" as const },
  { text: '    "네트워킹": "다양한 학교의 친구들과 협업과 성장"', type: "string" as const },
  { text: "}", type: "keyword" as const },
  { text: "", type: "blank" as const },
  { text: 'if passion_level == "MAX":', type: "keyword" as const },
  { text: '    print("WELCOME TO GEMSTONE")', type: "string" as const },
];

export function Initialization() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="init"
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
          <p className="label-mono text-neon mb-2">[ 03 ]</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            INITIAL
            <br />
            IZATION
          </h2>
          <p className="mt-4 text-muted text-sm md:text-base max-w-md">
            모집 안내 및 커리큘럼 — 파이썬 코드 형식
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Code block */}
          <motion.div
            className="border-system bg-panel overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Code header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-grid">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-muted ml-2">
                curriculum.py
              </span>
            </div>

            {/* Code content */}
            <div className="p-5 md:p-6 overflow-x-auto whitespace-nowrap">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                >
                  {/* Line number */}
                  <span className="font-mono text-xs text-grid w-8 shrink-0 select-none text-right mr-4">
                    {i + 1}
                  </span>

                  {/* Code text */}
                  <span
                    className={`font-mono text-xs md:text-sm leading-relaxed ${
                      line.type === "comment"
                        ? "text-muted"
                        : line.type === "keyword"
                        ? "text-neon"
                        : line.type === "string"
                        ? "text-[#a8db80]"
                        : "text-pure"
                    }`}
                  >
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Curriculum steps */}
          <div className="flex flex-col gap-4">
            {curriculumSteps.map((item, i) => (
              <motion.div
                key={item.step}
                className="border-system bg-panel/30 p-5 md:p-6 hover:bg-panel/60 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 border border-neon/30 bg-neon/5">
                    <span className="font-mono text-sm font-bold text-neon">
                      {String(item.step).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-base font-bold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Connecting line */}
                {i < curriculumSteps.length - 1 && (
                  <div className="ml-5 mt-4 w-px h-4 bg-grid" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
